import React, { useState } from "react";
import { FaShoppingCart, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import "../App.css";
import { Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <h2 className="logo">SHOPPYGLOBE</h2>

            {/* Hamburger menu toggle */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Navigation links */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    <FaHome className="icon" /> Home
                </Link>
                <Link to="/Cart" onClick={() => setMenuOpen(false)}>
                    <FaShoppingCart className="icon" /> Cart
                </Link>
            </div>
        </nav>
    );
}

export default Header;
