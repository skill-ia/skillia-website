"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  VideoPlayer,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerMuteButton,
  VideoPlayerVolumeRange,
  VideoPlayerFullscreenButton,
  VideoPlayerContent,
} from "@/components/ui/shadcn-io/video-player";

export interface CarouselProps {
  items: React.JSX.Element[];
  isVisible?: boolean;
}

export type Card = {
  src: string;
  title: string;
  category?: string;
  content: React.ReactNode;
  video: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, isVisible = true }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClose = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div className="flex justify-center items-center py-6 md:py-10">
          <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mx-auto max-w-7xl px-4">
            {items.map((item, index) => {
              const delay = 0.2 + index * 0.1; // 0.2s, 0.3s, 0.4s, 0.5s, 0.6s

              return (
                <motion.div
                  key={"card" + index}
                  className="rounded-3xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  {item}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export type CardProps = {
  card: Card;
  index: number;
  layout?: boolean;
};

export const Card = ({ card, index, layout = false }: CardProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  // Mobile detection and video player state management
  const isMobile = useIsMobile();
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const isInitialPlayRef = useRef(true);

  // Auto-hide controls logic for mobile
  const resetHideControlsTimer = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    if (isMobile && isPlaying && hasStartedPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds of inactivity
    }
  }, [isMobile, isPlaying, hasStartedPlaying]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      // Show controls immediately when modal opens
      setShowControls(true);

      // Programmatically play video when modal opens
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay failed, user interaction required
          });
        }
      }, 500);
    } else {
      document.body.style.overflow = "auto";
      // Stop and reset video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      // Reset state when modal closes
      setShowControls(false);
      setIsPlaying(false);
      setHasStartedPlaying(false);
      isInitialPlayRef.current = true;
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Comprehensive video event listeners (iOS Safari fixes + state management)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari Fix: Force currentTime = 0 on metadata/data load
    const handleLoadedMetadata = () => {
      if (isMobile && isInitialPlayRef.current && video) {
        video.currentTime = 0;
      }
    };

    const handleLoadedData = () => {
      if (isMobile && isInitialPlayRef.current && video) {
        video.currentTime = 0;
      }
    };

    const handleCanPlay = () => {
      if (isMobile && isInitialPlayRef.current && video) {
        video.currentTime = 0;
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasStartedPlaying(true);

      // Desktop: show controls immediately and keep visible
      if (!isMobile) {
        setShowControls(true);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);

      // Clear auto-hide timer
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }

      setShowControls(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);

      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };

    const handleFullscreenChange = () => {
      if (hasStartedPlaying) {
        setShowControls(true);
        resetHideControlsTimer();
      }
    };

    const handleVideoClick = () => {
      // Mobile: toggle controls on video tap
      if (isMobile && hasStartedPlaying) {
        setShowControls(prev => !prev);
        if (!showControls) {
          resetHideControlsTimer();
        }
      }
    };

    // Add listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("click", handleVideoClick);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);

    // Cleanup
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("click", handleVideoClick);

      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);

      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [isMobile, hasStartedPlaying, showControls, resetHideControlsTimer]);

  useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    handleClose()
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden overscroll-none touch-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-background/80 supports-[backdrop-filter]:bg-background/50 supports-[backdrop-filter]:backdrop-blur-lg"
              style={{ touchAction: 'none' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden"
              style={{ touchAction: 'auto' }}>
              <div className="relative p-6 md:p-8">
                <button
                  className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 hover:bg-background cursor-pointer transition-colors duration-200"
                  onClick={handleClose}>
                  <IconX className="h-5 w-5 text-primary" />
                </button>

                <motion.h2
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="text-2xl md:text-4xl font-bold text-primary mb-2">
                  {card.title}
                </motion.h2>

                <motion.p
                  layoutId={layout ? `content-${card.content}` : undefined}
                  className="text-lg md:text-xl font-semibold text-[var(--button-color)] mb-6">
                  {card.content}
                </motion.p>
              </div>

              <div className="aspect-video w-full">
                <VideoPlayer className="w-full h-full">
                  <VideoPlayerContent
                    ref={videoRef}
                    crossOrigin=""
                    playsInline
                    preload={isMobile ? "metadata" : "auto"}
                    poster={card.src}
                    slot="media"
                    src={card.video}
                    className="w-full h-full object-cover"
                  />
                  {/* Conditional rendering: Desktop always visible, mobile shows when controls visible */}
                  {((!isMobile) || (isMobile && showControls)) && (
                    <VideoPlayerControlBar
                      className={`
                        ${isMobile ? 'mobile-video-controls' : ''}
                        ${isMobile ? 'transition-opacity duration-300' : ''}
                        ${
                          isMobile && showControls ? 'opacity-100' :
                          isMobile && !showControls ? 'opacity-0 pointer-events-none' :
                          'opacity-100'
                        }
                      `}
                      style={{
                        '--media-control-height': isMobile ? '48px' : '40px',
                        '--media-button-icon-width': isMobile ? '24px' : '20px',
                        '--media-button-icon-height': isMobile ? '24px' : '20px',
                        // Media-chrome mobile auto-seek prevention
                        '--media-seek-backward-seconds': '0',
                        '--media-seek-forward-seconds': '0',
                        '--media-mobile-auto-seek': 'false',
                        '--media-auto-seek-offset': '0s',
                      } as React.CSSProperties}
                      onMouseEnter={() => {
                        if (isMobile && hasStartedPlaying) {
                          setShowControls(true);
                          resetHideControlsTimer();
                        }
                      }}
                      onTouchStart={() => {
                        if (isMobile && hasStartedPlaying) {
                          setShowControls(true);
                          resetHideControlsTimer();
                        }
                      }}
                    >
                      <VideoPlayerPlayButton className={isMobile ? 'p-3' : 'p-2.5'} />
                      {!isMobile && <VideoPlayerSeekBackwardButton className="p-2.5" />}
                      {!isMobile && <VideoPlayerSeekForwardButton className="p-2.5" />}
                      <VideoPlayerTimeRange className={isMobile ? 'p-3' : 'p-2.5'} />
                      <VideoPlayerTimeDisplay showDuration className={isMobile ? 'p-3 text-sm' : 'p-2.5'} />
                      <VideoPlayerMuteButton className={isMobile ? 'p-3' : 'p-2.5'} />
                      {!isMobile && <VideoPlayerVolumeRange className="p-2.5" />}
                      <VideoPlayerFullscreenButton className={isMobile ? 'p-3' : 'p-2.5'} />
                    </VideoPlayerControlBar>
                  )}
                </VideoPlayer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-40 w-32 sm:h-48 sm:w-40 md:h-64 md:w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-background cursor-pointer group">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-background/90 opacity-75 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="relative z-40 p-4 md:p-6">
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="max-w-xs text-left font-sans text-sm font-semibold [text-wrap:balance] text-primary md:text-lg">
            {card.title}
          </motion.p>
          <motion.p
            layoutId={layout ? `content-${card.content}` : undefined}
            className="text-left font-sans text-xs font-bold text-[var(--button-color)] md:text-sm">
            {card.content}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

export type BlurImageProps = {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300 outline-none",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
