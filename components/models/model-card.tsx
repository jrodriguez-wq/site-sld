"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Square, Car, Eye, Heart, Share2, Maximize2, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModelBadge } from "./model-badge";
import { useTranslation } from "@/hooks/use-translation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SEO_CONFIG } from "@/config/seo";

export interface ModelCardProps {
  modelKey: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: string;
  rtoPrice?: string; // Precio de RTO (Rent to Own) mensual
  beds: string;
  bedsLabel: string;
  baths: string;
  bathsLabel: string;
  sqft: string;
  sqftLabel: string;
  badges?: Array<{ type: "favorite" | "bestseller" | "satisfied"; label: string }>;
  satisfiedFamilies?: number;
  viewDetailsLabel?: string;
  viewPhotosLabel?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  modelLabel?: string;
  carouselDelay?: number;
  initialDelay?: number;
  community?: "labelle" | "lehigh-acres"; // Comunidad para pasar como query param
}

const ModelCardComponent = (props: ModelCardProps) => {
  const { t } = useTranslation();
  const {
    modelKey,
    name,
    description,
    image,
    images,
    price,
    rtoPrice,
    beds,
    bedsLabel,
    baths,
    bathsLabel,
    sqft,
    sqftLabel,
    badges,
    satisfiedFamilies,
    viewDetailsLabel,
    viewPhotosLabel,
    modelLabel,
    carouselDelay = 4000,
    initialDelay = 0,
    community,
  } = props;

  // Usar traducciones dinámicas con fallback a props si están disponibles
  const displayViewDetailsLabel = viewDetailsLabel || t("homeModels.viewMoreDetails");
  const displayViewMoreLabel = t("homeModels.viewMore");
  const displayModelLabel = modelLabel || t("homeModels.model");
  const displayPriceFromLabel = t("homeModels.priceFrom");
  const displayRtoLabel = t("homeModels.rto");
  const displayFeaturesLabel = t("homeModels.features");
  const addToFavoritesLabel = t("homeModels.addToFavorites");
  const removeFromFavoritesLabel = t("homeModels.removeFromFavorites");
  const shareLabel = t("homeModels.share");
  const linkCopiedLabel = t("homeModels.linkCopied") || "Link copied!";
  const shareModelLabel = t("homeModels.shareModel") || `Share ${name}`;
  
  // Community labels
  const communityLabel = community 
    ? community === "labelle" 
      ? t("communities.labelle.name")
      : t("communities.lehighAcres.name")
    : null;
  const viewPhotosCountLabel = (count: number) => 
    t("homeModels.viewPhotosCount").replace("{count}", count.toString());
  const closeGalleryLabel = t("homeModels.closeGallery");
  const previousImageLabel = t("homeModels.previousImage");
  const nextImageLabel = t("homeModels.nextImage");
  const garageLabel = t("homeModels.garages");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer para lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px",
  });

  // Simple model link without community parameter
  const modelLink = `/models/${modelKey}`;
  
  // URL completa para compartir
  const fullModelUrl = `${SEO_CONFIG.siteUrl}${modelLink}`;

  // Use all images if available, otherwise fallback to single image
  const displayImages = images.length > 0 ? images : [image];
  const hasMultipleImages = displayImages.length > 1;

  // Auto carousel with staggered delay - Only if carouselDelay > 0
  useEffect(() => {
    if (!isGalleryOpen && hasMultipleImages && carouselDelay > 0) {
      // Add initial delay to stagger animations between cards
      const timeoutId = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, carouselDelay);
      }, initialDelay);

      return () => {
        clearTimeout(timeoutId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGalleryOpen, displayImages.length, hasMultipleImages, carouselDelay, initialDelay]);

  const openGallery = useCallback(() => {
    setIsGalleryOpen(true);
    setGalleryImageIndex(currentImageIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [currentImageIndex]);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  const changeGalleryImage = useCallback((direction: number) => {
    setGalleryImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return displayImages.length - 1;
      if (newIndex >= displayImages.length) return 0;
      return newIndex;
    });
  }, [displayImages.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  }, []);

  // Función para compartir el modelo
  const handleShare = useCallback(async () => {
    // Limpiar timeout anterior si existe
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    const shareData = {
      title: shareModelLabel,
      text: `${name} - ${description}`,
      url: fullModelUrl,
    };

    // Intentar usar Web Share API si está disponible (móvil principalmente)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        // Si se comparte exitosamente, mostrar confirmación
        setIsLinkCopied(true);
        copyTimeoutRef.current = setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000);
        return;
      } catch (error) {
        // Si el usuario cancela, no hacer nada
        if ((error as Error).name === "AbortError") {
          return;
        }
        // Si hay otro error, continuar con copiar al portapapeles
      }
    }

    // Fallback: Copiar al portapapeles
    try {
      await navigator.clipboard.writeText(fullModelUrl);
      setIsLinkCopied(true);
      copyTimeoutRef.current = setTimeout(() => {
        setIsLinkCopied(false);
      }, 3000);
    } catch (error) {
      // Si falla clipboard API, usar método alternativo
      const textArea = document.createElement("textarea");
      textArea.value = fullModelUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setIsLinkCopied(true);
        copyTimeoutRef.current = setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [fullModelUrl, name, description, shareModelLabel]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll thumbnails when galleryImageIndex changes
  useEffect(() => {
    if (!isGalleryOpen) return;
    
    const activeThumbnail = thumbnailRefs.current[galleryImageIndex];
    if (activeThumbnail && thumbnailContainerRef.current) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [galleryImageIndex, isGalleryOpen]);

  return (
    <>
      {/* Main Card Container */}
      <AnimatedCard index={initialDelay / 100} className="relative w-full">
        <div ref={ref} className="relative w-full group">
          <motion.div 
            className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
          >
          {/* Image Carousel */}
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] overflow-hidden bg-gray-100">
            <div
              className={cn(
                "flex transition-transform duration-300 ease-out h-full",
                hasMultipleImages && "transform"
              )}
              style={
                hasMultipleImages
                  ? { transform: `translateX(-${currentImageIndex * 100}%)` }
                  : {}
              }
            >
              {displayImages.map((img, index) => (
                <div key={index} className="min-w-full h-full relative">
                  {inView || index === 0 ? (
                    <Image
                      src={img}
                      alt={
                        index === 0
                          ? `${name} model home in Florida - New construction home by M.J. Newell Homes - Home builder Florida`
                          : `${name} model home interior ${index + 1} - New home construction Florida`
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      priority={index === 0 && inView}
                      loading={index === 0 && inView ? "eager" : "lazy"}
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  ) : (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Top Actions Bar - Left Side: Badges */}
            <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 z-20 flex flex-col gap-2">
              {/* Community Badge - Always visible if community is provided */}
              {community && communityLabel && (
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-md",
                    community === "labelle"
                      ? "bg-white/95 text-[#090040]"
                      : "bg-white/95 text-[#090040]"
                  )}
                >
                  <MapPin className={cn(
                    "w-4 h-4 shrink-0",
                    community === "labelle" 
                      ? "text-[#090040]"
                      : "text-[#090040]"
                  )} />
                  <span className="whitespace-nowrap">{communityLabel}</span>
                </div>
              )}
              
              {/* Model Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {badges.map((badge, idx) => (
                    <ModelBadge
                      key={idx}
                      type={badge.type}
                      label={badge.label}
                      count={badge.type === "satisfied" ? satisfiedFamilies : undefined}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Top Actions Bar - Right Side: Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
                aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                type="button"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
              </button>
              <button
                onClick={handleShare}
                onKeyDown={(e) => handleKeyDown(e, handleShare)}
                className={cn(
                  "bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-md relative",
                  isLinkCopied && "bg-slate-900/20"
                )}
                aria-label={isLinkCopied ? "Link copied!" : "Share"}
                type="button"
              >
                <AnimatePresence mode="wait">
                  {isLinkCopied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-5 h-5 text-[#090040]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Toast de confirmación */}
                <AnimatePresence>
                  {isLinkCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-[#090040] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg z-50 pointer-events-none"
                    >
                      Link copied!
                      <div className="absolute -top-1 right-3 w-2 h-2 bg-[#090040] rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Price Badge - Modern Design */}
            <div className={cn(
              "absolute right-4 bottom-4 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full font-bold text-lg text-[#090040] shadow-xl z-20",
              hasMultipleImages && "bottom-20"
            )}>
              {price}
            </div>

            {/* View Gallery Button - Hidden on mobile, visible on tablet+ */}
            {hasMultipleImages && (
              <button
                onClick={openGallery}
                onKeyDown={(e) => handleKeyDown(e, openGallery)}
                className="hidden sm:flex absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full items-center gap-2 hover:bg-white transition-all shadow-md hover:scale-105 z-20 cursor-pointer"
                aria-label={`View ${displayImages.length} photos`}
                type="button"
              >
                <Eye className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
                  View Photos ({displayImages.length})
                </span>
              </button>
            )}
          </div>

          {/* Property Info - Modern Design */}
          <div className="p-8 sm:p-10 md:p-12 space-y-6 sm:space-y-7 md:space-y-8 flex-1 flex flex-col">
            {/* Title */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-[#090040] transition-colors">
                {name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 line-clamp-2 leading-relaxed">{description}</p>
            </div>

            {/* Quick Features - Modern Grid */}
            <div className="grid grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {[
                { icon: Bed, value: beds, label: "Beds" },
                { icon: Bath, value: baths, label: "Baths" },
                { icon: Square, value: sqft, label: "Sqft" },
                { icon: Car, value: "2", label: "Garage" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#090040]/5 to-[#090040]/5 rounded-xl p-4 sm:p-5 md:p-6 text-center hover:from-[#090040]/10 hover:to-[#090040]/10 transition-all duration-300 group-hover:scale-105"
                  >
                    <div className="flex justify-center mb-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#090040]" />
                    </div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1.5">{feature.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">{feature.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 pt-6 sm:pt-8 mt-auto border-t border-gray-200">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Starting From</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#090040] to-[#090040] bg-clip-text text-transparent">
                  {price}
                </p>
                {rtoPrice && (
                  <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium">
                    RTO: <span className="text-[#090040] font-bold">{rtoPrice}</span>
                  </p>
                )}
              </div>
              <Button
                asChild
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:shadow-md transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                <Link 
                  href={modelLink}
                  className="flex items-center gap-2"
                >
                  View Details
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        </div>
      </AnimatedCard>

      {/* Gallery Modal - Simplified for mobile, full for desktop */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeGallery}
        >
          {/* Mobile: Simple Image Viewer */}
          <div
            className="lg:hidden w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate">{name}</h3>
                {hasMultipleImages && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    {galleryImageIndex + 1} / {displayImages.length}
                  </p>
                )}
              </div>
              <button
                onClick={closeGallery}
                className="ml-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors border border-gray-200 shrink-0 cursor-pointer"
                aria-label={closeGalleryLabel}
                type="button"
                suppressHydrationWarning
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Mobile Image Container */}
            <div className="relative flex-1 bg-gray-100 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={displayImages[galleryImageIndex]}
                  alt={`${name} - ${galleryImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                  priority={galleryImageIndex === 0}
                  loading={galleryImageIndex === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Mobile Navigation Controls */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeGalleryImage(-1);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 z-10 shadow-lg hover:scale-110 cursor-pointer"
                    aria-label={previousImageLabel}
                    type="button"
                    suppressHydrationWarning
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeGalleryImage(1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 z-10 shadow-lg hover:scale-110 cursor-pointer"
                    aria-label={nextImageLabel}
                    type="button"
                    suppressHydrationWarning
                  >
                    <ChevronRight className="w-5 h-5 text-gray-900" />
                  </button>

                  {/* Mobile Thumbnail Strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
                    <div 
                      ref={thumbnailContainerRef}
                      className="flex gap-2 justify-center overflow-x-auto pb-1 scroll-smooth"
                    >
                      {displayImages.map((img, index) => (
                        <button
                          key={index}
                          ref={(el) => {
                            thumbnailRefs.current[index] = el;
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryImageIndex(index);
                          }}
                          className={cn(
                            "w-12 h-9 rounded-md overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer",
                            index === galleryImageIndex
                              ? "border-primary scale-105"
                              : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                          )}
                          aria-label={`View image ${index + 1}`}
                          type="button"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="48px"
                              quality={75}
                              loading="lazy"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop: Full Gallery with Details */}
          <div
            className="hidden lg:flex bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-2 h-full w-full">
              {/* Left: Image Gallery */}
              <div className="relative bg-gray-100 h-full min-h-[500px]">
                <div className="relative w-full h-full">
                  <Image
                    src={displayImages[galleryImageIndex]}
                    alt={`${name} - ${galleryImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    quality={90}
                    priority={galleryImageIndex === 0}
                    loading={galleryImageIndex === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Desktop Gallery Controls */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={() => changeGalleryImage(-1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 z-10 hover:scale-110 cursor-pointer shadow-lg"
                      aria-label={previousImageLabel}
                      type="button"
                      suppressHydrationWarning
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <button
                      onClick={() => changeGalleryImage(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 z-10 hover:scale-110 cursor-pointer shadow-lg"
                      aria-label={nextImageLabel}
                      type="button"
                      suppressHydrationWarning
                    >
                      <ChevronRight className="w-6 h-6 text-gray-900" />
                    </button>
                  </>
                )}

                {/* Desktop Thumbnail Strip */}
                {hasMultipleImages && (
                  <div 
                    ref={thumbnailContainerRef}
                    className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center z-10 overflow-x-auto pb-2 scroll-smooth"
                  >
                    {displayImages.map((img, index) => (
                      <button
                        key={index}
                        ref={(el) => {
                          thumbnailRefs.current[index] = el;
                        }}
                        onClick={() => setGalleryImageIndex(index)}
                        className={cn(
                          "w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer",
                          index === galleryImageIndex
                            ? "border-primary scale-105"
                            : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                        )}
                        aria-label={`View image ${index + 1}`}
                        type="button"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                            quality={75}
                            loading="lazy"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Desktop Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-lg">
                    <span className="text-gray-900 text-sm font-medium">
                      {galleryImageIndex + 1} / {displayImages.length}
                    </span>
                  </div>
                )}

                {/* Desktop Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 z-10 hover:scale-110 cursor-pointer shadow-lg"
                  aria-label={closeGalleryLabel}
                  type="button"
                  suppressHydrationWarning
                >
                  <X className="w-5 h-5 text-gray-900" />
                </button>
              </div>

              {/* Right: Property Details - Desktop Only */}
              <div className="p-8 lg:p-10 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="mb-8">
                  {badges && badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {badges.map((badge, idx) => (
                        <ModelBadge
                          key={idx}
                          type={badge.type}
                          label={badge.label}
                          count={badge.type === "satisfied" ? satisfiedFamilies : undefined}
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
                  <p className="text-gray-600 font-medium mb-4">{description}</p>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 uppercase tracking-wider" suppressHydrationWarning>
                      {displayPriceFromLabel}
                    </p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-[#090040] to-[#090040] bg-clip-text text-transparent">
                      {price}
                    </p>
                    {rtoPrice && (
                      <p className="text-base text-gray-600 mt-2 font-semibold" suppressHydrationWarning>
                        {displayRtoLabel}: <span className="text-[#090040] font-bold">{rtoPrice}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4" suppressHydrationWarning>
                    {displayFeaturesLabel}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Bed, value: beds, label: bedsLabel },
                      { icon: Bath, value: baths, label: bathsLabel },
                      { icon: Square, value: sqft, label: sqftLabel },
                      { icon: Car, value: garageLabel, label: garageLabel },
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          <div className="text-[#090040]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-gray-900 font-bold">{feature.value}</div>
                            <div className="text-gray-600 text-xs">{feature.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                  <Button
                    asChild
                    className="relative w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-xl font-semibold text-base hover:shadow-md transition-all duration-200 group overflow-hidden"
                  >
                    <Link href={modelLink} onClick={closeGallery}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {viewDetailsLabel}
                        <Maximize2 className="w-5 h-5 group-hover:scale-125 group-hover:rotate-90 transition-all duration-150" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Memoize component to prevent unnecessary re-renders
export const ModelCard = memo(ModelCardComponent);
