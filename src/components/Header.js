import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav>
      <div className="nav-logo">
        <img src="/assets/images/logo-main.png" alt="Chalo Saheli Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#about">About Us</a></li>
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#community">Community</a></li>
        <li><a href="#safety">Safety</a></li>
        <li><a href="#stories">Stories</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
export default Header;