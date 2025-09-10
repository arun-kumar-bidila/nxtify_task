import React, { useState, useEffect } from "react";
import AllProducts from "../components/AllProducts/AllProducts";
import "./CSS/DisplayProducts.css";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Apply search, sort, filter
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    })
    .filter((p) => {
      if (sortBy === "above20") return p.price > 20;
      if (sortBy === "above40") return p.price > 40;
      if (sortBy === "above60") return p.price > 60;
      return true;
    });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="products-page">
      {/* ✅ Sort buttons row */}
      <div className="top-controls">
        <label>Sort By: </label>
        <div className="sort-buttons">
          <button
            className={sortBy === "lowToHigh" ? "active" : ""}
            onClick={() => setSortBy("lowToHigh")}
          >
            Price: Low → High
          </button>
          <button
            className={sortBy === "highToLow" ? "active" : ""}
            onClick={() => setSortBy("highToLow")}
          >
            Price: High → Low
          </button>
          <button
            className={sortBy === "above20" ? "active" : ""}
            onClick={() => setSortBy("above20")}
          >
            Above 20
          </button>
          <button
            className={sortBy === "above40" ? "active" : ""}
            onClick={() => setSortBy("above40")}
          >
            Above 40
          </button>
          <button
            className={sortBy === "above60" ? "active" : ""}
            onClick={() => setSortBy("above60")}
          >
            Above 60
          </button>
        </div>
      </div>

      {/* ✅ Two-column layout */}
      <div className="products-layout">
        <div className="products-list">
          <AllProducts products={filteredProducts} />
        </div>

        <div className="sidebar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <h4>Filter by Category</h4>
            <ul>
              <li
                className={!categoryFilter ? "active" : ""}
                onClick={() => setCategoryFilter("")}
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={categoryFilter === cat ? "active" : ""}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;
