import React from 'react';

export interface FormRadioGroupContextAttributes {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const FormRadioGroupContext =
  React.createContext<FormRadioGroupContextAttributes>({
    value: undefined,
    setValue: () => {},
  });
