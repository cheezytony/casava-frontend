import React from 'react';

export * from './auth';
export * from './form';
export * from './onboarding';
export * from './payment';

export interface UsesDisclosure {
  isOpen: boolean;
  onOpen: () => Promise<boolean>;
  onClose: () => void;
}

export const useDisclosure = (defaultIsOpen: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const listeners = React.useRef<Array<(isOpen: boolean) => void>>([]);

  const onOpen = usePromise<boolean>((resolve) => {
    setIsOpen(true);
    const handleOnChange = (value: boolean) => {
      if (!value) {
        resolve(value);
        off(handleOnChange);
      }
    };
    on(handleOnChange);
  }, []);
  const onClose = () => {
    setIsOpen(false);
  }
  const onToggle = () => {
    setIsOpen((prev) => !prev);
  }

  const onChange = (listener: (value: boolean) => void) => {
    listeners.current.push(listener);
  };
  const on = onChange;
  const off = (listener: (value: boolean) => void) => {
    listeners.current = listeners.current.filter((callback) => listener !== callback);
  };

  React.useEffect(() => {
    listeners.current.forEach((listener) => listener(isOpen));
  }, [isOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    onChange,
    on,
    off,
  };
};

export const usePromise = <TReturnValue = unknown>(
  executor: (
    resolve: (value: TReturnValue) => void,
    reject: (reason?: any) => void
  ) => void,
  deps: React.DependencyList,
) => {
  return React.useCallback(() => {
    return new Promise<TReturnValue>((resolve, reject) => {
      executor(resolve, reject);
    });
  }, [executor, ...deps]);
};
