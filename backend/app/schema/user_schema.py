from typing import Optional
from pydantic import BaseModel


class UserRequest(BaseModel):
    username: str
    password: str


class UserUpdateRequest(BaseModel):
    fname: Optional[str] = None
    lname: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None

    class Config:
        orm_mode = True


class UserResponse(UserRequest, UserUpdateRequest):
    id: int

    class Config:
        orm_mode = True
