import React, { useState } from "react";
import axiosInstance from './axiosInstance'; 

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is valid before proceeding
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    console.log('Email to be sent:', email);  

    try {
        const response = await axiosInstance.post('/auth/forget-password', { email });
        console.log('Server response:', response.data); 
        setEmailSent(true);
        setError('');
        setEmailError(''); 
    } catch (error) {
        console.error('Error sending email:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-white bg-opacity-75 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Forgot Password</h2>
        {emailSent ? (
          <p className="text-green-500 text-center">Email Sent Successfully</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email
              <span className="text-red-500">*</span>
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
                id="email"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');  
                }}
                required
              />
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300" type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
