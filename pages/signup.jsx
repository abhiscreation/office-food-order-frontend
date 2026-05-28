import { useState } from "react";
import axios from "axios";

const Signup = ({ onAuthSuccess, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const completeAuth = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    onAuthSuccess?.(user);
    setUser?.(user);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      if (response.data.user) {
        completeAuth(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Kitchen service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="auth-card">
      <div className="card-header">
        <span className="card-icon">+</span>
        <div>
          <p className="eyebrow">New Employee</p>
          <h2>Create meal account</h2>
        </div>
      </div>

      {error && <div className="status-alert error">{error}</div>}

      <form className="auth-form" onSubmit={handleSignup}>
        <label className="field-group">
          <span>Employee name</span>
          <input
            className="field-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Avery Stone"
            required
          />
        </label>

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

        <button className="primary-action" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </article>
  );
};

export default Signup;
