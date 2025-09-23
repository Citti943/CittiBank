import React from 'react'

export default function Footer(){ 
  return (
    <footer className="bg-gradient-to-tr from-slate-800 to-slate-900 text-white mt-8">
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold text-lg">CittiBank</h4>
          <p className="text-sm text-slate-300 mt-2">Home for your assets and finance.</p>
        </div>
        <div>
          <h5 className="font-semibold">Products</h5>
          <ul className="mt-2 text-sm text-slate-300 space-y-1">
            <li>Savings</li>
            <li>Current</li>
            <li>Business</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Support</h5>
          <ul className="mt-2 text-sm text-slate-300 space-y-1">
            <li>Help center</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Legal</h5>
          <ul className="mt-2 text-sm text-slate-300 space-y-1">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto p-4 text-sm text-slate-400">© {new Date().getFullYear()} NovaBank — Demo. Not for production.</div>
      </div>
    </footer>
  )
}
