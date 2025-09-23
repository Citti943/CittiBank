import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function Login() {
  const { register, login, genAccountNumber } = useBank();
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login({ phone, password });
      } else {
        await register({ name, phone, password });
      }
      nav("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const acct = phone ? genAccountNumber(phone) : "";

  return (
    <div className="max-w-md mx-auto mt-10 card p-6 shadow rounded-xl bg-white">
      {/* Toggle Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className={`flex-1 px-3 py-2 rounded-lg font-medium ${
            tab === "login"
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 px-3 py-2 rounded-lg font-medium ${
            tab === "register"
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        {tab === "register" && (
          <div>
            <label className="label">Full Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              required
            />
          </div>
        )}

        <div>
          <label className="label">Phone Number</label>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08012345678"
            required
          />
          {tab === "register" && acct && (
            <p className="text-xs text-gray-500 mt-1">
              Your account number will be: <b>{acct}</b>
            </p>
          )}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={4}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Submit Button */}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : tab === "login"
            ? "Login"
            : "Create Account"}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Demo only. Do not use real passwords.
      </p>
    </div>
  );
}
