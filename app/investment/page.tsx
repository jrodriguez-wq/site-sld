import { CashProgram } from "@/components/sections/cash-program";
import { InvestmentIntro } from "@/components/sections/investment-intro";
import { InvestmentVisit } from "@/components/sections/investment-visit";
import { InvestmentResources } from "@/components/sections/investment-resources";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Investment Program | Standard Land Development",
  description:
    "Learn about our 1st Position Lender - Cash Program. Visit our office at 45 Bridge St, LaBelle, FL. A streamlined construction financing process from start to finish.",
};

export default function InvestmentPage() {
  return (
    <>
      <PageHero
        title="Investment Program"
        subtitle="1st Position Lender - Cash Program"
        description="A proven investment opportunity. Real property-backed, transparent process, 6-month timeline. Visit our LaBelle office or explore our resources."
        backgroundImage="/houses/4090/principal.jpg"
        badge="Investment Opportunity"
      />

      <div id="investment-content" className="scroll-mt-28">
        <InvestmentIntro />
        <div id="cash-program" className="scroll-mt-28">
          <CashProgram />
        </div>
        <InvestmentVisit />
        <InvestmentResources />
      </div>
    </>
  );
}
