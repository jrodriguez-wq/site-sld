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
      className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="models-showcase-heading"
    >
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-4">
            Our Home Models
          </span>
          <h2
            id="models-showcase-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4 px-1"
          >
            Quality Homes Built for Your Family
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-snug sm:leading-relaxed max-w-2xl mx-auto px-1">
            Explore our selection of beautifully designed homes, each crafted with attention to detail and built to last
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl aspect-[3/4] sm:aspect-[4/5] bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatedSection.Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            rootMargin="0px 0px -40px 0px"
          >
            {models.map((model) => (
              <Link
                key={model.key}
                href={`/models/${model.key}`}
                prefetch={true}
                className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg active:scale-[0.99] transition-all duration-300 hover:-translate-y-0.5 touch-manipulation"
                aria-label={`View ${model.name} model details`}
              >
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-semibold text-xs sm:text-sm text-slate-800 shadow-sm">
                    {model.price}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2">
                    {model.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2 leading-snug flex-1 min-h-0">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-xs sm:text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0" aria-hidden />
                      <span className="font-medium">{model.bedrooms}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0" aria-hidden />
                      <span className="font-medium">{model.bathrooms}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0" aria-hidden />
                      <span className="font-medium">{model.sqft}</span>
                    </span>
                  </div>

                  <span className="flex items-center justify-center gap-2 w-full min-h-[44px] py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold transition-colors duration-200 group-hover:bg-slate-800">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
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
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-slate-900 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-slate-800 active:scale-[0.99] transition-all duration-200 touch-manipulation"
            aria-label="View all home models"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden />
            View All Models
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export { ModelsShowcase };
