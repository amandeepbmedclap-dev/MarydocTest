"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatedPlayButton } from "./AnimatedPlayButton";

const EASE = [0.22, 1, 0.36, 1] as const;
const scrollViewportMid = { once: false, margin: "-60px" as const };

const featuredStory = {
  name: "Sarah Mitchell",
  role: "Regular Patient",
  location: "Boston, MA",
  videoSrc: "https://download.samplelib.com/mp4/sample-5s.mp4",
  poster:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=675&fit=crop&q=80",
};

export function FeaturedVideoTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!videoSrc) setVideoSrc(featuredStory.videoSrc);

    video.muted = false;
    video.currentTime = 0;
    setShowOverlay(false);

    const startPlayback = () => {
      void video.play().catch(() => {
        setShowOverlay(true);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startPlayback();
      return;
    }

    video.addEventListener("loadeddata", startPlayback, { once: true });
    video.load();
  }, [videoSrc]);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) video.currentTime = 0;
    setShowOverlay(true);
  }, []);

  return (
    <motion.div
      className="mx-auto w-full"
      initial={{ opacity: 1, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={scrollViewportMid}
      transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
    >
      <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl bg-black shadow-[0_16px_40px_rgba(85,44,133,0.18)] sm:aspect-[2/1] sm:rounded-2xl md:aspect-[21/9] md:rounded-3xl lg:rounded-[28px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#552c85] to-[#188a44]" aria-hidden="true" />
        <video
          ref={videoRef}
          src={videoSrc}
          controls={!showOverlay}
          playsInline
          preload="none"
          aria-label={`Video testimonial from ${featuredStory.name}`}
          className="absolute inset-0 h-full w-full object-cover"
          onEnded={handleEnded}
        />

        <AnimatePresence>
          {showOverlay && (
            <motion.div
              key="poster-overlay"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Image
                src={featuredStory.poster}
                alt=""
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1200px) 100vw, 1200px"
                aria-hidden
              />
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedPlayButton
                  asButton
                  size="lg"
                  onClick={handlePlay}
                  ariaLabel={`Play video from ${featuredStory.name}`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { featuredStory };
