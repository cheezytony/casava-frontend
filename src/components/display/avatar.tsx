import React from 'react';
import Image from 'next/image';
import { nameToInitials } from '@/utils';

interface AvatarProps {
  name?: string;
  initials?: string;
  src?: string;
  size?: keyof typeof AvatarSizes | number;
  shape?: 'circle' | 'square';
  alt?: string;
  className?: string;
}

const AvatarSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80,
};

export const Avatar: React.FC<AvatarProps> = ({
  src = '/images/avatar/avatar-1.png',
  size = 'md',
  shape = 'circle',
  alt = '',
  className = '',
  name,
  initials,
}) => {
  const dimension = typeof size === 'number' ? size : AvatarSizes[size];
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  const avatarInitias = initials || name && nameToInitials(name, 2);
  const initialsFontSize = dimension / 2.5;

  return (
    <div
      className={` ${shapeClass} ${className} overflow-hidden inline-block w-fit`}
    >
      {avatarInitias ? (
        <div
          className={`flex items-center justify-center font-semibold`}
          style={{ width: dimension, height: dimension, fontSize: initialsFontSize }}
        >
          {avatarInitias}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className="object-cover"
        />

      )}
    </div>
  );
};
