import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Attendance — Built with care
      </div>
    </footer>
  )
}
