from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Configuración global de la aplicación gestionada mediante variables de entorno.

    Atributos:
        SECRET_KEY (str): Clave secreta para la firma de tokens JWT.
        ALGORITHM (str): Algoritmo de cifrado utilizado para JWT.
        ACCESS_TOKEN_EXPIRE_MINUTES (int): Tiempo de expiración de los tokens en minutos.
    """
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    #MERCADO PAGO----
    TEST_ACCESS_TOKEN_MP: str
    PUBLIC_KEY_MP: str

    class Config:
        env_file = ".env"

settings = Settings()
