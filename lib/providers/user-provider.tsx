'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { getUserAction } from '@/actions/user/get-user.action';
import { PublicUser } from '@/models/public-user.type';
import { logoutAction } from '@/actions/auth/logout-action';
import { deleteTokenCookie } from '../utils/auth.utils';
import { redirect } from 'next/navigation';

type UserContextType = {
  user: PublicUser | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// TODO : fix issue when you start the app for next time, when it compiles, this is not called, only when you fresh the page, maybe because Provider is client?
// You have this error when you run the app for the first time : Uncaught SyntaxError: Invalid or unexpected token (at layout.js:950:29)
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const fetchedUser = await getUserAction();
      setUser(fetchedUser);
    } catch (error) {
      setUser(null);
      console.error('Error fetching user', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle login
  const login = useCallback(async () => {
    console.log('login');
    setIsLoading(true);
    await fetchUser();
  }, []);

  // Handle logout (clear user state)
  const logout = () => {
    setUser(null);
    setIsLoading(false);
    deleteTokenCookie();
    logoutAction();
    redirect('/');
  };

  const exposed = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
