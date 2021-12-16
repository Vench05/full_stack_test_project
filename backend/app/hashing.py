from xmlrpc.client import Boolean
from passlib.context import CryptContext


class Hash():
    def __init__(self) -> None:
        self.__pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def bcrypt(self, password: str) -> str:
        return self.__pwd_cxt.hash(password)

    def verify(self, password: str, hashed_password: str) -> Boolean:
        return self.__pwd_cxt.verify(password, hashed_password)