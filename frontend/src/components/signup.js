import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      await axiosInstance.post('/auth/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Registration failed' });
      }
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-transparent rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Sign Up</h2>
        {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">Full Name
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              placeholder="Enter your full name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">User Name
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Enter your user name"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-sm">Already have an account? </span>
            <a onClick={() => navigate('/login')} className="text-blue-500 hover:text-blue-800 cursor-pointer">Log In</a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
