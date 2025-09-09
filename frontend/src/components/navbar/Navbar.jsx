import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title">
        <p>Product Management System</p>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink to="/" end>
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
