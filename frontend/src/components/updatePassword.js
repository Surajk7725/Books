import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';

export default function UpdatePassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    lengthValid: false,
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const lengthValid = password.length >= 7 && password.length <= 14;

    setPasswordValidation({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      lengthValid,
    });

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && lengthValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Password does not meet the required criteria');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/auth/update-password', { email, newPassword, confirmPassword });
      toast.success('Password updated successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error updating password:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to update password. Please try again.');
      toast.error(error.response?.data?.message || 'Failed to update password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Password</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">New Password
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">Confirm Password
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

