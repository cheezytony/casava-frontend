export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: Exclude<keyof typeof BadgeColors, 'disabled'>;
  isDisabled?: boolean;
  isRounded?: boolean;
  size?: keyof typeof BadgeSizes;
}

const BadgeBorderRadius = {
  base: 'rounded',
  full: 'rounded-full',
};
const BadgeColors = {
  primary:
    'bg-pink-700 border-pink-700 text-white hover:bg-pink-800 hover:border-pink-800 focus-visble:bg-pink-800 focus-visble:border-pink-800',
  black:
    'bg-black border-black text-white hover:bg-gray-700 hover:border-gray-700 focus-visble:bg-gray-700 focus-visble:border-gray-700',
  secondary:
    'bg-pink-200 border-pink-200 text-black hover:bg-pink-300 hover:border-pink-300 focus-visble:bg-pink-300 focus-visble:border-pink-300',
  gray: 'bg-[#F0F2F5] border-[#F0F2F5] text-[#344054] hover:bg-[#E5E7EB] hover:border-[#E5E7EB] focus-visble:bg-[#E5E7EB] focus-visble:border-[#E5E7EB]',
  disabled: 'bg-[#f5f5f5] border-[#f5f5f5] opacity-50 text-black',
};
const BadgeCursors = {
  base: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
};
const BadgeSizes = {
  md: 'gap-xs px-3 py-1 text-xs leading-normal',
};

export const Badge: React.FC<React.PropsWithChildren<BadgeProps>> = ({
  children,
  className,
  colorScheme = 'primary',
  isDisabled,
  isRounded,
  size = 'md',
  ...props
}) => {
  const badgeRadius = isRounded ? BadgeBorderRadius.full : BadgeBorderRadius.base;
  const badgeColor = isDisabled ? BadgeColors.disabled : BadgeColors[colorScheme];
  const badgeCursor = isDisabled ? BadgeCursors.disabled : BadgeCursors.base;
  const badgeSize = BadgeSizes[size];
  const badgeStyles = `border duration-300 active:scale-[0.90] ${badgeRadius} ${badgeColor} ${badgeCursor} ${badgeSize}`;
  
  return (
    <div {...props} className={`${badgeStyles} ${className}`}>
      {children}
    </div>
  );
};
