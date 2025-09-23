// client/src/pages/admin/ProjectsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminLayout from '../../pages/admin/AdminLayout';
import api from '../../api/axiosInstance';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ProjectsPage = () => {
  // --- All your existing functionality remains unchanged ---
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
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

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await api.delete(`https://taha-mern-portfolio.vercel.app/api/projects/${id}`);
        toast.success('Project deleted successfully.');
        fetchProjects();
      } catch (error) {
        toast.error('Project deletion failed.');
      }
    }
  };

  // --- STYLING AND RESPONSIVE MODIFICATIONS START HERE ---
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-light-text">Manage Projects</h1>
        <Link to="/admin/add-project" className="w-full sm:w-auto text-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-variant transition-colors">
          Add New Project
        </Link>
      </div>

      <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <p className="text-center p-8 text-secondary-text">Loading Projects...</p>
        ) : !projects || projects.length === 0 ? (
          <p className="text-center p-8 text-secondary-text">No projects found. Click "Add New Project" to get started!</p>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden">
              <div className="space-y-4 p-4">
                {projects.map(project => (
                  <div key={project._id} className="bg-dark-bg p-4 rounded-lg flex gap-4 items-center">
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-light-text truncate">{project.title}</h3>
                      <p className="text-sm text-secondary-text">{project.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link to={`/admin/edit-project/${project._id}`} title="Edit" className="text-secondary-text hover:text-primary p-2"><FiEdit size={18} /></Link>
                      <button onClick={() => deleteHandler(project._id)} title="Delete" className="text-secondary-text hover:text-red-500 p-2"><FiTrash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
                       {/* Desktop Table View */}
            <table className="hidden md:table w-full text-left">
              <thead className="bg-dark-bg">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project._id} className="border-t border-gray-700 hover:bg-dark-bg/50">
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
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;