import Image from 'next/image';
import React from 'react';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ alt, size, src, ...props }) => {
  const avatarSize = React.useMemo(() => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs':
        return 24;
      case 'sm':
        return 32;
      case 'md':
        return 40;
      case 'lg':
        return 48;
      case 'xl':
        return 64;
      default:
        return 40;
    }
  }, [size]);
  const avatarSrc = React.useMemo(() => {
    return src || `/images/avatar/avatar-1.png`;
  }, [src]);
  return (
    <div
      className="border-2 border-white rounded-full shadow-[0px_2px_5px_0px_rgba(0,0,0,0.07)]"
      style={{ width: avatarSize, height: avatarSize }}
    >
      <Image
        src={avatarSrc}
        alt={alt || 'Avatar'}
        className="h-full rounded-full w-full"
        width={avatarSize}
        height={avatarSize}
      />
    </div>
  );
};
