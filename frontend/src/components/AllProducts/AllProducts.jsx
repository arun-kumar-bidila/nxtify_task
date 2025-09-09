import React from "react";
import Item from "../Item/Item";

const AllProducts = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? (
        products.map((p) => <Item key={p.id} product={p} />)
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default AllProducts;
