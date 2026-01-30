"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Bed, Bath, Square, Car, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubeVideo } from "@/components/ui/youtube-video";
import { PageContent } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { ModelData } from "@/types/model";
import { cn } from "@/lib/utils";
import { MODEL_FLOORPLANS, getModelInteriorImages, getModelExteriorImages, getModelAmoImages } from "@/lib/models/model-images";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloorplanMeasures } from "./floorplan-measures";

interface ModelPageContentProps {
  modelData: ModelData & { images: string[] };
}

export const ModelPageContent = ({ modelData }: ModelPageContentProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("inside");
  const [isFloorplanExpanded, setIsFloorplanExpanded] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const { name, sqft, bedrooms, bathrooms, garage, price, rtoPrice, description, youtubeUrl, images, sections } = modelData;
  
  // Use model name directly
  const modelName = name;
  // Use description directly
  const modelDescription = description;


  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const openGallery = (index: number, imagesToShow?: string[]) => {
    const imagesForGallery = imagesToShow || images;
    setGalleryImages(imagesForGallery);
    setGalleryImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  const changeGalleryImage = useCallback((direction: number) => {
    setGalleryImageIndex((prev) => {
      const imagesToUse = galleryImages.length > 0 ? galleryImages : images;
      const newIndex = prev + direction;
      if (newIndex < 0) return imagesToUse.length - 1;
      if (newIndex >= imagesToUse.length) return 0;
      return newIndex;
    });
  }, [images, galleryImages]);

  // Navegación con teclado en la galería
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
      } else if (e.key === "ArrowLeft") {
        changeGalleryImage(-1);
      } else if (e.key === "ArrowRight") {
        changeGalleryImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen, changeGalleryImage, closeGallery]);

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  // Obtener imágenes de interior y exterior usando las funciones del módulo
  // La primera imagen (mainImage) se mantiene en el hero
  const insideImages = useMemo(() => {
    return getModelInteriorImages(modelData.key);
  }, [modelData.key]);
  
  const exteriorImages = useMemo(() => {
    return getModelExteriorImages(modelData.key);
  }, [modelData.key]);
  
  const amoImages = useMemo(() => {
    return getModelAmoImages(modelData.key);
  }, [modelData.key]);
  
  // Función helper para encontrar el índice real de una imagen en el array completo
  const findImageIndex = (imagePath: string): number => {
    return images.findIndex((img) => img === imagePath);
  };

  return (
    <>
    <div className="min-h-screen bg-white">
    <PageContent size="xl">
      <div className="space-y-10 md:space-y-12 pt-8 pb-16">
          {/* Hero Section */}
          <AnimatedSection delay={0}>
            <div className="relative">
              <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] rounded-3xl overflow-hidden bg-gray-100">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex]}
                  alt={`${name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      onKeyDown={(e) => handleKeyDown(e, handlePreviousImage)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg z-20"
                      aria-label="Previous image"
                      type="button"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      onKeyDown={(e) => handleKeyDown(e, handleNextImage)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg z-20"
                      aria-label="Next image"
                      type="button"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20">
                    <span className="text-gray-900 text-sm font-medium">
                      Image {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {/* View Gallery Button */}
                {images.length > 1 && (
                  <button
                    onClick={() => openGallery(currentImageIndex)}
                    onKeyDown={(e) => handleKeyDown(e, () => openGallery(currentImageIndex))}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-all hover:scale-105 shadow-lg z-20"
                    aria-label="View Gallery"
                    type="button"
                  >
                    <Maximize2 className="w-4 h-4 text-gray-900" />
                    <span className="text-gray-900 text-sm font-medium hidden sm:inline">View Gallery</span>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 text-base sm:text-lg">No images available</p>
              </div>
            )}

            {/* Elegant Model Title Overlay - Subtle and modern */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="relative">
                {/* Very subtle gradient background for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent h-32 sm:h-40 md:h-48" />
                
                {/* Title Container - Elegant and subtle */}
                <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
                  <div className="max-w-5xl mx-auto text-center">
                    <h1 
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white/95"
                      style={{
                        textShadow: "0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
                      }}
                      suppressHydrationWarning
                    >
                      {modelName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
          </AnimatedSection>

        {/* Model Information Section */}
        <AnimatedSection delay={0.1}>
          <section className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Price Card - Featured */}
            <Card className="lg:col-span-1 bg-gradient-to-br from-[#090040]/5 via-[#471396]/5 to-white border-2 border-[#471396]/20 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="p-6">
                <CardDescription className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Starting Price
                </CardDescription>
                <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent">
                  {price}
                </CardTitle>
                <p className="text-base md:text-lg font-semibold text-[#471396] mt-2">
                  $0 Down
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                {/* RTO Price Section */}
                {rtoPrice && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Rent to Own Program
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-[#471396]">
                      {rtoPrice}
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Contact us for financing options
                </p>
              </CardContent>
            </Card>

            {/* Features Grid - Modern Design */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="group hover:border-[#471396]/50 transition-all duration-200 hover:shadow-lg h-full flex flex-col bg-white">
                <CardContent className="p-6 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-4 w-full h-full">
                    <div className="shrink-0 p-4 bg-[#471396]/10 rounded-xl group-hover:bg-[#471396]/20 group-hover:scale-110 transition-all duration-200">
                      <Square className="w-8 h-8 text-[#471396]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                      <p className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-1">{sqft}</p>
                      <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                        Sqft
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-[#471396]/50 transition-all duration-200 hover:shadow-lg h-full flex flex-col bg-white">
                <CardContent className="p-6 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-4 w-full h-full">
                    <div className="shrink-0 p-4 bg-[#471396]/10 rounded-xl group-hover:bg-[#471396]/20 group-hover:scale-110 transition-all duration-200">
                      <Bed className="w-8 h-8 text-[#471396]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                      <p className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-1">{bedrooms}</p>
                      <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                        Bedrooms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-[#471396]/50 transition-all duration-200 hover:shadow-lg h-full flex flex-col bg-white">
                <CardContent className="p-6 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-4 w-full h-full">
                    <div className="shrink-0 p-4 bg-[#471396]/10 rounded-xl group-hover:bg-[#471396]/20 group-hover:scale-110 transition-all duration-200">
                      <Bath className="w-8 h-8 text-[#471396]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                      <p className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-1">{bathrooms}</p>
                      <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                        Bathrooms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-[#471396]/50 transition-all duration-200 hover:shadow-lg h-full flex flex-col bg-white">
                <CardContent className="p-6 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-4 w-full h-full">
                    <div className="shrink-0 p-4 bg-[#471396]/10 rounded-xl group-hover:bg-[#471396]/20 group-hover:scale-110 transition-all duration-200">
                      <Car className="w-8 h-8 text-[#471396]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                      <p className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-1">{garage}</p>
                      <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                        Garage
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </section>
        </AnimatedSection>

        {/* Description Section */}
        <AnimatedSection delay={0.15}>
          <section className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">About This Model</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#090040] to-[#471396] rounded-full"></div>
            </div>
            <Card className="border-2 border-gray-200 bg-white">
              <CardContent className="pt-6 p-6">
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">{modelDescription}</p>
              </CardContent>
            </Card>
          </div>
          </section>
        </AnimatedSection>

        {/* Tabs Section */}
        <AnimatedSection delay={0.15}>
          <section className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 md:mb-12">
              <TabsList className="inline-flex h-auto p-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border-2 border-gray-200/50 shadow-lg backdrop-blur-sm w-full md:w-auto">
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {sections?.inside && (
                    <TabsTrigger 
                      value="inside"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Inside
                    </TabsTrigger>
                  )}
                  {sections?.exterior && (
                    <TabsTrigger 
                      value="exterior"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Exterior
                    </TabsTrigger>
                  )}
                  {amoImages.length > 0 && (
                    <TabsTrigger 
                      value="furnished"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Furnished
                    </TabsTrigger>
                  )}
                  {sections?.virtualTour && (
                    <TabsTrigger 
                      value="virtualTour"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Virtual Tour
                    </TabsTrigger>
                  )}
                  {sections?.floorplan && (
                    <TabsTrigger 
                      value="floorplan"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Floorplan
                    </TabsTrigger>
                  )}
                  {sections?.standardFeatures && (
                    <TabsTrigger 
                      value="standardFeatures"
                      className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-bold rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#471396] data-[state=active]:to-[#090040] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#471396]/30 data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#471396] data-[state=inactive]:hover:bg-gray-100 border-2 border-transparent data-[state=active]:border-[#471396]/20 flex-1 sm:flex-none"
                    >
                      Standard Features
                    </TabsTrigger>
                  )}
                </div>
              </TabsList>
            </div>

            {/* Inside Tab */}
            {sections?.inside && (
              <TabsContent value="inside" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Inside</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">Explore the beautiful interior spaces of this home</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insideImages.map((image, index) => {
                    const realIndex = findImageIndex(image);
                    return (
                      <button
                        key={index}
                        onClick={() => openGallery(realIndex, images)}
                        onKeyDown={(e) => handleKeyDown(e, () => openGallery(realIndex, images))}
                        className="relative aspect-video rounded-2xl overflow-hidden group transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        aria-label={`View image ${index + 1}`}
                        type="button"
                      >
                        <Image
                          src={image}
                          alt={`${modelName} inside - ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            )}

            {/* Exterior Tab */}
            {sections?.exterior && (
              <TabsContent value="exterior" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Exterior</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">Discover the stunning exterior design and curb appeal</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exteriorImages.map((image, index) => {
                    const realIndex = findImageIndex(image);
                    return (
                      <button
                        key={index}
                        onClick={() => openGallery(realIndex, images)}
                        onKeyDown={(e) => handleKeyDown(e, () => openGallery(realIndex, images))}
                        className="relative aspect-video rounded-2xl overflow-hidden group transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        aria-label={`View image ${index + 1}`}
                        type="button"
                      >
                        <Image
                          src={image}
                          alt={`${modelName} exterior - ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            )}

            {/* Furnished Tab */}
            {amoImages.length > 0 && (
              <TabsContent value="furnished" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Furnished</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">See how this model looks when fully furnished</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {amoImages.map((image, index) => {
                    // Combinar todas las imágenes para la galería
                    const allImagesForGallery = [...images, ...amoImages];
                    const finalIndex = images.length + index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => openGallery(finalIndex, allImagesForGallery)}
                        onKeyDown={(e) => handleKeyDown(e, () => openGallery(finalIndex, allImagesForGallery))}
                        className="relative aspect-video rounded-2xl overflow-hidden group transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        aria-label={`View image ${index + 1}`}
                        type="button"
                      >
                        <Image
                          src={image}
                          alt={`${modelName} furnished - ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            )}

            {/* Virtual Tour Tab */}
            {sections?.virtualTour && youtubeUrl && (
              <TabsContent value="virtualTour" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Virtual Tour</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">Take a virtual walkthrough of this beautiful home</p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200">
                    <YouTubeVideo url={youtubeUrl} title={`${modelName} Virtual Tour`} />
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Floorplan Tab */}
            {sections?.floorplan && (
              <TabsContent value="floorplan" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Floorplan</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">View the detailed floor plan and layout of this home</p>
                </div>
                {(() => {
                  // Prioridad: 1) Imagen del JSON, 2) Plano optimizado del mapeo, 3) Mensaje de "próximamente"
                  const floorplanImage = sections.floorplan?.image || MODEL_FLOORPLANS[modelData.key.toLowerCase()];
                  
                  if (floorplanImage) {
                    return (
                      <>
                        <Card className="border-2 border-gray-200 shadow-xl overflow-hidden bg-white">
                          <CardContent className="p-4 md:p-6">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden">
                              {/* Mobile optimized container - no horizontal scroll */}
                              <div className="relative w-full max-h-[60vh] sm:max-h-[70vh] md:max-h-none">
                                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                                  <Image
                                    src={floorplanImage}
                                    alt={`${modelName} Floorplan`}
                                    fill
                                    className="object-contain p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                    quality={90}
                                    priority={false}
                                    loading="lazy"
                                  />
                                  
                                  {/* Floorplan Measures Component - Desktop: absolute, Mobile: hidden (shown below) */}
                                  {sections.floorplan?.measures && (
                                    <div className="hidden md:block">
                                      <FloorplanMeasures
                                        livingArea={sections.floorplan.measures?.livingArea}
                                        entry={sections.floorplan.measures?.entry}
                                        garage={sections.floorplan.measures?.garage}
                                        garageLabel={garage}
                                        lanai={sections.floorplan.measures?.lanai}
                                        totalArea={sections.floorplan.measures?.totalArea}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Floorplan Measures Component - Mobile: shown below floorplan */}
                              {sections.floorplan?.measures && (
                                <div className="md:hidden mt-4">
                                  <FloorplanMeasures
                                    livingArea={sections.floorplan.measures?.livingArea}
                                    entry={sections.floorplan.measures?.entry}
                                    garage={sections.floorplan.measures?.garage}
                                    garageLabel={garage}
                                    lanai={sections.floorplan.measures?.lanai}
                                    totalArea={sections.floorplan.measures?.totalArea}
                                    className="relative bottom-0 right-0 w-full"
                                  />
                                </div>
                              )}
                              
                              {/* Expand button for mobile */}
                              <div className="md:hidden mt-3 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setIsFloorplanExpanded(true)}
                                  className="flex items-center gap-2 px-4 py-2 bg-[#471396] text-white rounded-lg text-sm font-semibold hover:bg-[#090040] transition-colors"
                                  type="button"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                  <span>View Full Floorplan</span>
                                </button>
                              </div>
                              {/* Helper text for desktop */}
                              <div className="hidden md:block mt-3 text-center">
                                <p className="text-xs text-gray-600">
                                  Click on the image to zoom
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Expanded Floorplan Modal for Mobile */}
                        {isFloorplanExpanded && (
                          <div
                            className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-0 bg-white/95 backdrop-blur-sm md:hidden"
                            onClick={() => setIsFloorplanExpanded(false)}
                          >
                            <div
                              className="bg-white rounded-t-2xl max-w-full w-full h-full flex flex-col overflow-hidden shadow-2xl border-2 border-gray-200 relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Close Button - Above navbar */}
                              <button
                                onClick={() => setIsFloorplanExpanded(false)}
                                className="absolute top-4 right-4 z-[120] bg-white/95 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-colors border-2 border-gray-200 shadow-lg"
                                aria-label="Close"
                                type="button"
                              >
                                <X className="w-5 h-5 text-gray-900" />
                              </button>

                              {/* Expanded Image Container */}
                              <div className="relative flex-1 w-full overflow-auto bg-white pt-20 pb-24">
                                <div className="relative w-full min-h-full p-4 flex items-center justify-center">
                                  <Image
                                    src={floorplanImage}
                                    alt={`${modelName} Floorplan - Expanded`}
                                    width={1200}
                                    height={900}
                                    className="object-contain w-full h-auto max-w-full"
                                    quality={95}
                                    priority={false}
                                  />
                                </div>
                              </div>

                              {/* Floorplan Measures Component - Fixed at bottom (subido para evitar chat) */}
                              {sections.floorplan?.measures && (
                                <div className="absolute bottom-20 left-0 right-0 z-[115] p-3 bg-white/95 backdrop-blur-md border-t-2 border-gray-200 rounded-t-xl">
                                  <FloorplanMeasures
                                    livingArea={sections.floorplan.measures?.livingArea}
                                    entry={sections.floorplan.measures?.entry}
                                    garage={sections.floorplan.measures?.garage}
                                    garageLabel={garage}
                                    lanai={sections.floorplan.measures?.lanai}
                                    totalArea={sections.floorplan.measures?.totalArea}
                                    className="relative bottom-0 right-0 w-full"
                                  />
                                </div>
                              )}

                              {/* Helper text */}
                              {!sections.floorplan?.measures && (
                                <div className="absolute bottom-4 left-4 right-4 text-center z-[115]">
                                  <p className="text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg inline-block">
                                    Scroll to view the complete floorplan
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  }
                  
                  return (
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6 p-6">
                        <p className="text-center text-base text-gray-600">Floorplan coming soon</p>
                      </CardContent>
                    </Card>
                  );
                })()}
              </TabsContent>
            )}

            {/* Standard Features Tab */}
            {sections?.standardFeatures && (
              <TabsContent value="standardFeatures" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Standard Features</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8">Explore the standard features included with this home</p>
                </div>
                {sections.standardFeatures?.categories && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(sections.standardFeatures.categories).map(([key, category]) => (
                      <Card key={key} className="bg-white border-2 border-gray-200 hover:border-[#471396]/50 transition-all duration-300">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-bold text-gray-900">{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {category.items.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="text-[#471396] mt-1.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
          </section>
        </AnimatedSection>

        {/* Contact CTA Section - Professional Design */}
        <AnimatedSection delay={0.2}>
          <section className="py-16 md:py-20 mt-16 lg:mt-20">
            <div className="bg-gradient-to-br from-[#090040] via-[#471396] to-[#090040] rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Interested in This Model?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get in touch with our team to learn more about this home and explore financing options
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white px-8 py-6 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Us
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-6 rounded-full font-bold text-base md:text-lg backdrop-blur-sm transition-all duration-300"
                  asChild
                >
                  <Link href="/investment" className="flex items-center gap-2">
                    Learn About Financing
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </PageContent>
    </div>

    {/* Gallery Modal - Simplificado */}
    {isGalleryOpen && (
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md"
        onClick={closeGallery}
        role="dialog"
        aria-modal="true"
        aria-label="Image Gallery"
      >
        <div
          className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-5 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {modelName}
              </h2>
              {(galleryImages.length > 0 ? galleryImages.length : images.length) > 1 && (
                <span className="text-sm text-gray-600">
                  {galleryImageIndex + 1} / {galleryImages.length > 0 ? galleryImages.length : images.length}
                </span>
              )}
            </div>
            <button
              onClick={closeGallery}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close Gallery"
              type="button"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative bg-gray-100 h-[75vh] sm:h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-24">
            <Image
              src={(galleryImages.length > 0 ? galleryImages : images)[galleryImageIndex]}
              alt={`${modelName} - Image ${galleryImageIndex + 1} of ${galleryImages.length > 0 ? galleryImages.length : images.length}`}
              fill
              className="object-contain p-6 sm:p-8 md:p-10"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              priority
            />

            {/* Navigation Arrows - Simplificados */}
            {(galleryImages.length > 0 ? galleryImages.length : images.length) > 1 && (
              <>
                <button
                  onClick={() => changeGalleryImage(-1)}
                  onKeyDown={(e) => handleKeyDown(e, () => changeGalleryImage(-1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors border border-gray-200 shadow-lg z-20"
                  aria-label="Previous image"
                  type="button"
                >
                      <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <button
                  onClick={() => changeGalleryImage(1)}
                  onKeyDown={(e) => handleKeyDown(e, () => changeGalleryImage(1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors border border-gray-200 shadow-lg z-20"
                  aria-label="Next image"
                  type="button"
                >
                      <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {(galleryImages.length > 0 ? galleryImages.length : images.length) > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-white/95 backdrop-blur-sm border-t border-gray-200">
              <div className="flex gap-3 sm:gap-4 justify-center overflow-x-auto scrollbar-hide px-4 sm:px-6 scroll-smooth">
                {(galleryImages.length > 0 ? galleryImages : images).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryImageIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, () => setGalleryImageIndex(index))}
                    className={cn(
                      "relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-opacity shrink-0",
                      index === galleryImageIndex
                        ? "border-[#471396] opacity-100"
                        : "border-transparent opacity-50 hover:opacity-75"
                    )}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === galleryImageIndex ? "true" : "false"}
                    type="button"
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </>
  );
};

