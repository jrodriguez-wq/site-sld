"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Home, MapPin, Camera } from "lucide-react";

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
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative scroll-mt-28">
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
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16 md:mb-20">
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Building Communities, One Home at a Time
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Explore our developments and see the quality craftsmanship that goes into every home we build
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryImages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openModal(index))}
                onClick={() => openModal(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.alt}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-slate-800">View Full</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0 duration-300"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-200 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <p className="text-white text-sm font-semibold">
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
