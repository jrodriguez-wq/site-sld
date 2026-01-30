import { CashProgram } from "@/components/sections/cash-program";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Investment Program | Standard Land Development",
  description: "Learn about our 1st Position Lender - Cash Program. A streamlined construction financing process from start to finish.",
};

export default function InvestmentPage() {
  return (
    <>
      <PageHero
        title="Investment Program"
        subtitle="1st Position Lender - Cash Program"
        description="Learn about our streamlined construction financing process from start to finish. A proven investment opportunity."
        backgroundImage="/houses/4090/principal.jpg"
        badge="Investment Opportunity"
      />
      <div id="cash-program" className="scroll-mt-28">
        <CashProgram />
      </div>
    </>
  );
}
