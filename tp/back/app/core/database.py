from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def create_db_and_tables():
    """
    Inicializa la base de datos creando todas las tablas definidas en los modelos.
    """
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """
    Generador que provee una sesión de base de datos de SQLModel.

    Yields:
        Session: Una sesión activa vinculada al motor de la base de datos.
    """
    with Session(engine) as session:
        yield session
