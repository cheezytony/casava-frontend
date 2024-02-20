import { useMemo } from 'react';
import * as Arrows from './arrows';
import * as Math from './math';
import * as Misc from './misc';
import * as Objects from './objects';
import * as Signs from './signs';

const AllIcons = {
  ...Arrows,
  ...Math,
  ...Misc,
  ...Objects,
  ...Signs,
};

export type IconName = keyof typeof AllIcons;

export interface IconProps {
  className?: string;
  name: keyof typeof AllIcons;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  className,
  ...props
}) => {
  const IconComponent = AllIcons[name] as unknown as keyof JSX.IntrinsicElements;
  const iconSize = useMemo(() => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs':
        return 14;

      case 'sm':
        return 16;

      case 'lg':
        return 40;

      case 'xl':
        return 60;

      case 'md':
      default:
        return 20;
    }
  }, [size]);
  return (
    <IconComponent
      height={iconSize}
      width={iconSize}
      className={`shrink-0 ${className}`}
      {...props}
    />
  );
};
