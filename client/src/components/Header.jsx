import React from "react";
import { useAuth } from "../state/AuthContext.jsx"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-brand" aria-hidden />
          <h1 className="text-lg font-semibold tracking-tight text-gray-900">Task Manager</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && <span className="text-sm text-gray-600">Hi, {user.name}</span>}
          <button onClick={logout} className="btn btn-outline ">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
