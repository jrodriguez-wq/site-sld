"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Home, MapPin, Award, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const premiumHouses = [
  {
    id: "4090",
    address: "4090 W Gulf Dr",
    title: "Luxury Gulf View Home",
    description: "Stunning waterfront property with premium finishes and breathtaking views",
    principalImage: "/houses/4090/principal.jpg",
    images: [
      "/houses/4090/principal.jpg",
      "/houses/4090/13_ 4090 w gulf dr-012.jpg",
      "/houses/4090/14_ 4090 w gulf dr-013.jpg",
      "/houses/4090/16_ 4090 w gulf dr-015.jpg",
      "/houses/4090/17_ 4090 w gulf dr-016.jpg",
      "/houses/4090/21_ 4090 w gulf dr-020.jpg",
    ],
    features: ["Waterfront", "Premium Finishes", "Gulf Views"],
  },
  {
    id: "3941",
    address: "3941 Coquina Dr",
    title: "Elegant Coastal Residence",
    description: "Sophisticated design meets coastal living in this beautifully crafted home",
    principalImage: "/houses/3941/principal.jpg",
    images: [
      "/houses/3941/principal.jpg",
      "/houses/3941/16_3941 coquina dr-16.jpg",
      "/houses/3941/29_3941 coquina dr-029.jpg",
      "/houses/3941/31_3941 coquina dr-031.jpg",
      "/houses/3941/33_3941 coquina dr-033.jpg",
    ],
    features: ["Coastal Design", "Modern Architecture", "Premium Quality"],
  },
  {
    id: "3711",
    address: "3711 Agate Ct",
    title: "Contemporary Family Home",
    description: "Spacious and modern, perfect for families seeking comfort and style",
    principalImage: "/houses/3711/principal.jpg",
    images: [
      "/houses/3711/principal.jpg",
      "/houses/3711/39_3711 agate ct-039.jpg",
      "/houses/3711/40_3711 agate ct-040.jpg",
      "/houses/3711/41_3711 agate ct-041.jpg",
      "/houses/3711/42_3711 agate ct-042.jpg",
    ],
    features: ["Family Friendly", "Spacious Layout", "Modern Design"],
  },
  {
    id: "713",
    address: "713 Durion Ct",
    title: "Exclusive Premium Estate",
    description: "A masterpiece of construction showcasing our commitment to excellence",
    principalImage: "/houses/713/principal.jpg",
    images: [
      "/houses/713/principal.jpg",
      "/houses/713/38_713 durion ct-038.jpg",
      "/houses/713/41_713 durion ct-041.jpg",
      "/houses/713/45_713 durion ct-045.jpg",
      "/houses/713/47_713 durion ct-047.jpg",
    ],
    features: ["Exclusive", "Premium Estate", "Excellence"],
  },
];

const PremiumHouses = () => {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (houseIndex: number) => {
    setSelectedHouse(houseIndex);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedHouse(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedHouse !== null) {
      const house = premiumHouses[selectedHouse];
      setCurrentImageIndex((currentImageIndex + 1) % house.images.length);
    }
  };

  const prevImage = () => {
    if (selectedHouse !== null) {
      const house = premiumHouses[selectedHouse];
      setCurrentImageIndex((currentImageIndex - 1 + house.images.length) % house.images.length);
    }
  };

  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#471396] relative overflow-hidden scroll-mt-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20">
                Premium Construction
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white">
              Exclusive{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Premium Homes
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto">
              Discover our portfolio of luxury homes, each representing our commitment to excellence and premium craftsmanship
            </p>
          </div>

          {/* Houses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {premiumHouses.map((house, index) => (
              <div
                key={house.id}
                className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-[1.02] shadow-2xl cursor-pointer"
                onClick={() => openGallery(index)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={house.principalImage}
                    alt={house.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-[#090040]/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-[#D4AF37]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-white" />
                      <span className="text-xs font-bold text-white uppercase">Premium</span>
                    </div>
                  </div>

                  {/* View Gallery Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-white/90 hover:bg-white text-[#090040] font-semibold rounded-full shadow-lg"
                    >
                      View Gallery
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-[#D4AF37]" />
                        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                          {house.address}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {house.title}
                      </h3>
                    </div>
                    <Home className="h-6 w-6 text-white/50 group-hover:text-[#D4AF37] transition-colors shrink-0" />
                  </div>
                  
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                    {house.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {house.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white/90 border border-white/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Modal */}
      {selectedHouse !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0 duration-300"
          onClick={closeGallery}
        >
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeGallery}
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
                src={premiumHouses[selectedHouse].images[currentImageIndex]}
                alt={`${premiumHouses[selectedHouse].title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <p className="text-white text-sm font-semibold">
                {currentImageIndex + 1} / {premiumHouses[selectedHouse].images.length}
              </p>
            </div>

            {/* House Info */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center">
              <h3 className="text-white text-xl font-bold mb-1">
                {premiumHouses[selectedHouse].title}
              </h3>
              <p className="text-white/80 text-sm">{premiumHouses[selectedHouse].address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { PremiumHouses };
