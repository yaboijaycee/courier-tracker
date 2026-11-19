import { useState } from "react";
import { login, register } from "./authStore.js";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSignup && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const name = isSignup
        ? await register(username, password)
        : await login(username, password);
      onLogin(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(isSignup ? "login" : "signup");
    setError("");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card form" onSubmit={submit}>
        <h1>📦 Courier Tracker</h1>
        <h2>{isSignup ? "Create account" : "Log in"}</h2>

        <label>
          Username
          <input
            autoFocus
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {isSignup && (
          <label>
            Confirm password
            <input
              required
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        )}

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="primary" disabled={busy}>
          {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
        <button type="button" className="auth-link" onClick={switchMode}>
          {isSignup ? "Already have an account? Log in" : "No account? Sign up"}
        </button>

        {!isSignup && (
          <p className="auth-hint">
            Demo account: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        )}
      </form>
    </div>
  );
}
