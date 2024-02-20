import React from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

export const useAuth = () => {
  return React.useContext(AuthenticationContext);
};