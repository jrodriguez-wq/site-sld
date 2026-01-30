import { BusinessModel } from "@/components/sections/business-model";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Business Model | Standard Land Development",
  description: "Learn about Standard Land Development's business model. We develop high demand urban projects in Southwest Florida.",
};

export default function BusinessModelPage() {
  return (
    <>
      <PageHero
        title="Business Model"
        subtitle="High Demand Urban Development"
        description="Learn about Standard Land Development's business model. We develop high demand urban projects in Southwest Florida."
        backgroundImage="/houses/713/principal.jpg"
        badge="How We Work"
      />
      <div id="business-model" className="scroll-mt-28">
        <BusinessModel />
      </div>
    </>
  );
}
