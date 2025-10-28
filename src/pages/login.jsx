import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../component/backButton'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Hardcoded session admin credentials
  const correctUsername = 'sessionadmin'
  const correctPassword = '54321'

  const handleLogin = () => {
    if (username === correctUsername && password === correctPassword) {
      navigate('/sessionAdmin') // go to session admin page
    } else {
      alert('Invalid session admin credentials!')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Session Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="bg-yellow-400 text-black py-2 rounded px-4  hover:bg-yellow-500 transition w- font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  )
}