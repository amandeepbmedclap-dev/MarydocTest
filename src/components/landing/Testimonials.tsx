"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { FeaturedVideoTestimonial } from "./FeaturedVideoTestimonial";
import { AnimatedPlayButton } from "./AnimatedPlayButton";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.85 };

const videoStories = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    label: "Regular Patient",
    videoSrc: "https://download.samplelib.com/mp4/sample-5s.mp4",
    poster:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&h=720&fit=crop&q=80",
  },
  {
    id: "james",
    name: "James Carter",
    label: "Caregiver",
    videoSrc: "https://download.samplelib.com/mp4/sample-10s.mp4",
    poster:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=720&fit=crop&q=80",
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    label: "Healthcare Professional",
    videoSrc: "https://download.samplelib.com/mp4/sample-15s.mp4",
    poster:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=480&h=720&fit=crop&q=80",
  },
  {
    id: "david",
    name: "David Chen",
    label: "Chronic Care Patient",
    videoSrc: "https://download.samplelib.com/mp4/sample-20s.mp4",
    poster:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=480&h=720&fit=crop&q=80",
  },
  {
    id: "maria",
    name: "Maria Lopez",
    label: "Senior Patient",
    videoSrc: "https://download.samplelib.com/mp4/sample-30s.mp4",
    poster:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=480&h=720&fit=crop&q=80",
  },
];

const scrollViewportMid = { once: true, margin: "0px 0px -40px 0px" as const, amount: 0.1 };

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const tablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");

    const update = () => {
      if (mobile.matches) setVisibleCount(1);
      else if (tablet.matches) setVisibleCount(2);
      else setVisibleCount(3);
    };

    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return visibleCount;
}

function cardWidthClass(visibleCount: number) {
  if (visibleCount === 1) return "w-full";
  if (visibleCount === 2) return "w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.625rem)]";
  return "w-[calc(33.333%-0.667rem)] lg:w-[calc(33.333%-1rem)]";
}

function slideOffset(slideIndex: number, visibleCount: number) {
  const gap = visibleCount === 1 ? 0 : visibleCount === 2 ? 8 : 12;
  return `calc(-${slideIndex} * (100% / ${visibleCount}) - ${slideIndex * gap}px)`;
}

function VideoStoryThumbnail({
  poster,
}: {
  poster: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#552c85] to-[#188a44]" aria-hidden="true" />
      {!imageError ? (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 320px"
          onError={() => setImageError(true)}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <AnimatedPlayButton />
      </div>
    </div>
  );
}

function VideoModal({
  open,
  onClose,
  name,
  videoSrc,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  videoSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!open || !video) return;

    video.currentTime = 0;

    const startPlayback = () => {
      void video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
      return;
    }

    video.addEventListener("loadeddata", startPlayback, { once: true });
    video.load();

    return () => {
      video.removeEventListener("loadeddata", startPlayback);
    };
  }, [open, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (open || !video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-modal"
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-black/70 p-3 sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} testimonial video`}
        >
          <motion.div
            className="relative w-full max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl bg-black shadow-2xl sm:max-w-2xl sm:rounded-2xl md:max-w-3xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={SPRING}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Close video"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <video
              key={videoSrc}
              ref={videoRef}
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous videos" : "Next videos"}
      className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#552c85] text-white transition-colors duration-300 hover:bg-[#45236d] disabled:cursor-not-allowed disabled:opacity-35"
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={SPRING}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        {direction === "left" ? (
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </motion.button>
  );
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<(typeof videoStories)[number] | null>(null);
  const visibleCount = useVisibleCount();
  const touchStart = useRef({ x: 0, y: 0 });

  const maxIndex = Math.max(0, videoStories.length - visibleCount);
  const dotCount = maxIndex + 1;

  useEffect(() => {
    setSlideIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  const goNext = () => setSlideIndex((i) => Math.min(maxIndex, i + 1));
  const goPrev = () => setSlideIndex((i) => Math.max(0, i - 1));

  const handleTouchStart = (clientX: number, clientY: number) => {
    touchStart.current = { x: clientX, y: clientY };
  };

  const handleTouchEnd = (clientX: number, clientY: number) => {
    const diffX = touchStart.current.x - clientX;
    const diffY = touchStart.current.y - clientY;
    if (Math.abs(diffX) < 40 || Math.abs(diffX) < Math.abs(diffY)) return;
    if (diffX > 0) goNext();
    else goPrev();
  };

  return (
    <section id="testimonials" className="relative z-10 scroll-mt-20 sm:scroll-mt-24">
      <div className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <FeaturedVideoTestimonial />

          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <motion.div
              className="relative"
              initial={{ opacity: 1, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewportMid}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5">
                <div className="hidden md:block">
                  <CarouselArrow direction="left" disabled={slideIndex === 0} onClick={goPrev} />
                </div>

                <div
                  className="flex-1 overflow-hidden touch-pan-y"
                  onTouchStart={(e) => handleTouchStart(e.touches[0].clientX, e.touches[0].clientY)}
                  onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
                >
                  <motion.div
                    className="flex gap-3 sm:gap-4 lg:gap-6"
                    animate={{ x: slideOffset(slideIndex, visibleCount) }}
                    transition={prefersReducedMotion ? { duration: 0.3 } : SPRING}
                  >
                    {videoStories.map((story) => (
                      <motion.button
                        key={story.id}
                        type="button"
                        onClick={() => setActiveVideo(story)}
                        aria-label={`Play video testimonial from ${story.name}, ${story.label}`}
                        className={`group relative aspect-[3/4] shrink-0 cursor-pointer overflow-hidden rounded-lg sm:aspect-[9/14] sm:rounded-xl md:rounded-2xl ${cardWidthClass(visibleCount)} max-h-[320px] sm:max-h-[380px] md:max-h-none`}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={SPRING}
                      >
                        <VideoStoryThumbnail poster={story.poster} />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                <div className="hidden md:block">
                  <CarouselArrow direction="right" disabled={slideIndex >= maxIndex} onClick={goNext} />
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-3 md:hidden">
                <CarouselArrow direction="left" disabled={slideIndex === 0} onClick={goPrev} />
                <CarouselArrow direction="right" disabled={slideIndex >= maxIndex} onClick={goNext} />
              </div>

              <div className="mt-6 flex justify-center gap-1 sm:mt-8 sm:gap-2">
                {Array.from({ length: dotCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === slideIndex ? "true" : undefined}
                    onClick={() => setSlideIndex(i)}
                    className="relative flex h-11 w-11 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-[width,background-color] duration-300 ease-out ${
                        i === slideIndex ? "h-2.5 w-6 bg-[#552c85]" : "h-2.5 w-2.5 bg-[#d1d5db]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <VideoModal
        open={Boolean(activeVideo)}
        onClose={closeModal}
        name={activeVideo?.name ?? ""}
        videoSrc={activeVideo?.videoSrc ?? ""}
      />
    </section>
  );
}
