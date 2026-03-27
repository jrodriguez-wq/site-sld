import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { AboutLocations } from "@/components/sections/about-locations";
import { PageHero } from "@/components/ui/page-hero";
import { LogosSlider } from "@/components/sections/logos-slider";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "About Standard Land Development — Southwest Florida Home Builder Since 2016",
  description:
    "Founded in 2016 by Michael J. Newell, Standard Land Development has built 2,875+ affordable homes across Southwest Florida. Learn our mission, vision, team, and commitment to creating the opportunity of home ownership for American families.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About Standard Land Development — Southwest Florida Home Builder Since 2016",
    description: "2,875+ homes built since 2016. Founded by Michael J. Newell. Creating home ownership opportunities for American families in Southwest Florida.",
    url: `${siteUrl}/about`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Team — Southwest Florida" }],
  },
};

export default function AboutPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "About Us", url: `${siteUrl}/about` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="About Us"
        subtitle="Creating the opportunity of home ownership for American Families"
        description="Learn about Standard Land Development, our mission, vision, and core values. Founded in 2016 by CEO Michael J. Newell."
        backgroundImage="/houses/4090/principal.webp"
        badge="Our Story"
      />
      <div id="about" className="scroll-mt-20 sm:scroll-mt-24">
        <About />
      </div>
      <AboutLocations />
      <LogosSlider />

    </>
  );
}
