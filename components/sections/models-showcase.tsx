"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bed, Bath, Square, Home } from "lucide-react";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";

interface ModelShowcase {
  key: string;
  name: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  image: string;
  images: string[];
}

const modelKeys = ["louisiana", "viana", "langdon", "delanie", "aurora", "emelia", "duplex"] as const;

const ModelsShowcase = () => {
  const [models, setModels] = useState<ModelShowcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      const loadedModels: ModelShowcase[] = [];

      for (const key of modelKeys) {
        try {
          const modelData = await getModelData(key);
          if (modelData) {
            const images = getModelImages(key);
            const mainImage = getModelMainImage(key);
            loadedModels.push({
              key,
              name: modelData.name,
              description: modelData.description.substring(0, 150) + "...",
              price: modelData.price,
              bedrooms: modelData.bedrooms,
              bathrooms: modelData.bathrooms,
              sqft: modelData.sqft,
              image: mainImage,
              images,
            });
          }
        } catch (error) {
          console.error(`Error loading model ${key}:`, error);
        }
      }

      setModels(loadedModels);
      setIsLoading(false);
    };

    loadModels();
  }, []);

  return (
    <section
      id="models"
      className="relative overflow-hidden bg-slate-50/80 py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="models-showcase-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10">
        <AnimatedSection className="mx-auto max-w-2xl text-center mb-6 sm:mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
            <span className="w-5 h-px bg-[#D4AF37]/50" />
            Our Home Models
            <span className="w-5 h-px bg-[#D4AF37]/50" />
          </span>
          <h2
            id="models-showcase-heading"
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 mb-2 px-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Quality Homes Built for Your Family
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto px-1">
            Explore our selection of beautifully designed homes, each crafted with attention to detail and built to last.
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 shadow-[0_1px_3px_rgba(9,0,64,0.06)]"
              >
                <div className="aspect-[4/5] bg-slate-100 animate-pulse" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200/80 rounded animate-pulse" />
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-9 rounded-lg bg-slate-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatedSection.Stagger
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
            rootMargin="0px 0px -40px 0px"
          >
            {models.map((model) => (
              <Link
                key={model.key}
                href={`/models/${model.key}`}
                prefetch={true}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200/80 shadow-[0_1px_3px_rgba(9,0,64,0.06)] hover:shadow-[0_8px_24px_rgba(9,0,64,0.12)] hover:border-[#090040]/20 active:scale-[0.99] transition-all duration-300 hover:-translate-y-0.5 touch-manipulation"
                aria-label={`View ${model.name} model details`}
              >
                {/* Card background: subtle gradient and soft tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/90 pointer-events-none" />
                <div className="absolute inset-0 bg-[#090040]/[0.02] pointer-events-none rounded-xl" />

                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D4AF37]/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs text-[#090040] shadow-sm border border-[#090040]/10">
                    {model.price}
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-3 sm:p-4 md:p-5 min-h-0">
                  <h3
                    className="text-sm sm:text-base md:text-lg font-medium text-slate-900 mb-1 sm:mb-1.5 line-clamp-1 tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {model.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mb-3 sm:mb-4 line-clamp-2 leading-relaxed flex-1 min-h-0 pl-2.5 border-l-2 border-[#D4AF37]/40">
                    {model.description}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg bg-slate-50/80 border border-slate-100">
                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium font-numeric tabular-nums">
                      <Bed className="h-3.5 w-3.5 text-[#090040]/50 shrink-0" aria-hidden />
                      {model.bedrooms}
                    </span>
                    <span className="w-px h-3.5 bg-slate-200" aria-hidden />
                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium font-numeric tabular-nums">
                      <Bath className="h-3.5 w-3.5 text-[#090040]/50 shrink-0" aria-hidden />
                      {model.bathrooms}
                    </span>
                    <span className="w-px h-3.5 bg-slate-200" aria-hidden />
                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium font-numeric tabular-nums">
                      <Square className="h-3.5 w-3.5 text-[#090040]/50 shrink-0" aria-hidden />
                      {model.sqft}
                    </span>
                  </div>

                  <span className="flex items-center justify-center gap-2 w-full min-h-[40px] sm:min-h-[44px] py-2.5 sm:py-3 px-4 rounded-lg bg-[#090040] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:bg-[#2d2c55]">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </AnimatedSection.Stagger>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/models"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl bg-[#090040] text-white font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#2d2c55] active:scale-[0.99] transition-all duration-200 touch-manipulation"
            aria-label="View all home models"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden />
            View All Models
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export { ModelsShowcase };
