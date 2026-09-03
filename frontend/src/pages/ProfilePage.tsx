import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import api from '../services/api'

import type { User } from '../types/user'
import type { Movie } from '../types/movie'


function ProfilePage() {
  const navigate = useNavigate()

  const [user, setUser] =
    useState<User | null>(null)

  const [movies, setMovies] =
    useState<Movie[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  // Load the authenticated user's account data and movie collection.
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Fetch profile and movie data in parallel.
        const [
          userResponse,
          moviesResponse,
        ] = await Promise.all([
          api.get<User>('/users/me'),
          api.get<Movie[]>('/movies'),
        ])

        setUser(userResponse.data)
        setMovies(moviesResponse.data)
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          // Remove an invalid or expired token before redirecting to login.
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        setError(
          'Could not load your profile.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [navigate])


  const handleLogout = () => {
    // Remove the stored JWT token when the user logs out.
    localStorage.removeItem(
      'access_token',
    )

    navigate('/login')
  }


  // Separate watched movies from movies that are still in the watchlist.
  const watchedMovies =
    movies.filter(
      (movie) =>
        movie.status === 'watched',
    )


  const watchlistMovies =
    movies.filter(
      (movie) =>
        movie.status === 'watchlist',
    )


  // Use only watched movies that have a personal rating.
  const ratedMovies =
    watchedMovies.filter(
      (movie) =>
        movie.personal_rating !== null,
    )


  // Calculate the user's average rating when rated movies are available.
  const averageRating =
    ratedMovies.length > 0
      ? ratedMovies.reduce(
          (total, movie) =>
            total +
            (movie.personal_rating ?? 0),
          0,
        ) / ratedMovies.length
      : null


  // Find the genre that appears most often in the user's collection.
  const favoriteGenre = (() => {
    if (movies.length === 0) {
      return null
    }

    // Count how many movies belong to each genre.
    const genreCounts: Record<
      string,
      number
    > = {}

    movies.forEach((movie) => {
      genreCounts[movie.genre] =
        (genreCounts[movie.genre] ?? 0) +
        1
    })

    let favoriteGenre = ''
    let highestCount = 0

    Object.entries(
      genreCounts,
    ).forEach(([genre, count]) => {
      if (count > highestCount) {
        favoriteGenre = genre
        highestCount = count
      }
    })

    return favoriteGenre
  })()


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <p className="text-slate-400">
          Loading profile...
        </p>

      </div>
    )
  }


  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(225,29,72,0.20),_transparent_30%)]" />

        <div className="absolute right-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-rose-700/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[15%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-3xl" />

      </div>


      {/* Header */}
      <header className="relative z-20 overflow-hidden border-b border-rose-950/60 bg-[#080b18]/90 backdrop-blur-xl">

        <div className="pointer-events-none absolute left-[-80px] top-[-80px] h-56 w-[500px] bg-rose-600/10 blur-3xl" />

        <div className="relative flex w-full items-center justify-between px-6 py-6 lg:px-8 xl:px-10">

          {/* Logo */}
          <div className="text-4xl font-black tracking-tight lg:text-5xl">
            Movie
            <span className="text-rose-500">
              Tracker
            </span>
          </div>


          {/* Navigation */}
          <div className="flex items-center gap-6">

            <button
              type="button"
              onClick={() =>
                navigate('/movies')
              }
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              My Movies
            </button>


            <button
              type="button"
              onClick={() =>
                navigate('/discover')
              }
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Discover
            </button>


            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-rose-500 hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* Main */}
      <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-14">

        {/* Heading */}
        <div className="mb-10">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
            Account
          </p>


          <h1 className="text-4xl font-black">
            My Profile
          </h1>


          <p className="mt-2 text-sm text-slate-400">
            Your account and movie activity.
          </p>

        </div>


        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400">
            {error}
          </div>
        )}


        {/* Profile */}
        {!error && user && (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* User overview */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 shadow-xl backdrop-blur">

              {/* Avatar */}
              <div className="flex justify-center">

                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-rose-500/30 bg-gradient-to-br from-rose-600/30 to-violet-600/20 text-4xl font-black text-rose-400 shadow-lg shadow-rose-950/20">

                  {user.username
                    .charAt(0)
                    .toUpperCase()}

                </div>

              </div>


              {/* User */}
              <div className="mt-6 text-center">

                <h2 className="text-2xl font-black">
                  {user.username}
                </h2>


                <p className="mt-1 text-sm text-slate-400">
                  {user.email}
                </p>


                <div className="mt-5">

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === 'admin'
                        ? 'border border-amber-500/20 bg-amber-500/10 text-amber-300'
                        : 'border border-rose-500/20 bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {user.role === 'admin'
                      ? 'Administrator'
                      : 'MovieTracker User'}
                  </span>

                </div>

              </div>


              {/* Movie preferences */}
              <div className="mt-8 border-t border-slate-800 pt-7">

                {/* Favorite genre */}
                <div className="text-center">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Favorite genre
                  </p>


                  {favoriteGenre ? (
                    <p className="mt-3 text-lg font-bold text-rose-400">
                      {favoriteGenre}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm font-medium text-slate-500">
                      No favorite yet
                    </p>
                  )}

                </div>


                {/* Divider */}
                <div className="my-6 border-t border-slate-800" />


                {/* Watchlist */}
                <div className="text-center">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Watchlist
                  </p>


                  <p className="mt-3 text-3xl font-black text-white">
                    {watchlistMovies.length}
                  </p>


                  <p className="mt-1 text-xs text-slate-500">
                    {watchlistMovies.length ===
                    1
                      ? 'movie to watch'
                      : 'movies to watch'}
                  </p>

                </div>

              </div>

            </section>


            {/* Account details */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 shadow-xl backdrop-blur">

              <div className="mb-7">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Profile details
                </p>


                <h2 className="mt-2 text-2xl font-bold">
                  Account Information
                </h2>

              </div>


              <div className="space-y-4">

                {/* Username */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Username
                  </p>


                  <p className="mt-2 font-semibold text-white">
                    {user.username}
                  </p>

                </div>


                {/* Email */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email address
                  </p>


                  <p className="mt-2 font-semibold text-white">
                    {user.email}
                  </p>

                </div>


                {/* Role */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Account role
                  </p>


                  <div className="mt-2 flex items-center gap-3">

                    <p className="font-semibold capitalize text-white">
                      {user.role}
                    </p>


                    {user.role ===
                      'admin' && (
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Admin access
                      </span>
                    )}

                  </div>

                </div>


                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Watched movies */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Movies watched
                    </p>


                    <div className="mt-3 flex items-end gap-2">

                      <p className="text-3xl font-black text-white">
                        {watchedMovies.length}
                      </p>


                      <p className="mb-1 text-xs text-slate-500">
                        watched
                      </p>

                    </div>

                  </div>


                  {/* Average rating */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Average rating
                    </p>


                    <div className="mt-3 flex items-end gap-2">

                      {averageRating !== null ? (
                        <>
                          <p className="text-3xl font-black text-amber-300">
                            ★{' '}
                            {averageRating.toFixed(
                              1,
                            )}
                          </p>


                          <p className="mb-1 text-xs text-slate-500">
                            / 10
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-slate-500">
                          No ratings yet
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </div>


              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    navigate('/movies')
                  }
                  className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  My Movies
                </button>


                <button
                  type="button"
                  onClick={() =>
                    navigate('/discover')
                  }
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-rose-500 hover:text-white"
                >
                  Discover Movies
                </button>


                {user.role === 'admin' && (
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/admin')
                    }
                    className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:border-amber-500/60 hover:bg-amber-500/20"
                  >
                    Admin Panel
                  </button>
                )}

              </div>

            </section>

          </div>
        )}

      </main>

    </div>
  )
}


export default ProfilePage
















































