"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export interface ImageCompareProps {
  leftImage: { src: string; alt: string; label?: string };
  rightImage: { src: string; alt: string; label?: string };
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  /** Angle in % for diagonal (desktop). On mobile we use 0 so the center line aligns. */
  dividerAngle?: number;
  interactive?: boolean;
  className?: string;
  useContainer?: boolean;
}

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const revealVariants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
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
  useContainer = true,
}: ImageCompareProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const dividerOffset = useTransform(smoothMouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
  };

  /** On mobile: vertical split at 50% so divider and clipPath match. Desktop: diagonal. */
  const clipPathMobile = "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)";
  const clipPathDesktop = `polygon(
    calc(50% + ${dividerAngle}%) 0%,
    100% 0%,
    100% 100%,
    calc(50% - ${dividerAngle}%) 100%
  )`;

  const content = (
    <div className="relative">
      <motion.div
        variants={revealVariants}
        initial="visible"
        animate="visible"
        className="relative h-[50vh] min-h-[320px] sm:min-h-[400px] sm:h-[55vh] md:h-[60vh] md:min-h-[440px] max-h-[680px] overflow-hidden rounded-2xl shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0">
          <Image
            src={leftImage.src}
            alt={leftImage.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#090040]/20" />
        </div>

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: isMobile ? clipPathMobile : clipPathDesktop,
            x: interactive && !isMobile ? dividerOffset : 0,
          }}
          aria-hidden
        >
          <Image
            src={rightImage.src}
            alt={rightImage.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#090040]/20" />
        </motion.div>

        {/* Mobile: vertical line at 50%. Desktop: diagonal line matching clipPath. */}
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 w-px pointer-events-none z-10 hidden sm:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent)",
            transform: `translateX(-50%) rotate(${dividerAngle}deg) scaleY(1.5)`,
            x: interactive ? dividerOffset : 0,
          }}
        />
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px pointer-events-none z-10 sm:hidden -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent)",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block"
          style={{ x: interactive ? dividerOffset : 0 }}
        >
          <span
            className="text-5xl sm:text-6xl md:text-7xl font-extralight text-white/90 select-none"
            style={{
              fontFamily: "var(--font-serif)",
              textShadow: "0 0 30px rgba(0,0,0,0.3)",
            }}
          >
            /
          </span>
        </motion.div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none sm:hidden"
          aria-hidden
        >
          <span
            className="text-4xl font-extralight text-white/90 select-none"
            style={{
              fontFamily: "var(--font-serif)",
              textShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            /
          </span>
        </div>

        {leftImage.label && (
          <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-10">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/70 bg-[#090040]/60 backdrop-blur-sm px-3 py-2 rounded-lg">
              {leftImage.label}
            </span>
          </div>
        )}
        {rightImage.label && (
          <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-10">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/70 bg-[#090040]/60 backdrop-blur-sm px-3 py-2 rounded-lg">
              {rightImage.label}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,0,64,0.4)_100%)] pointer-events-none rounded-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#090040]/80 via-[#090040]/40 to-transparent pointer-events-none rounded-2xl" />
      </motion.div>

      {/* Text below the comparison (outside the image area for clarity on mobile) */}
      <div className="text-center mt-6 sm:mt-8 px-4">
        {eyebrow && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 sm:gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
              {eyebrow}
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
            </span>
          </div>
        )}
        <h2
          id="image-compare-heading"
          className="max-w-2xl mx-auto"
        >
          <span
            className="block text-xl sm:text-3xl md:text-4xl font-light text-slate-900 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {headline}
          </span>
          {highlightedText && (
            <span
              className="block mt-1 text-xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-serif)",
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #b8962e 50%, #D4AF37 100%)",
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
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-5 sm:mt-6">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#090040] hover:text-[#D4AF37] transition-colors duration-300"
            >
              {ctaText}
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-[#090040]/30 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-14 sm:py-20 md:py-24 bg-slate-50 ${className}`}
      aria-labelledby="image-compare-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
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
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

export { ImageCompare };
