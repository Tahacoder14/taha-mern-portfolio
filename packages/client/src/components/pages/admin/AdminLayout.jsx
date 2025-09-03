// client/src/components/admin/AdminLayout.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiLogOut, FiPlus } from 'react-icons/fi';
import { useAuth } from '../..';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-dark-bg flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-card-bg p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-primary mb-12">Admin Panel</h1>
        <nav className="flex flex-col space-y-4 flex-grow">
          <NavLink to="/admin/projects" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
            <FiGrid />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
            <FiUsers />
            <span>Users</span>
          </NavLink>
          <NavLink to="/admin/add-project" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
            <FiPlus />
            <span>Add Project</span>
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;