
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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

      
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>
  
      
      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/displayproducts" onClick={closeMenu}>
            Display Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/addproduct" onClick={closeMenu}>
            Add Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
