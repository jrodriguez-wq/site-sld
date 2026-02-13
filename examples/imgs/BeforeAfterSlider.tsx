"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";

// Types
interface BeforeAfterProps {
  beforeImage: {
    src: string;
    alt: string;
    label?: string;
  };
  afterImage: {
    src: string;
    alt: string;
    label?: string;
  };
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  initialPosition?: number; // 0-100
  orientation?: "horizontal" | "vertical";
  theme?: "dark" | "light";
  className?: string;
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
}: BeforeAfterProps) => {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const isDark = theme === "dark";
  const isHorizontal = orientation === "horizontal";

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let position: number;
    
    if (isHorizontal) {
      position = ((clientX - rect.left) / rect.width) * 100;
    } else {
      position = ((clientY - rect.top) / rect.height) * 100;
    }
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, [isHorizontal]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [isDragging, handleMove]);

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
        ${className}
      `}
    >
      {/* Background */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={`
            inline-flex items-center gap-3 mb-4
            text-[11px] font-semibold tracking-[0.25em] uppercase
            ${isDark ? "text-amber-400" : "text-amber-600"}
          `}>
            <span className="w-8 h-px bg-current opacity-50" />
            {eyebrow}
            <span className="w-8 h-px bg-current opacity-50" />
          </span>
          <h2>
            <span 
              className={`
                block text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                ${isDark ? "text-white" : "text-slate-900"}
              `}
              style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
            >
              {headline}
            </span>
            {highlightedText && (
              <span 
                className="block mt-1 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                style={{ 
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {highlightedText}
              </span>
            )}
          </h2>
          {description && (
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              {description}
            </p>
          )}
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* Label */}
            <div className="absolute bottom-6 right-6 z-10">
              <span className={`
                px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase
                ${isDark 
                  ? "bg-emerald-500/90 text-white" 
                  : "bg-emerald-500 text-white"
                }
              `}>
                {afterImage.label || "After"}
              </span>
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: isHorizontal 
                ? `inset(0 ${100 - sliderPosition}% 0 0)` 
                : `inset(0 0 ${100 - sliderPosition}% 0)`
            }}
          >
            <Image
              src={beforeImage.src}
              alt={beforeImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* Label */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className={`
                px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase
                ${isDark 
                  ? "bg-slate-800/90 text-white border border-white/20" 
                  : "bg-slate-700 text-white"
                }
              `}>
                {beforeImage.label || "Before"}
              </span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className={`
              absolute z-20 
              ${isHorizontal 
                ? "top-0 bottom-0 w-1 -translate-x-1/2" 
                : "left-0 right-0 h-1 -translate-y-1/2"
              }
            `}
            style={{
              [isHorizontal ? "left" : "top"]: `${sliderPosition}%`,
            }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            {/* Line */}
            <div className="absolute inset-0 bg-white shadow-lg" />
            
            {/* Handle Button */}
            <div 
              className={`
                absolute bg-white rounded-full shadow-2xl flex items-center justify-center
                transition-transform duration-200 hover:scale-110
                ${isDragging ? "scale-110" : ""}
                ${isHorizontal 
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" 
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                }
              `}
            >
              {isHorizontal ? (
                <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              )}
            </div>

            {/* Decorative arrows */}
            <div className={`
              absolute flex items-center gap-1 text-white text-xs font-semibold
              ${isHorizontal 
                ? "top-4 left-1/2 -translate-x-1/2 flex-col" 
                : "left-4 top-1/2 -translate-y-1/2"
              }
            `}>
              <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded">Drag</span>
            </div>
          </div>

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/30 to-transparent" />
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className={`text-center mt-6 text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}
        >
          ← Drag the slider to compare →
        </motion.p>
      </div>
    </section>
  );
};

export { BeforeAfterSlider };
export type { BeforeAfterProps };
