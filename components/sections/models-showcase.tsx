"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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
    <section id="models" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#471396] bg-[#471396]/10 px-4 py-2 rounded-full">
              Our Home Models
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] bg-clip-text text-transparent">
              Quality Homes Built for Your Family
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Explore our selection of beautifully designed homes, each crafted with attention to detail and built to last
          </p>
        </div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {models.map((model) => (
              <Link
                key={model.key}
                href={`/models/${model.key}`}
                prefetch={true}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-base text-[#090040] shadow-xl">
                    {model.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#090040] transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Features */}
                  <div className="flex items-center gap-4 mb-5 text-sm text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <Bed className="h-5 w-5 text-[#471396]" />
                      <span className="font-semibold">{model.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="h-5 w-5 text-[#471396]" />
                      <span className="font-semibold">{model.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Square className="h-5 w-5 text-[#471396]" />
                      <span className="font-semibold">{model.sqft}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full"
            asChild
          >
            <Link href="/models" prefetch={true} className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              View All Models
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export { ModelsShowcase };
