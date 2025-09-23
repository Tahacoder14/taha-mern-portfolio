// client/src/pages/admin/AddProjectPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
// Corrected import path
import AdminLayout from '../../pages/admin/AdminLayout';
import { FiUploadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';
import api from '../../api/axiosInstance';

const AddProjectPage = () => {
  // --- ALL YOUR EXISTING FUNCTIONALITY REMAINS UNCHANGED ---
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const { userInfo } = useAuth();
  const [compressing, setCompressing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCompressing(true);
    toast.loading('Compressing image...');

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        setValue('imageUrl', base64data, { shouldValidate: true });
        setImagePreview(base64data);
        toast.dismiss();
        toast.success('Image ready for upload!');
      };
    } catch (error) {
      toast.dismiss();
      toast.error('Image compression failed.');
      console.error(error);
    } finally {
      setCompressing(false);
    }
  };

  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Adding new project...');
    try {
      // --- THIS SECTION REMAINS EXACTLY AS YOU PROVIDED IT ---
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.post('https://taha-mern-portfolio.vercel.app/api/projects', data, config);
      toast.dismiss(loadingToast);
      toast.success('Project added! It will now appear on your portfolio.');
      reset();
      setImagePreview('');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to add project.');
    }
  };

  // --- STYLING AND RESPONSIVE MODIFICATIONS START HERE ---
  return (
    <AdminLayout>
      {/* A container for the form for better styling */}
      <div className="bg-card-bg p-6 md:p-8 rounded-lg shadow-lg">
        {/* Responsive header with a bottom border */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-light-text border-b border-gray-700 pb-4">
          Add New Project
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          
          <div>
            <label className="block mb-2 text-secondary-text font-semibold">Project Image</label>
            {/* On mobile (default), stacks vertically. On small screens up (`sm:`), stacks horizontally. */}
            <div className="mt-2 flex flex-col sm:flex-row items-start gap-4">
              <label className="cursor-pointer bg-dark-bg p-6 rounded-lg w-full sm:w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-primary transition-colors text-center">
                <FiUploadCloud className="w-10 h-10 text-secondary-text mb-2" />
                <span className="text-sm text-light-text">{compressing ? 'Compressing...' : 'Click to Upload'}</span>
                <span className="text-xs text-secondary-text mt-1">PNG, JPG</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={compressing} />
              </label>
              {imagePreview && (
                <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <input {...register('imageUrl', { required: 'An image is required' })} type="hidden" />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl.message}</p>}
          </div>

          {/* Using a grid for better alignment on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block mb-2 text-secondary-text font-semibold">Title</label>
              <input {...register('title', { required: 'Title is required' })} className="w-full bg-dark-bg p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-secondary-text font-semibold">Description</label>
              <textarea {...register('description', { required: 'Description is required' })} rows="5" className="w-full bg-dark-bg p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-secondary-text font-semibold">Live URL (Optional)</label>
              <input {...register('liveUrl')} className="w-full bg-dark-bg p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block mb-2 text-secondary-text font-semibold">GitHub Repo URL (Optional)</label>
              <input {...register('repoUrl')} className="w-full bg-dark-bg p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-secondary-text font-semibold">Category</label>
              <select {...register('category', { required: 'Please select a category' })} className="w-full bg-dark-bg p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Website">Website</option>
                <option value="AI Agentic">AI Agentic</option>
                <option value="UI/UX">UI/UX</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <button type="submit" disabled={compressing} className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-variant transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
              {compressing ? 'Processing Image...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProjectPage;