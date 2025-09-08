// client/src/pages/admin/AdminLayout.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
// --- THE FIX IS ON THIS LINE ---
import { FiGrid, FiUsers, FiLogOut, FiPlus, FiMenu, FiChevronsLeft, FiHome, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth(); // You were not using userInfo here, so it's removed for cleaner code
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarVariants = {
    open: { width: '16rem', transition: { type: 'spring', stiffness: 200, damping: 25 } },
    closed: { width: '5rem', transition: { type: 'spring', stiffness: 200, damping: 25 } },
  };

  const textVariants = {
    open: { opacity: 1, x: 0, transition: { delay: 0.15 } },
    closed: { opacity: 0, x: -10 },
  };

  return (
    <div className="min-h-screen bg-dark-bg flex font-sans text-light-text">
      <motion.aside
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="bg-card-bg p-4 flex flex-col relative"
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="absolute -right-3 top-8 bg-primary text-white p-1.5 rounded-full z-20"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarOpen ? <FiChevronsLeft /> : <FiMenu />}
        </button>

        <div className="flex items-center gap-3 mb-10 h-10">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div variants={textVariants} initial="closed" animate="open" exit="closed" className="flex items-center gap-3">
                <FiShield size={24} className="text-primary" />
                <span className="text-xl font-bold">Admin Panel</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex flex-col space-y-2 flex-grow">
          <NavLink to="/admin/projects" className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiGrid size={20} />
            <AnimatePresence>{isSidebarOpen && <motion.span variants={textVariants} initial="closed" animate="open" exit="closed">Projects</motion.span>}</AnimatePresence>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiUsers size={20} />
            <AnimatePresence>{isSidebarOpen && <motion.span variants={textVariants} initial="closed" animate="open" exit="closed">Users</motion.span>}</AnimatePresence>
          </NavLink>
          <NavLink to="/admin/add-project" className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <FiPlus size={20} />
            <AnimatePresence>{isSidebarOpen && <motion.span variants={textVariants} initial="closed" animate="open" exit="closed">Add Project</motion.span>}</AnimatePresence>
          </NavLink>
        </nav>
        
        <div className="flex flex-col space-y-2 border-t border-gray-700 pt-4">
            <Link to="/" className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/20">
                <FiHome size={20} />
                <AnimatePresence>{isSidebarOpen && <motion.span variants={textVariants} initial="closed" animate="open" exit="closed">View Site</motion.span>}</AnimatePresence>
            </Link>
            <button onClick={handleLogout} className="flex w-full items-center gap-4 p-3 rounded-lg hover:bg-red-500/20 text-red-500">
                <FiLogOut size={20} />
                <AnimatePresence>{isSidebarOpen && <motion.span variants={textVariants} initial="closed" animate="open" exit="closed">Logout</motion.span>}</AnimatePresence>
            </button>
        </div>
      </motion.aside>

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;