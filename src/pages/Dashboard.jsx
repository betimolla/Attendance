import React from 'react'
import MainLayout from '../layouts/MainLayout'

export default function Dashboard() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">Widget 1</div>
        <div className="p-4 bg-white rounded shadow">Widget 2</div>
        <div className="p-4 bg-white rounded shadow">Widget 3</div>
      </div>
    </MainLayout>
  )
}
