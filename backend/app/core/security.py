from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from backend.app.core.config import settings


# Create a password hasher using the recommended secure configuration.
password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    """Hash a plain-text password before storing it in the database."""
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify that a plain-text password matches a stored hashed password.

    Parameters:
    plain_password (str): The password provided by the user.
    hashed_password (str): The hashed password stored in the database.

    Returns:
    bool: True if the passwords match, otherwise False.
    """
    return password_hash.verify(plain_password, hashed_password)


def create_access_token(user_id: int) -> str:
    """
    Create a JWT access token for an authenticated user.

    Parameters:
    user_id (int): The ID of the authenticated user.

    Returns:
    str: The generated JWT access token.
    """
    # Calculate the expiration time of the access token.
    expiration = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Store the user ID and expiration time inside the token payload.
    payload = {
        "sub": str(user_id),
        "exp": expiration
    }

    # Encode the payload using the application's secret key and algorithm.
    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return token


def decode_access_token(token: str) -> int:
    """
    Decode and validate a JWT access token.

    Parameters:
    token (str): The JWT access token received from the user.

    Returns:
    int: The ID of the authenticated user stored inside the token.
    """
    try:
        # Decode the token and verify its signature and expiration time.
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        # Retrieve the user ID stored in the subject field.
        user_id = payload.get("sub")

        if user_id is None:
            raise ValueError("Invalid token")

        return int(user_id)

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, ValueError):
        # Reject expired, malformed or otherwise invalid access tokens.
        raise ValueError("Invalid or expired token")
    






















    