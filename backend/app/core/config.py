from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Store the configuration values required by the application.

    The values are loaded from environment variables defined
    inside the .env file.
    """

    # MySQL database configuration.
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    # JWT authentication configuration.
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Load environment variables from the .env file.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


# Create a single settings object that can be imported across the application.
settings = Settings()


