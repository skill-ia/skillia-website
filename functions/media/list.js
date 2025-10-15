/**
 * Cloudflare Pages Function - Video List API
 *
 * This function provides a JSON API to list all available videos
 * with their metadata. Useful for dynamic video management and
 * admin interfaces.
 *
 * Route: /media/list
 * Method: GET
 *
 * Response Format:
 * {
 *   "videos": [
 *     {
 *       "key": "HERO_DEMO",
 *       "id": "hero-vsl",
 *       "title": "Ahorra tiempo...",
 *       "filename": "Skillia Demo.mp4",
 *       "category": "hero",
 *       "url": "/media/HERO_DEMO",
 *       "exists": true
 *     },
 *     ...
 *   ],
 *   "total": 6
 * }
 */

// Video catalog with full metadata
// Note: Keep this in sync with src/config/videos.config.ts
const VIDEO_CATALOG = {
  HERO_DEMO: {
    id: 'hero-vsl',
    title: 'Ahorra tiempo, esfuerzo y dinero mientras aprendes trading con el curso más completo',
    filename: 'Skillia Demo.mp4',
    category: 'hero',
    description: 'Main hero video sales letter',
  },
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
};

/**
 * Check if a video file exists in R2 bucket
 */
async function checkVideoExists(bucket, filename) {
  try {
    const object = await bucket.head(filename);
    return object !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { env, request } = context;

  try {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', {
        status: 405,
        headers: {
          'Allow': 'GET, OPTIONS',
        }
      });
    }

    // Access R2 bucket via binding
    const bucket = env['website-media-bucket'];
    if (!bucket) {
      console.error('R2 binding not found. Check wrangler.toml configuration.');
      return new Response(
        JSON.stringify({ error: 'R2 bucket not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const checkExistence = url.searchParams.get('checkExists') === 'true';

    // Build video list
    const videos = await Promise.all(
      Object.entries(VIDEO_CATALOG).map(async ([key, metadata]) => {
        // Filter by category if specified
        if (category && metadata.category !== category) {
          return null;
        }

        const video = {
          key,
          ...metadata,
          url: `/media/${key}`,
        };

        // Optionally check if video exists in R2
        if (checkExistence) {
          video.exists = await checkVideoExists(bucket, metadata.filename);
        }

        return video;
      })
    );

    // Remove null entries (filtered by category)
    const filteredVideos = videos.filter(v => v !== null);

    // Build response
    const response = {
      videos: filteredVideos,
      total: filteredVideos.length,
      categories: [...new Set(filteredVideos.map(v => v.category))],
    };

    // Add filter info if category was specified
    if (category) {
      response.filter = { category };
    }

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    console.error('Error listing videos:', error);
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
