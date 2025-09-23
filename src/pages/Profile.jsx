import React, { useState } from "react";
import Button from "../components/Button";
import { useBank } from "../context/BankContext";

export default function Profile() {
  const { current, session, updateProfile } = useBank(); // assume updateProfile exists in context
  const [name, setName] = useState(current?.name || "");
  const [phone] = useState(current?.phone || "");
  const acct = session?.accountNumber || "";
  const [msg, setMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMsg("Full name cannot be empty.");
      return;
    }
    try {
      updateProfile({ name }); // update just the name in context
      setMsg("✅ Profile updated successfully.");
    } catch (err) {
      setMsg("❌ Failed to update profile.");
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-md mx-auto card space-y-4 p-6 bg-white rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold text-center">My Profile</h1>

      {/* Account Info */}
      <div>
        <label className="label">Account Number</label>
        <input className="input" value={acct} disabled />
      </div>

      {/* Editable Name */}
      <div>
        <label className="label">Full Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Locked Phone */}
      <div>
        <label className="label">Phone</label>
        <input className="input" value={phone} disabled />
      </div>

      {/* Message */}
      {msg && (
        <p
          className={`text-sm ${
            msg.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}

      {/* Save Button */}
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
