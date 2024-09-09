import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    lengthValid: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === 'password') validatePassword(value);
    if (id === 'username') validateUsername(value);
  };

  const validateUsername = (username) => {
    const newErrors = { ...errors };

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (/\s/.test(username)) {
      newErrors.username = 'Username cannot contain spaces';
    } else {
      delete newErrors.username;
    }

    setErrors(newErrors);
  };

  const validatePassword = (password) => {
    const validation = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      lengthValid: password.length >= 7 && password.length <= 14,
    };

    setPasswordValidation(validation);

    const newErrors = { ...errors };
    const isPasswordValid = Object.values(validation).every(Boolean); 

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isPasswordValid) {
      newErrors.password = 'Password is not valid';
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await login(formData);
      toast.success('Login successful!');

      const { role } = response;

      if (role === 'admin') navigate('/admin/home');
      else if (role === 'staff') navigate('/staff-home');
      else navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Check if password meets all validation criteria
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : 'border-green-500'}`}
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-green-500'}`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
            )}

            {/* Display validation criteria only if password is not fully valid */}
            {!isPasswordValid && (
              <ul className="text-xs mt-1">
                <li className={passwordValidation.hasUpperCase ? 'text-green-500' : 'text-red-500'}>
                  Must contain at least one uppercase letter (A-Z)
                </li>
                <li className={passwordValidation.hasLowerCase ? 'text-green-500' : 'text-red-500'}>
                  Must contain at least one lowercase letter (a-z)
                </li>
                <li className={passwordValidation.hasNumber ? 'text-green-500' : 'text-red-500'}>
                  Must contain at least one number (0-9)
                </li>
                <li className={passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-red-500'}>
                  Must contain at least one special character (!@#$%^&*)
                </li>
                <li className={passwordValidation.lengthValid ? 'text-green-500' : 'text-red-500'}>
                  Must be between 7 and 14 characters long
                </li>
              </ul>
            )}

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
              type="submit"
            >
              Login
            </button>
          </div>

          <span className="block mt-2 text-sm text-gray-600 text-center">
            Not Registered?{' '}
            <a
              onClick={() => navigate('/signup')}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Create an Account
            </a>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}







