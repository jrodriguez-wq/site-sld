export type Community = "labelle" | "lehigh-acres";

export interface ModelPricing {
  price: string;
  rtoPrice?: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
}

export interface ModelData {
  key: string;
  name: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  price: string;
  rtoPrice?: string;
  description: string;
  youtubeUrl?: string;
  imagesFolder: string;
  sections?: {
    inside?: {
      title: string;
      description?: string;
    };
    exterior?: {
      title: string;
      description?: string;
    };
    virtualTour?: {
      title: string;
      description?: string;
    };
    floorplan?: {
      title: string;
      description?: string;
      image?: string;
      measures?: {
        livingArea?: string;
        entry?: string;
        masterBedroom?: string;
        masterBath?: string;
        bedroom2?: string;
        bedroom3?: string;
        bedroom4?: string;
        bathroom2?: string;
        bathroom3?: string;
        kitchen?: string;
        dining?: string;
        familyRoom?: string;
        garage?: string;
        lanai?: string;
        coveredPatio?: string;
      };
    };
    standardFeatures?: {
      title: string;
      description?: string;
      categories?: {
        structural?: {
          title: string;
          items: string[];
        };
        kitchen?: {
          title: string;
          items: string[];
        };
        bathroom?: {
          title: string;
          items: string[];
        };
        warranty?: {
          title: string;
          items: string[];
        };
        windows?: {
          title: string;
          items: string[];
        };
        electrical?: {
          title: string;
          items: string[];
        };
        other?: {
          title: string;
          items: string[];
        };
      };
    };
  };
}
