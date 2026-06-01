from sqlmodel import SQLModel, Field
from typing import Optional

class Usuario(SQLModel, table=True):
    """
    Representa la entidad de Usuario en la base de datos.

    Atributos:
        id (Optional[int]): Identificador único del usuario (Primary Key).
        username (str): Nombre de usuario único para inicio de sesión e indexado.
        password (str): Hash de la contraseña del usuario.
        rol (str): Rol asignado al usuario (ej. "ADMIN" o "CONSULTA").
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password: str
    rol: str
