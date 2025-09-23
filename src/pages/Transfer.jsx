import React, { useState } from "react";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function Transfer() {
  const { transfer, current, genAccountNumber } = useBank();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const acct = genAccountNumber(to.trim());
    const value = parseFloat(amount);

    if (!acct) {
      setError("Please enter a valid recipient account number");
      return;
    }
    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid transfer amount greater than 0");
      return;
    }
    if (value > (current?.balance || 0)) {
      setError("Insufficient balance for this transfer");
      return;
    }
    if (acct === current?.accountNumber) {
      setError("You cannot transfer to your own account");
      return;
    }

    try {
      transfer(acct, value);
      setMsg(
        `Successfully sent ₦${value.toLocaleString()} to account ${acct} ✅`
      );
      setTo("");
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
      <h1 className="text-xl font-bold">Transfer</h1>

      <div>
        <label className="label block mb-1">Recipient Account Number</label>
        <input
          className="input w-full border rounded-lg px-3 py-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="e.g. 0801234567"
        />
      </div>

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
        Send
      </Button>
    </form>
  );
}
