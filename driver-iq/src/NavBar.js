import React from 'react';
import './NavBar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      
        <h1>DriverIQ</h1>
        <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/chapters">Chapters</a></li>
        <li><a href="/">Logout</a></li>
  </ul>
    </nav>
  );
};

export default Navbar;