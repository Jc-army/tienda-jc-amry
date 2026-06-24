'use client';

import React, { useState } from 'react';
import { handleImageError } from '../utils/images';

export default function ProductImage({ src, alt, className = '', objectFit = 'cover' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 skeleton" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        onError={handleImageError}
      />
    </div>
  );
}
