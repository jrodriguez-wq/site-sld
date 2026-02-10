import { RentToOwn } from "@/components/sections/rent-to-own";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Programs | Standard Land Development",
  description: "Explore our Rent to Own program. Pioneers in making homeownership accessible.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        subtitle="Rent to Own"
        description="Explore our Rent to Own program. Pioneers in making homeownership accessible."
        backgroundImage="/houses/3941/principal.jpg"
        badge="Homeownership Programs"
      />
      <div id="rent-to-own" className="scroll-mt-20 sm:scroll-mt-24">
        <RentToOwn />
      </div>
    </>
  );
}
