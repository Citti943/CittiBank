import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'
import { useBank } from '../context/BankContext'

export default function Navbar() {
  const { session, current, logout } = useBank()
  const nav = useNavigate()
  const active = ({ isActive }) => isActive ? 'text-gray-900 font-semibold' : 'text-gray-700'

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">CB</div>
          <div className="text-lg font-bold">CittiBank</div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/dashboard" className={active}>Dashboard</NavLink>
          <NavLink to="/transactions" className={active}>Transactions</NavLink>
          <NavLink to="/transfer" className={active}>Transfer</NavLink>
          <NavLink to="/deposit" className={active}>Deposit</NavLink>
          <NavLink to="/withdraw" className={active}>Withdraw</NavLink>
          <NavLink to="/profile" className={active}>Profile</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {!session?.accountNumber ? (
            <Button onClick={() => nav('/login')} className="bg-white text-orange-600 border border-orange-300 hover:bg-orange-50">Login</Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 hidden sm:block">{current?.name || current?.phone} • {session.accountNumber}</div>
              <Button className="bg-gray-800" onClick={() => { logout(); nav('/') }}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
