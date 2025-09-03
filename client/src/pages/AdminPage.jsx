// client/src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Dummy components for now, you would flesh these out
const ProjectManager = ({ projects, onDelete }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Projects</h2>
        {/* You would map over projects here and display them in a table */}
        {projects.map(p => <div key={p._id} className="bg-card-bg p-2 my-2 rounded flex justify-between"><span>{p.title}</span><button onClick={() => onDelete(p._id)} className="text-red-500">Delete</button></div>)}
    </div>
);

const UserManager = ({ users, onDelete }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Users</h2>
        {/* You would map over users here */}
        {users.map(u => <div key={u._id} className="bg-card-bg p-2 my-2 rounded flex justify-between"><span>{u.email}</span><button onClick={() => onDelete(u._id)} className="text-red-500">Delete</button></div>)}
    </div>
);


const AdminPage = () => {
    const [view, setView] = useState('projects'); // 'projects' or 'users'
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Authorization check
    useEffect(() => {
        if (!userInfo || userInfo.role !== 0) {
            toast.error("Access Denied. Admins only.");
            navigate('/login');
        }
    }, [navigate, userInfo]);
    
    // Data fetching
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
        axios.get('http://localhost:5000/api/projects', config).then(res => setProjects(res.data.data));
        axios.get('http://localhost:5000/api/users', config).then(res => setUsers(res.data));
    }, [userInfo?.token]);
    
    const handleDeleteProject = async (id) => { /* ... API call to delete project ... */ };
    const handleDeleteUser = async (id) => { /* ... API call to delete user ... */ };
    
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-dark-bg text-light-text p-8 font-sans">
            <Toaster />
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-600 py-2 px-4 rounded">Logout</button>
                </div>
                
                <div className="flex space-x-4 mb-8 border-b border-gray-700">
                    <button onClick={() => setView('projects')} className={`py-2 px-4 ${view === 'projects' && 'border-b-2 border-primary'}`}>Projects</button>
                    <button onClick={() => setView('users')} className={`py-2 px-4 ${view === 'users' && 'border-b-2 border-primary'}`}>Users</button>
                </div>
                
                <div>
                    {view === 'projects' ? <ProjectManager projects={projects} onDelete={handleDeleteProject} /> : <UserManager users={users} onDelete={handleDeleteUser} />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;