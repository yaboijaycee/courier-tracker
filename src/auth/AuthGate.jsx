import { useState } from "react";
import Login from "./Login.jsx";
import { getSession, clearSession } from "./authStore.js";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(getSession);

  if (!user) return <Login onLogin={setUser} />;

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <>
      <div className="auth-bar">
        <span>
          Signed in as <strong>{user}</strong>
        </span>
        <button onClick={logout}>Log out</button>
      </div>
      {children}
    </>
  );
}
