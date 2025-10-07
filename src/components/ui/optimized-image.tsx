"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // For above-the-fold images
  sizes?: string; // Responsive sizes
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  sizes = '100vw',
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive image sources
  const generateSources = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop()?.toLowerCase();
    const baseName = baseSrc.replace(/\.[^/.]+$/, '');

    // Generate different sizes for responsive images
    const sizes = [400, 800, 1200, 1600];

    return {
      avif: sizes.map(size => ({
        srcSet: `${baseName}-${size}w.avif ${size}w`,
        type: 'image/avif'
      })),
      webp: sizes.map(size => ({
        srcSet: `${baseName}-${size}w.webp ${size}w`,
        type: 'image/webp'
      })),
      fallback: sizes.map(size => ({
        srcSet: `${baseName}-${size}w.${ext} ${size}w`,
        type: `image/${ext}`
      })),
      original: baseSrc
    };
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const sources = generateSources(src);

      // Preload the most suitable format
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = sources.original;

      // Try to preload WebP if supported
      if (typeof window !== 'undefined' && 'WebPDecoder' in window) {
        link.href = sources.webp[0]?.srcSet.split(' ')[0] || sources.original;
      }

      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [priority, src]);

  const sources = generateSources(src);

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Placeholder blur effect */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}

      {/* Main responsive image */}
      {isInView && (
        <picture>
          {/* AVIF sources for modern browsers */}
          {sources.avif.map((source, index) => (
            <source
              key={`avif-${index}`}
              srcSet={source.srcSet}
              type={source.type}
              sizes={sizes}
            />
          ))}

          {/* WebP sources for broader support */}
          {sources.webp.map((source, index) => (
            <source
              key={`webp-${index}`}
              srcSet={source.srcSet}
              type={source.type}
              sizes={sizes}
            />
          ))}

          {/* Fallback image */}
          <img
            src={sources.original}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={handleLoad}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            width={width}
            height={height}
          />
        </picture>
      )}
    </div>
  );
}

// Utility function to create blur data URL
export function createBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

export default OptimizedImage;