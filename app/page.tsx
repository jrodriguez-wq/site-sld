import { Hero } from "@/components/sections/hero";
import { Statistics } from "@/components/sections/statistics";
import { CashProgram } from "@/components/sections/cash-program";
import { CommercialGallery } from "@/components/sections/commercial-gallery";
import { CharityNews } from "@/components/sections/charity-news";
import { LogosSlider } from "@/components/sections/logos-slider";
import { ModelsShowcase } from "@/components/sections/models-showcase";
import { PremiumHouses } from "@/components/sections/premium-houses";
import { TeamSection } from "@/components/sections/team-section";
import { GalleryPremium } from "@/components/sections/gallery-premium";
import { Videos } from "@/components/sections/videos";

export const metadata = {
  title: "Standard Land Development | Creating Home Ownership Opportunities",
  description: "Standard Land Development - Building affordable homes in Southwest Florida since 2016. Creating the opportunity of home ownership for American Families.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogosSlider />
      <Statistics />
      <CharityNews />
      <CashProgram showCta />
      <CommercialGallery variant="home" />
      <ModelsShowcase />
      <PremiumHouses />
      <GalleryPremium />
      <TeamSection />
      <Videos />
    </>
  );
}
