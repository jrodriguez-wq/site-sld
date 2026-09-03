import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { BusinessLines } from "@/components/sections/business-lines";
import { LogosSlider } from "@/components/sections/logos-slider";
import { Statistics } from "@/components/sections/statistics";
import { PreloadVideos } from "@/components/preload-videos";
import { LazySection } from "@/components/ui/lazy-section";

const BeforeAfterSlider = dynamic(() =>
  import("@/components/image-display/before-after-slider").then(
    (m) => m.BeforeAfterSlider
  )
);
const ModelsShowcase = dynamic(() =>
  import("@/components/sections/models-showcase").then((m) => m.ModelsShowcase)
);
const VerticalVideoPlayer = dynamic(() =>
  import("@/components/sections/vertical-video-player").then(
    (m) => m.VerticalVideoPlayer
  )
);
const TeamSection = dynamic(() =>
  import("@/components/sections/team-section").then((m) => m.TeamSection)
);
const GalleryPremium = dynamic(() =>
  import("@/components/sections/gallery-premium").then((m) => m.GalleryPremium)
);

const SectionSkeleton = () => (
  <div
    className="min-h-[320px] sm:min-h-[400px] bg-slate-50/50 animate-pulse"
    aria-hidden
  />
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

/** Full marketing home — used only when SITE_UNDER_CONSTRUCTION is false. */
export function HomePageContent() {
  return (
    <div className="bg-white">
      <PreloadVideos />
      <Hero />
      <BusinessLines />
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
          eyebrow="Construction"
          headline="From dirt"
          highlightedText="to street"
          description="One comparison: groundbreaking versus a finished SLD street. Models live on a separate page from any street address."
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
        <TeamSection />
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
        <GalleryPremium />
      </LazySection>
    </div>
  );
}
