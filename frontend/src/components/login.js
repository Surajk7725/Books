import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await login(formData);
      toast.success('Login successful!');
  
      const { role } = response;
  
      if (role === 'admin') 
        navigate('/admin/home');
      else if (role === 'staff') 
        navigate('/staff-home');
      else 
        navigate('/home');
    } catch (error) {
      setErrors({ general: error.message });
      toast.error(error.message);
    }
  };
  



  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">User Name
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            <a
              onClick={() => navigate('/forgot')}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer float-right"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <span className="block mt-2 text-sm text-gray-600 text-center">Not Registered? <a onClick={() => navigate('/signup')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">Create an Account</a></span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
