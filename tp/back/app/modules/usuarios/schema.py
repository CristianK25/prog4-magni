from pydantic import BaseModel
from typing import Optional

class UsuarioBase(BaseModel):
    """Esquema base para representar un usuario con sus campos comunes."""
    username: str
    rol: str

class UsuarioCreate(UsuarioBase):
    """Esquema para la creación de un nuevo usuario, incluyendo la contraseña."""
    password: str

class UsuarioResponse(UsuarioBase):
    """Esquema para devolver la información de un usuario en las respuestas de la API."""
    id: int

class LoginRequest(BaseModel):
    """Esquema para la solicitud de inicio de sesión."""
    username: str
    password: str

class TokenResponse(BaseModel):
    """Esquema para la respuesta exitosa de autenticación que contiene el token JWT."""
    access_token: str
    token_type: str
    user: UsuarioResponse
