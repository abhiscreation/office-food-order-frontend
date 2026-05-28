import { useState } from "react";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Menu from "../pages/menu";
import Checkout from "../pages/checkout";
import { CartProvider } from "../context/cartcontext";
import "./App.css";

const deskStats = [
  { label: "Avg desk ETA", value: "14 min", tone: "orange" },
  { label: "Open counters", value: "06", tone: "green" },
  { label: "Lunch offers", value: "3 live", tone: "red" },
];

const quickLinks = [
  "Breakfast",
  "Lunch boxes",
  "Snacks",
  "Beverages",
];

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="food-backdrop" />
        <main className="auth-shell">
          <section className="auth-intro">
            <div className="brand-lockup">
              <span className="brand-mark">OD</span>
              <div>
                <p className="eyebrow">OrbitDesk Meals</p>
                <h1>Cafeteria food delivered to every employee desk.</h1>
              </div>
            </div>

            <p className="intro-copy">
              Corporate meal ordering with the familiar feel of a modern food
              delivery app, built for office canteens and desk drops.
            </p>

            <div className="auth-stat-row" aria-label="Office meal status">
              {deskStats.map((stat) => (
                <div className={`metric metric-${stat.tone}`} key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="auth-forms" aria-label="Account access">
            <Signup onAuthSuccess={handleAuthSuccess} />
            <Login onAuthSuccess={handleAuthSuccess} />
          </section>
        </main>
      </div>
    );
  }

  const firstName = user.name?.split(" ")[0] || "Employee";

  return (
    <CartProvider>
      <div className="app-page">
        <header className="topbar">
          <div className="brand-lockup compact">
            <span className="brand-mark">OD</span>
            <div>
              <p className="eyebrow">Company cafeteria</p>
              <strong>DeskBite</strong>
            </div>
          </div>

          <div className="delivery-location">
            <span>Delivering to</span>
            <strong>Employee desk</strong>
          </div>

          <button className="ghost-action" onClick={handleLogout}>
            Sign out
          </button>
        </header>

        <main className="dashboard">
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">Welcome back, {firstName}</p>
              <h1>Order from the office canteen like your favorite food app.</h1>
              <p>
                Pick a counter, add meals, enter your desk number, and track the
                kitchen-to-desk delivery flow.
              </p>

              <div className="quick-links" aria-label="Popular categories">
                {quickLinks.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="delivery-card-visual">
                <div className="meal-photo-large">
                  <span className="dish-main" />
                  <span className="dish-side one" />
                  <span className="dish-side two" />
                </div>
                <div className="rider-ticket">
                  <span>Desk D-42</span>
                  <strong>Arriving in 14 min</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="status-strip" aria-label="Desk delivery metrics">
            {deskStats.map((stat) => (
              <div className={`status-card status-card-${stat.tone}`} key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </section>

          <div className="order-grid">
            <Menu />
            <Checkout />
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
