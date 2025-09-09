import React from "react";

const Item = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", margin: "8px", padding: "10px" }}>
      <h4>{product.name}</h4>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Item;
