from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

TODO_NAME_MAX_LENGTH = 100


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(TODO_NAME_MAX_LENGTH), nullable=False)
    completed: Mapped[bool] = mapped_column(default=False)
