import React, { useState } from "react";
import "./CSS/AddProduct.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const categories = [
    "Plants",
    "Seeds",
    "Accessories",
    "Gardening",
    "Pebbles",
    "Soil",
    "Fertilizers",
    "Pots",
    "Flowers",
    "Others",
  ];

  const defaultImages = {
    Seeds: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/seeds2_fe0yjf.jpg",
    Accessories: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490699/tool1_ylexby.jpg",
    Gardening: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/happy_gardening4_aevxo3.jpg",
    Pebbles: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490699/pebbles_svnvu5.jpg",
    Soil: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757491228/soil_vjasfl.jpg",
    Fertilizers: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490699/accessories_zufntx.jpg",
    Pots: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/pot1_rkszcw.jpg",
    Flowers: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757490699/flowerbulbs_dkllzy.jpg",
    Others: "https://res.cloudinary.com/duoenlwuj/image/upload/v1757491228/tree7_qf1tkq.jpg",
  };

 
  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price || price <= 0) newErrors.price = "Enter a valid price";
    if (!category) newErrors.category = "Please select a category";
    if (!description.trim() || description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    
    Object.values(newErrors).forEach((err) => toast.error(err));

    return Object.keys(newErrors).length === 0;
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let imageUrl = defaultImages[category] || defaultImages["Others"];

    if (imageFile) {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_PRESET}`);

      try {
        const res = await fetch(
          `${process.env.REACT_APP_CLOUDINARY_URL}`,
          {
            method: "POST",
            body: data,
          }
        );
        const uploadRes = await res.json();
        if (uploadRes.secure_url) {
          imageUrl = uploadRes.secure_url;
        }
      } catch (err) {
        toast.error("Cloudinary upload failed!");
        console.error("Cloudinary upload failed", err);
      }
    }

    const productData = { name, price, category, description, image: imageUrl };

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImageFile(null);
        setPreview(null);
        setErrors({});
        navigate("/displayproducts");
      } else {
        toast.error("Error adding product");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p className="error-text">{errors.price}</p>}

          {/* Category */}
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
            {errors.category && (
              <p className="error-text">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}

          {/* Image Upload */}
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="note">* Image upload is optional</p>

            {/* Preview */}
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
