"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

const lineRevealVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.4, ease: EASE_SMOOTH, delay: 0.1 },
  },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth spring-based parallax
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  const videoY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.3], ["0%", "-10%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden min-h-[100svh] flex flex-col bg-[#090040]"
      initial="visible"
      animate="visible"
      variants={containerVariants}
      aria-label="Standard Land Development - Luxury Home Builder"
    >
      {/* Video de fondo - siempre visible */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: reduceMotion ? 0 : videoY,
          scale: reduceMotion ? 1 : videoScale,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/SLD-video1.mp4" type="video/mp4" />
        </video>
        {/* Placeholder muy suave solo mientras carga - no tapa el video */}
        <div
          className={`absolute inset-0 bg-[#090040]/30 transition-opacity duration-500 ${isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        />
      </motion.div>

      {/* Overlay mínimo: solo un poco de oscuro en bordes para que el texto se lea; el video se ve */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(9,0,64,0.08)_50%,rgba(9,0,64,0.28)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090040]/15 via-transparent to-[#090040]/35" />
      </div>

      {/* Film Grain Texture */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Main Content with Parallax */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col min-h-[100svh]"
        style={{ 
          opacity: reduceMotion ? 1 : contentOpacity,
          y: reduceMotion ? 0 : contentY 
        }}
      >
        {/* Top Section - Brand Mark */}
        <div className="pt-28 sm:pt-32 md:pt-36 flex justify-center px-6">
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-center gap-4"
          >
            {/* Decorative line */}
            <motion.div
              variants={lineRevealVariants}
              className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
            />
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.35em] uppercase text-white/60">
              Est. 2016 · Southwest Florida
            </span>
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-16">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Brand Name - Subtle */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[#D4AF37]/90 font-medium tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-8"
            >
              Standard Land Development
            </motion.p>

            {/* Main Headline - Editorial Style */}
            <motion.h1
              variants={fadeUpVariants}
              className="relative"
            >
              <span
                className="block text-[clamp(2.5rem,8vw,6rem)] font-light text-white leading-[0.95] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
              >
                Build Your Legacy
              </span>
            </motion.h1>

            {/* Decorative Divider */}
            <motion.div 
              variants={fadeUpVariants}
              className="flex items-center justify-center gap-4 my-8 sm:my-10"
            >
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/60" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Over 2,877 families have transformed their dreams into
              <span className="text-white/70"> addresses</span>.
              Your story begins here.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-10 sm:mt-12"
            >
              {/* Primary CTA - Luxury Style */}
              <Button
                size="lg"
                className="group relative w-full sm:w-auto overflow-hidden bg-[#D4AF37] hover:bg-[#FFD700] text-[#090040] font-semibold rounded-lg px-10 py-7 text-sm tracking-wider uppercase transition-all duration-300"
                asChild
              >
                <Link
                  href="/contact"
                  prefetch
                  className="flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Become a Lender</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto border-2 border-white/25 text-white hover:border-[#D4AF37]/50 hover:bg-white/10 font-medium rounded-lg px-10 py-7 text-sm tracking-wider uppercase bg-white/5 backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link
                  href="/models"
                  prefetch
                  className="flex items-center justify-center gap-3"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>View Models</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats Bar - Refined */}
        <div className="mt-auto">
          <motion.div
            variants={fadeUpVariants}
            className="border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 divide-x divide-white/5">
                <div className="group px-4 sm:px-8 py-6 sm:py-8 text-center transition-colors duration-300 hover:bg-white/[0.02]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold font-numeric tabular-nums text-white tracking-tight">
                    2,877
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/40 tracking-[0.2em] uppercase font-medium">
                    Homes Delivered
                  </div>
                </div>
                <div className="group px-4 sm:px-8 py-6 sm:py-8 text-center transition-colors duration-300 hover:bg-white/[0.02]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold font-numeric tabular-nums text-white tracking-tight">
                    100%
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/40 tracking-[0.2em] uppercase font-medium">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.35 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export { Hero };