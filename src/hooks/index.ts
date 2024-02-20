import React from 'react';

export * from './auth';
export * from './form';
export * from './onboarding';

export const useDisclosure = (defaultIsOpen: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const listeners = React.useRef<(() => void)[]>([]);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const onChange = (listener: () => void) => {
    listeners.current.push(listener);
  };

  React.useEffect(() => {
    listeners.current.forEach((listener) => listener());
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    onChange,
  };
};
