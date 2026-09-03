from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.engine import URL

from backend.app.core.config import settings


# Build the MySQL connection URL using values loaded from the application settings.
DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD,
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    database=settings.DB_NAME,
)


# Create the database engine used by SQLModel to communicate with MySQL.
engine = create_engine(
    DATABASE_URL,
    echo=False
)


def create_db_and_tables():
    """
    Create all database tables defined by the SQLModel models.

    This function creates only tables that do not already exist.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Create and provide a database session.

    Yields:
    Session: A SQLModel session used to communicate with the database.
    """
    # The session is automatically closed when the request is completed.
    with Session(engine) as session:
        yield session

        