import type { 
  AnalyticsEvent, 
  AnalyticsProvider, 
  AnalyticsConfig,
  VideoPlayEvent,
  VideoEngagementEvent,
  ConversionEvent,
  SessionData
} from '@/types/analytics';

class AnalyticsManager {
  private providers: AnalyticsProvider[] = [];
  private config: AnalyticsConfig;
  private sessionData: SessionData;
  private eventQueue: AnalyticsEvent[] = [];
  private batchTimer?: NodeJS.Timeout;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.providers = config.providers;
    this.sessionData = this.initializeSession();
    
    if (config.enableBatching) {
      this.startBatchTimer();
    }
  }

  private initializeSession(): SessionData {
    const sessionId = this.generateSessionId();
    return {
      session_id: sessionId,
      start_time: Date.now(),
      video_plays: [],
      conversions: [],
      total_watch_time: 0,
      pages_visited: [window.location.pathname]
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBaseEventData() {
    return {
      timestamp: Date.now(),
      session_id: this.sessionData.session_id,
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      page_url: window.location.href
    };
  }

  private async trackEvent(event: AnalyticsEvent): Promise<void> {
    // Add to session data
    this.updateSessionData(event);

    if (this.config.enableConsoleLogging) {
      console.log('📊 Analytics Event:', event);
    }

    if (this.config.enableBatching) {
      this.eventQueue.push(event);
      if (this.eventQueue.length >= (this.config.batchSize || 5)) {
        await this.flushQueue();
      }
    } else {
      await this.sendToProviders([event]);
    }
  }

  private async sendToProviders(events: AnalyticsEvent[]): Promise<void> {
    const promises = this.providers
      .filter(provider => provider.enabled)
      .map(async (provider) => {
        try {
          for (const event of events) {
            await provider.track(event);
          }
        } catch (error) {
          console.warn(`Analytics provider ${provider.name} failed:`, error);
        }
      });

    await Promise.allSettled(promises);
  }

  private updateSessionData(event: AnalyticsEvent): void {
    switch (event.event) {
      case 'video_play':
        this.sessionData.video_plays.push(event);
        break;
      case 'conversion':
        this.sessionData.conversions.push(event);
        break;
      case 'video_engagement':
        if (event.engagement_type !== 'pause' && event.engagement_type !== 'seek') {
          this.sessionData.total_watch_time += event.current_time;
        }
        break;
    }
  }

  private startBatchTimer(): void {
    this.batchTimer = setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flushQueue();
      }
    }, this.config.batchTimeout || 10000);
  }

  private async flushQueue(): Promise<void> {
    if (this.eventQueue.length === 0) return;
    
    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];
    
    await this.sendToProviders(eventsToSend);
  }

  // Public tracking methods
  public async trackVideoPlay(data: {
    videoId: string;
    videoTitle: string;
    videoUrl: string;
  }): Promise<void> {
    const event: VideoPlayEvent = {
      ...this.getBaseEventData(),
      event: 'video_play',
      video_id: data.videoId,
      video_title: data.videoTitle,
      video_url: data.videoUrl
    };

    await this.trackEvent(event);
  }

  public async trackVideoEngagement(data: {
    videoId: string;
    engagementType: VideoEngagementEvent['engagement_type'];
    currentTime: number;
    totalDuration: number;
  }): Promise<void> {
    const engagementPercentage = (data.currentTime / data.totalDuration) * 100;
    
    const event: VideoEngagementEvent = {
      ...this.getBaseEventData(),
      event: 'video_engagement',
      video_id: data.videoId,
      engagement_type: data.engagementType,
      current_time: data.currentTime,
      total_duration: data.totalDuration,
      engagement_percentage: Math.round(engagementPercentage)
    };

    await this.trackEvent(event);
  }

  public async trackConversion(data: {
    conversionType: ConversionEvent['conversion_type'];
    conversionValue?: number;
    conversionId?: string;
  }): Promise<void> {
    const hasWatchedVideo = this.sessionData.video_plays.length > 0;
    const timeSinceLastVideo = hasWatchedVideo 
      ? Date.now() - this.sessionData.video_plays[this.sessionData.video_plays.length - 1].timestamp
      : undefined;

    const event: ConversionEvent = {
      ...this.getBaseEventData(),
      event: 'conversion',
      conversion_type: data.conversionType,
      video_source: hasWatchedVideo,
      time_since_video: timeSinceLastVideo ? Math.round(timeSinceLastVideo / 1000 / 60) : undefined,
      conversion_value: data.conversionValue,
      conversion_id: data.conversionId
    };

    await this.trackEvent(event);
  }

  public getSessionData(): SessionData {
    return { ...this.sessionData };
  }

  public async destroy(): Promise<void> {
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
    }
    await this.flushQueue();
  }
}

// Console Logger Provider (for development)
const consoleProvider: AnalyticsProvider = {
  name: 'console',
  enabled: process.env.NODE_ENV === 'development',
  track: async (event: AnalyticsEvent) => {
    const timestamp = new Date(event.timestamp).toISOString();
    console.group(`📊 ${event.event.toUpperCase()} - ${timestamp}`);
    console.table(event);
    console.groupEnd();
  }
};

// Default configuration
const defaultConfig: AnalyticsConfig = {
  providers: [consoleProvider],
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableBatching: false, // Disabled for real-time tracking
  batchSize: 5,
  batchTimeout: 10000
};

// Global analytics instance
export const analytics = new AnalyticsManager(defaultConfig);

// Convenience functions
export const trackVideoPlay = (data: {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
}) => analytics.trackVideoPlay(data);

export const trackVideoEngagement = (data: {
  videoId: string;
  engagementType: VideoEngagementEvent['engagement_type'];
  currentTime: number;
  totalDuration: number;
}) => analytics.trackVideoEngagement(data);

export const trackConversion = (data: {
  conversionType: ConversionEvent['conversion_type'];
  conversionValue?: number;
  conversionId?: string;
}) => analytics.trackConversion(data);

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    analytics.destroy();
  });
}