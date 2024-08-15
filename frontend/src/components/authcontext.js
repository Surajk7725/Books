import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
const [role, setRole] = useState(null);

const login = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    const { token, role, user } = response.data;

    if (!token) {
      throw new Error('Token not provided in response');
    }
    
    localStorage.setItem('token', token);
    setUser(user); // Save user to state
    setRole(role); // Save role to state
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const value = {
  user,
  role,
  login,
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

