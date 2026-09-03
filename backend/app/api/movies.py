from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.app.api.dependencies import get_current_user
from backend.app.database.database import get_session
from backend.app.models.user import User
from backend.app.schemas.movie import MovieCreate, MovieRead, MovieUpdate
from backend.app.services.movie_service import MovieService


# Router responsible for movie collection endpoints.
router = APIRouter(
    prefix="/movies",
    tags=["Movies"],
)


@router.post(
    "",
    response_model=MovieRead,
    status_code=status.HTTP_201_CREATED,
)
def create_movie(
    movie_data: MovieCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Add a movie to the authenticated user's personal collection.

    Parameters:
    movie_data (MovieCreate): The validated movie data.
    session (Session): The active database session.
    current_user (User): The currently authenticated user.

    Returns:
    MovieRead: The created movie together with the user's
               personal status and rating.

    Raises:
    HTTPException: If the movie cannot be added to the collection.
    """
    service = MovieService(session)

    try:
        # Delegate movie creation and collection logic to the service layer.
        return service.create_movie(
            movie_data,
            current_user,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get(
    "",
    response_model=list[MovieRead],
)
def get_movies(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Retrieve all movies from the authenticated user's collection.

    Parameters:
    session (Session): The active database session.
    current_user (User): The currently authenticated user.

    Returns:
    list[MovieRead]: The user's personal movie collection.

    Raises:
    HTTPException: If the user's movie collection cannot be retrieved.
    """
    service = MovieService(session)

    try:
        return service.get_movies(current_user)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get(
    "/{movie_id}",
    response_model=MovieRead,
)
def get_movie(
    movie_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Retrieve a specific movie from the authenticated user's collection.

    Parameters:
    movie_id (int): The ID of the requested movie.
    session (Session): The active database session.
    current_user (User): The currently authenticated user.

    Returns:
    MovieRead: The requested movie and the user's personal tracking data.

    Raises:
    HTTPException: If the movie does not exist or the user
                   does not have access to it.
    """
    service = MovieService(session)

    try:
        return service.get_movie(
            movie_id,
            current_user,
        )

    except ValueError as error:
        # Return 404 when the requested movie does not exist.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )

    except PermissionError as error:
        # Return 403 when the movie is not part of the user's collection.
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(error),
        )


@router.patch(
    "/{movie_id}",
    response_model=MovieRead,
)
def update_movie(
    movie_id: int,
    movie_data: MovieUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Update the status or personal rating of a movie.

    Parameters:
    movie_id (int): The ID of the movie to update.
    movie_data (MovieUpdate): The fields submitted for update.
    session (Session): The active database session.
    current_user (User): The currently authenticated user.

    Returns:
    MovieRead: The updated movie information.

    Raises:
    HTTPException: If the movie does not exist or the user
                   does not have access to it.
    """
    service = MovieService(session)

    try:
        return service.update_movie(
            movie_id,
            movie_data,
            current_user,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )

    except PermissionError as error:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(error),
        )


@router.delete(
    "/{movie_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_movie(
    movie_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Remove a movie from the authenticated user's personal collection.

    Parameters:
    movie_id (int): The ID of the movie to remove.
    session (Session): The active database session.
    current_user (User): The currently authenticated user.

    Returns:
    None

    Raises:
    HTTPException: If the movie does not exist or the user
                   does not have access to it.
    """
    service = MovieService(session)

    try:
        # Only the user's UserMovie relation is removed by the service.
        service.delete_movie(
            movie_id,
            current_user,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )

    except PermissionError as error:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(error),
        )
    




























    