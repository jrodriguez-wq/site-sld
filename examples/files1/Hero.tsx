"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Sophisticated easing curves
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

// Premium animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.4,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: EASE_OUT_EXPO 
    },
  },
};

const lineRevealVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { 
      duration: 1.4, 
      ease: EASE_OUT_EXPO,
      delay: 0.8
    },
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
      className="relative overflow-hidden min-h-[100svh] flex flex-col bg-slate-950"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={containerVariants}
      aria-label="Standard Land Development - Luxury Home Builder"
    >
      {/* Cinematic Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: reduceMotion ? 0 : videoY,
          scale: reduceMotion ? 1 : videoScale 
        }}
      >
        {/* Placeholder gradient while video loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/SLD-video1.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Multi-layer Cinematic Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {/* Primary vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.4)_50%,rgba(2,6,23,0.8)_100%)]" />
        {/* Directional gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/95" />
        {/* Subtle color grade - warm shadows */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 via-transparent to-slate-950/30" />
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
              className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
            />
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.35em] uppercase text-white/50">
              Est. 2016 · Florida
            </span>
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-16">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Brand Name - Subtle */}
            <motion.p
              variants={fadeUpVariants}
              className="text-amber-400/80 font-medium tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-8"
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
              <span 
                className="block mt-2 sm:mt-4 text-[clamp(2.5rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.02em]"
                style={{ 
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Zero Down.
              </span>
            </motion.h1>

            {/* Decorative Divider */}
            <motion.div 
              variants={fadeUpVariants}
              className="flex items-center justify-center gap-4 my-8 sm:my-10"
            >
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-amber-400/50" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Over 2,800 families have transformed their dreams into 
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
                className="group relative w-full sm:w-auto overflow-hidden bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-none px-10 py-7 text-sm tracking-wider uppercase transition-all duration-500"
                asChild
              >
                <Link
                  href="/contact"
                  prefetch
                  className="flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Become a Lender</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Button>
              
              {/* Secondary CTA */}
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto border border-white/15 text-white hover:border-white/30 hover:bg-white/5 font-medium rounded-none px-10 py-7 text-sm tracking-wider uppercase bg-transparent backdrop-blur-sm transition-all duration-500"
                asChild
              >
                <Link
                  href="/projects"
                  prefetch
                  className="flex items-center justify-center gap-3"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>View Portfolio</span>
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
              <div className="grid grid-cols-3 divide-x divide-white/5">
                {/* Stat 1 */}
                <div className="group px-4 sm:px-8 py-6 sm:py-8 text-center transition-colors duration-500 hover:bg-white/[0.02]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                    2,877
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/40 tracking-[0.2em] uppercase font-medium">
                    Homes Delivered
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="group px-4 sm:px-8 py-6 sm:py-8 text-center transition-colors duration-500 hover:bg-white/[0.02]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                    100%
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/40 tracking-[0.2em] uppercase font-medium">
                    Client Satisfaction
                  </div>
                </div>

                {/* Stat 3 - Highlighted */}
                <div className="group relative px-4 sm:px-8 py-6 sm:py-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                      $0
                    </div>
                    <div className="mt-1 text-[10px] sm:text-xs text-amber-400/60 tracking-[0.2em] uppercase font-medium">
                      Down Payment
                    </div>
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
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export { Hero };
