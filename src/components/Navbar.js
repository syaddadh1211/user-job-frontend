import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header class="header">
      <div class="mid">
        <ul class="navbar">
          <li>
            <Link to="/">Input User Sector</Link>
          </li>
          <li>
            <Link to="/result">Edit</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Navbar;
