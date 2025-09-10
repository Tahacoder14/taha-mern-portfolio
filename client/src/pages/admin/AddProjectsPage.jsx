// client/src/pages/admin/AddProjectPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../admin/AdminLayout';
import { FiUploadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';
import api from '../../api/axiosInstance';

const AddProjectPage = () => {
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
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.post('/api/projects', data, config);
      toast.dismiss(loadingToast);
      toast.success('Project added! It will now appear on your portfolio.');
      reset();
      setImagePreview('');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to add project.');
    }
  };

  return (
    // The entire component is wrapped in the AdminLayout, which acts as the single parent element.
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-light-text">Add New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6" noValidate>
        
        <div>
          <label className="block mb-2 text-secondary-text">Project Image</label>
          <div className="mt-2 flex items-center gap-4">
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />}
            <label className="cursor-pointer bg-card-bg p-6 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-primary transition-colors text-center">
              <FiUploadCloud className="w-10 h-10 text-secondary-text mb-2" />
              <span className="text-sm text-light-text">{compressing ? 'Compressing...' : 'Click to Upload'}</span>
              <span className="text-xs text-secondary-text">PNG, JPG, JPEG</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={compressing} />
            </label>
          </div>
          <input {...register('imageUrl', { required: 'An image is required' })} type="hidden" />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-secondary-text">Title</label>
          <input {...register('title', { required: 'Title is required' })} className="w-full bg-card-bg p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-secondary-text">Description</label>
          <textarea {...register('description', { required: 'Description is required' })} rows="4" className="w-full bg-card-bg p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-secondary-text">Live URL (Optional)</label>
          <input {...register('liveUrl')} className="w-full bg-card-bg p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block mb-2 text-secondary-text">GitHub Repo URL (Optional)</label>
          <input {...register('repoUrl')} className="w-full bg-card-bg p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block mb-2 text-secondary-text">Category</label>
          <select {...register('category', { required: 'Please select a category' })} className="w-full bg-card-bg p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="Website">Website</option>
            <option value="AI Agentic">AI Agentic</option>
            <option value="UI/UX">UI/UX</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <button type="submit" disabled={compressing} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-variant transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
          {compressing ? 'Processing Image...' : 'Add Project'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddProjectPage;