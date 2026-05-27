import Menu from "../pages/menu";
import Checkout from "../pages/checkout";
import { CartProvider } from "../context/cartcontext";

function App() {
  return (
    <CartProvider>
      <div>
        <h1>🍽️ Office Food Order App</h1>

        <Menu />
        <Checkout />
      </div>
    </CartProvider>
  );
}

export default App;