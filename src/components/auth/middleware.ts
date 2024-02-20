'use client';

import { useAuth } from '@/hooks/auth';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';

export const AuthMiddleware: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const pathName = usePathname();

  return isAuthenticated
    ? children
    : redirect(`/auth/login?redirectTo=${pathName}`);
};

export const GuestMiddleware: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : redirect('/dashboard');
};

export const CustomMiddleware: React.FC<
  React.PropsWithChildren<{ middleware: () => boolean; redirectTo: string }>
> = ({ children, middleware, redirectTo }) => {
  return middleware() ? children : redirect(redirectTo);
};
