import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isFetched, setIsFetched] = useState(false);  // New state to track data fetching

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setRole(response.data.role);
        } catch (error) {
          console.error('Failed to authenticate token', error);
          localStorage.removeItem('token');  // Remove invalid token if any error
        }
      }
      setIsFetched(true);  // Mark as fetched regardless of token presence
    };

    fetchUserData();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      const { token, role, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);
      setRole(role);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isFetched }}>
      {children}
    </AuthContext.Provider>
  );
}

