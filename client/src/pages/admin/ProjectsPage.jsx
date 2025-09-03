// client/src/pages/admin/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../admin/AdminLayout';
import toast from 'react-hot-toast';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const { userInfo } = useAuth();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data.data);
    } catch (error) {
      toast.error('Could not fetch projects.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/projects/${id}`, config);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Delete failed.');
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