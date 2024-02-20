import { useContext } from 'react'
import { OnboardingContext } from '../contexts/OnboardingContext';

export const useOnboarding = () => {
  return useContext(OnboardingContext);
}