'use client';

import React, { createContext } from 'react';

export interface AuthenticationContextAttributes {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: object | null;
  token: string | null;
  login: (args: { user: object; token: string }) => void;
  logout: () => void;
}

export const AuthenticationContext =
  createContext<AuthenticationContextAttributes>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
  });

export const AuthenticationContextProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<object | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const login = ({ user, token }: { user: object; token: string }) => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, isLoading, user, token, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
AuthenticationContextProvider.displayName = 'AuthenticationContextProvider';
