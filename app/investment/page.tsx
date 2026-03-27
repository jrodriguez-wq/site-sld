import type { Metadata } from "next";
import { InvestmentTeaser } from "@/components/sections/investment-teaser";
import { PageHero } from "@/components/ui/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generateInvestmentSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Real Estate Investment — 22% Annual Return | Standard Land Development",
  description:
    "Earn up to 22% annual return with 1st Position Lender program. Real property-backed investment secured by Southwest Florida real estate. Over 2,875 homes built. Schedule a call with Standard Land Development.",
  alternates: { canonical: `${siteUrl}/investment` },
  openGraph: {
    title: "Real Estate Investment — 22% Annual Return | Standard Land Development",
    description:
      "1st Position Lender program. Real property-backed. 22% annual return. Schedule a call with SLD.",
    url: `${siteUrl}/investment`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Investment Program" }],
  },
};

export default function InvestmentPage() {
  const schemas = [
    generateInvestmentSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: siteUrl },
      { name: "Investment Program", url: `${siteUrl}/investment` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
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
