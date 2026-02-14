import { InvestmentTeaser } from "@/components/sections/investment-teaser";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Investment Program | Standard Land Development",
  description:
    "Earn up to 22% annual return. Real property-backed. Schedule a call to learn how you can invest with Standard Land Development.",
};

export default function InvestmentPage() {
  return (
    <>
      <PageHero
        title="Investment Program"
        subtitle="Earn Up to 22% Annual Return"
        description="Real property-backed. Schedule a call to learn how."
        backgroundImage="/houses/4090/principal.webp"
        badge="Investment Opportunity"
      />
      <InvestmentTeaser />
    </>
  );
}
