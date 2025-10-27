import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function SessionAdmin() {
  const { user, logout } = useAuth()

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Session Admin</h2>
        <div>
          <span className="mr-4">{user?.name}</span>
          <button className="text-sm text-red-600" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/admin/session/dashboard" className="text-blue-600 underline">
          Open Dashboard
        </Link>
      </div>
    </MainLayout>
  )
}
