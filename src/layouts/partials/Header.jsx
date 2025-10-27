import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Attendance
        </Link>
        <nav>
          <Link to="/admin/login" className="mr-4 hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
