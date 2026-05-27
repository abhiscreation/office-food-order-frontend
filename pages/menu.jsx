import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartcontext";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:5000/menu")
      .then(res => setMenu(res.data));
  }, []);

  return (
    <div>
      <h2>Menu</h2>

      {menu.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button onClick={() => addItem(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
