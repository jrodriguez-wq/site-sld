import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { LogosSlider } from "@/components/sections/logos-slider";
import { Statistics } from "@/components/sections/statistics";
import { PreloadVideos } from "@/components/preload-videos";
import { LazySection } from "@/components/ui/lazy-section";

// Below-fold: code-split + LazySection carga solo cuando entran en viewport
const BeforeAfterSlider = dynamic(
  () => import("@/components/image-display/before-after-slider").then((m) => m.BeforeAfterSlider)
);
const ImageCompare = dynamic(
  () => import("@/components/image-display/image-compare").then((m) => m.ImageCompare)
);
const ModelsShowcase = dynamic(
  () => import("@/components/sections/models-showcase").then((m) => m.ModelsShowcase)
);
const VerticalVideoPlayer = dynamic(
  () => import("@/components/sections/vertical-video-player").then((m) => m.VerticalVideoPlayer)
);
const TeamSection = dynamic(
  () => import("@/components/sections/team-section").then((m) => m.TeamSection)
);
const GalleryPremium = dynamic(
  () => import("@/components/sections/gallery-premium").then((m) => m.GalleryPremium)
);

const SectionSkeleton = () => (
  <div className="min-h-[320px] sm:min-h-[400px] bg-slate-50/50 animate-pulse" aria-hidden />
);

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
      <PreloadVideos />
      <Hero />
      <LogosSlider />
      <Statistics />
      <LazySection fallback={<SectionSkeleton />}>
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
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
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
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
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
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
        <TeamSection />
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
        <GalleryPremium />
      </LazySection>
    </>
  );
}
