import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found.</p>
      <Link to="/" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Go Home</Link>
    </div>
  )
}
