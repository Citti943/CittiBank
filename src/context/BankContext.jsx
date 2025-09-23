import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY_ACCOUNTS = "nb_accounts_v2";
const KEY_SESSION = "nb_session_v2";

const BankContext = createContext(null);

function genAccountNumber(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits.slice(-10).padStart(10, "0");
}

export function BankProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY_ACCOUNTS)) || {};
    } catch {
      return {};
    }
  });

  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY_SESSION)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY_ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(KEY_SESSION, JSON.stringify(session));
  }, [session]);

  const current = session?.accountNumber ? accounts[session.accountNumber] : null;

  const register = ({ name, phone, password }) => {
    const acct = genAccountNumber(phone);
    if (accounts[acct]) throw new Error("Account already exists for this number");
    const next = {
      ...accounts,
      [acct]: { name, phone, password, balance: 0, txns: [] },
    };
    setAccounts(next);
    setSession({ accountNumber: acct });
    return acct;
  };

  const login = ({ phone, password }) => {
    const acct = genAccountNumber(phone);
    const user = accounts[acct];
    if (!user || user.password !== password) throw new Error("Invalid credentials");
    setSession({ accountNumber: acct });
    return acct;
  };

  const logout = () => setSession(null);

  const deposit = (amount) => {
    const acct = session?.accountNumber;
    if (!acct) throw new Error("Not logged in");
    if (amount <= 0) throw new Error("Amount must be positive");

    setAccounts((prev) => {
      const user = prev[acct];
      return {
        ...prev,
        [acct]: {
          ...user,
          balance: (user.balance || 0) + amount,
          txns: [...(user.txns || []), { type: "deposit", amount, date: new Date().toISOString() }],
        },
      };
    });
  };

  const withdraw = (amount) => {
    const acct = session?.accountNumber;
    if (!acct) throw new Error("Not logged in");
    if (amount <= 0) throw new Error("Amount must be positive");

    setAccounts((prev) => {
      const user = prev[acct];
      if ((user.balance || 0) < amount) throw new Error("Insufficient funds");
      return {
        ...prev,
        [acct]: {
          ...user,
          balance: user.balance - amount,
          txns: [...(user.txns || []), { type: "withdraw", amount, date: new Date().toISOString() }],
        },
      };
    });
  };

  const transfer = (toAcct, amount) => {
    const from = session?.accountNumber;
    if (!from) throw new Error("Not logged in");
    if (!accounts[toAcct]) throw new Error("Destination account not found");
    if (amount <= 0) throw new Error("Amount must be positive");

    setAccounts((prev) => {
      const fromUser = prev[from];
      if ((fromUser.balance || 0) < amount) throw new Error("Insufficient funds");

      const toUser = prev[toAcct];
      return {
        ...prev,
        [from]: {
          ...fromUser,
          balance: fromUser.balance - amount,
          txns: [...(fromUser.txns || []), { type: "debit", to: toAcct, amount, date: new Date().toISOString() }],
        },
        [toAcct]: {
          ...toUser,
          balance: (toUser.balance || 0) + amount,
          txns: [...(toUser.txns || []), { type: "credit", from, amount, date: new Date().toISOString() }],
        },
      };
    });
  };

  const updatePassword = (phone, newPass) => {
    const acct = genAccountNumber(phone);
    if (!accounts[acct]) throw new Error("User not found");
    setAccounts((prev) => ({
      ...prev,
      [acct]: { ...prev[acct], password: newPass },
    }));
  };

  const value = useMemo(
    () => ({
      accounts,
      users: Object.values(accounts),
      session,
      current,
      register,
      login,
      logout,
      deposit,
      withdraw,
      transfer,
      updatePassword,
      genAccountNumber,
    }),
    [accounts, session]
  );

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used within BankProvider");
  return ctx;
}
