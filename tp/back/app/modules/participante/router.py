from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.modules.usuarios.router import get_current_user, get_current_admin_user
from . import service, schema

router = APIRouter(prefix="/participantes", tags=["Participantes"])

@router.get("", response_model=List[schema.ParticipanteResponse])
def get_participantes(
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Obtiene la lista de todos los participantes registrados.

    Requiere que el usuario esté autenticado.

    Args:
        session (Session): Sesión de la base de datos.
        user: Usuario actual autenticado (inyectado).

    Returns:
        List[schema.ParticipanteResponse]: Lista de participantes.
    """
    return service.get_all_participantes(session)

@router.post("", response_model=schema.ParticipanteResponse)
def create_participante(
    participante_in: schema.ParticipanteCreate, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """
    Registra un nuevo participante en el sistema.

    Solo accesible para usuarios con rol de administrador.

    Args:
        participante_in (schema.ParticipanteCreate): Datos del participante.
        session (Session): Sesión de la base de datos.
        admin: Administrador actual autenticado (inyectado).

    Returns:
        schema.ParticipanteResponse: El participante creado.
    """
    return service.create_participante(participante_in, session)

@router.delete("/{participante_id}")
def delete_participante(
    participante_id: int, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """
    Elimina a un participante del sistema.

    Solo accesible para usuarios con rol de administrador.

    Args:
        participante_id (int): ID del participante a eliminar.
        session (Session): Sesión de la base de datos.
        admin: Administrador actual autenticado (inyectado).

    Returns:
        dict: Mensaje de éxito.

    Raises:
        HTTPException: 404 si el participante no existe.
    """
    exito = service.delete_participante(participante_id, session)
    if not exito:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return {"message": "Borrado con éxito campeón"}

@router.put("/{participante_id}", response_model=schema.ParticipanteResponse)
def update_participante(
    participante_id: int, 
    datos: schema.ParticipanteUpdate, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """
    Actualiza la información de un participante existente.

    Solo accesible para usuarios con rol de administrador.

    Args:
        participante_id (int): ID del participante a actualizar.
        datos (schema.ParticipanteUpdate): Nuevos datos.
        session (Session): Sesión de la base de datos.
        admin: Administrador actual autenticado (inyectado).

    Returns:
        schema.ParticipanteResponse: El participante actualizado.

    Raises:
        HTTPException: 404 si el participante no existe.
    """
    actualizado = service.update_participante(participante_id, datos, session)
    if not actualizado:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return actualizado
