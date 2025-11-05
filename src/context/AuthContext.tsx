import { LOADING_STATUS } from '@/constants/loadingConstants';
import { LoadingStatus } from '@/types/Loading';
import { User } from '@/types/User';
import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | Partial<User> | null;
  fetchUserData: (email: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// AuthContext provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingStatus>(LOADING_STATUS.IDLE);
  const [user, setUser] = useState<User | Partial<User> | null>({
    email: 'example@mail.com',
  });

  const fetchUserData = async (email: string) => {
    setLoading(LOADING_STATUS.PENDING);
    try {
      const response =  await fetch(`api/users?email=${encodeURIComponent(email)}`, { 
        method: 'GET',
        credentials: 'include' 
      });
      const data = await response.json();
      setUser(data);
      setLoading(LOADING_STATUS.SUCCESS);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(LOADING_STATUS.ERROR);
      console.error('Fetch user failed:', error);
    }
  };

  const registerUser = async (email: string, password: string) => {
    setLoading(LOADING_STATUS.PENDING);
    try {
      await fetch(`api/auth?type=registration`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });
      setLoading(LOADING_STATUS.SUCCESS);
      router.push('/registration-success');
    } catch (error) {
      setLoading(LOADING_STATUS.ERROR);
      console.error('Registration failed:', error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    setLoading(LOADING_STATUS.PENDING);
    try {
      await fetch(`api/auth?type=login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });
      await fetchUserData(email);
      setIsAuthenticated(true);
      setLoading(LOADING_STATUS.SUCCESS);
      router.push('/profile');
    } catch (error) {
      setLoading(LOADING_STATUS.ERROR);
      console.error('Login failed:', error);
    }
  };

  const logoutUser = async () => {
    setLoading(LOADING_STATUS.PENDING);
    try {
      await fetch(`api/auth?type=logout`, { 
        method: 'POST' 
      });
      setIsAuthenticated(false);
      setUser(null);
      setLoading(LOADING_STATUS.SUCCESS);
      router.push('/');
    } catch (error) {
      setLoading(LOADING_STATUS.ERROR);
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, fetchUserData, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};