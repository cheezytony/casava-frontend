export interface TagProps<
  TColorScheme extends keyof typeof TagColorSchemes = 'primary'
> {
  className?: string;
  colorScheme?: keyof typeof TagColorSchemes;
  size?: keyof typeof TagSizes;
  variant?: keyof (typeof TagColorSchemes)[TColorScheme];
}

const TagColorSchemes = {
  primary: {
    solid: 'bg-pink-700 border-pink-700 text-white',
    outline: 'bg-transparent border-pink-700 text-pink-700',
    ghost: 'bg-pink-100 border-pink-100 text-pink-700',
  },
  secondary: {
    solid: 'bg-pink-200 border-pink-200 text-black',
    outline: 'bg-transparent border-pink-200 text-pink-200',
  },
  gray: {
    solid: 'bg-[#F2F4F7] border-[#F2F4F7] text-[#344054]',
    outline: 'bg-transparent border-gray-700 text-gray-700',
  },
  black: {
    solid: 'bg-black border-black text-white',
    outline: 'bg-transparent border-black text-black',
  },
  white: {
    solid: 'bg-white border-white text-black',
    outline: 'bg-transparent border-white text-white',
  },
};

const TagSizes = {
  md: 'px-[10px] py-[2px] text-[14px] leading-[1.3] tracking-[0.01em] rounded-[16px]',
};

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  className = '',
  children,
  colorScheme = 'primary',
  size = 'md',
  variant = 'solid',
}) => {
      // @ts-ignore
  const tagColorScheme = TagColorSchemes[colorScheme][variant];
  const tagSize = TagSizes[size];
  return (
    <div className={`font-sans inline-flex w-fit ${tagColorScheme} mix-blend-multiply ${tagSize} ${className}`}>
      {children}
    </div>
  );
};
