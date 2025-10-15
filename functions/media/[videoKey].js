/**
 * Cloudflare Pages Function - Video Server with R2 Binding
 *
 * This function serves videos directly from R2 storage using Cloudflare's
 * native R2 binding, providing optimal performance with zero network hops.
 *
 * Route: /media/[videoKey]
 * Example: /media/HERO_DEMO → serves "Skillia Demo.mp4"
 *
 * Features:
 * - Direct R2 access via binding (no HTTP requests)
 * - HTTP Range request support (for video seeking/scrubbing)
 * - Proper video headers (Content-Type, Content-Length, Accept-Ranges)
 * - Efficient caching with Cache-Control headers
 * - Error handling for missing videos
 */

// Video catalog - Maps video keys to R2 filenames
// Note: This duplicates src/config/videos.config.ts mapping
// Keep these in sync when adding/removing videos
const VIDEO_CATALOG = {
  HERO_DEMO: 'Skillia Demo.mp4',
  TESTIMONIAL_CHRISTIAN: 'Christian.mp4',
  TESTIMONIAL_LEONARDO: 'Leonardo.mp4',
  TESTIMONIAL_MILLER: 'Miller.mp4',
  TESTIMONIAL_SANTIAGO: 'Santiago.mp4',
  TESTIMONIAL_ETHSON: 'Ethson.mp4',
};

/**
 * Get MIME type based on file extension
 */
function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Parse Range header for partial content requests
 * Returns null if no range or invalid range
 */
function parseRangeHeader(rangeHeader, fileSize) {
  if (!rangeHeader || !rangeHeader.startsWith('bytes=')) {
    return null;
  }

  const parts = rangeHeader.slice(6).split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  // Validate range
  if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
    return null;
  }

  return { start, end };
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { request, env, params } = context;

  try {
    // Extract video key from URL parameter
    const videoKey = params.videoKey;

    // Validate video key exists in catalog
    const filename = VIDEO_CATALOG[videoKey];
    if (!filename) {
      return new Response(
        JSON.stringify({
          error: 'Video not found',
          videoKey,
          availableKeys: Object.keys(VIDEO_CATALOG)
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          }
        }
      );
    }

    // Access R2 bucket via binding
    const bucket = env['website-media-bucket'];
    if (!bucket) {
      console.error('R2 binding not found. Check wrangler.toml configuration.');
      return new Response('R2 bucket not configured', { status: 500 });
    }

    // Fetch video object from R2
    const object = await bucket.get(filename);

    if (!object) {
      return new Response(
        JSON.stringify({
          error: 'Video file not found in R2 bucket',
          filename,
          videoKey
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Get file size and MIME type
    const fileSize = object.size;
    const mimeType = getMimeType(filename);

    // Parse Range header for partial content requests (video seeking)
    const rangeHeader = request.headers.get('Range');
    const range = parseRangeHeader(rangeHeader, fileSize);

    // Prepare response headers
    const headers = {
      'Content-Type': mimeType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 year cache
      'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
    };

    // Handle OPTIONS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // Handle HEAD request (metadata only)
    if (request.method === 'HEAD') {
      return new Response(null, {
        status: 200,
        headers: {
          ...headers,
          'Content-Length': fileSize.toString(),
        }
      });
    }

    // Handle range request (partial content)
    if (range) {
      const { start, end } = range;
      const contentLength = end - start + 1;

      // Slice the R2 object for the requested range
      const partialObject = await bucket.get(filename, {
        range: { offset: start, length: contentLength }
      });

      if (!partialObject) {
        return new Response('Range not satisfiable', { status: 416 });
      }

      return new Response(partialObject.body, {
        status: 206, // Partial Content
        headers: {
          ...headers,
          'Content-Length': contentLength.toString(),
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        }
      });
    }

    // Handle full file request
    return new Response(object.body, {
      status: 200,
      headers: {
        ...headers,
        'Content-Length': fileSize.toString(),
      }
    });

  } catch (error) {
    console.error('Error serving video:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
