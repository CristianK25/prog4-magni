from pydantic import BaseModel
from fastapi import APIRouter
from app.core.mercadopago import sdk
from app.core.helper import get_ngrok_url


router = APIRouter(prefix="/pagos", tags=["Pagos"])


class CursoRequest(BaseModel):
    title: str
    price: int


@router.post("/crear-preferencia")
def crear_preferencia(curso: CursoRequest):

    ngrok_url = get_ngrok_url()

    if not ngrok_url:
        ngrok_url = "http://localhost:8002"  # fallback

    preference_data = {
        "items": [
            {
                "title": curso.title,
                "quantity": 1,
                "unit_price": curso.price
            }
        ],
        "back_urls": {
            "success": "http://localhost:8002/success",
            "failure": "http://localhost:8002/failure",
            "pending": "http://localhost:8002/pending"
        }
    }

    preference_response = sdk.preference().create(preference_data)

    response = preference_response.get("response", {})

    return {
        "id": response.get("id"),
        "url": response.get("sandbox_init_point")
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