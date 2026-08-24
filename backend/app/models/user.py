from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)

    username: str = Field(
        max_length=100,
        index=True,
        unique=True
    )

    email: str = Field(
        max_length=300,
        index=True,
        unique=True
    )

    password_hash: str = Field(
        max_length=300
    )

    role: str = Field(
        default="user",
        max_length=5
    )



