import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async ({ username, password }) => {
    // Replace with real API call. For now accept any non-empty username.
    if (!username) throw new Error('username required')
    const fakeUser = { id: 1, name: username, role: 'admin' }
    setUser(fakeUser)
    return fakeUser
  }

  

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
