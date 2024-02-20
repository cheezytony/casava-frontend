import { FormRadioGroupContext } from '@/contexts/FormRadioGroup';
import React from 'react';

type FormRadioProps = {
  name: string;
  isChecked?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

export const FormRadio: React.FC<FormRadioProps> = ({
  name,
  className,
  isChecked,
  onChange,
  ...props
}) => {
  const context = React.useContext(FormRadioGroupContext);
  const isSelected = isChecked ?? context?.value === name;

  React.useEffect(() => {
    if (context.value === name) {
      onChange?.(name);
    }
  }, [context?.value, name, onChange]);

  return (
    <button
      className={`w-lg h-lg rounded-full grid place-items-center border transition-[background-color] ${
        isSelected ? 'bg-pink-700 border-pink-700' : 'bg-white border-black'
      } ${className}`}
      type="button"
      onClick={() => context?.setValue(name)}
      {...props}
    >
      <div
        className={`bg-white duration-300 delay-150 h-1/2 w-1/2 rounded-full ${
          isSelected ? 'scale-100' : 'scale-[0.75]'
        }`}
      />
    </button>
  );
};


export interface FormRadioGroupProps {
  children?:
    | React.ReactNode
    | ((
        value: string | undefined,
        setValue: React.Dispatch<React.SetStateAction<string | undefined>>
      ) => React.ReactNode);
  options: Array<string>;
  value?: string;
  onChange?: (value: string) => void;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  children,
  options,
  ...props
}) => {
  const [value, setValue] = React.useState<string | undefined>(props.value);

  return (
    <FormRadioGroupContext.Provider value={{ value, setValue }}>
      {typeof children === 'function' ? children(value, setValue) : children}
    </FormRadioGroupContext.Provider>
  );
};
