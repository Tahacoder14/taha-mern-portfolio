// client/src/pages/admin/UsersPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiShield } from 'react-icons/fi';
import AdminLayout from '../../pages/admin/AdminLayout';
import api from '../../api/axiosInstance';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetches all users from a protected endpoint.
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Could not fetch users. Access Denied.');
    } finally {
      setLoading(false);
    }
  }, []); // The dependency array is empty because it has no external dependencies

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handler for deleting a user.
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/api/users/${id}`);
        toast.success('User deleted.');
        fetchUsers(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Deletion failed.');
      }
    }
  };
  
  // Handler for updating a user's role.
  const roleHandler = async (id) => {
     try {
        await api.put(`/api/users/${id}/role`);
        toast.success('User role updated.');
        fetchUsers(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Role update failed.');
      }
  };

  // --- THE JSX RETURN STATEMENT (NOW CORRECTLY PLACED) ---
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
            {loading ? (
              <tr><td colSpan="4" className="text-center p-8">Loading Users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-8 text-secondary-text">No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="border-t border-gray-700 hover:bg-dark-bg">
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}; // <-- THE COMPONENT FUNCTION'S CLOSING BRACE IS HERE, CORRECTLY WRAPPING THE RETURN.

export default UsersPage;