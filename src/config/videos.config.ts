/**
 * Centralized Video Configuration
 *
 * This file manages all video assets stored in Cloudflare R2.
 * Videos are served via Cloudflare Pages Functions using native R2 bindings
 * for optimal performance (zero network hops, same-origin serving).
 *
 * Video URLs are generated as relative paths: /media/[videoKey]
 * The Cloudflare Function at functions/media/[videoKey].js handles serving.
 */

export interface VideoMetadata {
  id: string;
  title: string;
  filename: string;
  thumbnail?: string;
  description?: string;
  category?: 'hero' | 'testimonial' | 'demo' | 'tutorial';
}

/**
 * Video catalog - All videos available in the application
 */
export const VIDEOS: Record<string, VideoMetadata> = {
  // Hero Section - Main Demo Video
  HERO_DEMO: {
    id: 'hero-vsl',
    title: 'Ahorra tiempo, esfuerzo y dinero mientras aprendes trading con el curso más completo',
    filename: 'Skillia Demo.mp4',
    thumbnail: '/src/assets/skillia_demo_thumbnail.png',
    description: 'Main hero video sales letter',
    category: 'hero',
  },

  // Case Studies - Testimonial Videos (Currently commented out in components)
  TESTIMONIAL_CHRISTIAN: {
    id: 'testimonial-christian',
    title: 'Christian - Operaciones Superiores al 11% Diario',
    filename: 'Christian.mp4',
    category: 'testimonial',
  },

  TESTIMONIAL_LEONARDO: {
    id: 'testimonial-leonardo',
    title: 'Leonardo - Operaciones de Hasta 7x',
    filename: 'Leonardo.mp4',
    category: 'testimonial',
  },

  TESTIMONIAL_MILLER: {
    id: 'testimonial-miller',
    title: 'Miller - Triplicó su Cuenta en 3 Meses',
    filename: 'Miller.mp4',
    category: 'testimonial',
  },

  TESTIMONIAL_SANTIAGO: {
    id: 'testimonial-santiago',
    title: 'Santiago - Rentabilidad del 50% en 3 Meses',
    filename: 'Santiago.mp4',
    category: 'testimonial',
  },

  TESTIMONIAL_ETHSON: {
    id: 'testimonial-ethson',
    title: 'Ethson - Dejó su Oficio en la Banca para Vivir del Trading',
    filename: 'Ethson.mp4',
    category: 'testimonial',
  },
} as const;

/**
 * Get the base URL for the R2 bucket (legacy - kept for backward compatibility)
 *
 * @deprecated This function is no longer needed as videos are served via
 * Cloudflare Functions with R2 bindings. It's kept for potential fallback scenarios.
 */
export const getR2BaseUrl = (): string => {
  return import.meta.env.VITE_R2_BUCKET_URL || '';
};

/**
 * Build a video URL from a video key
 *
 * Videos are now served via Cloudflare Pages Functions using R2 bindings.
 * This provides optimal performance as videos are served from the same edge
 * location as your website, with zero network hops to R2.
 *
 * @param videoKey - Key from VIDEOS object (e.g., 'HERO_DEMO')
 * @returns Relative URL to the video served via Cloudflare Function
 *
 * @example
 * ```ts
 * const heroVideoUrl = getVideoUrl('HERO_DEMO');
 * // Returns: "/media/HERO_DEMO"
 * // Served by: functions/media/[videoKey].js
 * ```
 */
export const getVideoUrl = (videoKey: keyof typeof VIDEOS): string => {
  const video = VIDEOS[videoKey];
  if (!video) {
    console.error(`Video not found: ${String(videoKey)}`);
    return '';
  }

  // Return relative URL - served by Cloudflare Pages Function
  // The function at functions/media/[videoKey].js will handle the request
  // and stream the video directly from R2 using the binding
  return `/media/${String(videoKey)}`;
};

/**
 * Get video metadata by key
 *
 * @param videoKey - Key from VIDEOS object
 * @returns Video metadata object
 */
export const getVideoMetadata = (videoKey: keyof typeof VIDEOS): VideoMetadata | undefined => {
  return VIDEOS[videoKey];
};

/**
 * Get all videos by category
 *
 * @param category - Video category to filter by
 * @returns Array of video metadata objects
 */
export const getVideosByCategory = (
  category: VideoMetadata['category']
): VideoMetadata[] => {
  return Object.values(VIDEOS).filter(video => video.category === category);
};

/**
 * Type-safe video keys
 */
export type VideoKey = keyof typeof VIDEOS;

/**
 * Export video keys for easy reference
 */
export const VIDEO_KEYS = Object.keys(VIDEOS) as VideoKey[];
