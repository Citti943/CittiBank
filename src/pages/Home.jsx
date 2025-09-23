import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [salary, setSalary] = useState(50000)
  const eligible = salary >= 50000 ? '₦' + (salary*2).toLocaleString() : 'NO'

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="p-6">
            <h1 className="text-4xl font-bold leading-tight">Unlock a world of <span className="text-orange-600">possibility</span> just for you!</h1>
            <p className="text-gray-600 mt-4">Experience a sleek banking interface and manage your money on-the-go. Fast transfers, smart savings and instant access.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-orange-600 text-white">Get Started</Link>
              <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-gray-100">Dashboard</Link>
            </div>
          </div>
          <div className="p-6">
            <div className="card">
              <img src="/assets/calculator.jpg " alt="app" className="w-full h-56 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold">Payday Loan Calculator</h3>
              <p className="text-sm text-gray-600 mt-2">Quick estimate for instant loans.</p>
              <div className="mt-4 space-y-3">
                <label className="label">What's your monthly salary?</label>
                <input type="range" min="10000" max="1000000" step="5000" value={salary} onChange={e=>setSalary(Number(e.target.value))} />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">₦{salary.toLocaleString()}</div>
                  <div className="text-sm font-semibold">Eligible loan amount: <span className="text-orange-600">{eligible}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold">Online Banking</h3>
          <p className="text-sm text-gray-600 mt-2">Manage accounts, pay bills and transfer seamlessly.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Mobile App</h3>
          <p className="text-sm text-gray-600 mt-2">Bank from anywhere with our mobile app.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Business Solutions</h3>
          <p className="text-sm text-gray-600 mt-2">Tailored for SMEs and corporations.</p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <img src="/assets/images.jpeg" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
          <h4 className="font-semibold">Savings</h4>
          <p className="text-sm text-gray-600">Start a savings plan that works for you.</p>
        </div>
        <div className="card">
          <img src="/assets/atm.jpg" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
          <h4 className="font-semibold">Cards</h4>
          <p className="text-sm text-gray-600">Get virtual and physical cards instantly.</p>
        </div>
        <div className="card">
          <img src="/assets/loan.jpg" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
          <h4 className="font-semibold">Loans</h4>
          <p className="text-sm text-gray-600">Flexible loan options for your needs.</p>
        </div>
      </section>
    </div>
  )
}
