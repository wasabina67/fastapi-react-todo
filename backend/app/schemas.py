from pydantic import BaseModel, Field

from app.models import TODO_NAME_MAX_LENGTH


class TodoCreate(BaseModel):
    name: str = Field(min_length=1, max_length=TODO_NAME_MAX_LENGTH)


class TodoUpdate(BaseModel):
    completed: bool


class TodoResponse(BaseModel):
    id: int
    name: str
    completed: bool

    model_config = {"from_attributes": True}
