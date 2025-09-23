import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import Pages with correct relative paths
import PortfolioPage from './pages/PortfolioPage';
import AuthPage from './pages/AuthPage';

// Import Admin Pages
import ProjectsPage from './pages/admin/ProjectsPage';
import UsersPage from './pages/admin/UsersPage';
import AddProjectPage from './pages/admin/AddProjectsPage';

// Import the Protected Route component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
     <div className="overflow-x-hidden">
      <Toaster>
        position="top-center"
        toastOptions={{
          style: { background: '#1e1e1e', color: '#e0e0e0' }}}
      </Toaster>
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

        {/* Catch all route for 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl">404 - Page Not Found</h1>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;