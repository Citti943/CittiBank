import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function ForgotPassword() {
  const { users, updatePassword } = useBank();
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = set new password
  const [phone, setPhone] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const checkUser = (e) => {
    e.preventDefault();
    setMsg("");
    const user = users.find((u) => u.phone === phone.trim());
    if (!user) {
      setMsg("❌ No account found with this phone number.");
    } else {
      setStep(2);
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();
    try {
      updatePassword(phone.trim(), newPass);
      setMsg("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={checkUser} className="space-y-4">
          <div>
            <label className="label">Phone Number</label>
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              required
            />
          </div>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
          <Button className="w-full">Next</Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={resetPassword} className="space-y-4">
          <div>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              required
              minLength={4}
            />
          </div>
          {msg && <p className="text-sm text-green-600">{msg}</p>}
          <Button className="w-full">Reset Password</Button>
        </form>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        <Link to="/login" className="text-orange-500 hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
