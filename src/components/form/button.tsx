import { IconName, Icon } from '../icons';
import React from 'react';
import Link from 'next/link';

export type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    colorScheme?: Exclude<keyof typeof ButtonColors, 'disabled'>;
    href?: string;
    isDisabled?: boolean;
    isFlush?: boolean;
    isLoading?: boolean;
    isRounded?: boolean;
    leftIcon?: IconName | React.ReactNode;
    rightIcon?: IconName | React.ReactNode;
    size?: keyof typeof ButtonSizes;
    variant?: 'solid' | 'outline' | 'link';
  };

const ButtonBorderRadius = {
  xs: 'rounded',
  sm: 'rounded',
  md: 'rounded',
  lg: 'rounded-lg',
  full: 'rounded-full',
};
const ButtonColors = {
  primary: {
    solid:
      'bg-pink-700 border-pink-700 text-white hover:bg-pink-800 hover:border-pink-800 focus-visble:bg-pink-800 focus-visble:border-pink-800',
    outline:
      'bg-transparent border-pink-700 text-pink-700 hover:bg-pink-100 focus-visible:bg-pink-100',
    link: 'border-transparent text-pink-700 hover:underline',
  },
  secondary: {
    solid:
      'bg-pink-200 border-pink-200 text-black hover:bg-pink-300 hover:border-pink-300 focus-visble:bg-pink-300 focus-visble:border-pink-300',
    outline:
      'bg-transparent border-pink-200 text-pink-200 hover:bg-pink-100 focus-visible:bg-pink-100',
    link: 'border-transparent text-pink-200 hover:underline',
  },
  gray: {
    solid:
      'bg-[#79818C1F] border-[#79818C1F] text-[#191919] hover:bg-[#7a7f851f] hover:border-[#7a7f851f] focus-visble:bg-[#7a7f851f] focus-visble:border-[#7a7f851f]',
    outline:
      'bg-transparent border-gray-700 text-gray-700 hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-[#98A2B3] hover:underline',
  },
  black: {
    solid:
      'bg-black border-black text-white hover:bg-gray-700 hover:border-gray-700 focus-visble:bg-gray-700 focus-visble:border-gray-700',
    outline:
      'bg-transparent border-black text-black hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-black hover:underline',
  },
  white: {
    solid:
      'bg-white border-white text-black hover:bg-gray-100 hover:border-gray-100 focus-visble:bg-gray-100 focus-visble:border-gray-100',
    outline:
      'bg-transparent border-white text-white hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-white hover:underline',
  },
  disabled: 'bg-[#f5f5f5] border-[#f5f5f5] opacity-50 text-black',
};
const ButtonCursors = {
  base: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
};
const ButtonPaddings = {
  xs: 'px-8 py-[0.375rem]',
  sm: 'px-8 py-[8px]',
  md: 'px-8 py-[10px]',
  lg: 'px-8 py-[14px]',
};
const ButtonSizes = {
  xs: 'gap-xs text-xs leading-normal',
  sm: 'gap-xs text-sm leading-normal',
  md: 'gap-xs text-base leading-normal',
  lg: 'gap-xs text-lg leading-normal',
};

export const Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      className = '',
      colorScheme = 'primary',
      disabled,
      isDisabled,
      isFlush,
      isLoading,
      isRounded,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'solid',
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = isDisabled || disabled;
    const baseClassName =
      'border font-semibold duration-300 inline-flex items-center justify-center transition';
    const borderRadius = isRounded
      ? ButtonBorderRadius.full
      : ButtonBorderRadius[size];
    const buttonSize = ButtonSizes[size];
    const cursor =
      isButtonDisabled || isLoading
        ? ButtonCursors.disabled
        : ButtonCursors.base;
    const buttonPadding = isFlush ? '' : ButtonPaddings[size];
    const buttonColor = !isButtonDisabled
      ? ButtonColors[colorScheme][variant]
      : ButtonColors.disabled;

    return (
      <ButtonOrLink
        {...props}
        ref={ref}
        disabled={isButtonDisabled || isLoading}
        className={[
          baseClassName,
          borderRadius,
          buttonSize,
          cursor,
          buttonColor,
          buttonPadding,
          className,
        ].join(' ')}
      >
        {leftIcon &&
          (typeof leftIcon === 'string' ? (
            <Icon name={leftIcon as IconName} />
          ) : (
            leftIcon
          ))}
        {children && <span>{children}</span>}
        {rightIcon &&
          (typeof rightIcon === 'string' ? (
            <Icon name={rightIcon as IconName} />
          ) : (
            rightIcon
          ))}
      </ButtonOrLink>
    );
  }
);
Button.displayName = 'Button';


type AnchorElement = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonElement = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonOrLinkProps = (AnchorElement | ButtonElement) & {
  href?: string;
  target?: AnchorElement['target'];
};

export const ButtonOrLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonOrLinkProps
>(({ href, children, target, type = 'button', ...props }, ref) => {
  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...(props as AnchorElement)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type={type as ButtonElement['type']}
      {...(props as ButtonElement)}
    >
      {children}
    </button>
  );
});
ButtonOrLink.displayName = 'ButtonOrLink';
