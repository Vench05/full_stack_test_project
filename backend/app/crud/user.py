from fastapi import Depends
from sqlalchemy.orm.session import Session

from app.schema.user_schema import UserRequest
from app.hashing import Hash
from app.database import get_db
from app.models import Users

def create_user(data: UserRequest, db: Session = Depends(get_db)):
    hash_password = Hash.bcrypt(password=data.password)
    new_user = Users(username=data.username, password=hash_password)

    db.add(new_user)
    db.commit()
    return new_user