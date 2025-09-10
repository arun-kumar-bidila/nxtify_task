// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="nav-title">
//         <img
//           src="https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/logo_hnx91w.jpg"
//           alt="Plantify Logo"
//           className="nav-logo"
//         />
//         <p>Plantify</p>
//       </div>
//       <ul className="desktop-view nav-menu ">
//         <li>
//           <NavLink to="/" end>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/displayproducts">
//             Display Products
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/addproduct">
//             Add Product
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // menu & close icons
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar">
      {/* Logo + Title */}
      <div className="nav-title">
        <img
          src="https://res.cloudinary.com/duoenlwuj/image/upload/v1757490700/logo_hnx91w.jpg"
          alt="Plantify Logo"
          className="nav-logo"
        />
        <p>Plantify</p>
      </div>

      {/* Menu Icon (only visible in mobile/tablet) */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>
  
      {/* Nav Menu */}
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
