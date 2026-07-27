/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: 'responsive' | 'fill' | 'fixed' | 'intrinsic';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  priority?: boolean;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  layout = 'intrinsic',
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  className = '',
}) => {
  const imgStyle: React.CSSProperties = {
    objectFit,
    objectPosition,
  };

  if (layout === 'responsive') {
    const paddingBottom = width && height ? `${(height / width) * 100}%` : '100%';
    return (
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }} className={className}>
        <div style={{ width: '100%', paddingBottom }} />
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            ...imgStyle,
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (layout === 'fill') {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...imgStyle,
        }}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback / Intrinsic / Fixed
  const style: React.CSSProperties = {
    ...imgStyle,
  };
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      style={style}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};
