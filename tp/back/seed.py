from sqlmodel import Session, select, func
from app.core.database import engine
from app.modules.usuarios.model import Usuario
from app.core.security import get_password_hash

def seed_users():
    """
    Inserta usuarios iniciales en la base de datos si la tabla está vacía.

    Crea un usuario administrador ('admin') y uno de consulta ('consulta')
    con sus respectivas contraseñas hasheadas.
    """
    with Session(engine) as session:
        count = session.exec(select(func.count(Usuario.id))).one()
        
        if count > 0:
            print("--- Usuarios ya existentes. Seed cancelado. ---")
            return

        print("--- Ejecutando Seed de Usuarios... ---")
        
        usuarios_iniciales = [
            Usuario(
                username="admin",
                password=get_password_hash("admin123"),
                rol="ADMIN"
            ),
            Usuario(
                username="consulta",
                password=get_password_hash("consulta123"),
                rol="CONSULTA"
            )
        ]
        
        session.add_all(usuarios_iniciales)
        session.commit()
        print("--- Seed finalizado: admin/admin123 y consulta/consulta123 creados. ---")

if __name__ == "__main__":
    seed_users()
