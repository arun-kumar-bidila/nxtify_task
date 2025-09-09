import React, { useState } from "react";
import "./CSS/AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Expanded categories
  const categories = [
    "Clothing",
    "Appliances",
    "Essentials",
    "Electronics",
    "Furniture",
    "Footwear",
    "Accessories",
    "Beauty",
    "Sports",
    "Others",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl =
      "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/default.jpg"; // fallback default image

    if (imageFile) {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "your_unsigned_preset");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const uploadRes = await res.json();
        imageUrl = uploadRes.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed", err);
      }
    }

    const productData = { name, price, category, description, image: imageUrl };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImageFile(null);
      } else {
        alert("❌ Error adding product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="category-section">
          <label>Category:</label>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={category === cat ? "selected" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
