import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      localStorage.removeItem('user'); 
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    try {
      const savedRole = localStorage.getItem('role');
      return savedRole ? JSON.parse(savedRole) : null;
    } catch (error) {
      console.error("Failed to parse role data from localStorage:", error);
      localStorage.removeItem('role'); 
      return null;
    }
  });

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      const { token, role, user } = response.data;

      if (!token) {
        throw new Error('Token not provided in response');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));  
      localStorage.setItem('role', JSON.stringify(role));  
      setUser(user);
      setRole(role);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedRole = localStorage.getItem('role');
      if (savedUser && savedRole) {
        setUser(JSON.parse(savedUser));
        setRole(JSON.parse(savedRole));
      }
    } catch (error) {
      console.error("Failed to restore user or role data from localStorage:", error);
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
  }, []);

  const value = {
    user,
    role,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

