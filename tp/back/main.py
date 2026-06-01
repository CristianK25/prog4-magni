from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import create_db_and_tables
from app.modules.participante.router import router as participante_router
from app.modules.usuarios.router import router as usuarios_router
from app.modules.pagos.router import router as pagos_router
from app.core.mercadopago import sdk

from seed import seed_users


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    seed_users()
    yield


app = FastAPI(
    title="Prog4 Magni API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(participante_router, prefix="/api")
app.include_router(usuarios_router, prefix="/api")
app.include_router(pagos_router, prefix="/api")


@app.get("/")
def home():
    return {
        "status": "Vibes check passed! Backend andando 😎"
    }