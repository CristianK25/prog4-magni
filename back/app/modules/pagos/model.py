from sqlmodel import SQLModel, Field
from typing import Optional
from enum import Enum
from datetime import datetime
from app.modules.pagos.PaymentStatus import PaymentStatus

class Pagos(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    payment_id: str = Field(index=True, unique=True)
    status: PaymentStatus = Field(index=True)

    external_reference: str = Field(index=True)
    curso_nombre: str = Field(default="Sin nombre")
    usuario_id: Optional[int] = Field(default=None, index=True)

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    

 