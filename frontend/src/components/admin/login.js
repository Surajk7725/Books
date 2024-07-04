import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
    const handleLogin = () => {
        navigate('/adminhome');
    };

  return (
    <div class="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
  <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <a
          onClick={() => navigate('/forgot')}
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer float-right"
        >
          Forgot Password?
        </a>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <span class="block mt-2 text-sm text-gray-600 text-center">Not Registered? <a onClick={() => navigate('/admin-signup')} class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">Create an Account</a></span>
    </form>
  </div>
</div>
  )
};
