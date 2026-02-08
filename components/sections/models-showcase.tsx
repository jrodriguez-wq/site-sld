"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bed, Bath, Square, Home } from "lucide-react";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import type { ModelData } from "@/types/model";

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

const ModelsShowcase = () => {
  const [models, setModels] = useState<ModelShowcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      // Load ALL available models
      const modelKeys = ["louisiana", "viana", "langdon", "delanie", "aurora", "emelia", "duplex"];
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
    <section id="models" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative scroll-mt-28">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Full width, elegant minimal */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16 md:mb-24">
          <span
            className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6"
            aria-label="Section label"
          >
            Our Home Models
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Quality Homes Built for Your Family
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore our selection of beautifully designed homes, each crafted with attention to detail and built to last
          </p>
        </div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-slate-100 rounded-2xl aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {models.map((model) => (
              <Link
                key={model.key}
                href={`/models/${model.key}`}
                prefetch={true}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg font-semibold text-sm text-slate-800 shadow-sm">
                    {model.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Features */}
                  <div className="flex items-center gap-4 mb-5 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Bed className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span className="font-medium">{model.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span className="font-medium">{model.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Square className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span className="font-medium">{model.sqft}</span>
                    </div>
                  </div>

                  {/* View Details Button - Elegant minimal, no scale to avoid scroll */}
                  <span className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors duration-200 group-hover:bg-slate-800">
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/models"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            View All Models
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export { ModelsShowcase };
