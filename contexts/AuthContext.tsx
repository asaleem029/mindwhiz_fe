import { api } from '@/utils/api';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  role: 'admin' | 'customer';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Make an API call to the backend for authentication using api.post
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Check if the response contains the necessary user and token fields
      if (response.data && response.data.token && response.data.user) {
        const data = response.data;

        const userData: User = {
          email: data.user.email,
          role: data.user.role,
          token: data.token, // Store token received from backend
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data and token in localStorage
        return true;
      }

      // If the response doesn't contain the necessary data
      console.error("Login failed: Invalid response format or missing data", response.data);
      return false;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin'; // Check if the user is an Admin

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

