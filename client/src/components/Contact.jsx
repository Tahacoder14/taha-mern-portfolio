// client/src/components/Contact.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Use our global auth state

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { userInfo } = useAuth(); // <-- Get user info directly from context

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await axios.post('http://localhost:5000/api/contact', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.h2 /* ... h2 animation ... */ >Let's Build Something Amazing</motion.h2>
        <motion.p /* ... p animation ... */ >Have a project idea or just want to chat? Fill out the form below.</motion.p>
        
        {userInfo ? (
          // USER IS LOGGED IN: Show the contact form
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* ... Your form inputs and button ... */}
            <div className="relative">
              <input {...register('name', { required: 'Name is required' })} placeholder="Your Name" className="w-full bg-dark-bg p-4 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none"/>
            </div>
            <div className="relative">
              <input {...register('email', { required: 'Email is required' })} placeholder="Your Email" className="w-full bg-dark-bg p-4 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none"/>
            </div>
            <div className="relative">
              <textarea {...register('message', { required: 'Message is required' })} placeholder="Your Message" rows="5" className="w-full bg-dark-bg p-4 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none"></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-variant disabled:bg-gray-500">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && <p className="text-green-500 mt-4">Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="text-red-500 mt-4">Something went wrong.</p>}
          </motion.form>
        ) : (
          // USER IS LOGGED OUT: Show the login prompt
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 p-8 bg-card-bg rounded-lg"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Please Log In</h3>
            <p className="text-secondary-text mb-6">You need to be logged in to send a message.</p>
            <RouterLink to="/login" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-variant transition-colors">
              Go to Login
            </RouterLink>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;