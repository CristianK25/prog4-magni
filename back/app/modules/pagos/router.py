from fastapi import APIRouter, Depends, Query, Request, BackgroundTasks
from fastapi.responses import RedirectResponse
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List

from app.core.mercadopago import sdk
from app.core.helper import get_ngrok_url
from app.core.database import engine, get_session
from app.modules.pagos.model import Pagos
from app.modules.usuarios.router import get_current_admin_user, get_current_user

import uuid

router = APIRouter(prefix="/pagos", tags=["Pagos"])


# -------------------------
# LISTAR COMPRAS (ADMIN)
# -------------------------
@router.get("/", response_model=List[dict])
def listar_compras(
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """
    Devuelve todas las compras registradas. Solo accesible para ADMIN.
    """
    pagos = session.exec(select(Pagos).order_by(Pagos.created_at.desc())).all()
    return [
        {
            "id": p.id,
            "payment_id": p.payment_id,
            "status": p.status,
            "curso_nombre": p.curso_nombre,
            "usuario_id": p.usuario_id,
            "external_reference": p.external_reference,
            "created_at": p.created_at.isoformat(),
        }
        for p in pagos
    ]


# -------------------------
# MIS COMPRAS (USER)
# -------------------------
@router.get("/mis-compras", response_model=List[dict])
def mis_compras(
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    """
    Devuelve las compras aprobadas del usuario actual.
    """
    pagos = session.exec(
        select(Pagos).where(
            Pagos.usuario_id == user.id,
            Pagos.status == "success"
        )
    ).all()
    
    return [
        {
            "curso_nombre": p.curso_nombre,
        }
        for p in pagos
    ]


class CursoRequest(BaseModel):
    title: str
    price: int


# -------------------------
# CREAR PREFERENCIA
# -------------------------
@router.post("/crear-preferencia")
def crear_preferencia(
    curso: CursoRequest,
    user=Depends(get_current_user)
):

    ngrok_url = get_ngrok_url()

    if not ngrok_url:
        return {"status": "error", "message": "Ngrok URL no disponible"}

    external_reference = f"{user.id}_{uuid.uuid4()}"

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

    response_body = preference_response.get("response", {})
    status_code = preference_response.get("status")

    if "id" not in response_body:
        return {
            "status": "error",
            "mp_status": status_code,
            "mp_response": response_body
        }

    return {
        "id": response_body["id"],
        "init_point": response_body["init_point"],
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
    params = f"?payment_id={payment_id}&status={status}&external_reference={external_reference}"
    response = RedirectResponse(url=f"http://localhost:5173/pagos/success{params}")
    response.set_cookie("ssbp", "1", domain=".ngrok-free.app")
    return response


@router.get("/failure")
def failure(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):
    params = f"?payment_id={payment_id}&status={status}&external_reference={external_reference}"
    response = RedirectResponse(url=f"http://localhost:5173/pagos/failure{params}")
    response.set_cookie("ssbp", "1", domain=".ngrok-free.app")
    return response


@router.get("/pending")
def pending(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):
    params = f"?payment_id={payment_id}&status={status}&external_reference={external_reference}"
    response = RedirectResponse(url=f"http://localhost:5173/pagos/pending{params}")
    response.set_cookie("ssbp", "1", domain=".ngrok-free.app")
    return response



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

    # Extraer nombre del curso desde los ítems del pago
    items = payment.get("additional_info", {}).get("items") or []
    curso_nombre = items[0].get("title", "Sin nombre") if items else "Sin nombre"
    
    usuario_id = None
    if external_reference and "_" in external_reference:
        try:
            usuario_id = int(external_reference.split("_")[0])
        except ValueError:
            pass

    with Session(engine) as session:

        existing = session.exec(
            select(Pagos).where(Pagos.payment_id == str(payment_id))
        ).first()

        if existing:
            existing.status = status
            existing.external_reference = external_reference
            existing.curso_nombre = curso_nombre
            if usuario_id is not None:
                existing.usuario_id = usuario_id
            session.add(existing)

        else:
            session.add(
                Pagos(
                    payment_id=str(payment_id),
                    status=status,
                    external_reference=external_reference,
                    curso_nombre=curso_nombre,
                    usuario_id=usuario_id
                )
            )

        session.commit()

    return {
        "status": "processed",
        "payment_id": payment_id,
        "payment_status": status
    }