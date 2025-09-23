/**
 * @fileoverview AdminLayout.jsx
 * A fully responsive layout component for the admin dashboard.
 * Features a collapsible sidebar on desktop and a fixed, toggleable overlay on mobile.
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FiGrid, FiUsers, FiLogOut, FiPlus, FiMenu, FiX, FiHome } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  // Sidebar is open by default on desktop, closed on mobile.
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Effect to handle window resizing for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); // Automatically close on small screens
      } else {
        setIsSidebarOpen(true); // Automatically open on large screens
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex font-sans text-light-text">
      {/* --- MOBILE OVERLAY --- */}
      {/* This dark overlay appears behind the sidebar on mobile when it's open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)} 
          className="md:hidden fixed inset-0 bg-black/60 z-20"
        ></div>
      )}

      {/* --- RESPONSIVE SIDEBAR --- */}
      <aside
        className={`fixed top-0 left-0 h-full bg-card-bg p-4 flex flex-col z-30 transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:relative md:translate-x-0 md:w-64`}
      >
        <div className="flex items-center justify-between mb-10 h-10">
          <span className="text-xl font-bold">Admin Panel</span>
          {/* This button is only visible on mobile to close the overlay menu */}
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-primary/20 md:hidden">
            <FiX />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-2 flex-grow">
          {/* NavLink items */}
          <NavLink to="/admin/projects" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiGrid size={20} /><span className="md:inline">Projects</span>
          </NavLink>
          <NavLink to="/admin/users" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiUsers size={20} /><span className="md:inline">Users</span>
          </NavLink>
          <NavLink to="/admin/add-project" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiPlus size={20} /><span className="md:inline">Add Project</span>
          </NavLink>
        </nav>
        
        <div className="flex flex-col space-y-2 border-t border-gray-700 pt-4">
          <Link to="/" className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/20">
            <FiHome size={20} /><span className="md:inline">View Site</span>
          </Link>
          <button onClick={handleLogout} className="flex w-full items-center gap-4 p-3 rounded-lg hover:bg-red-500/20 text-red-500">
            <FiLogOut size={20} /><span className="md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT & MOBILE HEADER --- */}
      <div className="flex-1 flex flex-col">
        {/* Mobile-only header with menu toggle button */}
        <header className="md:hidden p-4 bg-card-bg flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-primary/20">
            <FiMenu />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;