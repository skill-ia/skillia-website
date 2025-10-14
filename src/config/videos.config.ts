/**
 * Centralized Video Configuration
 *
 * This file manages all video assets stored in Cloudflare R2.
 * Videos are served from a public R2 bucket and do not require authentication.
 *
 * Environment Variables:
 * - VITE_R2_BUCKET_URL: Base URL for R2 bucket (set in .env.local)
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
 * Get the base URL for the R2 bucket
 * Falls back to empty string if environment variable is not set
 */
export const getR2BaseUrl = (): string => {
  return import.meta.env.VITE_R2_BUCKET_URL || '';
};

/**
 * Build a complete video URL from a video key
 *
 * @param videoKey - Key from VIDEOS object (e.g., 'HERO_DEMO')
 * @returns Complete URL to the video file
 *
 * @example
 * ```ts
 * const heroVideoUrl = getVideoUrl('HERO_DEMO');
 * // Returns: "https://pub-xxxxx.r2.dev/Skillia%20Demo.mp4"
 * ```
 */
export const getVideoUrl = (videoKey: keyof typeof VIDEOS): string => {
  const video = VIDEOS[videoKey];
  if (!video) {
    console.error(`Video not found: ${String(videoKey)}`);
    return '';
  }

  const baseUrl = getR2BaseUrl();
  if (!baseUrl) {
    console.error('R2 bucket URL not configured. Set VITE_R2_BUCKET_URL in .env.local');
    return '';
  }

  // URL encode the filename to handle spaces and special characters
  const encodedFilename = encodeURIComponent(video.filename);

  return `${baseUrl}/${encodedFilename}`;
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
