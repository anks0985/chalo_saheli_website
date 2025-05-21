import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-white px-5 md:px-12 py-5 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <img src="/assets/images/logo-main.png" alt="Chalo Saheli Logo" className="w-40 h-auto" />
      </div>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-8">
        <li><a href="#about" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">About Us</a></li>
        <li><a href="#destinations" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">Destinations</a></li>
        <li><a href="#community" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">Community</a></li>
        <li><a href="#safety" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">Safety</a></li>
        <li><a href="#stories" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">Stories</a></li>
        <li><a href="#contact" className="text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300">Contact</a></li>
      </ul>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <ul className="flex flex-col py-4">
            <li className="py-2"><a href="#about" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>About Us</a></li>
            <li className="py-2"><a href="#destinations" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>Destinations</a></li>
            <li className="py-2"><a href="#community" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>Community</a></li>
            <li className="py-2"><a href="#safety" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>Safety</a></li>
            <li className="py-2"><a href="#stories" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>Stories</a></li>
            <li className="py-2"><a href="#contact" className="block px-6 text-gray-800 font-medium hover:text-pink-600 transition-colors duration-300" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Header;