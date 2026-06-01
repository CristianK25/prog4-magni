from sqlmodel import Session, select
from typing import List
from .model import Participante
from . import schema

def get_all_participantes(session: Session) -> List[schema.ParticipanteResponse]:
    """
    Recupera todos los participantes de la base de datos.

    Args:
        session (Session): Sesión de la base de datos.

    Returns:
        List[schema.ParticipanteResponse]: Lista de participantes procesados para respuesta.
    """
    db_participantes = session.exec(select(Participante)).all()
    
    response = []
    for p in db_participantes:
        p_dict = p.model_dump()
        p_dict["tecnologias"] = p.tecnologias.split(",") if p.tecnologias else []
        response.append(schema.ParticipanteResponse(**p_dict))
    return response

def create_participante(participante_in: schema.ParticipanteCreate, session: Session) -> schema.ParticipanteResponse:
    """
    Crea un nuevo participante en la base de datos.

    Convierte la lista de tecnologías en un string separado por comas para su almacenamiento.

    Args:
        participante_in (schema.ParticipanteCreate): Datos del nuevo participante.
        session (Session): Sesión de la base de datos.

    Returns:
        schema.ParticipanteResponse: El participante creado con su ID y tecnologías procesadas.
    """
    create_data = participante_in.model_dump()
    create_data["tecnologias"] = ",".join(create_data["tecnologias"])
    
    nuevo_db = Participante(**create_data)
    
    session.add(nuevo_db)
    session.commit()
    session.refresh(nuevo_db)
    
    response_dict = nuevo_db.model_dump()
    response_dict["tecnologias"] = nuevo_db.tecnologias.split(",") if nuevo_db.tecnologias else []
    return schema.ParticipanteResponse(**response_dict)

def delete_participante(participante_id: int, session: Session) -> bool:
    """
    Elimina un participante por su ID.

    Args:
        participante_id (int): ID del participante a eliminar.
        session (Session): Sesión de la base de datos.

    Returns:
        bool: True si el participante fue eliminado, False si no se encontró.
    """
    db_participante = session.get(Participante, participante_id)
    if db_participante:
        session.delete(db_participante)
        session.commit()
        return True
    return False

def update_participante(participante_id: int, datos: schema.ParticipanteUpdate, session: Session):
    """
    Actualiza los datos de un participante existente.

    Maneja la conversión de tecnologías y la actualización parcial de campos.

    Args:
        participante_id (int): ID del participante a actualizar.
        datos (schema.ParticipanteUpdate): Nuevos datos para el participante.
        session (Session): Sesión de la base de datos.

    Returns:
        schema.ParticipanteResponse: El participante actualizado, o None si no existe.
    """
    db_participante = session.get(Participante, participante_id)
    
    if not db_participante:
        return None
    
    update_data = datos.model_dump(exclude_unset=True)
    
    if "tecnologias" in update_data:
        update_data["tecnologias"] = ",".join(update_data["tecnologias"])

    db_participante.sqlmodel_update(update_data)

    session.commit()
    session.refresh(db_participante)
    
    response_dict = db_participante.model_dump()
    response_dict["tecnologias"] = db_participante.tecnologias.split(",") if db_participante.tecnologias else []
    return schema.ParticipanteResponse(**response_dict)
