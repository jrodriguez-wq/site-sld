"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  badge?: string;
}

const PageHero = ({ title, subtitle, description, backgroundImage, badge }: PageHeroProps) => {
  const src = getCloudinaryImageUrl(backgroundImage);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[46vh] md:min-h-[420px] lg:min-h-[460px] flex items-center justify-center text-white overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-1 bg-[#090040]/55" />
      <div className="absolute inset-0 z-1 bg-linear-to-t from-[#090040]/80 via-transparent to-[#090040]/30" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {badge && (
            <p className="mb-4 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37]">
              {badge}
            </p>
          )}
          <h1
            className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold tracking-tight leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-3 text-lg sm:text-xl font-medium text-white/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export { PageHero };
