import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import api from '../services/api'
import type { User } from '../types/user'

function ProfilePage() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await api.get<User>('/users/me')
        setUser(response.data)
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          localStorage.removeItem('access_token')
          navigate('/login')
          return
        }

        setError('Could not load your profile.')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Movie
            <span className="text-rose-500">
              Tracker
            </span>
          </h1>

          <p className="mt-2 text-slate-400">
            Your profile
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-500">
                Username
              </p>

              <p className="mt-1 text-xl font-semibold">
                {user.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="mt-1 text-xl font-semibold">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Role
              </p>

              <p className="mt-1 text-xl font-semibold capitalize">
                {user.role}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 rounded-xl bg-rose-600 px-6 py-3 font-semibold transition hover:bg-rose-500"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfilePage



