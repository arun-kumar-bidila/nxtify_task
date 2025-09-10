import { useState } from "react";
import "./CategorySelect.css";

const CategorySelect = ({setCategoryFilter}) => {
  const categories = [
    "All",
    "Fertilizers",
    "Pebbles",
    "Gardening",
    "Accessories",
    "Seeds",
    "Plants",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="category-select">
      <select
        id="category"
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat==="All"?"":cat}>
            {cat}
          </option>
        ))}
      </select>


    </div>
  );
};

export default CategorySelect;
