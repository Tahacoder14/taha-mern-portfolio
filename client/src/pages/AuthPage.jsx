// client/src/pages/AuthPage.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthForm = ({ isLogin, onSubmit }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  return (
    <motion.form
      initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 font-mono w-full"
      noValidate
    >
      {!isLogin && (
        <div className="relative">
          <label className="text-sm text-gray-400">_username</label>
          <input {...register('name', { required: 'Username is required' })} className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
      )}
      <div className="relative">
        <label className="text-sm text-gray-400">_email</label>
        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div className="relative">
        <label className="text-sm text-gray-400">_password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full bg-primary py-3 rounded text-white font-bold hover:bg-primary-variant transition-colors shadow-lg">
        {isLogin ? 'execute_login()' : 'create_user()'}
      </button>
    </motion.form>
  );
};

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

const handleAuth = async (data) => {
  // THIS IS NOW CORRECT. It starts with /api.
  const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
  
  const loadingToast = toast.loading(`Executing command...`);
  try {
    // This will now correctly combine baseURL + endpoint
      ' https://your-backend.vercel.app + /api/auth/login'
    const { data: userData } = await api.post(endpoint, data);
      toast.dismiss(loadingToast);
      toast.success('Access Granted!');
      login(userData);
      if (userData.role === 0) { navigate('/admin'); } else { navigate('/'); }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Command failed.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center font-mono text-light-text p-4">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1e1e1e', color: '#e0e0e0' } }} />
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="w-full max-w-md bg-card-bg border border-gray-700 rounded-lg shadow-2xl p-8 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.h1 key={isLoginView ? 'loginTitle' : 'signupTitle'} /* ... */ className="text-2xl font-bold text-center text-primary mb-2">
            {isLoginView ? 'User Authentication' : 'Create New Account'}
            <span className="animate-ping ml-1">_</span>
          </motion.h1>
        </AnimatePresence>
        
        {/* THE CRITICAL FIX: The comment is now correctly inside braces */}
        <p className="text-center text-gray-400 mb-6 text-sm">{/* Ready for user input */}</p>

        <AnimatePresence mode="wait">
          <AuthForm key={isLoginView ? 'loginForm' : 'signupForm'} isLogin={isLoginView} onSubmit={handleAuth} />
        </AnimatePresence>

        <div className="mt-6 text-center text-sm">
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-primary hover:underline focus:outline-none">
            {isLoginView ? 'init_signup_process()' : 'return_to_login()'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;