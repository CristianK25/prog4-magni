from pydantic import BaseModel
from fastapi import APIRouter, Query, Request
from app.core.mercadopago import sdk
import uuid
from app.core.helper import get_ngrok_url

router = APIRouter(prefix="/pagos", tags=["Pagos"])


class CursoRequest(BaseModel):
    title: str
    price: int


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
            "success": f"{ngrok_url}/success",
            "failure": f"{ngrok_url}/failure",
            "pending": f"{ngrok_url}/pending"
        },
        "auto_return": "approved",
        "external_reference": external_reference
    }

    preference_response = sdk.preference().create(preference_data)

    return {
        "id": preference_response["response"]["id"],
        "init_point": preference_response["response"]["init_point"],
        "sandbox_init_point": preference_response["response"].get("sandbox_init_point"),
        "external_reference": external_reference
    }


@router.get("/success")
def success(
    payment_id: str = Query(None),
    status: str = Query(None),
    external_reference: str = Query(None)
):
    if not payment_id:
        return {
            "status": "success",
            "warning": "missing payment_id"
        }

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
async def mercadopago_webhook(request: Request):

    body = await request.json()

    # Mercado Pago manda el tipo de evento
    # ej: payment.created / payment.updated
    topic = body.get("type") or body.get("topic")

    data = body.get("data", {})

    payment_id = data.get("id")

    if not payment_id:
        return {"status": "ignored"}

    payment_info = sdk.payment().get(payment_id)
    payment = payment_info["response"]

    status = payment.get("status")
    external_reference = payment.get("external_reference")

    # 🔴 ACÁ ES DONDE ACTUALIZÁS TU BASE DE DATOS
    # ejemplo:
    # update_order(external_reference, status)

    return {
        "status": "received",
        "payment_id": payment_id,
        "payment_status": status
    }