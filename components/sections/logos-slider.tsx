"use client";

import Image from "next/image";

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
  },
  {
    name: "Buildertrend",
    src: "/logos/bui.svg",
    alt: "Build America Building America Logo",
  },
  {
    name: "Columbia",
    src: "/logos/Columbia-Logo.webp",
    alt: "Columbia Logo",
  },
];

const LogosSlider = () => {
  // 3 sets for seamless infinite loop - when we scroll 1/3, we've moved one full set
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Carousel - full width, NO overflow-x clipping on parent */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none" />

          {/* Scrolling track - must overflow, no max-width constraint */}
          <div className="logos-scroll flex gap-12 sm:gap-16 md:gap-20 lg:gap-24">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-16 sm:h-20 md:h-24 lg:h-28 w-32 sm:w-40 md:w-48 lg:w-52"
              >
                <div className="relative w-full h-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={80}
                    className="h-full w-auto max-h-full object-contain object-center"
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                    priority={index < logos.length}
                    loading={index < logos.length ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { LogosSlider };
