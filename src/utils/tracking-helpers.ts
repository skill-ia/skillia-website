import { trackConversion } from './analytics';
//import type { ConversionEvent } from '@/types/analytics';

/**
 * Helper functions for common tracking scenarios throughout the app
 */

// Track CTA button clicks
export const trackCTAClick = async (ctaLocation: string, ctaText: string) => {
  await trackConversion({
    conversionType: 'cta_click',
    conversionId: `cta_${ctaLocation}_${Date.now()}`
  });
  
  // Also track as a custom event for more detailed analysis
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
      custom_parameter: 'hero_section'
    });
  }
};

// Track email signup (for newsletter, lead magnets, etc.)
export const trackEmailSignup = async (source: string) => {
  await trackConversion({
    conversionType: 'email_signup',
    conversionId: `email_${source}_${Date.now()}`
  });
  
  console.log('📧 Email signup tracked:', { source, timestamp: Date.now() });
};

// Track booking/calendar events
export const trackBookingEvent = async (bookingType: string, value?: number) => {
  await trackConversion({
    conversionType: 'booking',
    conversionValue: value,
    conversionId: `booking_${bookingType}_${Date.now()}`
  });
  
  console.log('📅 Booking event tracked:', { bookingType, value, timestamp: Date.now() });
};

// Track downloads (PDFs, resources, etc.)
export const trackDownload = async (fileName: string, fileType: string) => {
  await trackConversion({
    conversionType: 'download',
    conversionId: `download_${fileName}_${Date.now()}`
  });
  
  console.log('📁 Download tracked:', { fileName, fileType, timestamp: Date.now() });
};

// Track scroll depth for engagement analysis
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined') {
    // Throttle scroll tracking to avoid too many events
    const lastTracked = (window as any).__lastScrollDepth || 0;
    const threshold = 25; // Track every 25% of scroll
    
    if (depth >= lastTracked + threshold) {
      (window as any).__lastScrollDepth = depth;
      console.log(`📜 Scroll depth: ${depth}%`);
      
      // You can send this to analytics providers if needed
      if ((window as any).gtag) {
        (window as any).gtag('event', 'scroll', {
          scroll_depth: depth,
          page_location: window.location.href
        });
      }
    }
  }
};

// Example usage in components:
// onClick={() => trackCTAClick('hero', 'Get Started Now')}
// onSubmit={(email) => trackEmailSignup('newsletter', email)}
// onBooking={() => trackBookingEvent('consultation', 100)}
// onDownload={() => trackDownload('trading-guide.pdf', 'guide')}