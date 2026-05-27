import { useState } from "react";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Menu from "../pages/menu";
import Checkout from "../pages/checkout";
import { CartProvider } from "../context/cartcontext";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-header">
          <h1>🍽️ Office Food Order App</h1>
          <p>Login or create an account to order food at your desk</p>
        </div>

        <div className="auth-container">
          <Signup />
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="app-page">
        <div className="app-header">
          <div>
            <h1>🍽️ Office Food Order App</h1>
            <p className="welcome-text">Welcome, {user.name}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <Menu />
        <hr />
        <Checkout />
      </div>
    </CartProvider>
  );
}

export default App;