"use client";

import { useEffect, useState, useMemo, Suspense, lazy, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { getModelData } from "@/lib/models/model-data";
import { extractPrice } from "@/lib/models/model-utils";
import { ModelData, Community } from "@/types/model";
import { FilterState } from "@/components/models/model-filters";
import { getModelsForCommunity } from "@/lib/models/model-pricing";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";

// Lazy load heavy components
const ModelCard = lazy(() => 
  import("@/components/models/model-card").then((module) => ({
    default: module.ModelCard,
  }))
);

const ModelFilters = lazy(() => 
  import("@/components/models/model-filters").then((module) => ({
    default: module.ModelFilters,
  }))
);

// Configuración de badges y datos adicionales por modelo
// Las etiquetas se obtendrán de las traducciones usando labelKey
const MODEL_CONFIG = {
  louisiana: {
    badges: [{ type: "bestseller" as const, labelKey: "homeModels.badges.bestseller" }],
    satisfiedFamilies: 150,
  },
  viana: {
    badges: [{ type: "favorite" as const, labelKey: "homeModels.badges.favorite" }],
    satisfiedFamilies: 85,
  },
  delanie: {
    badges: [{ type: "satisfied" as const, labelKey: "homeModels.badges.satisfied" }],
    satisfiedFamilies: 120,
  },
  langdon: {
    badges: [
      { type: "bestseller" as const, labelKey: "homeModels.badges.bestseller" },
      { type: "favorite" as const, labelKey: "homeModels.badges.favorite" },
    ],
    satisfiedFamilies: 200,
  },
  emelia: {
    badges: [{ type: "satisfied" as const, labelKey: "homeModels.badges.satisfied" }],
    satisfiedFamilies: 95,
  },
  duplex: {
    badges: [{ type: "favorite" as const, labelKey: "homeModels.badges.investment" }],
    satisfiedFamilies: 0,
  },
} as const;

interface ModelDisplayData {
  key: string;
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  price: string;
  priceNumber: number;
  rtoPrice?: string;
  beds: string;
  bedsNumber: number;
  baths: string;
  bathsNumber: number;
  sqft: string;
  sqftNumber: number;
  modelData: ModelData | null;
  community?: Community; // Comunidad a la que pertenece este modelo
}


// Helper function to extract numeric value from string like "4" or "3+"
const extractNumber = (value: string): number => {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Helper function to extract sqft number from string like "3,277"
const extractSqft = (sqftString: string): number => {
  const cleaned = sqftString.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
};

export default function ModelsPage() {
  const [models, setModels] = useState<ModelDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 600000],
    bedrooms: [],
    bathrooms: [],
    sqftRange: [0, 4000],
  });

  useEffect(() => {
    let isMounted = true;

    const loadModelsData = async () => {
      setIsLoading(true);
      
      const allModelsWithData: ModelDisplayData[] = [];

      // Obtener modelos de cada comunidad por separado
      const labelleModels = getModelsForCommunity("labelle");
      const lehighModels = getModelsForCommunity("lehigh-acres");

      // Cargar modelos de LaBelle
      const labelleModelKeys = labelleModels.map((key) => ({
        key,
        nameKey: `homeModels.models.${key}.name`,
        descriptionKey: `homeModels.models.${key}.description`,
        priceKey: `homeModels.models.${key}.price`,
      }));

      // Cargar modelos de Lehigh Acres
      const lehighModelKeys = lehighModels.map((key) => ({
        key,
        nameKey: `homeModels.models.${key}.name`,
        descriptionKey: `homeModels.models.${key}.description`,
        priceKey: `homeModels.models.${key}.price`,
      }));

      // Load models in batches to avoid blocking
      const batchSize = 3;

      // Cargar modelos de LaBelle
      for (let i = 0; i < labelleModelKeys.length; i += batchSize) {
        if (!isMounted) break;
        
        const batch = labelleModelKeys.slice(i, i + batchSize);
        const batchData = await Promise.all(
          batch.map(async (model) => {
            const modelData = await getModelData(model.key, "labelle");
            if (!modelData) return [];
            
            return [{
              ...model,
              key: `${model.key}-labelle`,
              price: modelData.price,
              priceNumber: extractPrice(modelData.price),
              rtoPrice: modelData.rtoPrice,
              beds: modelData.bedrooms,
              bedsNumber: extractNumber(modelData.bedrooms),
              baths: modelData.bathrooms,
              bathsNumber: extractNumber(modelData.bathrooms),
              sqft: modelData.sqft,
              sqftNumber: extractSqft(modelData.sqft),
              modelData,
              community: "labelle" as Community,
            }];
          })
        );

        const flattened = batchData.flat();
        allModelsWithData.push(...flattened);
      }

      // Cargar modelos de Lehigh Acres
      for (let i = 0; i < lehighModelKeys.length; i += batchSize) {
        if (!isMounted) break;
        
        const batch = lehighModelKeys.slice(i, i + batchSize);
        const batchData = await Promise.all(
          batch.map(async (model) => {
            const modelData = await getModelData(model.key, "lehigh-acres");
            if (!modelData) return [];
            
            return [{
              ...model,
              key: `${model.key}-lehigh-acres`,
              price: modelData.price,
              priceNumber: extractPrice(modelData.price),
              rtoPrice: modelData.rtoPrice,
              beds: modelData.bedrooms,
              bedsNumber: extractNumber(modelData.bedrooms),
              baths: modelData.bathrooms,
              bathsNumber: extractNumber(modelData.bathrooms),
              sqft: modelData.sqft,
              sqftNumber: extractSqft(modelData.sqft),
              modelData,
              community: "lehigh-acres" as Community,
            }];
          })
        );

        const flattened = batchData.flat();
        allModelsWithData.push(...flattened);
      }

      if (!isMounted) return;

      // Group models by base key (without community suffix) and keep only the most expensive one
      const modelsMap = new Map<string, ModelDisplayData>();
      
      for (const model of allModelsWithData) {
        const baseKey = model.key.split("-")[0]; // Remove community suffix
        const existing = modelsMap.get(baseKey);
        
        if (!existing || model.priceNumber > existing.priceNumber) {
          modelsMap.set(baseKey, {
            ...model,
            key: baseKey, // Use base key without community suffix
          });
        }
      }
      
      // Convert map to array and sort by price (cheapest first)
      const uniqueModels = Array.from(modelsMap.values()).sort((a, b) => a.priceNumber - b.priceNumber);
      
      // Set max values for filters
      const maxPrice = Math.max(...uniqueModels.map((m) => m.priceNumber), 600000);
      const maxSqft = Math.max(...uniqueModels.map((m) => m.sqftNumber), 4000);
      
      setModels(uniqueModels);
      setFilters((prev) => ({
        ...prev,
        priceRange: [0, maxPrice],
        sqftRange: [0, maxSqft],
      }));
      setIsLoading(false);
    };

    loadModelsData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      // Price filter
      if (model.priceNumber < filters.priceRange[0] || model.priceNumber > filters.priceRange[1]) {
        return false;
      }

      // Bedrooms filter - "2+" means 2 or more, "3+" means 3 or more, etc.
      // If multiple filters are selected, model must match at least one (OR logic)
      if (filters.bedrooms.length > 0) {
        const matchesBedroomFilter = filters.bedrooms.some(minBedrooms => 
          model.bedsNumber >= minBedrooms
        );
        if (!matchesBedroomFilter) {
          return false;
        }
      }

      // Bathrooms filter - "1+" means 1 or more, "2+" means 2 or more, etc.
      // If multiple filters are selected, model must match at least one (OR logic)
      if (filters.bathrooms.length > 0) {
        const matchesBathroomFilter = filters.bathrooms.some(minBathrooms => 
          model.bathsNumber >= minBathrooms
        );
        if (!matchesBathroomFilter) {
          return false;
        }
      }

      // Sqft filter
      if (model.sqftNumber < filters.sqftRange[0] || model.sqftNumber > filters.sqftRange[1]) {
        return false;
      }

      return true;
    });
  }, [models, filters]);

  const maxPrice = useMemo(() => {
    return models.length > 0 ? Math.max(...models.map((m) => m.priceNumber), 600000) : 600000;
  }, [models]);

  const maxSqft = useMemo(() => {
    return models.length > 0 ? Math.max(...models.map((m) => m.sqftNumber), 4000) : 4000;
  }, [models]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Home Models"
        subtitle="Find Your Dream Home"
        description="Browse our complete collection of new construction home models. From cozy starter homes to spacious family residences, discover the perfect home for you."
        backgroundImage="/hero/aurora.webp"
        badge="New Construction"
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1920px]">

          {/* Mobile Filters - Only visible on mobile/tablet */}
          {!isLoading && (
            <div className="lg:hidden mb-8">
              <Suspense fallback={<div className="h-20 bg-muted/50 rounded-xl animate-pulse" />}>
                <ModelFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  maxPrice={maxPrice}
                  maxSqft={maxSqft}
                />
              </Suspense>
            </div>
          )}

          {/* Main Layout - Desktop: Sidebar Left + Content Right | Mobile: Stacked */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
            {/* Desktop Sidebar Filters - Left Side */}
            {!isLoading && (
              <aside className="hidden lg:block w-72 xl:w-80 2xl:w-96 shrink-0">
                <Suspense fallback={<div className="h-96 bg-muted/50 rounded-2xl animate-pulse" />}>
                  <ModelFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    maxPrice={maxPrice}
                    maxSqft={maxSqft}
                  />
                </Suspense>
              </aside>
            )}

            {/* Main Content Area - Right Side (Desktop) */}
            <div className="flex-1 min-w-0 w-full max-w-full">
              {/* Results count and info - All Screens */}
              {!isLoading && (
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-gray-200">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    <span className="font-bold text-gray-900 text-lg sm:text-xl">{filteredModels.length}</span>{" "}
                    {filteredModels.length === 1 ? "model" : "models"} found
                  </span>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Sorted by price: Low to High
                  </span>
                </div>
              )}

            {/* Models Grid - Fully Responsive */}
                     {isLoading ? (
                       <div className="flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20">
                         <div className="text-gray-600 text-sm sm:text-base">
                           Loading models...
                         </div>
                       </div>
                     ) : filteredModels.length === 0 ? (
                       <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 text-center px-4">
                         <p className="text-gray-600 text-sm sm:text-base mb-4">
                           No models found matching your filters.
                         </p>
                         <Button
                           variant="outline"
                           onClick={() => setFilters({
                             priceRange: [0, maxPrice],
                             bedrooms: [],
                             bathrooms: [],
                             sqftRange: [0, maxSqft],
                           })}
                           className="text-sm"
                         >
                           Reset Filters
                         </Button>
                       </div>
            ) : (
              <div 
                className="grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 grid-cols-1 md:grid-cols-2 w-full max-w-full" 
                suppressHydrationWarning
              >
                {filteredModels.map((model, index) => {
                  // Use base key directly (already unique, no community suffix)
                  const baseKey = model.key as keyof typeof MODEL_CONFIG;
                  const config = MODEL_CONFIG[baseKey];
                  const modelImages = getModelImages(baseKey).map(getCloudinaryImageUrl);
                  const mainImage = getCloudinaryImageUrl(getModelMainImage(baseKey));
                  // Auto carousel interval: 4 seconds (4000ms) - each card will cycle through images
                  const carouselInterval = 4000; // 4 seconds
                  const initialDelay = index * 80; // Stagger delay for animations

                  // Convert badges with labelKey to badges with English labels
                  const badgeLabels: Record<string, string> = {
                    "homeModels.badges.bestseller": "Bestseller",
                    "homeModels.badges.favorite": "Favorite",
                    "homeModels.badges.satisfied": "Satisfied",
                    "homeModels.badges.investment": "Investment",
                  };
                  const translatedBadges = config?.badges?.map(badge => ({
                    type: badge.type,
                    label: badgeLabels[badge.labelKey] || badge.labelKey,
                  }));

                  // Get name and description directly from modelData
                  const modelName = model.modelData?.name || baseKey.charAt(0).toUpperCase() + baseKey.slice(1);
                  const modelDescription = model.modelData?.description || "";

                  return (
                    <Suspense 
                      key={model.key} 
                      fallback={
                        <div className="h-96 bg-gray-100 rounded-3xl animate-pulse" />
                      }
                    >
                      <ModelCard
                        modelKey={baseKey}
                        name={modelName}
                        description={modelDescription}
                        image={mainImage}
                        images={modelImages}
                        price={model.price}
                        rtoPrice={model.rtoPrice}
                        beds={model.beds}
                        bedsLabel="Beds"
                        baths={model.baths}
                        bathsLabel="Baths"
                        sqft={model.sqft}
                        sqftLabel="Sqft"
                        badges={translatedBadges}
                        satisfiedFamilies={config?.satisfiedFamilies}
                        viewDetailsLabel="More Details"
                        viewPhotosLabel={`View Photos (${modelImages.length})`}
                        galleryTitle={`Gallery ${modelName}`}
                        galleryDescription={`${modelImages.length} ${modelImages.length === 1 ? "image" : "images"} available`}
                        modelLabel="Model"
                        carouselDelay={carouselInterval}
                        initialDelay={initialDelay}
                        community={model.community}
                      />
                    </Suspense>
                  );
                })}
              </div>
            )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

