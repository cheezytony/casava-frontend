import React from 'react';
import { Icon } from '..';

export * from './button';
export * from './input';
export * from './radio';
export * from './select';

export const Form = React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>
>(({ onSubmit, ...props }, ref) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form {...props} onSubmit={handleSubmit} ref={ref}>
      {props.children}
    </form>
  );
});
Form.displayName = 'Form';

export interface FormGroupProps {
  input: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
  errors?: Record<string, string> | null;
  showAllErrors?: boolean;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  input,
  label,
  className,
  errors,
  showAllErrors,
}) => {
  const fieldErrors = React.useMemo(
    () => errors ? Object.keys(errors).map((key) => errors[key]) : [],
    [errors]
  );
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <FormInputLabel>{label}</FormInputLabel>}
      {input}
      {!!fieldErrors.length &&
        (showAllErrors ? (
          <div className="flex flex-col">
            {fieldErrors.map((error) => (
              <FormInputError  key={error} error={error} />
            ))}
          </div>
        ) : (
          <FormInputError error={fieldErrors[0]} />
        ))}
    </div>
  );
};

export interface FormInputErrorProps {
  error?: string;
}

export const FormInputError: React.FC<FormInputErrorProps> = ({ error, ...props }) => {
  if (!error) return null;
  return <div className="flex gap-sm items-center text-sm text-pink-700">
    <Icon name='IconAlertTriangle' size="xs" />
    <span>{error}</span>
  </div>;
};

export const FormInputLabel = React.forwardRef<
  HTMLLabelElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLLabelElement>>
>(({ className, ...props }, ref) => {
  return (
    <label {...props} className={`input__label ${className}`} ref={ref}>
      {props.children}
    </label>
  );
});
FormInputLabel.displayName = 'FormInputLabel';
