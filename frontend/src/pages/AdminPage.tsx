import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import api from '../services/api'

import type { User } from '../types/user'


interface AdminUserStats {
  favorite_genre: string | null
  watchlist_count: number
  movies_watched: number
  average_rating: number | null
}


function AdminPage() {
  const navigate = useNavigate()

  const [
    currentUser,
    setCurrentUser,
  ] = useState<User | null>(null)

  const [users, setUsers] =
    useState<User[]>([])

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(null)

  const [
    selectedUserStats,
    setSelectedUserStats,
  ] =
    useState<AdminUserStats | null>(
      null,
    )

  const [
    statsLoading,
    setStatsLoading,
  ] = useState(false)

  const [
    statsError,
    setStatsError,
  ] = useState('')

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [
    deletingUserId,
    setDeletingUserId,
  ] = useState<number | null>(null)

  const [
    showDeleteConfirm,
    setShowDeleteConfirm,
  ] = useState(false)

  const [isClosing, setIsClosing] =
    useState(false)


  // Load the current administrator and the complete user list.
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // Fetch administrator information and users in parallel.
        const [
          currentUserResponse,
          usersResponse,
        ] = await Promise.all([
          api.get<User>('/users/me'),

          api.get<User[]>(
            '/admin/users',
          ),
        ])

        setCurrentUser(
          currentUserResponse.data,
        )

        setUsers(
          usersResponse.data,
        )
      } catch (error) {
        if (
          axios.isAxiosError(error)
        ) {
          if (
            error.response?.status ===
            401
          ) {
            // Remove an invalid or expired token before redirecting to login.
            localStorage.removeItem(
              'access_token',
            )

            navigate('/login')
            return
          }

          if (
            error.response?.status ===
            403
          ) {
            // Redirect authenticated non-admin users away from the admin panel.
            navigate('/movies')
            return
          }
        }

        setError(
          'Could not load admin data.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [navigate])


  const handleLogout = () => {
    // Remove the stored JWT token when the administrator logs out.
    localStorage.removeItem(
      'access_token',
    )

    navigate('/login')
  }


  const openUser = async (
    user: User,
  ) => {
    // Open the user details modal and reset previous modal state.
    setError('')
    setStatsError('')
    setSelectedUserStats(null)

    setShowDeleteConfirm(false)
    setIsClosing(false)
    setSelectedUser(user)

    setStatsLoading(true)

    try {
      // Load the selected user's movie statistics from the admin endpoint.
      const response =
        await api.get<AdminUserStats>(
          `/admin/users/${user.id}/stats`,
        )

      setSelectedUserStats(
        response.data,
      )
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        if (
          error.response?.status ===
          403
        ) {
          navigate('/movies')
          return
        }
      }

      setStatsError(
        'Could not load user statistics.',
      )
    } finally {
      setStatsLoading(false)
    }
  }


  const closeUser = () => {
    // Keep the modal open while a delete request is in progress.
    if (deletingUserId !== null) {
      return
    }

    setIsClosing(true)

    // Delay state cleanup so the closing animation can finish.
    setTimeout(() => {
      setSelectedUser(null)
      setSelectedUserStats(null)

      setStatsError('')
      setStatsLoading(false)

      setShowDeleteConfirm(false)
      setIsClosing(false)
    }, 250)
  }


  const handleDeleteUser = async () => {
    // A user must be selected before a delete request can be sent.
    if (!selectedUser) {
      return
    }

    setDeletingUserId(
      selectedUser.id,
    )

    setError('')

    try {
      // Request permanent deletion of the selected user account.
      await api.delete(
        `/admin/users/${selectedUser.id}`,
      )

      // Remove the deleted account from the local user list.
      setUsers(
        (currentUsers) =>
          currentUsers.filter(
            (user) =>
              user.id !==
              selectedUser.id,
          ),
      )

      setIsClosing(true)

      setTimeout(() => {
        setSelectedUser(null)
        setSelectedUserStats(null)

        setShowDeleteConfirm(false)
        setIsClosing(false)
      }, 250)
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        if (
          error.response?.status ===
          403
        ) {
          navigate('/movies')
          return
        }

        const detail =
          error.response?.data?.detail

        setError(
          typeof detail === 'string'
            ? detail
            : 'Could not delete user.',
        )

        return
      }

      setError(
        'Something went wrong.',
      )
    } finally {
      setDeletingUserId(null)
    }
  }


  // Calculate summary counts displayed at the top of the admin panel.
  const adminCount =
    users.filter(
      (user) =>
        user.role === 'admin',
    ).length


  const regularUserCount =
    users.filter(
      (user) =>
        user.role !== 'admin',
    ).length


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <p className="text-slate-400">
          Loading admin panel...
        </p>

      </div>
    )
  }


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_30%)]" />

        <div className="absolute right-[-180px] top-[18%] h-[500px] w-[500px] rounded-full bg-rose-700/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[18%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-3xl" />

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
              onClick={() =>
                navigate('/profile')
              }
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Profile
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
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">

        {/* Heading */}
        <div className="mb-10">

          <div className="mb-3 flex items-center gap-3">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Administration
            </p>


            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Admin only
            </span>

          </div>


          <h1 className="text-4xl font-black">
            Admin Panel
          </h1>


          <p className="mt-2 text-sm text-slate-400">
            View and manage MovieTracker user accounts.
          </p>

        </div>


        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Total users
            </p>

            <p className="mt-3 text-3xl font-black">
              {users.length}
            </p>

          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Regular users
            </p>

            <p className="mt-3 text-3xl font-black text-rose-400">
              {regularUserCount}
            </p>

          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Administrators
            </p>

            <p className="mt-3 text-3xl font-black text-amber-300">
              {adminCount}
            </p>

          </div>

        </div>


        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}


        {/* Users */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur">

          <div className="border-b border-slate-800 px-6 py-5">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              User management
            </p>


            <h2 className="mt-2 text-xl font-bold">
              Registered Users
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              View account details and user activity.
            </p>

          </div>


          {users.length === 0 ? (
            <div className="px-6 py-16 text-center">

              <p className="text-slate-400">
                No users found.
              </p>

            </div>
          ) : (
            <div className="divide-y divide-slate-800">

              {users.map((user) => {
                const isCurrentUser =
                  currentUser?.id ===
                  user.id


                return (
                  <div
                    key={user.id}
                    className="px-6 py-5 transition hover:bg-slate-950/40"
                  >

                    <div className="flex items-center justify-between gap-5">

                      {/* User info */}
                      <div className="flex min-w-0 items-center gap-4">

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-black ${
                            user.role ===
                            'admin'
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                              : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {user.username
                            .charAt(0)
                            .toUpperCase()}
                        </div>


                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <p className="font-bold text-white">
                              {
                                user.username
                              }
                            </p>


                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                user.role ===
                                'admin'
                                  ? 'bg-amber-500/10 text-amber-300'
                                  : 'bg-rose-500/10 text-rose-400'
                              }`}
                            >
                              {user.role}
                            </span>


                            {isCurrentUser && (
                              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                You
                              </span>
                            )}

                          </div>


                          <p className="mt-1 truncate text-sm text-slate-400">
                            {user.email}
                          </p>

                        </div>

                      </div>


                      {/* Details */}
                      <button
                        type="button"
                        onClick={() =>
                          openUser(user)
                        }
                        className="shrink-0 rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-rose-500 hover:bg-rose-500/10 hover:text-white"
                      >
                        Details
                      </button>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

        </section>

      </main>


      {/* User details modal */}
      {selectedUser && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm ${
            isClosing
              ? 'animate-[modalBackdropOut_250ms_ease-in_forwards]'
              : 'animate-[modalBackdropIn_300ms_ease-out]'
          }`}
          onClick={closeUser}
        >

          <div
            className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl ${
              isClosing
                ? 'animate-[modalOut_250ms_ease-in_forwards]'
                : 'animate-[modalIn_350ms_ease-out]'
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close */}
            <button
              type="button"
              onClick={closeUser}
              disabled={
                deletingUserId !== null
              }
              aria-label="Close user details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-xl text-white transition duration-200 hover:scale-110 hover:border-rose-500 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-600/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ×
            </button>


            {/* Modal header */}
            <div className="border-b border-slate-800 bg-slate-900/40 p-8">

              <div className="flex items-center gap-5">

                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border text-3xl font-black ${
                    selectedUser.role ===
                    'admin'
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {selectedUser.username
                    .charAt(0)
                    .toUpperCase()}
                </div>


                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="text-2xl font-black">
                      {
                        selectedUser.username
                      }
                    </h2>


                    {currentUser?.id ===
                      selectedUser.id && (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        You
                      </span>
                    )}

                  </div>


                  <p className="mt-1 text-sm text-slate-400">
                    {selectedUser.email}
                  </p>


                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedUser.role ===
                      'admin'
                        ? 'border border-amber-500/20 bg-amber-500/10 text-amber-300'
                        : 'border border-rose-500/20 bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {selectedUser.role ===
                    'admin'
                      ? 'Administrator'
                      : 'MovieTracker User'}
                  </span>

                </div>

              </div>

            </div>


            {/* Content */}
            <div className="p-8">

              {/* Account details */}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Account details
              </p>


              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Username
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    {
                      selectedUser.username
                    }
                  </p>

                </div>


                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </p>

                  <p
                    className={`mt-2 font-semibold capitalize ${
                      selectedUser.role ===
                      'admin'
                        ? 'text-amber-300'
                        : 'text-white'
                    }`}
                  >
                    {selectedUser.role}
                  </p>

                </div>


                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:col-span-2">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email address
                  </p>

                  <p className="mt-2 break-all font-semibold text-white">
                    {selectedUser.email}
                  </p>

                </div>


                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:col-span-2">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    User ID
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    #{selectedUser.id}
                  </p>

                </div>

              </div>


              {/* Movie activity */}
              <div className="mt-8 border-t border-slate-800 pt-8">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Movie activity
                </p>


                {statsLoading && (
                  <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center">

                    <p className="text-sm text-slate-400">
                      Loading user statistics...
                    </p>

                  </div>
                )}


                {statsError && (
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {statsError}
                  </div>
                )}


                {!statsLoading &&
                  !statsError &&
                  selectedUserStats && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">

                      {/* Favorite genre */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Favorite genre
                        </p>


                        <p className="mt-3 text-lg font-bold text-rose-400">
                          {selectedUserStats.favorite_genre ??
                            'No favorite yet'}
                        </p>

                      </div>


                      {/* Watchlist */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Watchlist
                        </p>


                        <div className="mt-3 flex items-end gap-2">

                          <p className="text-3xl font-black text-white">
                            {
                              selectedUserStats.watchlist_count
                            }
                          </p>


                          <p className="mb-1 text-xs text-slate-500">
                            {selectedUserStats.watchlist_count ===
                            1
                              ? 'movie to watch'
                              : 'movies to watch'}
                          </p>

                        </div>

                      </div>


                      {/* Watched */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Movies watched
                        </p>


                        <div className="mt-3 flex items-end gap-2">

                          <p className="text-3xl font-black text-white">
                            {
                              selectedUserStats.movies_watched
                            }
                          </p>


                          <p className="mb-1 text-xs text-slate-500">
                            watched
                          </p>

                        </div>

                      </div>


                      {/* Average rating */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Average rating
                        </p>


                        {selectedUserStats.average_rating !==
                        null ? (
                          <div className="mt-3 flex items-end gap-2">

                            <p className="text-3xl font-black text-amber-300">
                              ★{' '}
                              {selectedUserStats.average_rating.toFixed(
                                1,
                              )}
                            </p>


                            <p className="mb-1 text-xs text-slate-500">
                              / 10
                            </p>

                          </div>
                        ) : (
                          <p className="mt-3 text-sm font-medium text-slate-500">
                            No ratings yet
                          </p>
                        )}

                      </div>

                    </div>
                  )}

              </div>


              {/* Danger Zone */}
              {currentUser?.id !==
                selectedUser.id && (
                <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                    Danger zone
                  </p>


                  {!showDeleteConfirm ? (
                    <>

                      <h3 className="mt-3 font-bold text-white">
                        Delete account
                      </h3>


                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Permanently delete this user account and its personal tracking data.
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          setShowDeleteConfirm(
                            true,
                          )
                        }
                        className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/60 hover:bg-red-500/20"
                      >
                        Delete account
                      </button>

                    </>
                  ) : (
                    <>

                      <h3 className="mt-3 font-bold text-white">
                        Are you sure?
                      </h3>


                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        This will permanently delete{' '}
                        <span className="font-semibold text-white">
                          {
                            selectedUser.username
                          }
                        </span>
                        . This action cannot be undone.
                      </p>


                      <div className="mt-5 flex gap-3">

                        <button
                          type="button"
                          onClick={
                            handleDeleteUser
                          }
                          disabled={
                            deletingUserId !==
                            null
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingUserId !==
                          null
                            ? 'Deleting...'
                            : 'Delete user'}
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            setShowDeleteConfirm(
                              false,
                            )
                          }
                          disabled={
                            deletingUserId !==
                            null
                          }
                          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Cancel
                        </button>

                      </div>

                    </>
                  )}

                </div>
              )}


              {/* Current admin */}
              {currentUser?.id ===
                selectedUser.id && (
                <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

                  <p className="text-sm font-medium text-emerald-400">
                    This is your current administrator account.
                  </p>


                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    You cannot delete your own admin account.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


export default AdminPage

































