import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'
import type { User } from '../types/user'

function ProfilePage() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get<User>('/users/me')
        setUser(response.data)
      } catch {
        localStorage.removeItem('access_token')
        navigate('/login')
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
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-6 text-3xl font-bold">Profile</h1>

        {user && (
          <div className="space-y-3">
            <p>
              <span className="text-slate-400">Username:</span>{' '}
              {user.username}
            </p>

            <p>
              <span className="text-slate-400">Email:</span>{' '}
              {user.email}
            </p>

            <p>
              <span className="text-slate-400">Role:</span>{' '}
              {user.role}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage



