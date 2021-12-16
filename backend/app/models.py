from app.database import Base

from sqlalchemy import Column, Integer, String, Boolean


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, index=True, unique=True)
    password = Column(String)
    fname = Column(String)
    lname = Column(String)
    email = Column(String)
    age = Column(Integer)