import { Hero } from "@/components/sections/hero";
import { LogosSlider } from "@/components/sections/logos-slider";
import { Statistics } from "@/components/sections/statistics";
import { ModelsShowcase } from "@/components/sections/models-showcase";
import { TeamSection } from "@/components/sections/team-section";
import { Videos } from "@/components/sections/videos";
import { GalleryPremium } from "@/components/sections/gallery-premium";

export const metadata = {
  title: "Standard Land Development | Creating Home Ownership Opportunities",
  description:
    "Standard Land Development - Building affordable homes in Southwest Florida since 2016. Creating the opportunity of home ownership for American Families.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogosSlider />
      <Statistics />
      <ModelsShowcase />
      <GalleryPremium />
      <TeamSection />
      <Videos />
    </>
  );
}
