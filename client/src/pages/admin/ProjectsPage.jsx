// client/src/pages/admin/ProjectsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../admin/AdminLayout';
import toast from 'react-hot-toast';
import api from '../../api/axiosInstance';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);


  // This function uses the custom 'api' instance
  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get('/api/projects');
      setProjects(data.data);
    } catch (error) {
      toast.error('Could not fetch projects.');
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/api/projects/${id}`); // Correctly uses 'api'
        toast.success('Project deleted.');
        fetchProjects();
      } catch (error) {
        toast.error('Deletion failed.');
      }
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-light-text">Manage Projects</h1>
      <div className="bg-card-bg rounded-lg p-4">
        {projects.map(project => (
          <div key={project._id} className="flex justify-between items-center p-2 border-b border-gray-700">
            <span className="font-semibold">{project.title}</span>
            <button onClick={() => deleteHandler(project._id)} className="text-red-500 hover:text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;