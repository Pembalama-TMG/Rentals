import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * Handles lazy loading, responsive images, and blur placeholder
 * 
 * Props:
 * - src: Image URL
 * - alt: Alt text
 * - className: Tailwind classes
 * - width: Image width
 * - height: Image height
 * - objectFit: CSS object-fit value
 * - blur: Show blur placeholder while loading
 * - animate: Apply Framer Motion animations
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  blur = true,
  animate = false,
  onLoad = () => {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleImageError = () => {
    setError(true);
  };

  const containerClass = `relative overflow-hidden ${className}`;
  const imageClass = `w-full h-full object-cover transition-opacity duration-300 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`;

  if (error) {
    return (
      <div className={`${containerClass} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  if (animate) {
    return (
      <motion.div
        className={containerClass}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {blur && !isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 blur-lg" />
        )}
        <img
          src={src}
          alt={alt}
          className={imageClass}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          width={width}
          height={height}
          style={{ objectFit }}
        />
      </motion.div>
    );
  }

  return (
    <div className={containerClass}>
      {blur && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 blur-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={imageClass}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        width={width}
        height={height}
        style={{ objectFit }}
      />
    </div>
  );
};

export default OptimizedImage;
