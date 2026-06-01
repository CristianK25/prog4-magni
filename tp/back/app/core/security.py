import jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con su hash almacenado.

    Args:
        plain_password (str): La contraseña ingresada por el usuario.
        hashed_password (str): El hash almacenado en la base de datos.

    Returns:
        bool: True si coinciden, False en caso contrario.
    """
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    """
    Genera un hash seguro para una contraseña utilizando bcrypt.

    Args:
        password (str): La contraseña en texto plano.

    Returns:
        str: El hash resultante decodificado en string.
    """
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Genera un token de acceso JWT firmado.

    Args:
        data (dict): Información a incluir en el payload del token (ej. {'sub': username}).
        expires_delta (Optional[timedelta]): Tiempo personalizado de expiración.

    Returns:
        str: El token JWT codificado.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
