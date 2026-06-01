from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
import jwt
from datetime import datetime

from app.core.database import get_session
from app.core.security import create_access_token
from app.core.config import settings
from . import service, schema

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/login", response_model=schema.TokenResponse)
def login(login_data: schema.LoginRequest, session: Session = Depends(get_session)):
    """
    Autentica a un usuario y genera un token de acceso JWT.

    Verifica que el nombre de usuario y la contraseña coincidan con los registros
    en la base de datos. Si son válidos, devuelve un token Bearer y la información
    básica del usuario.

    Args:
        login_data (schema.LoginRequest): Credenciales del usuario.
        session (Session): Sesión de base de datos inyectada.

    Returns:
        dict: Diccionario con access_token, token_type y datos del usuario.

    Raises:
        HTTPException: 401 si las credenciales son inválidas.
    """
    user = service.authenticate_user(login_data, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user
    }


def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    """
    Valida el token JWT y recupera al usuario actual.

    Esta función actúa como una dependencia que puede ser usada en otros endpoints
    para asegurar que el usuario esté autenticado.

    Args:
        token (str): Token Bearer extraído de la cabecera Authorization.
        session (Session): Sesión de base de datos inyectada.

    Returns:
        Usuario: El objeto de usuario autenticado.

    Raises:
        HTTPException: 401 si el token es inválido o el usuario no existe.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    
    user = service.get_user_by_username(username, session)
    if user is None:
        raise credentials_exception
    
    return user

def get_current_admin_user(current_user: schema.UsuarioResponse = Depends(get_current_user)):
    """
    Verifica que el usuario actual tenga permisos de administrador.

    Dependencia que extiende get_current_user para restringir acceso solo a
    usuarios con el rol 'ADMIN'.

    Args:
        current_user (schema.UsuarioResponse): Usuario obtenido de la dependencia previa.

    Returns:
        schema.UsuarioResponse: El mismo usuario si cumple con el rol.

    Raises:
        HTTPException: 403 si el usuario no tiene rol de administrador.
    """
    if current_user.rol != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tenés los permisos necesarios para esta acción (Se requiere rol ADMIN)"
        )
    return current_user
