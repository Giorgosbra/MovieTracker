from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class UserCreate(SQLModel):
    """
    Define and validate the data required to register a new user.
    """

    username: str = Field(
        min_length=1,
        max_length=50,
    )

    # EmailStr validates that the submitted value has a valid email format.
    email: EmailStr

    # Enforce basic password length requirements during registration.
    password: str = Field(
        min_length=8,
        max_length=128,
    )


class UserRead(SQLModel):
    """
    Define the public user data returned by the API.

    Sensitive information such as the password hash is intentionally
    excluded from the response.
    """

    id: int
    username: str
    email: str
    role: str