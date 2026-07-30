import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rolePortal?: Role) => Promise<void>;
  signup: (full_name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('apex_token');
    const savedUserStr = localStorage.getItem('apex_user');

    if (savedToken && savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr);
        setToken(savedToken);
        setUser(parsedUser);

        // Verify token with backend
        fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        })
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Token expired');
          })
          .then((data) => {
            setUser(data.user);
            localStorage.setItem('apex_user', JSON.stringify(data.user));
          })
          .catch(() => {
            // Clear on invalid token
            localStorage.removeItem('apex_token');
            localStorage.removeItem('apex_user');
            setToken(null);
            setUser(null);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        localStorage.removeItem('apex_token');
        localStorage.removeItem('apex_user');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, rolePortal?: Role) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: rolePortal }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('apex_token', data.token);
    localStorage.setItem('apex_user', JSON.stringify(data.user));
  };

  const signup = async (full_name: string, email: string, password: string, role: Role) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create account');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('apex_token', data.token);
    localStorage.setItem('apex_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('apex_token');
    localStorage.removeItem('apex_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
