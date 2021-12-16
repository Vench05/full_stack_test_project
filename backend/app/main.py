from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import user
from app.database import Base, engine

app = FastAPI()


app.include_router(user.router, tags=['Users'], prefix='/user')


@app.on_event('startup')
def startup():
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    Base.metadata.create_all(engine)
