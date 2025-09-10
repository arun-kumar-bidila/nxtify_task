import React from "react";
import { useNavigate } from "react-router-dom";
import './CSS/HomePage.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Plantify 🌿</h1>
        <p className="home-description">
          Plantify is your personalized platform to manage all your products with ease.  
          Keep track of your plants, add new items, and organize everything in one place with a refreshing green touch.  
        </p>
        <button className="home-btn" onClick={() => navigate("/displayproducts")}>
          Explore Products
        </button>
      </div>
      <div className="home-image">
        <img
          src="https://res.cloudinary.com/duoenlwuj/image/upload/v1757482664/tree1_ab0xdb.jpg"
          alt="Plantify Dashboard"
        />
      </div>
    </div>
  );
};

export default Home;
