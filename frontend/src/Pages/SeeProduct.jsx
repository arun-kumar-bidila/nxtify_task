import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item/Item";

const SeeProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return <Item product={product} />;
};

export default SeeProduct;
