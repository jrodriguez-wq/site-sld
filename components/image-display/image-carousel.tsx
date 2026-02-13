"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/container";

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showThumbnails?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  theme?: "dark" | "light";
  className?: string;
  useContainer?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { x: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: { x: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } },
  }),
};

const ImageCarousel = ({
  images,
  eyebrow,
  headline,
  highlightedText,
  autoplay = true,
  autoplayInterval = 5000,
  showThumbnails = true,
  showDots = true,
  showCounter = true,
  aspectRatio = "video",
  theme = "dark",
  className = "",
  useContainer = true,
}: ImageCarouselProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const isDark = theme === "dark";

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };

  const paginate = useCallback(
    (newDirection: number) => {
      let newIndex = currentIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      setCurrentIndex([newIndex, newDirection]);
    },
    [currentIndex, images.length]
  );

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  useEffect(() => {
    if (!autoplay || isPaused || !isInView) return;
    const interval = setInterval(() => paginate(1), autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isPaused, isInView, paginate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const currentImage = images[currentIndex];
  const Wrapper = useContainer ? Container : "div";
  const wrapperClass = useContainer ? "relative z-10" : "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12";

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-16 sm:py-20 md:py-24
        ${isDark ? "bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040]" : "bg-slate-50"}
        ${className}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <Wrapper className={wrapperClass}>
        {(eyebrow || headline) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            {eyebrow && (
              <span
                className={`inline-flex items-center gap-3 mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase ${isDark ? "text-[#D4AF37]" : "text-[#090040]"}`}
              >
                <span className="w-8 h-px bg-current opacity-50" />
                {eyebrow}
                <span className="w-8 h-px bg-current opacity-50" />
              </span>
            )}
            {headline && (
              <h2>
                <span
                  className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {headline}
                </span>
                {highlightedText && (
                  <span
                    className="block mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                    style={{
                      fontFamily: "var(--font-serif)",
                      background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {highlightedText}
                  </span>
                )}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
          <div className={`relative ${aspectClasses[aspectRatio]} rounded-2xl overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-200"}`}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/60 via-transparent to-[#090040]/20" />
                {(currentImage.title || currentImage.subtitle) && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      {currentImage.title && (
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1 sm:mb-2">
                          {currentImage.title}
                        </h3>
                      )}
                      {currentImage.subtitle && <p className="text-white/70 text-sm sm:text-base">{currentImage.subtitle}</p>}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
              {showCounter && (
                <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              )}
              {autoplay && (
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {showDots && (
            <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#D4AF37]" : `w-2 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-slate-300 hover:bg-slate-400"}`}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {showThumbnails && images.length > 1 && (
            <div className="mt-5 sm:mt-6 flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#090040]" : "opacity-50 hover:opacity-100"}`}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </Wrapper>
    </section>
  );
};

export { ImageCarousel };
