import React from "react";
import { Link } from "react-router-dom"; 
import "./AllProducts.css";

const AllProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="all-products">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`} 
          className="product-card-link"
        >
          <div className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="category">{product.category}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllProducts;
