import React, { useState } from "react";
import { useBank } from "../context/BankContext";

function Row({ tx }) {
  const date = tx?.date ? new Date(tx.date).toLocaleString() : "—";
  const type = tx?.type || "—";
  const counterparty = tx?.to || tx?.from || "—";
  const amount = typeof tx?.amount === "number" ? tx.amount : 0;

  // Color coding
  const isCredit = type === "deposit" || type === "credit";
  const isDebit = type === "withdraw" || type === "debit";

  return (
    <tr className="border-b text-sm">
      <td className="py-2">{date}</td>
      <td className="py-2 capitalize">{type}</td>
      <td className="py-2">{counterparty}</td>
      <td
        className={`py-2 font-semibold ${
          isCredit ? "text-green-600" : isDebit ? "text-red-600" : ""
        }`}
      >
        ₦{amount.toLocaleString()}
      </td>
    </tr>
  );
}

export default function Transactions() {
  const { current } = useBank();
  const txs = [...(current?.txns || [])].reverse();
  const balance = current?.balance || 0;

  // State for filter
  const [filter, setFilter] = useState("all");

  // Apply filter
  const filteredTxs = txs.filter((t) => {
    if (filter === "all") return true;
    if (filter === "deposit") return t.type === "deposit" || t.type === "credit";
    if (filter === "withdraw") return t.type === "withdraw" || t.type === "debit";
    if (filter === "transfer") return t.type === "debit" || t.type === "credit";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Balance Summary Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold">Available Balance</h2>
        <p className="text-3xl font-bold">₦{balance.toLocaleString()}</p>
        <p className="text-sm opacity-80 mt-1">{current?.accountNumber}</p>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-x-auto p-6 bg-white rounded-2xl shadow">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Transaction History</h1>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All</option>
            <option value="deposit">Deposits</option>
            <option value="withdraw">Withdrawals</option>
            <option value="transfer">Transfers</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead className="text-gray-600 text-sm border-b">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Counterparty</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxs.length > 0 ? (
              filteredTxs.map((t, i) => <Row key={i} tx={t} />)
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No transactions found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
