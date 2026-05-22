from sqlmodel import SQLModel, Field
from typing import Optional

class Participante(SQLModel, table=True):

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool
    tecnologias: str 
