"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, Sparkles } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[700px] max-h-[1000px] flex items-center justify-center text-white"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={container}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/SLD-video1.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Blur Overlay - Blue tint for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#090040]/80 via-[#2d2c55]/75 to-[#090040]/80 backdrop-blur-[2px]" />
      
      {/* Additional gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
      
      <Container className="relative z-10 py-5 sm:py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge - compact on mobile */}
          <motion.div variants={item} className="mb-2 sm:mb-4 md:mb-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-xl">
            <Sparkles className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-[#D4AF37]" aria-hidden />
            <span className="text-[10px] sm:text-sm font-semibold">Since 2016 • Southwest Florida</span>
          </motion.div>
          
          {/* Main Heading - smaller on mobile, scales up on desktop */}
          <motion.h1 variants={item} className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-[1.2] sm:leading-tight mb-2 sm:mb-4 md:mb-6 lg:mb-8 px-1 sm:px-4 break-words">
            Creating the Opportunity of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Home Ownership
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] blur-xl opacity-50 animate-pulse" />
            </span>{" "}
            for American Families
          </motion.h1>
          
          {/* Subheading - smaller on mobile */}
          <motion.p variants={item} className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 text-[13px] sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-snug sm:leading-relaxed text-white/90 max-w-4xl mx-auto font-medium px-2 sm:px-4">
            We Build so American Families can OWN the American Dream, NOT rent the American Dream
          </motion.p>
          
          {/* Quote - compact on mobile */}
          <motion.p variants={item} className="mt-1.5 sm:mt-3 md:mt-4 lg:mt-6 text-[11px] sm:text-sm md:text-base lg:text-lg text-white/70 italic font-medium px-2 sm:px-4">
            — Michael J. Newell, CEO Standard Land Development
          </motion.p>

          {/* Lender value prop */}
          <motion.p variants={item} className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#D4AF37] px-2 sm:px-4">
            22% annual return to our lenders
          </motion.p>
          
          {/* CTA Buttons - compact on mobile, touch-friendly */}
          <motion.div variants={item} className="mt-3 sm:mt-5 md:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] md:min-h-[52px] bg-white text-[#090040] hover:bg-white/95 shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base md:text-lg px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 rounded-lg sm:rounded-xl font-bold touch-manipulation" 
              asChild
            >
              <Link href="/contact" prefetch={true} className="flex items-center justify-center gap-1.5 sm:gap-2" aria-label="Become a lender and invest with Standard Land Development">
                Become a Lender
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" aria-hidden />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] md:min-h-[52px] border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-sm sm:text-base md:text-lg px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 rounded-full font-semibold bg-white/5 touch-manipulation" 
              asChild
            >
              <Link href="/about" prefetch={true} className="flex items-center justify-center" aria-label="Learn more about Standard Land Development">
                Learn More
              </Link>
            </Button>
          </motion.div>

          {/* Stats - compact row on mobile, cards on sm+ */}
          <motion.div variants={item} className="mt-4 sm:mt-6 md:mt-10 lg:mt-16 grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6 lg:gap-8 px-1 sm:px-4">
            <div className="group relative bg-white/10 backdrop-blur-md sm:bg-gradient-to-br sm:from-white/10 sm:to-white/5 rounded-lg sm:rounded-2xl md:rounded-3xl p-2.5 sm:p-6 md:p-8 border border-white/20 shadow-lg sm:shadow-2xl hover:border-white/40 active:scale-[0.98] sm:hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-0.5 sm:mb-2">2,875</div>
                <div className="text-white/90 text-[10px] sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Homes Built</div>
              </div>
            </div>
            <div className="group relative bg-white/10 backdrop-blur-md sm:bg-gradient-to-br sm:from-white/10 sm:to-white/5 rounded-lg sm:rounded-2xl md:rounded-3xl p-2.5 sm:p-6 md:p-8 border border-white/20 shadow-lg sm:shadow-2xl hover:border-white/40 active:scale-[0.98] sm:hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-0.5 sm:mb-2">2,875</div>
                <div className="text-white/90 text-[10px] sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Happy Families</div>
              </div>
            </div>
            <div className="group relative bg-white/10 backdrop-blur-md sm:bg-gradient-to-br sm:from-white/10 sm:to-white/5 rounded-lg sm:rounded-2xl md:rounded-3xl p-2.5 sm:p-6 md:p-8 border border-white/20 shadow-lg sm:shadow-2xl hover:border-white/40 active:scale-[0.98] sm:hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-0.5 sm:mb-2">$0</div>
                <div className="text-white/90 text-[10px] sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Down Payment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export { Hero };
