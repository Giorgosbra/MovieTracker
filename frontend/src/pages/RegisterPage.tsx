import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import AuthLayout from '../components/AuthLayout'
import api from '../services/api'
import type { RegisterData, User } from '../types/user'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      await api.post<User>('/auth/register', formData)
      navigate('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail || 'Registration failed',
        )
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout showShowcase>
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Create your account
          </h2>

          <p className="mt-2 text-slate-400">
            Start building your personal movie collection.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  username: event.target.value,
                })
              }
              required
              placeholder="Choose a username"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              }
              required
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-7 text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-rose-400 transition hover:text-rose-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage



























