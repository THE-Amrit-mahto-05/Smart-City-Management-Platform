import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import * as jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
        setUser({ ...decoded, token });
      } catch (err) {
        setUser(null);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await axiosClient.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (err) {
      throw (err.response && err.response.data && err.response.data.message) || 'Signup failed';
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode.default(token);
      setUser({ ...decoded, token });
      return response.data;
    } catch (err) {
      throw (err.response && err.response.data && err.response.data.message) || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
