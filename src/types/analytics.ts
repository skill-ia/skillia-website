export interface BaseAnalyticsEvent {
  timestamp: number;
  session_id?: string;
  user_agent: string;
  referrer: string;
  page_url: string;
}

export interface VideoPlayEvent extends BaseAnalyticsEvent {
  event: 'video_play';
  video_id: string;
  video_title: string;
  video_url: string;
}

export interface VideoEngagementEvent extends BaseAnalyticsEvent {
  event: 'video_engagement';
  video_id: string;
  engagement_type: '25%' | '50%' | '75%' | '100%' | 'pause' | 'resume' | 'seek';
  current_time: number;
  total_duration: number;
  engagement_percentage: number;
}

export interface ConversionEvent extends BaseAnalyticsEvent {
  event: 'conversion';
  conversion_type: 'email_signup' | 'booking' | 'purchase' | 'download' | 'cta_click';
  video_source: boolean;
  time_since_video?: number;
  conversion_value?: number;
  conversion_id?: string;
}

export interface PageViewEvent extends BaseAnalyticsEvent {
  event: 'page_view';
  page_title: string;
  scroll_depth?: number;
  time_on_page?: number;
}

export type AnalyticsEvent = 
  | VideoPlayEvent 
  | VideoEngagementEvent 
  | ConversionEvent 
  | PageViewEvent;

export interface AnalyticsProvider {
  name: string;
  enabled: boolean;
  track: (event: AnalyticsEvent) => Promise<void>;
}

export interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  enableConsoleLogging?: boolean;
  enableBatching?: boolean;
  batchSize?: number;
  batchTimeout?: number;
}

export interface SessionData {
  session_id: string;
  start_time: number;
  video_plays: VideoPlayEvent[];
  conversions: ConversionEvent[];
  total_watch_time: number;
  pages_visited: string[];
}