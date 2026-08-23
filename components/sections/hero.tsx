"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { SITE_IMAGES } from "@/config/site-images";

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_SMOOTH } },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden flex flex-col bg-[#090040] h-[calc(100dvh-var(--site-header-h))] max-h-[calc(100svh-var(--site-header-h))]"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
      }}
      aria-label="Standard Land Development — Southwest Florida home builder"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={SITE_IMAGES.homeHero}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={SITE_IMAGES.finishedHome}
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onError={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 z-[1] w-full h-full object-cover object-center transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <source src="/SLD-video1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(9,0,64,0.08)_50%,rgba(9,0,64,0.28)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#090040]/20 via-transparent to-[#090040]/45" />
      </div>

      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5 md:py-6">
        <motion.div variants={fadeUp} className="flex flex-col items-center shrink-0">
          <Image
            src="/logos/sld-blanco.svg"
            alt="Standard Land Development"
            width={200}
            height={64}
            className="h-9 sm:h-11 md:h-12 w-auto max-w-[70vw]"
            priority
          />
          <p className="mt-2 text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/80">
            Est. 2016 · Southwest Florida
          </p>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center py-2">
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(1.75rem,6.5vw,3.75rem)] font-semibold text-white leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
          >
            Homes built in Florida
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-xl leading-snug"
          >
            2,877 homes delivered since 2016. Land development and construction from LaBelle.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-4 sm:mt-6 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#e4c04a] text-[#090040] font-semibold rounded-lg px-5 sm:px-8 min-h-11 text-xs sm:text-sm tracking-wide uppercase"
              asChild
            >
              <Link href="/contact" prefetch className="inline-flex items-center gap-2">
                Schedule a visit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-white/40 text-white hover:border-[#D4AF37] bg-[#090040]/50 rounded-lg px-5 sm:px-8 min-h-11 text-xs sm:text-sm tracking-wide uppercase"
              asChild
            >
              <Link href="/models" prefetch>
                View floor plans
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="shrink-0 border-t border-white/15">
          <div className="grid grid-cols-2 divide-x divide-white/15 max-w-3xl mx-auto">
            <div className="py-3 sm:py-4 text-center">
              <p className="text-lg sm:text-2xl md:text-3xl font-semibold font-numeric tabular-nums text-white">
                2,877
              </p>
              <p className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-[0.14em] text-white/70 font-semibold">
                Homes delivered
              </p>
            </div>
            <div className="py-3 sm:py-4 text-center">
              <p className="text-lg sm:text-2xl md:text-3xl font-semibold font-numeric tabular-nums text-white">
                2016
              </p>
              <p className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-[0.14em] text-white/70 font-semibold">
                Building since
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { Hero };
