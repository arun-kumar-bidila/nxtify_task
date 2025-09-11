import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../components/Item/Item";
import DeleteModal from "../components/Modals/DeleteModal/DeleteModal";
import EditModal from "../components/Modals/EditModal/EditModal";
import { toast } from "react-toastify";


const API_URL = process.env.REACT_APP_API_URL
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
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      toast.success("Product deleted successfully");
      navigate("/displayproducts");
    } catch (err) {
      toast.error(`${err.message}`);
    }
    setShowDeleteModal(false);
  };

  const handleEditSave = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      setProduct(data);
      toast.success("Product updated successfully");
    } catch (err) {
      toast.error(`${err.message}`);
    }
    setShowEditModal(false);
  };

 if (loading) return <div className="loader"></div>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ width: "100%", minHeight: "calc(100vh - 75px)", background: "#f0fdf4" }}>
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
  );
};

export default SeeProduct;
