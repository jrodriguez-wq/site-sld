"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/** Only images from public/constructions — less is more. */
const COMMERCIAL_IMAGES = [
  { src: "/constructions/ComunidadC.png", alt: "Completed community — finished homes and landscaping", title: "Completed Community" },
  { src: "/constructions/Ca2.png", alt: "Construction in progress — SLD project", title: "In Progress" },
  { src: "/constructions/Ca1.png", alt: "Development site — before completion", title: "Development" },
  { src: "/constructions/Ca3.jpeg", alt: "Aerial view of neighborhood", title: "Aerial View" },
  { src: "/constructions/Ca4.jpg", alt: "Residential construction site", title: "Construction Site" },
  { src: "/constructions/Ca5.jpg", alt: "Commercial and residential build", title: "Build" },
];

export const CommercialShowcase = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % COMMERCIAL_IMAGES.length));
  const prev = () => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + COMMERCIAL_IMAGES.length) % COMMERCIAL_IMAGES.length));

  return (
    <>
      <section
        className="relative py-14 sm:py-20 md:py-24 bg-slate-50"
        aria-labelledby="commercial-showcase-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 sm:gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3 sm:mb-4">
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
              Our Work
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
            </span>
            <h2
              id="commercial-showcase-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-slate-900 mb-2 sm:mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Commercial &amp; Development
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
              Selected projects from our construction portfolio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {COMMERCIAL_IMAGES.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => open(index)}
                className="group relative aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#090040] focus-visible:ring-offset-2"
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#090040]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-2 left-2 right-2 text-left text-xs font-medium text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#090040]/95 backdrop-blur-md p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={COMMERCIAL_IMAGES[lightboxIndex].src}
                alt={COMMERCIAL_IMAGES[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {lightboxIndex + 1} / {COMMERCIAL_IMAGES.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
