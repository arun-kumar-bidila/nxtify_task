import React from "react";
import "./Item.css"; // Optional, for styling individual item

const Item = ({ product }) => {
  if (!product) return null;

  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} className="item-image" />
      <div className="item-details">
        <h2 className="item-name">{product.name}</h2>
        <p className="item-category">Category: {product.category}</p>
        <p className="item-price">Price: ${product.price}</p>
        <p className="item-description">{product.description}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Item;
