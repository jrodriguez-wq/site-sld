import { RentToOwn } from "@/components/sections/rent-to-own";
import { SalesJourney } from "@/components/sections/sales-journey";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Programs | Standard Land Development",
  description: "Explore our Rent to Own program and sales conversion journey. Pioneers in making homeownership accessible.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        subtitle="Rent to Own & Sales Journey"
        description="Explore our Rent to Own program and sales conversion journey. Pioneers in making homeownership accessible."
        backgroundImage="/houses/3941/principal.jpg"
        badge="Homeownership Programs"
      />
      <div id="rent-to-own" className="scroll-mt-28">
        <RentToOwn />
      </div>
      <div id="sales-journey" className="scroll-mt-28">
        <SalesJourney />
      </div>
    </>
  );
}
