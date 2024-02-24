import React, { HTMLAttributes, forwardRef } from 'react';
import { IconName, Icon } from '../icons';

export const InputBaseClassName =
  'w-full border text-black text-opacity-[0.65] outline-none focus:text-black focus-within:text-black';
export const InputBackground = {
  base: 'bg-white',
  disabled: 'bg-[#F2F2F7]',
};
export const InputBorder = {
  base: 'border-[#d9d9d9] hover:border-[#808080] focus:border-black focus-within:border-black',
  disabled: 'border-[#d9d9d9]',
};
export const InputBorderRadius = {
  base: 'rounded',
  full: 'rounded-full',
};
export const InputFonts = {
  md: 'text-sm leading-[1.1375rem]',
};
export const InputPaddings = {
  md: 'p-md',
};
export const InputPlaceholder = {
  custom: 'text-[#bfbfbf]',
  base: 'placeholder:text-[#bfbfbf]',
};

export interface FormInputProps {
  className?: string;
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRounded?: boolean;
  leftIcon?: IconName;
  name?: string;
  rightIcon?: IconName;
  placeholder?: string;
  size?: 'md';
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value?: string | number;

  onChange?: (value: string | number) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className = '',
      isDisabled,
      isReadOnly,
      isRounded,
      leftIcon,
      placeholder,
      rightIcon,
      size = 'md',
      onChange,
      ...props
    },
    ref
  ) => {
    const inputFont = InputFonts[size];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    };

    return (
      <FormInputWrapper
        {...{
          isDisabled,
          isRounded,
          leftIcon,
          rightIcon,
          size,
          className: `cursor-text ${className}`,
        }}
      >
        <input
          {...props}
          ref={ref}
          className={`border-0 outline-none p-0 w-full autofill:bg-black ${inputFont} ${InputPlaceholder.base}`}
          placeholder={placeholder}
          onChange={handleChange}
          {...(isDisabled && { disabled: true })}
          {...(isReadOnly && { readOnly: true })}
        />
      </FormInputWrapper>
    );
  }
);
FormInput.displayName = 'FormInput';

export interface FormInputWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  isDisabled?: boolean;
  isFlush?: boolean;
  isRounded?: boolean;
  leftIcon?: IconName | React.ReactNode;
  rightIcon?: IconName | React.ReactNode;
  size?: 'md';
}

export const FormInputWrapper = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<FormInputWrapperProps>
>(
  (
    {
      as = 'label',
      children,
      className = '',
      isDisabled,
      isFlush,
      isRounded,
      leftIcon,
      rightIcon,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const inputBackground = isDisabled
      ? InputBackground.disabled
      : InputBackground.base;
    const inputBorder = isDisabled ? InputBorder.disabled : InputBorder.base;
    const inputBorderRadius = isRounded
      ? InputBorderRadius.full
      : InputBorderRadius.base;
    const inputPadding = isFlush ? '' : InputPaddings[size];
    const inputClassName = [
      InputBaseClassName,
      inputBackground,
      inputBorder,
      inputBorderRadius,
      inputPadding,
      'gap-xs flex items-center',
      className,
    ].join(' ');
    const Element = as;
    return (
      <Element {...props} ref={ref} className={inputClassName}>
        {leftIcon &&
          (typeof leftIcon === 'string' ? (
            <Icon name={leftIcon as IconName} size={size} />
          ) : (
            leftIcon
          ))}
        <div className="w-full">{children}</div>
        {rightIcon &&
          (typeof rightIcon === 'string' ? (
            <Icon name={rightIcon as IconName} size={size} />
          ) : (
            rightIcon
          ))}
      </Element>
    );
  }
);
FormInputWrapper.displayName = 'FormInputWrapper';
