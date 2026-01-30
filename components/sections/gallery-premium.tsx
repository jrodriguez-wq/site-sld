"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { X, ChevronLeft, ChevronRight, Home, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#471396] bg-[#471396]/10 px-4 py-2 rounded-full">
              Our Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] bg-clip-text text-transparent">
              Building Communities, One Home at a Time
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
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
                onClick={() => openModal(index)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.alt}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-[#471396]">View Full</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

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
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-300"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-colors duration-300"
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
