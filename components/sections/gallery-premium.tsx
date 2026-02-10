"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Home, MapPin, Camera } from "lucide-react";
import { Container } from "@/components/ui/container";

const galleryImages = [
  {
    src: "/recurses/casa.jpg",
    alt: "Beautiful Home",
    category: "Homes",
    icon: Home,
  },
  {
    src: "/recurses/casas.jpg",
    alt: "Housing Development",
    category: "Development",
    icon: MapPin,
  },
  {
    src: "/recurses/foto-aerea.png",
    alt: "Aerial View of Development",
    category: "Aerial",
    icon: Camera,
  },
];

const GalleryPremium = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white relative scroll-mt-20 sm:scroll-mt-24">
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

      <Container className="relative z-10">
        {/* Header - compact on mobile */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-4">
            Our Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4 px-1">
            Building Communities, One Home at a Time
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed px-1">
            Explore our developments and see the quality craftsmanship that goes into every home we build
          </p>
        </div>

        {/* Gallery Grid - single col mobile, touch-friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryImages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openModal(index))}
                onClick={() => openModal(index)}
                className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" aria-hidden="true" />
                    <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white">{item.alt}</h3>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-800">View Full</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in-0 duration-300 safe-area-padding"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer touch-manipulation"
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>

            <div className="relative w-full h-full max-h-[85vh] sm:max-h-[90vh] flex items-center justify-center">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 sm:px-6 sm:py-3">
              <p className="text-white text-xs sm:text-sm font-semibold">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { GalleryPremium };
