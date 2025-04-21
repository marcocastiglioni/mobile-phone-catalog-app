'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './OptimizedImage.module.scss';
import { OptimizedImageType } from '@/types/image';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className = '',
  objectFit = 'cover'
}: OptimizedImageType) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Reset loading and error states when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setImageSrc(src);
  }, [src]);

  // Determine CSS classes based on state
  const imageClasses = `
    ${styles.image}
    ${isLoading ? styles.loading : ''}
    ${error ? styles.error : ''}
    ${styles[objectFit]}
    ${className}
  `;

  // Handle loading success
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle loading error
  const handleError = () => {
    setIsLoading(false);
    setError(true);
    // Use a fallback image
    setImageSrc('/placeholder-image.jpg');
  };

  return (
    <div className={styles.container} style={{ aspectRatio: `${width}/${height}` }}>
      {isLoading && <div className={styles.skeleton}></div>}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
      
      {error && <div className={styles.errorOverlay}>Image not available</div>}
    </div>
  );
}