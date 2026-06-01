from sqlmodel import SQLModel, Field
from typing import Optional

class Participante(SQLModel, table=True):
    """
    Representa a un participante de un evento o sistema.

    Atributos:
        id (Optional[int]): Identificador único del participante.
        nombre (str): Nombre completo del participante.
        email (str): Correo electrónico de contacto.
        edad (int): Edad del participante.
        pais (str): País de origen.
        modalidad (str): Modalidad de participación (ej. Presencial, Remoto).
        nivel (str): Nivel de experiencia o conocimiento.
        aceptaTerminos (bool): Indica si el participante aceptó los términos y condiciones.
        tecnologias (str): String con tecnologías separadas por coma (almacenamiento en DB).
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool
    tecnologias: str 
