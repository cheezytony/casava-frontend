import React, { HTMLAttributes, forwardRef } from 'react';
import { IconName, Icon } from '../icons';
import { Button } from '.';
import { useMergeRefs } from '@floating-ui/react';

export const InputBaseClassName =
  'w-full border text-black text-opacity-[0.65] outline-none *:placeholder:text-[#bfbfbf] focus:text-black focus-within:text-black';
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

export interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
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

export const FormInputPlaceholder = ({ text }: { text: string }) => {
  return (
    <div className="whitespace-nowrap overflow-hidden text-[#bfbfbf]">
      {text}
    </div>
  );
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className = '',
      isDisabled,
      isReadOnly,
      isRounded,
      leftIcon,
      rightIcon,
      size = 'md',
      onChange,
      ...props
    },
    ref
  ) => {
    const inputFont = InputFonts[size];

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
          className={`border-0 outline-none p-0 w-full autofill:bg-black ${inputFont}`}
          onChange={(e) => onChange?.(e.target.value)}
          {...(isDisabled && { disabled: true })}
          {...(isReadOnly && { readOnly: true })}
        />
      </FormInputWrapper>
    );
  }
);
FormInput.displayName = 'FormInput';

export const FormPassword = forwardRef<
  HTMLInputElement,
  Omit<FormInputProps, 'rightIcon'>
>(
  (
    {
      className = '',
      isDisabled,
      isReadOnly,
      isRounded,
      leftIcon,
      size = 'md',
      onChange,
      ...props
    },
    ref
  ) => {
    const inputFont = InputFonts[size];
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
      inputRef.current?.focus();
    };

    return (
      <FormInputWrapper
        {...{
          isDisabled,
          isRounded,
          leftIcon,
          size,
          className: `cursor-text relative ${className}`,
        }}
      >
        <input
          {...props}
          ref={useMergeRefs([ref, inputRef])}
          type={showPassword ? 'text' : 'password'}
          className={`border-0 outline-none p-0 w-full autofill:bg-black ${inputFont}`}
          onChange={(e) => onChange?.(e.target.value)}
          {...(isDisabled && { disabled: true })}
          {...(isReadOnly && { readOnly: true })}
        />
        <Button
          colorScheme={showPassword ? 'primary' : 'black'}
          leftIcon="IconEye"
          variant="link"
          size="xs"
          className="absolute right-0 top-1/2 -translate-y-1/2 m-auto mr-md"
          tabIndex={-1}
          onClick={toggleShowPassword}
        />
      </FormInputWrapper>
    );
  }
);
FormPassword.displayName = 'FormPassword';

export interface FormInputWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  isDisabled?: boolean;
  isFlush?: boolean;
  isRounded?: boolean;
  leftIcon?: IconName | React.JSX.Element;
  rightIcon?: IconName | React.JSX.Element;
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
        {children}
        {rightIcon && (
          <span className="ml-auto">
            {typeof rightIcon === 'string' ? (
              <Icon name={rightIcon as IconName} size={size} />
            ) : (
              rightIcon
            )}
          </span>
        )}
      </Element>
    );
  }
);
FormInputWrapper.displayName = 'FormInputWrapper';
