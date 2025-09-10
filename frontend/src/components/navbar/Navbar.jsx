import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title">
        <img
          src="https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/logo_hnx91w.jpg"
          alt="Plantify Logo"
          className="nav-logo"
        />
        <p>Plantify</p>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/displayproducts">
            Display Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/addproduct">
            Add Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
