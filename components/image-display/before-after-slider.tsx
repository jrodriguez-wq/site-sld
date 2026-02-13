"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export interface BeforeAfterSliderProps {
  beforeImage: { src: string; alt: string; label?: string };
  afterImage: { src: string; alt: string; label?: string };
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  initialPosition?: number;
  orientation?: "horizontal" | "vertical" | "diagonal";
  theme?: "dark" | "light";
  className?: string;
  useContainer?: boolean;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  eyebrow = "Transformation",
  headline = "See The",
  highlightedText = "Difference",
  description,
  initialPosition = 50,
  orientation = "horizontal",
  theme = "dark",
  className = "",
  useContainer = true,
}: BeforeAfterSliderProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const isDark = theme === "dark";
  const isDiagonal = orientation === "diagonal";
  const isHorizontal = orientation === "horizontal";

  // Diagonal / : line from (p, 0) to (0, p). Before = top-left triangle.
  const getDiagonalClipPath = (p: number) =>
    `polygon(0% 0%, ${p}% 0%, 0% ${p}%)`;

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let position: number;
      if (orientation === "diagonal") {
        // Diagonal \ from (p,0) to (0,p). Before = top-left. Invert so drag toward top-left = more before.
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        position = Math.max(0, 100 - (x + y));
      } else if (isHorizontal) {
        position = ((clientX - rect.left) / rect.width) * 100;
      } else {
        position = ((clientY - rect.top) / rect.height) * 100;
      }
      setSliderPosition(Math.max(0, Math.min(100, position)));
    },
    [orientation, isHorizontal]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    },
    [isDragging, handleMove]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isDragging) return;
      handleMove(e.clientX, e.clientY);
    },
    [handleMove, isDragging]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalTouchEnd);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  const clipPath =
    orientation === "diagonal"
      ? getDiagonalClipPath(sliderPosition)
      : isHorizontal
        ? `inset(0 ${100 - sliderPosition}% 0 0)`
        : `inset(0 0 ${100 - sliderPosition}% 0)`;

  const content = (
    <>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <span
          className={`inline-flex items-center gap-3 mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase ${isDark ? "text-[#D4AF37]" : "text-[#090040]"}`}
        >
          <span className="w-6 h-px bg-current opacity-50" />
          {eyebrow}
          <span className="w-6 h-px bg-current opacity-50" />
        </span>
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
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlightedText}
            </span>
          )}
        </h2>
        {description && (
          <p
            className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-1 ${isDark ? "text-white/60" : "text-slate-600"}`}
          >
            {description}
          </p>
        )}
      </div>

      {/* Container with diagonal clip and responsive aspect */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div
          ref={containerRef}
          role="slider"
          aria-label="Compare before and after"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          className={`
            relative overflow-hidden select-none
            aspect-[4/3] sm:aspect-[16/10] md:aspect-[2/1]
            rounded-xl sm:rounded-2xl md:rounded-3xl
            cursor-ew-resize touch-manipulation
            shadow-xl ring-1 ring-black/5
          `}
          style={
            isDiagonal
              ? {
                  clipPath:
                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }
              : undefined
          }
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          onClick={handleContainerClick}
        >
          {/* After (background) */}
          <div className="absolute inset-0">
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
            {!isDiagonal && (
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 z-10">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-emerald-500/95 text-white shadow-lg">
                  {afterImage.label ?? "After"}
                </span>
              </div>
            )}
            {isDiagonal && (
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 z-10">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-emerald-500/95 text-white shadow-lg">
                  {afterImage.label ?? "After"}
                </span>
              </div>
            )}
          </div>

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath }}
          >
            <Image
              src={beforeImage.src}
              alt={beforeImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
            {!isDiagonal && (
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 z-10">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-slate-800/95 text-white border border-white/20 shadow-lg">
                  {beforeImage.label ?? "Before"}
                </span>
              </div>
            )}
            {isDiagonal && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 z-10">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-slate-800/95 text-white border border-white/20 shadow-lg">
                  {beforeImage.label ?? "Before"}
                </span>
              </div>
            )}
          </div>

          {/* Diagonal handle: line + grip that moves along diagonal */}
          {isDiagonal ? (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              aria-hidden
            >
              <div
                className="absolute w-full h-full pointer-events-auto"
                style={{
                  left: 0,
                  top: 0,
                }}
              >
                <div
                  className="absolute z-30 touch-manipulation min-w-[48px] min-h-[48px] sm:min-w-[52px] sm:min-h-[52px] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
                  style={{
                    left: `${sliderPosition / 2}%`,
                    top: `${sliderPosition / 2}%`,
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                >
                  {/* Diagonal line \ (same as clip: from (p,0) to (0,p)) */}
                  <div
                    className="absolute left-1/2 top-1/2 w-[2px] sm:w-[3px] origin-center bg-white/95 shadow-lg rounded-full"
                    style={{
                      height: "200vmax",
                      transform: "translate(-50%, -50%) rotate(-45deg)",
                    }}
                  />
                  {/* Grip circle with subtle animation */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-2xl flex items-center justify-center ring-2 ring-[#D4AF37]/50"
                    animate={{
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        "0 25px 50px -12px rgba(0,0,0,0.25)",
                        "0 25px 50px -12px rgba(212,175,55,0.35)",
                        "0 25px 50px -12px rgba(0,0,0,0.25)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`absolute z-20 ${isHorizontal ? "top-0 bottom-0 w-1 -translate-x-1/2" : "left-0 right-0 h-1 -translate-y-1/2"}`}
              style={{
                [isHorizontal ? "left" : "top"]: `${sliderPosition}%`,
              }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute inset-0 bg-white shadow-lg" />
              <div
                className={`absolute bg-white rounded-full shadow-2xl flex items-center justify-center min-w-[44px] min-h-[44px] ${isHorizontal ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11"}`}
              >
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isHorizontal ? "M8 9l4-4 4 4m0 6l-4 4-4-4" : "M8 9l4-4 4 4m0 6l-4 4-4-4"}
                    style={!isHorizontal ? { transform: "rotate(90deg)" } : undefined}
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Invisible full-area drag for diagonal: capture moves */}
          {isDiagonal && (
            <div
              className="absolute inset-0 z-10 cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              aria-hidden
            />
          )}

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#090040]/25 to-transparent rounded-inherit" />
        </div>

        <p
          className={`text-center mt-4 sm:mt-5 text-xs sm:text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}
        >
          {isDiagonal ? "Slide or tap to compare" : "← Slide to compare →"}
        </p>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24
        ${isDark ? "bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040]" : "bg-slate-50"}
        ${className}
      `}
    >
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {useContainer ? (
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {content}
          </motion.div>
        </Container>
      ) : (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {content}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export { BeforeAfterSlider };
