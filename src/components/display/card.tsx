export interface CardProps {
  className?: string;
  size?: keyof typeof CardSizes;
}

export const BaseCardStyle = 'bg-white border border-[#F2F2F7] rounded-[0.625rem]';

export const CardSizes = {
  none: '',
  xs: 'p-xs',
  sm: 'p-sm',
  md: 'p-md',
  lg: 'p-lg',
};

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  className = '',
  size = 'md',
  ...props
}) => {
  const cardSize = CardSizes[size];
  
  return (
    <div {...props} className={`${BaseCardStyle} ${cardSize} ${className}`}>
      {children}
    </div>
  );
};
