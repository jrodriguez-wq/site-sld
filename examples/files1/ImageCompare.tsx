"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Types
interface ImageCompareProps {
  leftImage: {
    src: string;
    alt: string;
    label?: string;
  };
  rightImage: {
    src: string;
    alt: string;
    label?: string;
  };
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  dividerAngle?: number; // degrees, default 12
  interactive?: boolean; // hover to shift divider
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const revealVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ImageCompare = ({
  leftImage,
  rightImage,
  eyebrow,
  headline,
  highlightedText,
  description,
  ctaText,
  ctaHref = "/portfolio",
  dividerAngle = 12,
  interactive = true,
  className = "",
}: ImageCompareProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  
  // Interactive divider position
  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  
  // Transform mouse position to divider offset
  const dividerOffset = useTransform(smoothMouseX, [0, 1], [-5, 5]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-slate-950 ${className}`}
    >
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative">
        {/* Image Comparison Container */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Image */}
          <div className="absolute inset-0">
            <Image
              src={leftImage.src}
              alt={leftImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Darken overlay */}
            <div className="absolute inset-0 bg-slate-950/30" />
          </div>

          {/* Right Image with Diagonal Clip */}
          <motion.div 
            className="absolute inset-0"
            style={{
              clipPath: `polygon(
                calc(50% + ${dividerAngle}%) 0%, 
                100% 0%, 
                100% 100%, 
                calc(50% - ${dividerAngle}%) 100%
              )`,
              x: interactive ? dividerOffset : 0,
            }}
          >
            <Image
              src={rightImage.src}
              alt={rightImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Darken overlay */}
            <div className="absolute inset-0 bg-slate-950/30" />
          </motion.div>

          {/* Diagonal Divider Line */}
          <motion.div
            className="absolute top-0 bottom-0 left-1/2 w-px pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)",
              transform: `translateX(-50%) rotate(${dividerAngle}deg) scaleY(1.5)`,
              x: interactive ? dividerOffset : 0,
            }}
          />

          {/* Central "/" Divider Symbol */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ x: interactive ? dividerOffset : 0 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-xl bg-amber-400/30 scale-150" />
              <span 
                className="relative text-6xl sm:text-7xl md:text-8xl font-extralight text-white/80 select-none"
                style={{ 
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  textShadow: "0 0 40px rgba(251, 191, 36, 0.3)"
                }}
              >
                /
              </span>
            </div>
          </motion.div>

          {/* Image Labels */}
          {leftImage.label && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute left-8 sm:left-12 bottom-8 sm:bottom-12 z-10"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/60 bg-slate-950/50 backdrop-blur-sm px-3 py-2">
                {leftImage.label}
              </span>
            </motion.div>
          )}
          {rightImage.label && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute right-8 sm:right-12 bottom-8 sm:bottom-12 z-10"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/60 bg-slate-950/50 backdrop-blur-sm px-3 py-2">
                {rightImage.label}
              </span>
            </motion.div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.6)_100%)] pointer-events-none" />
          
          {/* Bottom Gradient for Text */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        </motion.div>

        {/* Text Content Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-amber-400/80">
                <span className="w-6 sm:w-8 h-px bg-amber-400/40" />
                {eyebrow}
                <span className="w-6 sm:w-8 h-px bg-amber-400/40" />
              </span>
            </motion.div>
          )}

          {/* Main Headline */}
          <motion.h2 
            variants={fadeUpVariants}
            className="max-w-4xl"
          >
            <span 
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
            >
              {headline}
            </span>
            {highlightedText && (
              <span 
                className="block mt-2 sm:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.0] tracking-tight"
                style={{ 
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highlightedText}
              </span>
            )}
          </motion.h2>

          {/* Description */}
          {description && (
            <motion.p 
              variants={fadeUpVariants}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-white/50 max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* CTA */}
          {ctaText && (
            <motion.div variants={fadeUpVariants} className="mt-8 sm:mt-10 pointer-events-auto">
              <Link 
                href={ctaHref}
                className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase text-white hover:text-amber-400 transition-colors duration-300"
              >
                {ctaText}
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover:border-amber-400/50 group-hover:bg-amber-400/10 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ transformOrigin: "center" }}
      />
    </section>
  );
};

export { ImageCompare };
export type { ImageCompareProps };

/*
USAGE EXAMPLE:
─────────────

<ImageCompare
  leftImage={{
    src: "/images/home-exterior-day.jpg",
    alt: "SLD home exterior during the day",
    label: "Exterior"
  }}
  rightImage={{
    src: "/images/home-interior-living.jpg", 
    alt: "SLD home interior living room",
    label: "Interior"
  }}
  eyebrow="Our Craftsmanship"
  headline="Where Quality"
  highlightedText="Meets Design"
  description="Every SLD home is built with meticulous attention to detail, premium materials, and designs that stand the test of time."
  ctaText="Explore Portfolio"
  ctaHref="/portfolio"
  dividerAngle={12}
  interactive={true}
/>

*/
