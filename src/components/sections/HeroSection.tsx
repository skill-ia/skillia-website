"use client";

import { ArrowDown, Play } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { trackVideoPlay } from "@/utils/analytics";
import { getVideoUrl, getVideoMetadata } from "@/config/videos.config";

// Import testimonial images
//import ChristianImg from "@/assets/testimonials/Christian.png";
//import LeonardoImg from "@/assets/testimonials/Leonardo.png";
//import MillerImg from "@/assets/testimonials/Miller.png";
//import SantiagoImg from "@/assets/testimonials/Santiago.png";

// Import hero video
import VSLThumbnail from "@/assets/skillia_demo_thumbnail.png";
import {
  VideoPlayer,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerMuteButton,
  VideoPlayerControlBar,
  VideoPlayerVolumeRange,
  VideoPlayerPlayButton,
  VideoPlayerContent,
  VideoPlayerFullscreenButton,
} from "@/components/ui/shadcn-io/video-player";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Mock avatar data for social proof
{/* const avatars = [
  {
    src: ChristianImg,
    alt: "Christian",
  },
  {
    src: LeonardoImg,
    alt: "Leonardo",
  },
  {
    src: MillerImg,
    alt: "Miller",
  },
  {
    src: SantiagoImg,
    alt: "Santiago",
  },
];
*/}
interface HeroSectionProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
  variant?: "personal" | "entities";
}

