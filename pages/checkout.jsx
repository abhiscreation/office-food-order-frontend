import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/cartcontext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [desk, setDesk] = useState("");

  const placeOrder = async () => {
    const order = {
      items: cart,
      desk: desk,
    };

    await axios.post("http://localhost:5000/orders", order);

    alert("✅ Order placed successfully!");
    clearCart();
  };

  return (
    <div>
      <h2>Checkout</h2>

      <h3>Items:</h3>
      {cart.map((item, i) => (
        <p key={i}>{item.name} - ₹{item.price}</p>
      ))}

      <input
        placeholder="Enter Desk Number"
        value={desk}
        onChange={(e) => setDesk(e.target.value)}
      />

      <br /><br />

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
``