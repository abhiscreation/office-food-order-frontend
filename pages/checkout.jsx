import { useContext, useMemo, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/cartcontext";

const deliverySteps = [
  "Cart confirmed",
  "Kitchen preparing",
  "Runner pickup",
  "Delivered to employee desk",
];

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [desk, setDesk] = useState("");
  const [status, setStatus] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderState, setOrderState] = useState("idle");
  const [lastDesk, setLastDesk] = useState("");

  const cartSummary = useMemo(() => {
    const summary = new Map();

    cart.forEach((item) => {
      const key = item._id || item.id || item.name;
      const current = summary.get(key) || { ...item, quantity: 0 };
      summary.set(key, { ...current, quantity: current.quantity + 1 });
    });

    return Array.from(summary.values());
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const placeOrder = async () => {
    if (!cart.length) {
      setStatus("Add at least one meal before checkout.");
      setOrderState("idle");
      return;
    }

    if (!desk.trim()) {
      setStatus("Desk number is required.");
      setOrderState("idle");
      return;
    }

    setPlacing(true);
    setStatus("");
    setOrderState("placing");

    try {
      const destinationDesk = desk.trim();

      await axios.post("http://localhost:5000/orders", {
        items: cart,
        desk: destinationDesk,
      });

      setStatus("Order sent to the kitchen. Delivery is on the way.");
      setOrderState("sent");
      setLastDesk(destinationDesk);
      setDesk("");
      clearCart();
    } catch {
      setStatus("Order could not be sent. The kitchen service is offline.");
      setOrderState("error");
    } finally {
      setPlacing(false);
    }
  };

  const activeStep = orderState === "sent" ? 1 : cart.length ? 0 : -1;
  const displayedDesk = desk.trim() || lastDesk || "Add employee desk number";

  return (
    <section className="panel checkout-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Checkout</p>
          <h2>Deliver to desk</h2>
        </div>
        <span className="cart-count">{cart.length}</span>
      </div>

      <div className="delivery-summary">
        <span>Drop point</span>
        <strong>{displayedDesk}</strong>
      </div>

      <div className="cart-list">
        {cartSummary.length === 0 ? (
          <div className="empty-state compact">
            <strong>No meals added</strong>
            <span>Your desk cart is empty.</span>
          </div>
        ) : (
          cartSummary.map((item) => (
            <div className="cart-row" key={item._id || item.id || item.name}>
              <div>
                <strong>{item.name}</strong>
                <span>Qty {item.quantity}</span>
              </div>
              <p>INR {(Number(item.price) * item.quantity).toLocaleString("en-IN")}</p>
            </div>
          ))
        )}
      </div>

      <label className="field-group checkout-field">
        <span>Desk number</span>
        <input
          className="field-input"
          placeholder="Desk D-42"
          value={desk}
          onChange={(event) => setDesk(event.target.value)}
        />
      </label>

      <div className="total-row">
        <span>Order total</span>
        <strong>INR {total.toLocaleString("en-IN")}</strong>
      </div>

      <div className="delivery-steps" aria-label="Desk delivery steps">
        {deliverySteps.map((step, index) => (
          <div
            className={`delivery-step ${index <= activeStep ? "active" : ""}`}
            key={step}
          >
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      {status && <div className="status-alert">{status}</div>}

      <div className="checkout-actions">
        <button
          className="primary-action"
          onClick={placeOrder}
          disabled={placing || cart.length === 0}
        >
          {placing ? "Sending..." : "Place order"}
        </button>
        <button className="ghost-action subtle" onClick={clearCart} disabled={cart.length === 0}>
          Clear
        </button>
      </div>
    </section>
  );
}
