"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Home,
  Car,
  Trees
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface ProjectImage {
  src: string;
  alt: string;
  category?: string;
}

interface ProjectFeature {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ProjectShowcaseProps {
  title: string;
  subtitle?: string;
  location: string;
  description: string;
  price?: string;
  images: ProjectImage[];
  features?: ProjectFeature[];
  specs?: {
    beds?: number;
    baths?: number;
    sqft?: number;
    garage?: number;
    lot?: string;
    year?: number;
  };
  amenities?: string[];
  ctaText?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
  className?: string;
}

// Default features based on specs
const getDefaultFeatures = (specs: ProjectShowcaseProps["specs"]): ProjectFeature[] => {
  const features: ProjectFeature[] = [];
  if (specs?.beds) features.push({ icon: <Bed className="w-5 h-5" />, label: "Bedrooms", value: specs.beds.toString() });
  if (specs?.baths) features.push({ icon: <Bath className="w-5 h-5" />, label: "Bathrooms", value: specs.baths.toString() });
  if (specs?.sqft) features.push({ icon: <Square className="w-5 h-5" />, label: "Square Feet", value: specs.sqft.toLocaleString() });
  if (specs?.garage) features.push({ icon: <Car className="w-5 h-5" />, label: "Garage", value: `${specs.garage} Car` });
  if (specs?.lot) features.push({ icon: <Trees className="w-5 h-5" />, label: "Lot Size", value: specs.lot });
  if (specs?.year) features.push({ icon: <Calendar className="w-5 h-5" />, label: "Year Built", value: specs.year.toString() });
  return features;
};

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProjectShowcase = ({
  title,
  subtitle,
  location,
  description,
  price,
  images,
  features,
  specs,
  amenities,
  ctaText = "Schedule a Tour",
  ctaHref = "/contact",
  theme = "dark",
  className = "",
}: ProjectShowcaseProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeImage, setActiveImage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const isDark = theme === "dark";
  const displayFeatures = features || getDefaultFeatures(specs);

  // Get unique categories from images
  const categories = ["All", ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];
  
  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const navigateImage = (direction: number) => {
    let newIndex = activeImage + direction;
    if (newIndex < 0) newIndex = filteredImages.length - 1;
    if (newIndex >= filteredImages.length) newIndex = 0;
    setActiveImage(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
        ${className}
      `}
    >
      {/* Background */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src={filteredImages[activeImage]?.src || images[0].src}
                alt={filteredImages[activeImage]?.alt || images[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Navigation */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {activeImage + 1} / {filteredImages.length}
              </div>

              {/* Category Badge */}
              {filteredImages[activeImage]?.category && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-semibold tracking-wider uppercase rounded-full">
                    {filteredImages[activeImage].category}
                  </span>
                </div>
              )}
            </div>

            {/* Category Filter */}
            {categories.length > 2 && (
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveImage(0);
                    }}
                    className={`
                      px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all
                      ${activeCategory === category
                        ? "bg-amber-500 text-slate-950"
                        : isDark 
                          ? "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {filteredImages.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden transition-all
                    ${index === activeImage 
                      ? "ring-2 ring-amber-400" 
                      : "opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                  {index === 3 && filteredImages.length > 4 && (
                    <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                      <span className="text-white font-semibold">+{filteredImages.length - 4}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            {/* Title & Location */}
            <div className="mb-6">
              {subtitle && (
                <span className={`
                  inline-flex items-center gap-2 mb-3
                  text-[11px] font-semibold tracking-[0.25em] uppercase
                  ${isDark ? "text-amber-400" : "text-amber-600"}
                `}>
                  <Home className="w-4 h-4" />
                  {subtitle}
                </span>
              )}
              <h2 
                className={`text-3xl sm:text-4xl font-light tracking-tight mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
              >
                {title}
              </h2>
              <div className={`flex items-center gap-2 ${isDark ? "text-white/60" : "text-slate-500"}`}>
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>

            {/* Price */}
            {price && (
              <div className="mb-6">
                <span 
                  className="text-3xl font-light"
                  style={{ 
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {price}
                </span>
              </div>
            )}

            {/* Description */}
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              {description}
            </p>

            {/* Features Grid */}
            {displayFeatures.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {displayFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className={`
                      p-4 rounded-xl
                      ${isDark 
                        ? "bg-white/[0.03] border border-white/5" 
                        : "bg-white border border-slate-100"
                      }
                    `}
                  >
                    <div className={`mb-2 ${isDark ? "text-amber-400" : "text-amber-500"}`}>
                      {feature.icon}
                    </div>
                    <div className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}>
                      {feature.value}
                    </div>
                    <div className={`text-xs uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-500"}`}>
                      {feature.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="mb-8">
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-white/80" : "text-slate-700"}`}>
                  Amenities & Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className={`
                        px-3 py-1.5 text-sm rounded-full
                        ${isDark 
                          ? "bg-white/5 text-white/70 border border-white/10" 
                          : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <Button
                className={`
                  group relative overflow-hidden px-8 py-6 rounded-none
                  text-sm font-semibold uppercase tracking-wider flex-1
                  ${isDark 
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950" 
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                  }
                `}
                asChild
              >
                <Link href={ctaHref} className="flex items-center justify-center gap-3">
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className={`
                  px-8 py-6 rounded-none text-sm font-semibold uppercase tracking-wider
                  ${isDark 
                    ? "border-white/20 text-white hover:bg-white/5" 
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ProjectShowcase };
export type { ProjectShowcaseProps, ProjectImage, ProjectFeature };
