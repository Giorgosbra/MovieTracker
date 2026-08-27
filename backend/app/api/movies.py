from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.app.api.dependencies import get_current_user
from backend.app.database.database import get_session
from backend.app.models.user import User
from backend.app.schemas.movie import MovieCreate, MovieRead, MovieUpdate
from backend.app.services.movie_service import MovieService


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
    service = MovieService(session)

    try:
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
    service = MovieService(session)

    try:
        return service.get_movie(
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
    service = MovieService(session)

    try:
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
































    