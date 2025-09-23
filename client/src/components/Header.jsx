import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navLinks = ['home', 'about', 'skills', 'portfolio', 'contact'];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useAuth();

  // A helper function to close the menu, useful for NavLinks
  const closeMenu = () => setIsOpen(false);

  return (
    // The main header container. It blurs the background when the mobile menu is open.
    <header className={`fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-sm shadow-lg`}>
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer" onClick={closeMenu}>
            Taha.dev
          </ScrollLink>
        </h1>
        
        {/* --- DESKTOP MENU --- (Functionality unchanged) */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link} className="list-none capitalize font-medium text-light-text hover:text-primary transition-colors">
                <ScrollLink activeClass="text-primary" to={link} spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">{link}</ScrollLink>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-700"></div>

          {/* Desktop Auth Section */}
          <div className="flex items-center space-x-4">
            {userInfo ? (
              <>
                {userInfo.role === 0 && (
                  <RouterLink to="/admin" className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-variant transition-colors text-sm font-semibold">
                    <FiSettings />
                    <span>Admin</span>
                  </RouterLink>
                )}
                <div className="flex items-center gap-2 text-light-text">
                  <FiUser />
                  <span>{userInfo.name}</span>
                </div>
                <button onClick={logout} className="text-light-text hover:text-red-500 transition-colors" title="Logout">
                  <FiLogOut size={22} />
                </button>
              </>
            ) : (
              <RouterLink to="/login" className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-variant transition-colors">
                Login
              </RouterLink>
            )}
          </div>
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-light-text">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* --- RESPONSIVE MOBILE DROPDOWN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-700"
          >
            <ul className="flex flex-col items-center p-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link} className="w-full text-center list-none capitalize font-medium text-light-text hover:text-primary transition-colors">
                  <ScrollLink onClick={closeMenu} to={link} spy={true} smooth={true} offset={-70} duration={500}>{link}</ScrollLink>
                </li>
              ))}
              
              {/* Separator */}
              <li className="w-1/2 border-b border-gray-700 my-2"></li>

              {/* Mobile Auth Section */}
              {userInfo ? (
                <>
                  {userInfo.role === 0 && (
                     <li className="w-full list-none">
                        <RouterLink to="/admin" onClick={closeMenu} className="flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-variant transition-colors font-semibold">
                          <FiSettings />
                          <span>Admin Panel</span>
                        </RouterLink>
                      </li>
                  )}
                  <li className="w-full list-none flex items-center justify-center gap-2 text-light-text pt-2">
                    <FiUser />
                    <span>Logged in as {userInfo.name}</span>
                  </li>
                  <li className="w-full list-none">
                    <button onClick={() => { logout(); closeMenu(); }} className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold py-2">
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="w-full list-none">
                  <RouterLink to="/login" onClick={closeMenu} className="w-full text-center bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-variant transition-colors">
                    Login
                  </RouterLink>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;