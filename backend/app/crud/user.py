from fastapi import Depends
from sqlalchemy.orm.session import Session

from app.schema.user_schema import UserRequest, UserUpdateRequest
from app.hashing import Hash
from app.models import Users

HASHER = Hash()


def create_user(data: UserRequest, db: Session):
    hash_password = HASHER.bcrypt(password=data.password)
    new_user = Users(username=data.username, password=hash_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update_user_use_case(id: int, data: UserUpdateRequest, db: Session):
    user = get_user(user_id=id, db=db)
    for key, value in data.dict().items():
        setattr(user, key, value)
    return user


def get_user_by_username(username: str, db: Session):
    return db.query(Users).filter(Users.username == username).first()


def verify_password(password: str, hashed_password: str):
    return HASHER.verify(password=password, hashed_password=hashed_password)


def get_user(db: Session, user_id: int):
    return db.query(Users).filter(Users.id == user_id).first()
