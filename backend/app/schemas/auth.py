from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class LoginRequest(SQLModel):
    email: EmailStr

    password: str = Field(
        min_length=1,
        max_length=128,
    )


class TokenResponse(SQLModel):
    access_token: str
    token_type: str












    