// client/src/pages/admin/UsersPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../admin/AdminLayout';
import { FiTrash2, FiShield } from 'react-icons/fi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { userInfo } = useAuth();

  // useCallback ensures this function is stable and doesn't cause unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    // Prevent API call if userInfo or token is not yet available
    if (!userInfo || !userInfo.token) {
      console.log("User info not available yet. Skipping fetch.");
      return;
    }
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('/api/users', config);
      setUsers(data);
    } catch (error) {
      toast.error('Could not fetch users. Access denied.');
      console.error("Fetch Users Error:", error);
    }
  }, [userInfo]); // Dependency array: this function will be recreated only if userInfo changes
  
  // useEffect now simply calls the stable fetchUsers function
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- DELETE AND ROLE HANDLER FUNCTIONS ---
  // These also need the token to work!
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/users/${id}`, config);
        toast.success('User deleted.');
        fetchUsers(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Deletion failed.');
      }
    }
  };
  
  const roleHandler = async (id) => {
     try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.put(`/api/users/${id}/role`, {}, config);
        toast.success('User role updated.');
        fetchUsers(); // Refresh the list
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
              <th className="p-4">Actions</th>
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
                <td className="p-4 flex gap-4">
                  <button onClick={() => roleHandler(user._id)} title="Change Role" className="text-secondary-text hover:text-primary"><FiShield /></button>
                  <button onClick={() => deleteHandler(user._id)} title="Delete User" className="text-secondary-text hover:text-red-500"><FiTrash2 /></button>
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