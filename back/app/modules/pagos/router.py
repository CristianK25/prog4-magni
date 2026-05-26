from pydantic import BaseModel
from fastapi import APIRouter
from app.core.mercadopago import sdk

router = APIRouter(prefix="/pagos", tags=["Pagos"])


class CursoRequest(BaseModel):
    title: str
    price: int


@router.post("/crear-preferencia")
def crear_preferencia(curso: CursoRequest):

    preference_data = {
        "items": [
            {
                "title": curso.title,
                "quantity": 1,
                "unit_price": curso.price
            }
        ],
        "back_urls": {
            "success": "https://chaste-throng-shelter.ngrok-free.dev/success",
            "failure": "https://chaste-throng-shelter.ngrok-free.dev/failure",
            "pending": "https://chaste-throng-shelter.ngrok-free.dev/pending"
        },
        "auto_return": "approved",
        "external_reference": f"{curso.title}-{curso.price}"
    }

    preference_response = sdk.preference().create(preference_data)

    return {
        "id": preference_response["response"]["id"],
        "init_point": preference_response["response"]["init_point"],
        "sandbox_init_point": preference_response["response"].get("sandbox_init_point")
    }
    
@router.get("/success")
def success():
    return {"status": "success"}

@router.get("/failure")
def failure():
    return {"status": "failure"}

@router.get("/pending")
def pending():
    return {"status": "pending"}