import { IconName, Icon } from '../icons';
import React from 'react';
import Link from 'next/link';
import { Spinner } from '..';

export type ButtonProps<
  TColorScheme extends ButtonColorScheme = 'primary'
> = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    colorScheme?: TColorScheme;
    href?: string;
    isDisabled?: boolean;
    isFlush?: boolean;
    isLoading?: boolean;
    isRounded?: boolean;
    leftIcon?: IconName | React.JSX.Element;
    rightIcon?: IconName | React.JSX.Element;
    size?: keyof typeof ButtonSizes;
    variant?: keyof (typeof ButtonColorSchemes)[TColorScheme];
  };

export type ButtonColorScheme = Exclude<keyof typeof ButtonColorSchemes, 'disabled'>;
  
const ButtonBorderRadius = {
  xs: 'rounded',
  sm: 'rounded',
  md: 'rounded-[8px]',
  lg: 'rounded-lg',
  full: 'rounded-full',
};
const ButtonColorSchemes = {
  primary: {
    solid:
      'bg-pink-700 border-pink-700 text-white hover:bg-pink-800 hover:border-pink-800 focus-visble:bg-pink-800 focus-visble:border-pink-800',
    outline:
      'bg-transparent border-pink-700 text-pink-700 hover:bg-pink-100 focus-visible:bg-pink-100',
    link: 'border-transparent text-pink-700 underline',
    ghost: 'bg-pink-100 border-pink-100 text-pink-700',
  },
  secondary: {
    solid:
      'bg-pink-200 border-pink-200 text-black hover:bg-pink-300 hover:border-pink-300 focus-visble:bg-pink-300 focus-visble:border-pink-300',
    outline:
      'bg-transparent border-pink-200 text-pink-200 hover:bg-pink-100 focus-visible:bg-pink-100',
    link: 'border-transparent text-pink-200 underline',
  },
  gray: {
    solid:
      'bg-[#79818C1F] border-[#79818C1F] text-[#191919] hover:bg-[#7a7f851f] hover:border-[#7a7f851f] focus-visble:bg-[#7a7f851f] focus-visble:border-[#7a7f851f]',
    outline:
      'bg-transparent border-gray-700 text-gray-700 hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-[#98A2B3] underline',
    ghost: 'bg-gray-100 border-gray-100 text-gray-700',
  },
  black: {
    solid:
      'bg-black border-black text-white hover:bg-gray-700 hover:border-gray-700 focus-visble:bg-gray-700 focus-visble:border-gray-700',
    outline:
      'bg-transparent border-black text-black hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-[#344054] underline',
    ghost: 'bg-gray-100 border-gray-100 text-black',
  },
  white: {
    solid:
      'bg-white border-white text-[#808080] hover:bg-gray-100 hover:border-gray-100 focus-visble:bg-gray-100 focus-visble:border-gray-100',
    outline:
      'bg-transparent border-white text-white hover:bg-gray-100 focus-visible:bg-gray-100',
    link: 'border-transparent text-white underline',
  },
  disabled: 'bg-[#f5f5f5] border-[#f5f5f5] opacity-50 text-black',
};
const ButtonCursors = {
  base: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
};
const ButtonPaddings = {
  xs: 'px-[4px] py-[6px]',
  sm: 'px-[8px] py-[8px]',
  md: 'px-[16px] py-[10px]',
  lg: 'px-[32px] py-[11px]',
};
const ButtonSizes = {
  xs: 'gap-xs text-xs leading-normal',
  sm: 'gap-xs text-sm leading-normal',
  md: 'gap-xs text-sm leading-normal',
  lg: 'gap-xs text-base leading-normal',
};

const ButtonComponent = (
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
  }: React.PropsWithChildren<ButtonProps>,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
) => {
  const isButtonDisabled = isDisabled || disabled;
  const baseClassName =
    'border font-semibold font-sans inline-flex items-center justify-center';
  const borderRadius = isRounded
    ? ButtonBorderRadius.full
    : ButtonBorderRadius[size];
  const buttonSize = ButtonSizes[size];
  const cursor =
    isButtonDisabled || isLoading ? ButtonCursors.disabled : ButtonCursors.base;
  const buttonPadding = isFlush ? '' : ButtonPaddings[size];
  const buttonColor = !isButtonDisabled
    ? // @ts-ignore
      ButtonColorSchemes[colorScheme][variant]
    : ButtonColorSchemes.disabled;

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
      {(rightIcon || isLoading) &&
        (isLoading ? (
          <Spinner />
        ) : typeof rightIcon === 'string' ? (
          <Icon name={rightIcon as IconName} />
        ) : (
          rightIcon
        ))}
    </ButtonOrLink>
  );
};

export const Button = React.forwardRef(ButtonComponent) as <
  TColorScheme extends ButtonColorScheme = 'primary'
>(
  props: ButtonProps<TColorScheme> & {
    ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  }
) => ReturnType<typeof ButtonComponent>;

type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonOrLinkProps = (AnchorElementProps | ButtonElementProps) & {
  href?: string;
  target?: AnchorElementProps['target'];
};

export const ButtonOrLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonOrLinkProps
>(({ href, children, target, type = 'button', ...props }, ref) => {
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...(props as AnchorElementProps)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type={type as ButtonElementProps['type']}
      {...(props as ButtonElementProps)}
    >
      {children}
    </button>
  );
});
ButtonOrLink.displayName = 'ButtonOrLink';
