import { About } from "@/components/sections/about";
import { AboutLocations } from "@/components/sections/about-locations";
import { PageHero } from "@/components/ui/page-hero";
import { LogosSlider } from "@/components/sections/logos-slider";
export const metadata = {
  title: "About Us | Standard Land Development | Southwest Florida Home Builder",
  description: "Meet the SLD leadership team. Founded in 2016 by Michael J. Newell, we build affordable homes for families in Southwest Florida. Mission, vision, and core values.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Creating the opportunity of home ownership for American Families"
        description="Learn about Standard Land Development, our mission, vision, and core values. Founded in 2016 by CEO Michael J. Newell."
        backgroundImage="/houses/4090/principal.webp"
        badge="Our Story"
      />
      <div id="about" className="scroll-mt-20 sm:scroll-mt-24">
        <About />
      </div>
      <AboutLocations />
      <LogosSlider />

    </>
  );
}
