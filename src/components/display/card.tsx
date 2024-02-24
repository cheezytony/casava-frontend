export interface CardProps {
  bodyClassName?: string;
  className?: string;
  colorScheme?: keyof typeof CardBackgroundColors;
  footer?: React.ReactNode;
  size?: keyof typeof CardSizes;
}

export const BaseCardStyle = 'bg-white border border-[#F2F2F7] rounded-[0.625rem]';

export const CardBackgroundColors = {
  none: '',
  gray: 'bg-[#F8F9FA]',
  pink: 'bg-pink-100',
};

export const CardBorderColors = {
  none: '',
  gray: 'border-[#F2F2F7]',
  pink: 'border-pink-700',
};

export const CardSizes = {
  none: '',
  xs: 'p-xs',
  sm: 'p-sm',
  md: 'p-sm sm:p-md',
  lg: 'p-md sm:p-lg',
};

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  bodyClassName = '',
  children,
  className = '',
  colorScheme = 'gray',
  footer,
  size = 'md',
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${BaseCardStyle} border ${CardBorderColors[colorScheme]} ${className}`}
    >
      <div className={`w-full ${CardSizes[size]} ${bodyClassName}`}>{children}</div>
      {footer && (
        <div
          className={`${CardBackgroundColors[colorScheme]} border-t ${CardBorderColors[colorScheme]} rounded-b-[0.625rem] ${CardSizes[size]}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
