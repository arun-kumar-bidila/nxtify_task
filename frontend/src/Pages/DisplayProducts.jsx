import React, { useState, useEffect, useRef } from "react";
import AllProducts from "../components/AllProducts/AllProducts";
import CategorySelect from "../components/dropdown/CategorySelect";
import "./CSS/DisplayProducts.css";
import Search from "../components/search/Search";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const hasFetched = useRef(false);


  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);

      } catch (err) {
        setError(err.message);
        toast.error(` ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="loader"></div>;
  if (error) return <p style={{ color: "red" }}> {error}</p>;

  const categories = [...new Set(products.map((p) => p.category))];
  console.log(categories);

  return (
    <>
      <div className="continer-wrapper">
        <div className="main-content-wrapper">
          <div className="mobile-top-controls">
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
            </div>
            <CategorySelect setCategoryFilter={setCategoryFilter} />
            <Search value={search} onChange={setSearch} />
          </div>
          <div className="products-page">
            <div className="products-layout">
              <div className="products-list">
                <AllProducts products={filteredProducts} />
              </div>
            </div>
          </div>
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
    </>
  );
};

export default DisplayProducts;
