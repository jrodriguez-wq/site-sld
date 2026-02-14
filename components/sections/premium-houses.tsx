"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, MapPin, Award, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const premiumHouses = [
  {
    id: "4090",
    address: "4090 W Gulf Dr",
    title: "Luxury Gulf View Home",
    description: "Stunning waterfront property with premium finishes and breathtaking views",
    principalImage: "/houses/4090/principal.webp",
    images: [
      "/houses/4090/principal.webp",
      "/houses/4090/13_ 4090 w gulf dr-012.webp",
      "/houses/4090/14_ 4090 w gulf dr-013.webp",
      "/houses/4090/16_ 4090 w gulf dr-015.webp",
      "/houses/4090/17_ 4090 w gulf dr-016.webp",
      "/houses/4090/21_ 4090 w gulf dr-020.webp",
    ],
    features: ["Waterfront", "Premium Finishes", "Gulf Views"],
  },
  {
    id: "3941",
    address: "3941 Coquina Dr",
    title: "Elegant Coastal Residence",
    description: "Sophisticated design meets coastal living in this beautifully crafted home",
    principalImage: "/houses/3941/principal.webp",
    images: [
      "/houses/3941/principal.webp",
      "/houses/3941/16_3941 coquina dr-16.webp",
      "/houses/3941/29_3941 coquina dr-029.webp",
      "/houses/3941/31_3941 coquina dr-031.webp",
      "/houses/3941/33_3941 coquina dr-033.webp",
    ],
    features: ["Coastal Design", "Modern Architecture", "Premium Quality"],
  },
  {
    id: "3711",
    address: "3711 Agate Ct",
    title: "Contemporary Family Home",
    description: "Spacious and modern, perfect for families seeking comfort and style",
    principalImage: "/houses/3711/principal.webp",
    images: [
      "/houses/3711/principal.webp",
      "/houses/3711/39_3711 agate ct-039.webp",
      "/houses/3711/40_3711 agate ct-040.webp",
      "/houses/3711/41_3711 agate ct-041.webp",
      "/houses/3711/42_3711 agate ct-042.webp",
    ],
    features: ["Family Friendly", "Spacious Layout", "Modern Design"],
  },
  {
    id: "713",
    address: "713 Durion Ct",
    title: "Exclusive Premium Estate",
    description: "A masterpiece of construction showcasing our commitment to excellence",
    principalImage: "/houses/713/principal.webp",
    images: [
      "/houses/713/principal.webp",
      "/houses/713/38_713 durion ct-038.webp",
      "/houses/713/41_713 durion ct-041.webp",
      "/houses/713/45_713 durion ct-045.webp",
      "/houses/713/47_713 durion ct-047.webp",
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
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative scroll-mt-28">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16 md:mb-20">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-6">
              Premium Construction
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Exclusive Premium Homes
            </h2>
            <p className="text-base sm:text-lg text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
              Discover our portfolio of luxury homes, each representing our commitment to excellence and premium craftsmanship
            </p>
          </div>

          {/* Houses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {premiumHouses.map((house) => (
              <div
                key={house.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openGallery(premiumHouses.indexOf(house))}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => openGallery(premiumHouses.indexOf(house))}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={house.principalImage}
                    alt={house.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-[#090040]/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-[#090040]" aria-hidden="true" />
                      <span className="text-xs font-semibold text-[#090040] uppercase">Premium</span>
                    </div>
                  </div>

                  {/* View Gallery Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-[#090040] font-semibold rounded-lg text-sm shadow-lg">
                      View Gallery
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-white/70" aria-hidden="true" />
                        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                          {house.address}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-white/95 transition-colors">
                        {house.title}
                      </h3>
                    </div>
                    <Home className="h-6 w-6 text-white/50 group-hover:text-white/80 transition-colors shrink-0" aria-hidden="true" />
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
        </div>
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
