from fastapi import APIRouter, Query, Request, BackgroundTasks
from sqlmodel import Session, select
from pydantic import BaseModel

from app.core.mercadopago import sdk
from app.core.helper import get_ngrok_url
from app.core.database import engine
from app.modules.pagos.model import Pagos

import uuid

router = APIRouter(prefix="/pagos", tags=["Pagos"])



class CursoRequest(BaseModel):
    title: str
    price: int


# -------------------------
# CREAR PREFERENCIA
# -------------------------
@router.post("/crear-preferencia")
def crear_preferencia(curso: CursoRequest):

    ngrok_url = get_ngrok_url()

    if not ngrok_url:
        return {"status": "error", "message": "Ngrok URL no disponible"}

    external_reference = str(uuid.uuid4())

    preference_data = {
        "items": [
            {
                "title": curso.title,
                "quantity": 1,
                "unit_price": curso.price
            }
        ],
        "back_urls": {
            "success": f"{ngrok_url}/api/pagos/success",
            "failure": f"{ngrok_url}/api/pagos/failure",
            "pending": f"{ngrok_url}/api/pagos/pending"
        },
        "notification_url": f"{ngrok_url}/api/pagos/webhook",
        "auto_return": "approved",
        "external_reference": external_reference
    }

    preference_response = sdk.preference().create(preference_data)

    return {
        "id": preference_response["response"]["id"],
        "init_point": preference_response["response"]["init_point"],
        "external_reference": external_reference
    }


# -------------------------
# BACK URLs
# -------------------------
@router.get("/success")
def success(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):

    if not payment_id:
        return {"status": "success", "warning": "missing payment_id"}

    payment_info = sdk.payment().get(payment_id)

    return {
        "redirect_status": status,
        "external_reference": external_reference,
        "payment": payment_info.get("response")
    }


@router.get("/failure")
def failure(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):
    return {
        "status": "failure",
        "redirect_status": status,
        "payment_id": payment_id,
        "external_reference": external_reference
    }


@router.get("/pending")
def pending(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):
    return {
        "status": "pending",
        "redirect_status": status,
        "payment_id": payment_id,
        "external_reference": external_reference
    }



@router.post("/webhook")
async def mercadopago_webhook(request: Request, background_tasks: BackgroundTasks):

    body = await request.json() if request.headers.get("content-type") == "application/json" else {}

    data = body.get("data") if isinstance(body, dict) else None

    payment_id = None

    if isinstance(data, dict):
        payment_id = data.get("id")

    if not payment_id:
        payment_id = request.query_params.get("data.id")

    if not payment_id:
        return {"status": "ignored"}

    # 🔹 ejecuta en background para no timeout de MP
    background_tasks.add_task(process_payment_safe, str(payment_id))

    return {"status": "received"}

# -------------------------
# WORKER SEGURO
# -------------------------
def process_payment_safe(payment_id: str):

    payment_info = sdk.payment().get(payment_id)
    payment = payment_info.get("response", {})

    raw_status = payment.get("status")

    # 🔹 normalización segura para ENUM
    if raw_status == "approved":
        status = "success"
    elif raw_status == "rejected":
        status = "failure"
    else:
        status = "pending"

    external_reference = payment.get("external_reference") or "unknown"

    with Session(engine) as session:

        existing = session.exec(
            select(Pagos).where(Pagos.payment_id == str(payment_id))
        ).first()

        if existing:
            existing.status = status
            existing.external_reference = external_reference
            session.add(existing)

        else:
            session.add(
                Pagos(
                    payment_id=str(payment_id),
                    status=status,
                    external_reference=external_reference
                )
            )

        session.commit()

    return {
        "status": "processed",
        "payment_id": payment_id,
        "payment_status": status
    }