import React from "react";
import "./Item.css";

const Item = ({ product, onDelete, onEdit }) => {
  if (!product) return null;

  return (
    <div className="item-container">
      {/* Left side: Image */}
      <div className="item-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Right side: Details */}
      <div className="item-details">
        <h2 className="item-name">{product.name}</h2>
        <p className="item-category"><span>Category:</span>{product.category}</p>
        <p className="item-price"><span>Price: </span>₹{product.price}</p>
        <p className="item-description">{product.description}</p>

        {/* Action buttons */}
        <div className="item-actions">
          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
