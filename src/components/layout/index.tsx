export interface DividerProps {
  className?: string;
  size?: keyof typeof DividerSizes;
}

const DividerSizes = {
  none: '',
  sm: 'my-sm',
  md: 'my-md',
  lg: 'my-lg',
};

export const Divider: React.FC<DividerProps> = ({
  size = 'md',
  className = '',
  ...props
}) => {
  const dividerSize = DividerSizes[size];
  return (
    <hr
      {...props}
      className={`border border-[#e9ecef] ${dividerSize} ${className}`}
    />
  );
};

export interface WidthProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  max?: string | number;
  min?: string | number;
  width?: string | number;
}

export const Width: React.FC<React.PropsWithChildren<WidthProps>> = ({
  children,
  max,
  min,
  width = '100%',
  ...props
}) => {
  return (
    <div {...props} style={{ maxWidth: max, minWidth: min, width }}>
      {children}
    </div>
  );
};
