/**
 * Cloudflare R2 Storage Client
 *
 * Utilities for interacting with Cloudflare R2 storage.
 * Currently configured for public bucket access only.
 *
 * For signed URLs (private buckets), use AWS SDK S3 client with R2 endpoints.
 */

import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2BaseUrl, getVideoUrl, type VideoKey } from '@/config/videos.config';

/**
 * R2 Client Configuration
 *
 * Note: These credentials are only needed for signed URLs or private buckets.
 * For public bucket access (current setup), credentials are not required.
 */
interface R2Config {
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName?: string;
}

/**
 * Initialize S3 client for R2 (for future signed URL support)
 *
 * @param config - R2 credentials configuration
 * @returns S3Client instance configured for R2
 */
export const createR2Client = (config: R2Config): S3Client => {
  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey) {
    throw new Error('R2 credentials not configured');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
};

/**
 * Generate a signed URL for private video access
 *
 * @param videoKey - Video key from VIDEOS config
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns Signed URL string
 *
 * @example
 * ```ts
 * const signedUrl = await generateSignedVideoUrl('HERO_DEMO', 3600);
 * ```
 *
 * Note: This function requires R2 credentials to be configured.
 * Not needed for current public bucket setup.
 */
export const generateSignedVideoUrl = async (
  videoKey: VideoKey,
  expiresIn: number = 3600
): Promise<string> => {
  const config: R2Config = {
    accountId: import.meta.env.VITE_R2_ACCOUNT_ID,
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY,
    bucketName: import.meta.env.VITE_R2_BUCKET_NAME,
  };

  const client = createR2Client(config);
  const videoUrl = getVideoUrl(videoKey);

  // Extract filename from URL
  const filename = videoUrl.split('/').pop() || '';

  const command = new HeadObjectCommand({
    Bucket: config.bucketName,
    Key: decodeURIComponent(filename),
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn });
  return signedUrl;
};

/**
 * Validate that a video URL is accessible
 *
 * @param url - Video URL to validate
 * @returns Promise<boolean> - True if video is accessible
 */
export const validateVideoUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Failed to validate video URL:', error);
    return false;
  }
};

/**
 * Get video URL with fallback handling
 *
 * @param videoKey - Video key from VIDEOS config
 * @param fallbackUrl - Optional fallback URL if primary fails
 * @returns Video URL string
 */
export const getVideoUrlWithFallback = (
  videoKey: VideoKey,
  fallbackUrl?: string
): string => {
  const primaryUrl = getVideoUrl(videoKey);

  if (!primaryUrl) {
    console.warn(`Primary video URL not available for ${String(videoKey)}, using fallback`);
    return fallbackUrl || '';
  }

  return primaryUrl;
};

/**
 * Preload video metadata for faster playback
 *
 * @param videoKey - Video key from VIDEOS config
 * @returns Promise<void>
 */
export const preloadVideo = (videoKey: VideoKey): Promise<void> => {
  return new Promise((resolve, reject) => {
    const videoUrl = getVideoUrl(videoKey);
    if (!videoUrl) {
      reject(new Error('Video URL not found'));
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = videoUrl;

    video.addEventListener('loadedmetadata', () => {
      resolve();
    });

    video.addEventListener('error', (error) => {
      reject(error);
    });
  });
};

/**
 * Check R2 configuration status
 *
 * @returns Object with configuration status
 */
export const checkR2Config = () => {
  const baseUrl = getR2BaseUrl();

  return {
    configured: Boolean(baseUrl),
    baseUrl,
    isPublic: true, // Current setup uses public bucket
    hasCredentials: Boolean(
      import.meta.env.VITE_R2_ACCOUNT_ID &&
        import.meta.env.VITE_R2_ACCESS_KEY_ID &&
        import.meta.env.VITE_R2_SECRET_ACCESS_KEY
    ),
  };
};

/**
 * Log R2 configuration for debugging
 */
export const debugR2Config = () => {
  const config = checkR2Config();
  console.log('[R2 Config]', {
    configured: config.configured,
    baseUrl: config.baseUrl,
    isPublic: config.isPublic,
    hasCredentials: config.hasCredentials,
  });
};
