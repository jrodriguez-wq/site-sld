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
    <section className="relative h-[60vh] min-h-[500px] max-h-[700px] flex items-center justify-center text-white overflow-hidden">
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#090040]/85 via-[#2d2c55]/80 to-[#471396]/85 backdrop-blur-[2px]" />

      {/* Additional gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#090040]/95 via-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center px-4">
          {/* Badge */}
          {badge && (
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 sm:px-6 sm:py-3 shadow-2xl">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs sm:text-sm font-semibold">{badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
                {title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] blur-xl opacity-50 animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/95 mb-4 sm:mb-6">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl mx-auto font-medium">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export { PageHero };
