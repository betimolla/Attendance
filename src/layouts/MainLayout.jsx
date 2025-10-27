import React from 'react'
import Header from './partials/Header'
import Footer from './partials/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="app-root min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  )
}
