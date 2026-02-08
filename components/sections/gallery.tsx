"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder for construction images - replace with actual images
  const images = [
    {
      id: 1,
      src: "/construction-1.jpg",
      alt: "Completed home construction",
      title: "Modern Family Home",
      location: "Southwest Florida",
    },
    {
      id: 2,
      src: "/construction-2.jpg",
      alt: "Construction in progress",
      title: "New Development",
      location: "Palm Beach County",
    },
    {
      id: 3,
      src: "/construction-3.jpg",
      alt: "Finished residential project",
      title: "Quality Construction",
      location: "Broward County",
    },
    {
      id: 4,
      src: "/construction-4.jpg",
      alt: "Home construction site",
      title: "Building Dreams",
      location: "Lee County",
    },
    {
      id: 5,
      src: "/construction-5.jpg",
      alt: "Completed residential home",
      title: "Family Home",
      location: "Collier County",
    },
    {
      id: 6,
      src: "/construction-6.jpg",
      alt: "Construction project",
      title: "New Development",
      location: "Hendry County",
    },
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Container className="relative z-10">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#090040] bg-[#090040]/10 px-4 py-2 rounded-full">
                Our Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#090040] via-[#2d2c55] to-[#090040] bg-clip-text text-transparent">
                Homes We've Built
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              Explore our portfolio of quality homes delivered to families across Southwest Florida
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleImageClick(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{image.title}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{image.location}</p>
                </div>
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-300 z-10" />
                {/* Placeholder - Replace with actual Image component when images are available */}
                <div className="w-full h-full bg-gradient-to-br from-[#090040] to-[#2d2c55] flex items-center justify-center">
                  <span className="text-white/30 text-sm">Image {image.id}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#090040] to-[#2d2c55]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/30 text-lg">
                  {images[selectedImage].title}
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-bold mb-2">
                {images[selectedImage].title}
              </h3>
              <p className="text-white/70">{images[selectedImage].location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Gallery };
