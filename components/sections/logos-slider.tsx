"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const logos = [
  {
    name: "SLD",
    src: "/logos/sld-azul.png",
    alt: "Standard Land Development Logo",
  },
  {
    name: "MJ Newell Homes",
    src: "/logos/mj-newell-a.svg",
    alt: "MJ Newell Homes Logo",
  },
  {
    name: "Land Trust Partners",
    src: "/logos/LTP.png",
    alt: "Land Trust Partners Of Florida LLC Logo",
  },  {
    name: "Buildertrend",
    src: "/logos/bui.svg",
    alt: "Build America Building America Logo",
  },
];

const LogosSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000); // Change logo every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Trusted Partners
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Our brands and partnerships
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md h-24 sm:h-32 md:h-40 flex items-center justify-center">
            {logos.map((logo, index) => (
              <div
                key={logo.name}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="h-16 sm:h-24 md:h-32 w-auto object-contain filter drop-shadow-lg"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {logos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#471396] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to logo ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export { LogosSlider };
