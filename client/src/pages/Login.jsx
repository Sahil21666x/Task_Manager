import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../state/AuthContext.jsx"

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/app"

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get("email")
    const password = form.get("password")
    const res = await login(email, password)
    if (res.ok) navigate(from, { replace: true })
    else alert(res.error)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto h-10 w-10 rounded bg-brand" aria-hidden />
        <h1 className="mt-3 text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Sign in to manage your tasks</p>
      </div>
      <form onSubmit={handleSubmit} className="card p-6">
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" className="input" placeholder="••••••••" required />
          </div>
          <button disabled={loading} className="btn btn-primary">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        New here?{" "}
        <Link className="text-brand hover:underline" to="/register">
          Create an account
        </Link>
      </p>
    </div>
  )
}
