import { HTMLAttributes } from 'react';

const HeadingSizes = {
  1: 'font-semibold text-[36px] leading-[1.2] md:text-[48px] md:leading-[1.2] tracking-[-0.01rem]',
  2: 'font-semibold text-[32px] leading-[1.2] md:text-[40px] md:leading-[1.2] tracking-[-0.01rem]',
  3: 'font-semibold text-[24px] leading-[1.2] md:text-[32px] md:leading-[1.2] tracking-[-0.01rem]',
  4: 'font-semibold text-[20px] leading-[1.2] md:text-[24px] md:leading-[1.2] tracking-[-0.01rem]',
  5: 'font-semibold text-[16px] leading-[1.2] md:text-[20px] md:leading-[1.2] tracking-[-0.01rem]',
  6: 'font-semibold text-[14px] leading-[1.2] md:text-[16px] md:leading-[1.2] tracking-[-0.01rem]',
};

export const Heading: React.FC<
  HTMLAttributes<HTMLHeadingElement> & {
    as?: keyof Pick<
      JSX.IntrinsicElements,
      'h1' | 'h2' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    >;
    level?: keyof typeof HeadingSizes;
  }
> = ({ as = 'h1', children, className = '', level = 1, ...props }) => {
  const Element = as;
  
  const headingSize = HeadingSizes[level as keyof typeof HeadingSizes];
  
  return (
    <Element className={`font-serif ${headingSize} ${className}`} {...props}>
      {children}
    </Element>
  );
};

const ParagraphSizes = {
  xl: 'text-[20px]',
  lg: 'text-[18px] leading-[1.4]',
  md: 'text-[16px] leading-[1.4]',
  sm: 'text-[14px] leading-[1.4] tracking-[0.01rem]',
  xs: 'text-[12px] leading-[1.4] tracking-[0.02rem]',
};

export const Paragraph: React.FC<
  HTMLAttributes<HTMLParagraphElement> & {
    size?: keyof typeof ParagraphSizes;
  }
> = ({ children, className = '', size = 'md', ...props }) => {
  const paragraphSize = ParagraphSizes[size as keyof typeof ParagraphSizes];
  return (
    <p className={`font-sans ${paragraphSize} ${className}`} {...props}>
      {children}
    </p>
  );
};

const TextSizes = {
  sm: 'text-sm leading-[1.4285714285714286]',
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  size?: keyof typeof TextSizes;
}

export const Text: React.FC<TextProps> = ({
  as = 'span',
  children,
  className = '',
  size = 'sm',
  ...props
}) => {
  const textSize = TextSizes[size];
  const Element = as as Extract<keyof JSX.IntrinsicElements, 'span'>;
  return (
    <Element className={`${textSize} ${className}`} {...props}>
      {children}
    </Element>
  );
};
