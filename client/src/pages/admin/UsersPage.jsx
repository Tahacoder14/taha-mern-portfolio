// client/src/pages/admin/UsersPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiShield } from 'react-icons/fi';
import AdminLayout from '../../pages/admin/AdminLayout';
import api from '../../api/axiosInstance';

const UsersPage = () => {
  // --- ALL YOUR EXISTING FUNCTIONALITY REMAINS UNCHANGED ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('https://taha-mern-portfolio.vercel.app/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Could not fetch users. Access Denied.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`https://taha-mern-portfolio.vercel.app/api/users/${id}`);
        toast.success('User deleted.');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Deletion failed.');
      }
    }
  };
  
  const roleHandler = async (id) => {
     try {
        await api.put(`https://taha-mern-portfolio.vercel.app/api/users/${id}/role`);
        toast.success('User role updated.');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Role update failed.');
      }
  };

  // --- STYLING AND RESPONSIVE MODIFICATIONS START HERE ---
  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-light-text">Manage Users</h1>
      <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <p className="text-center p-8 text-secondary-text">Loading Users...</p>
        ) : !users || users.length === 0 ? (
          <p className="text-center p-8 text-secondary-text">No users found.</p>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden">
              <div className="space-y-4 p-4">
                {users.map(user => (
                  <div key={user._id} className="bg-dark-bg p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-light-text break-all">{user.name}</h3>
                        <p className="text-sm text-secondary-text break-all">{user.email}</p>
                      </div>
                      <span className={`flex-shrink-0 ml-2 px-2 py-1 rounded-full text-xs font-semibold ${user.role === 0 ? 'bg-primary text-white' : 'bg-gray-600'}`}>
                        {user.role === 0 ? 'Admin' : 'User'}
                      </span>
                    </div>
                    <div className="flex gap-4 justify-end mt-4 pt-4 border-t border-gray-700">
                      <button onClick={() => roleHandler(user._id)} title="Change Role" className="text-secondary-text hover:text-primary"><FiShield size={18} /></button>
                      <button onClick={() => deleteHandler(user._id)} title="Delete User" className="text-secondary-text hover:text-red-500"><FiTrash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <table className="hidden md:table w-full text-left">
              <thead className="bg-dark-bg">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t border-gray-700 hover:bg-dark-bg/50">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 0 ? 'bg-primary text-white' : 'bg-gray-600 text-light-text'}`}>
                        {user.role === 0 ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-4 justify-end">
                        <button onClick={() => roleHandler(user._id)} title="Change Role" className="text-secondary-text hover:text-primary"><FiShield size={20} /></button>
                        <button onClick={() => deleteHandler(user._id)} title="Delete User" className="text-secondary-text hover:text-red-500"><FiTrash2 size={20} /></button>
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

export default UsersPage;