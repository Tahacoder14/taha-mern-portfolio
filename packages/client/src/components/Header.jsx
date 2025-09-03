// client/src/components/Header.jsx

import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext'; // <-- Use our global auth state

const navLinks = ['home', 'about', 'skills', 'portfolio', 'contact'];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useAuth(); // <-- Get user info and logout function

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-sm shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
            Taha.dev
          </ScrollLink>
        </h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link} className="list-none capitalize font-medium text-light-text hover:text-primary transition-colors">
              <ScrollLink activeClass="text-primary" to={link} spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">{link}</ScrollLink>
            </li>
          ))}

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {userInfo ? (
              <>
                {userInfo.role === 0 && ( // Admin Button
                  <RouterLink to="/admin" className="flex items-center gap-2 bg-primary-variant text-white py-2 px-4 rounded-full hover:bg-primary transition-colors">
                    <FiSettings />
                    <span>Admin</span>
                  </RouterLink>
                )}
                <div className="flex items-center gap-2 text-light-text">
                  <FiUser />
                  <span>{userInfo.name}</span>
                </div>
                <button onClick={logout} className="text-light-text hover:text-primary transition-colors">
                  <FiLogOut size={24} />
                </button>
              </>
            ) : (
              <RouterLink to="/login" className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-variant transition-colors">
                Login
              </RouterLink>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (unchanged) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}</button>
        </div>
      </nav>

      {/* Mobile Dropdown (simplified - you can add auth logic here too if needed) */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden px-6 pb-4">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link} className="list-none capitalize font-medium text-light-text hover:text-primary"><ScrollLink onClick={() => setIsOpen(false)} to={link} spy={true} smooth={true} offset={-70} duration={500}>{link}</ScrollLink></li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Header;