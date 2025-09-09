import React from "react";
import { useNavigate } from "react-router-dom";
import './CSS/HomePage.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Admin Panel</h1>
        <p>
          Manage your product inventory efficiently. Add, update, or view all products in one place.
        </p>
        <button onClick={() => navigate("/")}>See All Products</button>
      </div>
      <div className="home-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin Dashboard"
        />
      </div>
    </div>
  );
};

export default Home;
