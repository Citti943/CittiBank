import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BankProvider, useBank } from './context/BankContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function PrivateRoute({ children }) {
  const { session } = useBank()
  if (!session?.accountNumber) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BankProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-6xl mx-auto p-4 md:p-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
            <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
            <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
            <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BankProvider>
  )
}
