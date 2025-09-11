import React, { useState, useEffect, useRef } from "react";
import "./EditModal.css";

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

const categories = Object.keys(defaultImages);


const EditModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: ""
  });
  const [selectedFile, setSelectedFile] = useState(null); 
  const [preview, setPreview] = useState(""); 
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); 

  useEffect(() => {
    if (product) {
      setFormData(product);
      setPreview(product.image || "");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryClick = (cat) => {
    setFormData(prev => ({ ...prev, category: cat }));
    if (!preview) setPreview(defaultImages[cat]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = preview;

    if (selectedFile) {
      const formDataCloud = new FormData();
      formDataCloud.append("file", selectedFile);
      formDataCloud.append("upload_preset",`${process.env.REACT_APP_CLOUDINARY_PRESET}`);

      try {
        const res = await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
          method: "POST",
          body: formDataCloud
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (err) {
        alert("Image upload failed!");
        console.error(err);
      }
    }

    if (!imageUrl) {
      imageUrl = defaultImages[formData.category] || defaultImages["Others"];
    }

    onSave({ ...formData, image: imageUrl });
    setUploading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content edit-modal">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                type="button"
                key={cat}
                className={formData.category === cat ? "active" : ""}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows="4"
            required
          />

          <label>Image</label>
          <div className="image-preview-container">
            {preview && (
              <div className="image-preview-wrapper">
                <img src={preview} alt="Preview" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                  X
                </button>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={uploading}>
              Save Changes
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
