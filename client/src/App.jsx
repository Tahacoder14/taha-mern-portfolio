// client/src/App.jsx

import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import Pages
import PortfolioPage from '../src/pages/PortfolioPage';
import AuthPage from '../src/pages/AuthPage';

// Import Admin Pages from the correct new location
import ProjectsPage from '../src/pages/admin/ProjectsPage';
import UsersPage from '../src/pages/admin/UsersPage';
import AddProjectPage from '../src/pages/admin/AddProjectsPage';

// Import the Protected Route component
import ProtectedRoute from '../src/components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#1e1e1e', color: '#e0e0e0' } }} />
      
      {/* NO <Router> TAG HERE. Just <Routes> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<ProjectsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="add-project" element={<AddProjectPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;