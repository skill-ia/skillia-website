/**
 * DEPRECATED: This file has been replaced by the new R2 binding architecture
 *
 * Video retrieval is now handled by:
 * - functions/media/[videoKey].js - Serves individual videos
 * - functions/media/list.js - Lists all available videos
 *
 * These new functions use Cloudflare R2 bindings for optimal performance.
 *
 * Migration Notes:
 * - Old approach: Public R2 URLs (https://pub-xxx.r2.dev/...)
 * - New approach: Same-origin URLs via Pages Functions (/media/HERO_DEMO)
 * - Benefits: Zero network hops, better caching, same-origin serving
 */

export async function onRequest() {
  return new Response(
    JSON.stringify({
      message: 'This endpoint is deprecated',
      documentation: {
        videoServing: '/media/[videoKey] - Serves individual videos',
        videoListing: '/media/list - Lists all available videos',
      },
      migration: 'Videos are now served via Cloudflare R2 bindings',
    }),
    {
      status: 410, // Gone
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
}
