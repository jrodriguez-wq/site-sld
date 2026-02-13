"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Sparkles } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  badge?: string;
}

const PageHero = ({ title, subtitle, description, backgroundImage, badge }: PageHeroProps) => {
  return (
    <section className="relative min-h-[42vh] sm:min-h-[50vh] md:h-[55vh] md:min-h-[480px] lg:h-[60vh] lg:min-h-[500px] max-h-[700px] flex items-center justify-center text-white overflow-hidden py-12 sm:py-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 z-1 bg-linear-to-br from-[#090040]/85 via-[#2d2c55]/80 to-[#090040]/85 backdrop-blur-[2px]" />

      {/* Additional gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-1 bg-linear-to-t from-[#090040]/95 via-transparent to-transparent" />

      <Container className="relative z-10 px-4 min-[480px]:px-5 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge - same style as home hero eyebrow */}
          {badge && (
            <div className="mb-3 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-6 sm:py-3 shadow-xl">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/90" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/90">{badge}</span>
            </div>
          )}

          {/* Title - same elegant serif as home hero */}
          <h1
            className="text-[clamp(2rem,6vw,4rem)] sm:text-[clamp(2.5rem,7vw,5rem)] md:text-[clamp(2.75rem,8vw,5.5rem)] font-light tracking-tight mb-3 sm:mb-5 leading-[0.95] text-white wrap-break-word"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>

          {/* Subtitle - serif, light */}
          {subtitle && (
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-white/95 mb-3 sm:mb-5 leading-snug tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {subtitle}
            </p>
          )}

          {/* Description - matches home supporting copy */}
          {description && (
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/80 max-w-3xl mx-auto font-light tracking-wide px-0 sm:px-2">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export { PageHero };
