import React from 'react'

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium shadow bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:opacity-95 ${className}`}
    >
      {children}
    </button>
  )
}
