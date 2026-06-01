import mercadopago
from app.core.config import settings

sdk = mercadopago.SDK(settings.TEST_ACCESS_TOKEN_MP)