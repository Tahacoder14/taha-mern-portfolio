/**
 * @fileoverview ProjectsPage.jsx
 * The admin dashboard page for viewing and managing all portfolio projects.
 * It fetches project data from the backend and provides admin actions like deletion.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminLayout from '../../pages/admin/AdminLayout';
import api from '../../api/axiosInstance'; // <-- The key change: import our custom API instance
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetches all projects using our authenticated API instance.
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // The GET request for projects is public, but using 'api' is a good, consistent practice.
      const { data } = await api.get('https://taha-mern-portfolio.vercel.app/api/projects');
      setProjects(data.data);
    } catch (error) {
      toast.error('Could not fetch projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handles deleting a project using an authenticated request.
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await api.delete(`https://taha-mern-portfolio.vercel.app/api/projects/${id}`); // 'api' automatically adds the auth token
        toast.success('Project deleted successfully.');
        fetchProjects(); // Refresh the list after deletion
      } catch (error) {
        toast.error('Project deletion failed.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text">Manage Projects</h1>
        <Link to="/admin/add-project" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-variant transition-colors">
          Add New Project
        </Link>
      </div>
      <div className="bg-card-bg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-dark-bg">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center p-8">Loading Projects...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-8 text-secondary-text">No projects found. Add one!</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project._id} className="border-t border-gray-700 hover:bg-dark-bg">
                  <td className="p-4"><img src={project.imageUrl} alt={project.title} className="w-20 h-16 rounded-md object-cover" /></td>
                  <td className="p-4 font-semibold">{project.title}</td>
                  <td className="p-4">{project.category}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-4 justify-end">
                      <Link to={`/admin/edit-project/${project._id}`} title="Edit Project" className="text-secondary-text hover:text-primary"><FiEdit size={20} /></Link>
                      <button onClick={() => deleteHandler(project._id)} title="Delete Project" className="text-secondary-text hover:text-red-500"><FiTrash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;