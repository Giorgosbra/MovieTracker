from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class LoginRequest(SQLModel):
    """
    Define and validate the credentials required for user login.
    """

    email: EmailStr

    password: str = Field(
        min_length=1,
        max_length=128,
    )


class TokenResponse(SQLModel):
    """
    Define the JWT token response returned after successful login.
    """

    access_token: str
    token_type: str


    