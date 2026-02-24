"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bed, Bath, Square, Home } from "lucide-react";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
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
            const images = getModelImages(key).map(getCloudinaryImageUrl);
            const mainImage = getCloudinaryImageUrl(getModelMainImage(key));
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
      className="relative overflow-hidden bg-slate-50/80 py-12 sm:py-16 md:py-24 lg:py-28 xl:py-32 scroll-mt-20 sm:scroll-mt-24"
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
        <AnimatedSection className="mx-auto max-w-2xl text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
            <span className="w-5 h-px bg-[#D4AF37]/50" />
            Our Home Models
            <span className="w-5 h-px bg-[#D4AF37]/50" />
          </span>
          <h2
            id="models-showcase-heading"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-3 px-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Quality Homes Built for Your Family
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto px-1">
            Explore our selection of beautifully designed homes, each crafted with attention to detail and built to last.
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="aspect-[4/5] bg-slate-100 animate-pulse" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-slate-200/80 rounded animate-pulse" />
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-11 rounded-xl bg-slate-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatedSection.Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
            rootMargin="0px 0px -40px 0px"
          >
            {models.map((model) => (
              <Link
                key={model.key}
                href={`/models/${model.key}`}
                prefetch={true}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:shadow-[#090040]/8 hover:border-[#090040]/15 active:scale-[0.99] transition-all duration-300 hover:-translate-y-1 touch-manipulation"
                aria-label={`View ${model.name} model details`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/70 via-[#090040]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm text-[#090040] shadow-lg border border-[#090040]/10">
                    {model.price}
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-4 sm:p-5 md:p-6 min-h-0">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 mb-2 line-clamp-1 tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {model.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1 min-h-0 border-l-2 border-[#D4AF37]/50 pl-3">
                    {model.description}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4 py-3 px-3 rounded-xl bg-slate-50/90 border border-slate-100">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium font-numeric tabular-nums">
                      <Bed className="h-4 w-4 text-[#090040]/60 shrink-0" aria-hidden />
                      {model.bedrooms}
                    </span>
                    <span className="w-px h-4 bg-slate-200" aria-hidden />
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium font-numeric tabular-nums">
                      <Bath className="h-4 w-4 text-[#090040]/60 shrink-0" aria-hidden />
                      {model.bathrooms}
                    </span>
                    <span className="w-px h-4 bg-slate-200" aria-hidden />
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium font-numeric tabular-nums">
                      <Square className="h-4 w-4 text-[#090040]/60 shrink-0" aria-hidden />
                      {model.sqft}
                    </span>
                  </div>

                  <span className="flex items-center justify-center gap-2 w-full min-h-[44px] sm:min-h-[48px] py-3 px-4 rounded-xl bg-[#090040] text-white text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:bg-[#2d2c55] group-hover:shadow-lg">
                    View Details
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </AnimatedSection.Stagger>
        )}

        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/models"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl bg-[#090040] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-[#2d2c55] active:scale-[0.99] transition-all duration-200 touch-manipulation"
            aria-label="View all home models"
          >
            <Home className="h-5 w-5 shrink-0" aria-hidden />
            View All Models
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export { ModelsShowcase };
