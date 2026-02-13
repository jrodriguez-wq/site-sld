"use client";

import { ImageGallery } from "@/components/image-display";
import { galleryImages } from "@/lib/data/gallery-images";

const GalleryPremium = () => {
  return (
    <ImageGallery
      images={galleryImages}
      eyebrow="Our Work"
      headline="Building Communities,"
      highlightedText="One Home at a Time"
      columns={3}
      showCategories={true}
      categoryOrder={["All", "Homes", "Constructions", "Aerials"]}
      theme="light"
      useContainer={true}
      className="scroll-mt-20 sm:scroll-mt-24"
    />
  );
};

export { GalleryPremium };
