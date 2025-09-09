import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Search;
