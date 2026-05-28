import { useState } from "react";
import axios from "axios";

const Login = ({ onAuthSuccess, onLoginSuccess, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const completeAuth = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    onAuthSuccess?.(user);
    onLoginSuccess?.(user);
    setUser?.(user);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.user) {
        completeAuth(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="auth-card auth-card-accent">
      <div className="card-header">
        <span className="card-icon">#</span>
        <div>
          <p className="eyebrow">Employee Access</p>
          <h2>Sign in to order</h2>
        </div>
      </div>

      {error && <div className="status-alert error">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
        <label className="field-group">
          <span>Corporate email</span>
          <input
            className="field-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            required
          />
        </label>

        <label className="field-group">
          <span>Password</span>
          <input
            className="field-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />
        </label>

        <button className="primary-action cyan" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </article>
  );
};

export default Login;
