import React from "react";

const Sort = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
    </select>
  );
};

export default Sort;
