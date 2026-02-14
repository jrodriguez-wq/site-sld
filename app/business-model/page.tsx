import { BusinessModel } from "@/components/sections/business-model";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Our Mission | Standard Land Development",
  description: "Our mission: build affordable homes for American families. High-demand urban development across South Florida, real property-backed.",
};

export default function BusinessModelPage() {
  return (
    <>
      <PageHero
        title="Our Mission"
        subtitle="Building Affordable Homes for American Families"
        description="We develop high-demand urban projects across South Florida. Real property-backed, community-focused."
        backgroundImage="/houses/713/principal.webp"
        badge="Our Mission"
      />
      <div id="business-model" className="scroll-mt-20 sm:scroll-mt-24">
        <BusinessModel />
      </div>
    </>
  );
}
