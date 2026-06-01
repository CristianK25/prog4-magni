from pydantic import BaseModel
from typing import List

class ParticipanteBase(BaseModel):
    """Esquema base con los campos comunes para un Participante."""
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool
    tecnologias: List[str]

class ParticipanteCreate(ParticipanteBase):
    """Esquema para la creación de un nuevo participante."""
    pass

class ParticipanteResponse(ParticipanteBase):
    """Esquema para la respuesta de datos de un participante, incluye el ID."""
    id: int


class ParticipanteUpdate(ParticipanteBase):
    """Esquema para actualizar los datos de un participante existente."""
    pass