export function HeroSection({
  hasBeenInView = true,
  variant = "personal",
}: HeroSectionProps) {
  const isMobile = useIsMobile();
  const overlayVideoRef = useRef<HTMLVideoElement>(null);

  // State management
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);

  // Use ref for isInitialPlay to avoid race conditions and stale closures
  const isInitialPlayRef = useRef(true);

  // Close overlay handler
  const handleCloseOverlay = () => {
    if (overlayVideoRef.current) {
      overlayVideoRef.current.pause();
    }
    setShowVideoOverlay(false);
  };

  const handlePlayVideo = async () => {
    try {
      const isFirstPlay = isInitialPlayRef.current;

      console.log(`[VIDEO-DEBUG] Play clicked - isFirstPlay: ${isFirstPlay}`);

      // Get video metadata from centralized config
      const videoMetadata = getVideoMetadata('HERO_DEMO');
      const videoUrl = getVideoUrl('HERO_DEMO');

      // Track video play event only on initial play
      if (isFirstPlay) {
        try {
          await trackVideoPlay({
            videoId: videoMetadata?.id || "hero-vsl",
            videoTitle: videoMetadata?.title || "Skillia Demo Video",
            videoUrl: videoUrl,
          });
          console.log(`[VIDEO-DEBUG] Analytics tracked`);
        } catch (analyticsError) {
          console.warn("Analytics tracking failed:", analyticsError);
        }
        isInitialPlayRef.current = false;
      }

      // Both mobile and desktop: Show overlay modal and play video
      setShowVideoOverlay(true);
      // Small delay to ensure overlay is rendered before playing
      await new Promise((resolve) => setTimeout(resolve, 150));

      if (overlayVideoRef.current) {
        overlayVideoRef.current.currentTime = 0;
        await overlayVideoRef.current.play();
        console.log(`[VIDEO-DEBUG] Overlay video started playing`);
      }
    } catch (error) {
      console.warn("Failed to play video or track:", error);
    }
  };

  return (
    <section className="relative w-full min-h-screen text-foreground mb-0 md:mb-0">
      <div className="relative z-10 w-full">
        {/* Main Content */}
        <div className="relative mx-auto z-10 px-[clamp(1rem,4vw,5rem)] py-[clamp(16vh,18vh,20vh)] max-lg:pt-[clamp(16vh,18vh,22vh)] max-lg:pb-[clamp(12vh,16vh,20vh)]">
          {/* Text Content Container - Centered */}
          <div className="mb-[clamp(2rem,4vw,4rem)]">
            <div className="text-center">
              <div className="max-w-6xl mx-auto">
                {/* Main Headline */}
                <div className="mb-[clamp(3vh,5vh,8vh)] max-lg:mb-[clamp(2rem,4vw,3rem)]">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: hasBeenInView ? 1 : 0,
                      y: hasBeenInView ? 0 : 30,
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}>
                    <h1 className="text-5xl font-medium leading-tight text-foreground [word-break:keep-all] [hyphens:none] [overflow-wrap:normal]">
                      {variant === "personal" ? (
                        <>
                            No te quedes atrás en la revolución IA.
                        </>
                      ) : (
                        <>
                          No dejes que tu equipo se quede atrás en la revolución IA.
                        </>
                      )}
                    </h1>
                  </motion.div>
                </div>

                {/* Subtitle */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: hasBeenInView ? 1 : 0,
                    y: hasBeenInView ? 0 : 30,
                  }}
                  transition={{
                    delay: hasBeenInView ? 0.3 : 0,
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-[clamp(1.5rem,3vw,2.5rem)]">
                    {variant === "personal"
                      ? "Aprende a usar las herramientas de IA que están transformando el mundo profesional."
                      : "Mientras tus competidores toman la delantera."}
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: hasBeenInView ? 1 : 0,
                    y: hasBeenInView ? 0 : 30,
                  }}
                  transition={{
                    delay: hasBeenInView ? 0.5 : 0,
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  <div className="flex items-center justify-center lg:gap-2 max-lg:flex-col">
                    {variant === "personal" ? (
                      <>
                        <Button
                          variant="main-hero-button"
                          onClick={() =>
                            (window.location.href = "https://www.skill-ia.com")
                          }>
                          Empieza Gratis
                        </Button>
                        <Button
                          variant="secondary-hero-button"
                          onClick={() =>
                            (window.location.href =
                              "http://www.skill-ia.com?autoSignIn=google")
                          }>
                          <FcGoogle className="w-5 h-auto" />
                          Empieza Gratis con Google
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="main-hero-button"
                          onClick={() => handlePlayVideo()}>
                          Ver una Demo
                        </Button>
                        <Button
                          variant="secondary-hero-button"
                          onClick={() =>
                            (window.location.href = "mailto:info@skill-ia.com")
                          }>
                          Contactar con Ventas
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Content - Video Section */}
          <div className="relative">
            {/* Watch Now Label */}
            <motion.div
              initial={{
                opacity: 0,
                y: -50,
              }}
              animate={{
                opacity: hasBeenInView ? 1 : 0,
                y: hasBeenInView ? 0 : -50,
              }}
              transition={{
                delay: hasBeenInView ? 1.25 : 0,
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1],
              }}>
              <div className="text-center mb-[clamp(0.75rem,2vw,1rem)] animate-pulse hover:animate-none">
                <p className="text-sm text-foreground font-medium tracking-widest flex items-center justify-center gap-2">
                  <ArrowDown className="w-5 h-5 text-[var(--button-color)]" />
                  DEMO
                  <ArrowDown className="w-5 h-5 text-[var(--button-color)]" />
                </p>
              </div>
            </motion.div>

            {/* Video Container */}
            <motion.div
              className="flex justify-center"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: hasBeenInView ? 1 : 0,
                y: hasBeenInView ? 0 : 30,
              }}
              transition={{
                delay: hasBeenInView ? 0.75 : 0,
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1],
              }}>
              <div className="relative aspect-video w-full max-w-[75rem] h-auto rounded-2xl overflow-hidden">
                {/* Thumbnail image for both desktop and mobile */}
                <img
                  src={VSLThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />

                {/* Play Button Overlay (for both mobile and desktop) */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-[10] transition-all duration-300 hover:bg-black/40"
                  onClick={handlePlayVideo}>
                    <div className="relative flex items-center justify-center">
                      {/* Expanding glow ring */}
                      <motion.div
                        className={`absolute ${
                          isMobile ? "w-20 h-16" : "w-24 h-20"
                        } rounded-3xl bg-[var(--button-color)]`}
                        style={{ opacity: 0 }}
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.6, 0, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          times: [0, 0.95, 1],
                        }}
                      />
                      {/* Play button with pulse */}
                      <motion.div
                        className={`bg-[var(--button-color)] supports-[backdrop-filter]:bg-[var(--button-color)] supports-[backdrop-filter]:bg-[var(--button-color)]/70 supports-[backdrop-filter]:bg-[var(--button-color)]/50 supports-[backdrop-filter]:backdrop-blur-sm ${
                          isMobile ? "w-20 h-16" : "w-24 h-20"
                        } flex items-center justify-center rounded-3xl border border-primary/20 shadow-2xl relative z-10 cursor-pointer`}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          times: [0, 0.15, 1],
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(var(--button-color-rgb), 0.8)",
                        }}
                        onClick={handlePlayVideo}>
                        <Play
                          className={`${
                            isMobile ? "w-8 h-8" : "w-10 h-10"
                          } text-background ml-1`}
                        />
                      </motion.div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Overlay Modal (both mobile and desktop) */}
      {showVideoOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseOverlay}>
          <div
            className="relative w-[90vw] max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close video">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video Player in Overlay */}
            <VideoPlayer className="w-full h-full rounded-lg overflow-hidden">
              <VideoPlayerContent
                ref={overlayVideoRef}
                crossOrigin=""
                playsInline
                preload="auto"
                poster={VSLThumbnail}
                slot="media"
                src={getVideoUrl('HERO_DEMO')}
                className="w-full h-full object-cover"
              />
              <VideoPlayerControlBar
                style={
                  {
                    "--media-control-height": isMobile ? "48px" : "40px",
                    "--media-button-icon-width": isMobile ? "24px" : "20px",
                    "--media-button-icon-height": isMobile ? "24px" : "20px",
                  } as React.CSSProperties
                }>
                <VideoPlayerPlayButton className={isMobile ? "p-3" : "p-2.5"} />
                {!isMobile && <VideoPlayerSeekBackwardButton className="p-2.5" />}
                {!isMobile && <VideoPlayerSeekForwardButton className="p-2.5" />}
                <VideoPlayerTimeRange className={isMobile ? "p-3" : "p-2.5"} />
                <VideoPlayerTimeDisplay
                  showDuration
                  className={isMobile ? "p-3 text-sm" : "p-2.5"}
                />
                <VideoPlayerMuteButton className={isMobile ? "p-3" : "p-2.5"} />
                {!isMobile && <VideoPlayerVolumeRange className="p-2.5" />}
                <VideoPlayerFullscreenButton className={isMobile ? "p-3" : "p-2.5"} />
              </VideoPlayerControlBar>
            </VideoPlayer>
          </div>
        </motion.div>
      )}
    </section>
  );
}
