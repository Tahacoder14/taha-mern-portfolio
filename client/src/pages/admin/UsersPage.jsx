import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiShield } from 'react-icons/fi';
import AdminLayout from '../admin/AdminLayout';
import api from '../../api/axiosInstance';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  // This function now uses the custom 'api' instance, which automatically adds the auth token
  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Could not fetch users. Access Denied.');
      console.error("Fetch Users Error:", error.response); // Log the full error for debugging
    }
  }, []);

  // useEffect now calls the stable fetchUsers function
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/api/users/${id}`); // Uses 'api'
        toast.success('User deleted.');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Deletion failed.');
      }
    }
  };
  
  const roleHandler = async (id) => {
     try {
        await api.put(`/api/users/${id}/role`); // Uses 'api'
        toast.success('User role updated.');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Role update failed.');
      }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-light-text">Manage Users</h1>
      <div className="bg-card-bg rounded-lg overflow-hidden">
        <table className="w-full text-left">
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
              <tr key={user._id} className="border-t border-gray-700">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.role === 0 ? 'bg-primary text-white' : 'bg-gray-600'}`}>
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
      </div>
    </AdminLayout>
  );
};
export default UsersPage;