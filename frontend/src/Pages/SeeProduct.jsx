import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item/Item";
import DeleteModal from "../components/Modals/DeleteModal/DeleteModal";
import EditModal from "../components/Modals/EditModal/EditModal";
import { useNavigate } from "react-router-dom";

const SeeProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      alert("Product deleted successfully");
      navigate("/displayproducts");
    } catch (err) {
      alert(err.message);
    }
    setShowDeleteModal(false);
  };

  const handleEditSave = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      setProduct(data);
      alert("Product updated successfully");
    } catch (err) {
      alert(err.message);
    }
    setShowEditModal(false);
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <>
    <div style={{width:"100%",minHeight:"calc(100vh - 75px)", background:"#f0fdf4"}}>
      <Item 
        product={product} 
        onDelete={() => setShowDeleteModal(true)} 
        onEdit={() => setShowEditModal(true)} 
      />
      {showDeleteModal && (
        <DeleteModal 
          message="Are you sure you want to delete this product?" 
          onConfirm={handleDelete} 
          onCancel={() => setShowDeleteModal(false)} 
        />
      )}

      {showEditModal && (
        <EditModal 
          product={product} 
          onSave={handleEditSave} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </div>
      

      
    </>
  );
};

export default SeeProduct;
