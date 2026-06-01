from enum import Enum
from sqlmodel import SQLModel

class PaymentStatus(str,Enum):
    success = "success"
    failure = "failure"
    pending = "pending"