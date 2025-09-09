import React, { useState } from "react";
import Sort from "../components/sort/Sort";
import Search from "../components/search/Search";
import AllProducts from "../components/AllProducts/AllProducts";
import "./DisplayProducts.css";

const DisplayProducts = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Tablet", price: 700 },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  return (
    <div className="products-container">
      <h2>Products</h2>

      {/* ✅ Search & Sort in same row */}
      <div className="controls">
        <Search value={search} onChange={setSearch} />
        <Sort value={sortBy} onChange={setSortBy} />
      </div>

      <AllProducts products={filteredProducts} />
    </div>
  );
};

export default DisplayProducts;
