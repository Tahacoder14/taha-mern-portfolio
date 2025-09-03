/**
 * @fileoverview AuthPage.jsx
 * A single, animated page for user login and registration.
 * Features a "developer terminal" theme and slides between Login and Signup views.
 * Uses Framer Motion for animations, React Hook Form for validation, and React Hot Toast for notifications.
 * Integrates with AuthContext for global state management.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // The key to global state

/**
 * A reusable, animated form component for both login and signup.
 * @param {boolean} isLogin - Determines if the form is for login or signup.
 * @param {function} onSubmit - The function to call when the form is submitted.
 */
const AuthForm = ({ isLogin, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    // The form itself is a motion component for enter/exit animations
    <motion.form
      initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 font-mono w-full"
      noValidate // Disable default browser validation to use our own
    >
      {/* Conditionally render the "name" field only for the signup form */}
      {!isLogin && (
        <div className="relative">
          <label className="text-sm text-gray-400">_username</label>
          <input
            {...register('name', { required: 'Username is required' })}
            className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
      )}

      <div className="relative">
        <label className="text-sm text-gray-400">_email</label>
        <input
          type="email" // Use type="email" for semantic HTML and mobile keyboards
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format"
            }
          })}
          className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="relative">
        <label className="text-sm text-gray-400">_password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="w-full bg-gray-900 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-primary py-3 rounded text-white font-bold hover:bg-primary-variant transition-colors shadow-lg"
      >
        {isLogin ? 'execute_login()' : 'create_user()'}
      </button>
    </motion.form>
  );
};

/**
 * The main page component that holds the state and logic for authentication.
 */
const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth(); // Use the global login function from our context
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handles form submission for both login and signup
  const handleAuth = async (data) => {
    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    const loadingToast = toast.loading(`Executing command...`);
    
    try {
        const response = await axios.post(endpoint, data);
      const userData = response.data;
      
      toast.dismiss(loadingToast);
      toast.success('Access Granted!');
      
      // STEP 1: Update the global state with the user data via the context
      login(userData);

      // STEP 2: Handle the navigation from within this page component
      if (userData.role === 0) {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      toast.dismiss(loadingToast);
      // Display the specific error message from the backend, or a generic one
      toast.error(error.response?.data?.message || 'Command failed. Please check your credentials or server status.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center font-mono text-light-text p-4">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1e1e1e', color: '#e0e0e0' } }} />
      
      {/* This main container uses the `layout` prop to animate its size when the content changes */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="w-full max-w-md bg-card-bg border border-gray-700 rounded-lg shadow-2xl p-8 overflow-hidden"
      >
        {/* AnimatePresence allows components to animate out when they're removed from the React tree. */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={isLoginView ? 'loginTitle' : 'signupTitle'} // A unique key tells AnimatePresence to trigger animations
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-center text-primary mb-2"
          >
            {isLoginView ? 'User Authentication' : 'Create New Account'}
            <span className="animate-ping ml-1">_</span>
          </motion.h1>
        </AnimatePresence>
        <p className="text-center text-gray-400 mb-6 text-sm">// Ready for user input</p>

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