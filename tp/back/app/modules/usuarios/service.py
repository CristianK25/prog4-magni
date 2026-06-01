from sqlmodel import Session, select
from .model import Usuario
from . import schema
from app.core.security import get_password_hash, verify_password

def get_user_by_username(username: str, session: Session) -> Usuario:
    """
    Busca un usuario en la base de datos por su nombre de usuario.

    Args:
        username (str): El nombre de usuario a buscar.
        session (Session): La sesión de la base de datos.

    Returns:
        Usuario: El objeto de usuario si se encuentra, de lo contrario None.
    """
    return session.exec(select(Usuario).where(Usuario.username == username)).first()

def authenticate_user(login_data: schema.LoginRequest, session: Session):
    """
    Valida las credenciales de un usuario.

    Args:
        login_data (schema.LoginRequest): Datos de inicio de sesión (username y password).
        session (Session): La sesión de la base de datos.

    Returns:
        Usuario: El usuario autenticado si las credenciales son correctas, de lo contrario None.
    """
    user = get_user_by_username(login_data.username, session)
    if not user:
        return None
    
    if not verify_password(login_data.password, user.password):
        return None
        
    return user

def create_user(user_in: schema.UsuarioCreate, session: Session) -> Usuario:
    """
    Crea un nuevo usuario en el sistema con la contraseña hasheada.

    Args:
        user_in (schema.UsuarioCreate): Datos del nuevo usuario.
        session (Session): La sesión de la base de datos.

    Returns:
        Usuario: El usuario creado y persistido en la base de datos.
    """
    hashed_password = get_password_hash(user_in.password)
    db_user = Usuario(
        username=user_in.username,
        password=hashed_password,
        rol=user_in.rol
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
