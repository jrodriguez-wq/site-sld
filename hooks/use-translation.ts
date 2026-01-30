"use client";

// Simple translation hook - returns English text directly
// All components use English only, no translations needed
export const useTranslation = () => {
  const t = (key: string): string => {
    // Return English text directly based on key
    const englishTexts: Record<string, string> = {
      "homeModels.allModels": "All Home Models",
      "homeModels.allModelsSubtitle": "Browse our complete collection of new construction home models",
      "models.filters.community": "Community",
      "models.filters.allCommunities": "All Communities",
      "models.results.one": "model",
      "models.results.many": "models",
      "models.results.found": "found",
      "models.results.sortedBy": "Sorted by price: Low to High",
      "models.loading": "Loading models...",
      "models.noResults": "No models found matching your filters.",
      "models.filters.reset": "Reset Filters",
      "homeModels.beds": "Beds",
      "homeModels.baths": "Baths",
      "homeModels.sqft": "Sqft",
      "homeModels.moreDetails": "More Details",
      "homeModels.viewPhotos": "View Photos",
      "homeModels.gallery": "Gallery",
      "homeModels.image": "image",
      "homeModels.images": "images",
      "homeModels.available": "available",
      "homeModels.model": "Model",
      "homeModels.viewMoreDetails": "View More Details",
      "homeModels.viewMore": "View More",
      "homeModels.priceFrom": "From",
      "homeModels.rto": "RTO",
      "homeModels.features": "Features",
      "homeModels.addToFavorites": "Add to favorites",
      "homeModels.removeFromFavorites": "Remove from favorites",
      "homeModels.share": "Share",
      "homeModels.linkCopied": "Link copied!",
      "homeModels.shareModel": "Share Model",
      "homeModels.viewPhotosCount": "View {count} photos",
      "homeModels.closeGallery": "Close gallery",
      "homeModels.previousImage": "Previous image",
      "homeModels.nextImage": "Next image",
      "homeModels.garages": "Garage",
      "communities.labelle.name": "LaBelle",
      "communities.labelle.country.subtitle": "Florida",
      "communities.lehighAcres.name": "Lehigh Acres",
      "communities.lehighAcres.country.subtitle": "Florida",
      "homeModels.models.louisiana.name": "Louisiana",
      "homeModels.models.viana.name": "Viana",
      "homeModels.models.langdon.name": "Langdon",
      "homeModels.models.delanie.name": "Delanie",
      "homeModels.models.emelia.name": "Emelia",
      "homeModels.models.aurora.name": "Aurora",
      "homeModels.models.duplex.name": "Duplex",
    };
    
    return englishTexts[key] || key;
  };

  return {
    t,
    language: "en" as const,
    setLanguage: () => {},
  };
};
