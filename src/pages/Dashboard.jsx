import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function Dashboard() {
  const { current, session } = useBank(); // re-renders on account/session change

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
        <Link to="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  const acctNo = session?.accountNumber || "—";
  const balance = current.balance || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, {current.name} 👋
        </h1>

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm mb-2">Account Number</h2>
            <p className="text-xl font-semibold">{acctNo}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm mb-2">Account Balance</h2>
            <p className="text-2xl font-bold text-green-600">
              ₦{balance.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm mb-2">Phone</h2>
            <p className="text-xl font-semibold">{current.phone}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/deposit">
            <div className="bg-green-100 p-6 rounded-2xl text-center hover:bg-green-200 transition">
              <p className="font-medium text-green-800">Deposit</p>
            </div>
          </Link>
          <Link to="/withdraw">
            <div className="bg-red-100 p-6 rounded-2xl text-center hover:bg-red-200 transition">
              <p className="font-medium text-red-800">Withdraw</p>
            </div>
          </Link>
          <Link to="/transfer">
            <div className="bg-blue-100 p-6 rounded-2xl text-center hover:bg-blue-200 transition">
              <p className="font-medium text-blue-800">Transfer</p>
            </div>
          </Link>
          <Link to="/transactions">
            <div className="bg-yellow-100 p-6 rounded-2xl text-center hover:bg-yellow-200 transition">
              <p className="font-medium text-yellow-800">Transactions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
