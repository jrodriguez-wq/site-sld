import type { Metadata } from "next";
import { SITE_UNDER_CONSTRUCTION } from "@/config/site-mode";
import { HomePageContent } from "@/components/home-page-content";

export const metadata: Metadata = SITE_UNDER_CONSTRUCTION
  ? {
      title: "Website Under Construction",
      description:
        "Standard Land Development is rebuilding its website. Please check back soon.",
      robots: { index: false, follow: false },
    }
  : {
      title:
        "Affordable New Homes in Southwest Florida | Standard Land Development",
      description:
        "Standard Land Development builds new homes in Southwest Florida. 2,877 homes delivered since 2016. Floor plans, communities, and commercial construction from LaBelle, Florida.",
    };

export default function Home() {
  if (SITE_UNDER_CONSTRUCTION) {
    // Layout already renders UnderConstruction; keep home empty to avoid double UI.
    return null;
  }

  return <HomePageContent />;
}
