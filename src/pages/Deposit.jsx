import React, { useState } from "react";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function Deposit() {
  const { deposit } = useBank();
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    try {
      deposit(value);
      setMsg(`₦${value.toLocaleString()} deposited successfully 🎉`);
      setAmount("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto card space-y-3 p-6 bg-white rounded-2xl shadow"
    >
      <h1 className="text-xl font-bold">Deposit</h1>

      <div>
        <label className="label block mb-1">Amount</label>
        <input
          className="input w-full border rounded-lg px-3 py-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
        />
      </div>

      {msg && <p className="text-sm text-green-600">{msg}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" type="submit">
        Deposit
      </Button>
    </form>
  );
}
