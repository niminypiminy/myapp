"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">Bit<span className="bg-blue-100 text-blue-900 py-1 px-2 rounded inline-block">law</span></Link>

        {/* Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/login" className="bg-blue-900 text-white hover:bg-blue-100 hover:text-blue-900 transition duration-300 py-2 px-4 rounded-full">
            Login
          </Link>
          <Link href="/signup" className="bg-blue-100 text-blue-900 hover:bg-blue-900 hover:text-blue-100 transition duration-300 py-2 px-4 rounded-full border border-darkgreen">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-md hover:bg-lightgreen transition-colors duration-300 focus:outline-none"
          >
            {isOpen ? 
              <FaTimes className="text-darkgreen h-5 w-5" /> : 
              <FaBars className="text-darkgreen h-5 w-5" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="py-2 space-y-1">
            <Link href="/login" onClick={toggleMenu} className="block px-4 py-2 text-sm text-darkgreen hover:bg-lightgreen hover:text-darkgreen">Login</Link>
            <Link href="/signup" onClick={toggleMenu} className="block px-4 py-2 text-sm text-darkgreen hover:bg-lightgreen hover:text-darkgreen">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;