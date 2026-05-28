import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartcontext";

const demoMenu = [
  {
    _id: "demo-1",
    name: "Paneer Tikka Wrap",
    price: 149,
    category: "Lunch",
    signal: "12 min",
    vendor: "North counter",
    rating: "4.5",
    mealType: "Veg",
    imageTone: "wrap",
  },
  {
    _id: "demo-2",
    name: "Chicken Biryani Box",
    price: 219,
    category: "Lunch",
    signal: "16 min",
    vendor: "Biryani bay",
    rating: "4.7",
    mealType: "Non-veg",
    imageTone: "biryani",
  },
  {
    _id: "demo-3",
    name: "Veg Noodle Bowl",
    price: 179,
    category: "Fast lane",
    signal: "9 min",
    vendor: "Wok station",
    rating: "4.4",
    mealType: "Veg",
    imageTone: "noodles",
  },
  {
    _id: "demo-4",
    name: "Cold Brew Can",
    price: 99,
    category: "Beverages",
    signal: "3 min",
    vendor: "Cafe desk",
    rating: "4.3",
    mealType: "Drink",
    imageTone: "drink",
  },
  {
    _id: "demo-5",
    name: "Masala Dosa Combo",
    price: 139,
    category: "Breakfast",
    signal: "10 min",
    vendor: "South counter",
    rating: "4.6",
    mealType: "Veg",
    imageTone: "dosa",
  },
  {
    _id: "demo-6",
    name: "Samosa Chaat Bowl",
    price: 89,
    category: "Snacks",
    signal: "6 min",
    vendor: "Snack bar",
    rating: "4.2",
    mealType: "Veg",
    imageTone: "snack",
  },
];

const categories = ["All", "Breakfast", "Lunch", "Fast lane", "Snacks", "Beverages"];
const imageTones = ["wrap", "biryani", "noodles", "drink", "dosa", "snack"];

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        if (!isMounted) return;
        setMenu(Array.isArray(response.data) ? response.data : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!isMounted) return;
        setMenu(demoMenu);
        setStatus("demo");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddItem = (item) => {
    addItem({
      ...item,
      price: Number(item.price) || 0,
      category: item.category || "Office meal",
    });
  };

  const visibleMenu = status === "loading" ? [] : menu;
  const enrichedMenu = visibleMenu.map((item, index) => ({
    ...item,
    category: item.category || "Lunch",
    signal: item.signal || "12 min",
    vendor: item.vendor || "Office canteen",
    rating: item.rating || "4.3",
    mealType: item.mealType || "Meal",
    imageTone: item.imageTone || imageTones[index % imageTones.length],
  }));
  const filteredMenu =
    activeCategory === "All"
      ? enrichedMenu
      : enrichedMenu.filter((item) => item.category === activeCategory);

  return (
    <section className="panel menu-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Office cafeteria</p>
          <h2>What are you craving?</h2>
        </div>
        <span className={`status-pill ${status}`}>
          {status === "loading" ? "Syncing" : status === "demo" ? "Demo menu" : "Live menu"}
        </span>
      </div>

      <div className="search-strip" role="search">
        <span>Search meals, snacks, drinks</span>
        <strong>Desk delivery</strong>
      </div>

      <div className="category-tabs" aria-label="Meal categories">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "active" : ""}
            type="button"
            aria-pressed={activeCategory === category}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="menu-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="menu-card skeleton-card" key={item}>
              <span />
              <strong />
              <p />
            </div>
          ))}
        </div>
      )}

      {status !== "loading" && enrichedMenu.length === 0 && (
        <div className="empty-state">
          <strong>No meals listed</strong>
          <span>The kitchen has not published a menu yet.</span>
        </div>
      )}

      {status !== "loading" && enrichedMenu.length > 0 && filteredMenu.length === 0 && (
        <div className="empty-state">
          <strong>No items here yet</strong>
          <span>Try another cafeteria category.</span>
        </div>
      )}

      {filteredMenu.length > 0 && (
        <div className="menu-grid">
          {filteredMenu.map((item) => {
            const price = Number(item.price) || 0;
            const key = item._id || item.id || item.name;

            return (
              <article className="menu-card" key={key}>
                <div className={`meal-photo meal-photo-${item.imageTone}`}>
                  <span />
                </div>
                <div className="meal-topline">
                  <span>{item.category || "Office meal"}</span>
                  <strong>{item.mealType}</strong>
                </div>
                <h3>{item.name}</h3>
                <div className="meal-meta">
                  <span>{item.vendor}</span>
                  <span>{item.rating} rating</span>
                  <span>{item.signal}</span>
                </div>
                <p>INR {price.toLocaleString("en-IN")}</p>
                <button className="add-action" onClick={() => handleAddItem(item)}>
                  Add
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
