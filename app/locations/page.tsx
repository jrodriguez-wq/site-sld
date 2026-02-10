import { Locations } from "@/components/sections/locations";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Locations | Standard Land Development",
  description: "Explore our development locations in South Florida. We develop projects in Palm Beach, Broward, Hendry, Glades, Collier and Lee counties.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        title="Our Locations"
        subtitle="Building Across South Florida"
        description="Explore our development locations in South Florida. We develop projects in Palm Beach, Broward, Hendry, Glades, Collier and Lee counties."
        backgroundImage="/houses/3711/principal.jpg"
        badge="Where We Build"
      />
      <div id="locations" className="scroll-mt-28">
        <Locations />
      </div>
    </>
  );
}
