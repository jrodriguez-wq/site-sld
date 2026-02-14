import { Hero } from "@/components/sections/hero";
import { LogosSlider } from "@/components/sections/logos-slider";
import { Statistics } from "@/components/sections/statistics";
import { BeforeAfterSlider } from "@/components/image-display/before-after-slider";
import { ImageCompare } from "@/components/image-display/image-compare";
import { ModelsShowcase } from "@/components/sections/models-showcase";
import { TeamSection } from "@/components/sections/team-section";
import { VerticalVideoPlayer } from "@/components/sections/vertical-video-player";
import { GalleryPremium } from "@/components/sections/gallery-premium";

const homeVideos = [
  {
    id: "video1",
    src: "/SLD-video1.mp4",
    poster: "/recurses/casa.webp",
    title: "Construction Progress",
    subtitle:
      "Watch our construction process in action, from foundation to finish",
  },
  {
    id: "video2",
    src: "/SLD-video2.MP4",
    poster: "/recurses/casas.webp",
    title: "Project Development",
    subtitle:
      "See how we develop quality homes with attention to every detail",
  },
];

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
      <BeforeAfterSlider
        beforeImage={{
          src: "/constructions/Ca1.webp",
          alt: "Community during construction - development in progress",
          label: "Before",
        }}
        afterImage={{
          src: "/constructions/ComunidadC.webp",
          alt: "Completed community - finished homes and landscaping",
          label: "After",
        }}
        eyebrow="Transformation"
        headline="See The"
        highlightedText="Difference"
        description="From groundbreaking to move-in ready. Drag the slider to compare our community before and after development."
        theme="dark"
      />
      
      <ModelsShowcase /> 
      <VerticalVideoPlayer
        videos={homeVideos}
        eyebrow="Construction Videos"
        headline="See Our Work"
        highlightedText="In Action"
        description="Watch our construction and development process, showcasing our commitment to quality and excellence."
        layout="side-by-side"
        theme="dark"
        showBlurBackground
      />
      <ImageCompare
        leftImage={{
          src: "/constructions/Ca2.webp",
          alt: "SLD construction site - house under construction with team and equipment",
          label: "In Progress",
        }}
        rightImage={{
          src: "/constructions/ComunidadC.webp",
          alt: "Completed community - finished homes and landscaping",
          label: "Completed",
        }}
        eyebrow="Our Work"
        headline="From Site"
        highlightedText="To Community"
        description="Active construction with the SLD team and equipment, to the finished community our families call home."
        ctaText="View Models"
        ctaHref="/models"
        dividerAngle={12}
        interactive
      />
      <TeamSection />
      <GalleryPremium />
     
    </>
  );
}
