import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { PageHero } from "@/components/ui/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";
import { SITE_IMAGES } from "@/config/site-images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Contact Standard Land Development — LaBelle, FL",
  description:
    "Contact Standard Land Development in LaBelle, Florida. Tours, floor plans, communities, and commercial construction. Call Michael at (561) 818-4530 or Nader at (518) 536-4008.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Standard Land Development — LaBelle, FL",
    description: "Tours, floor plans, and communities. Call Michael at (561) 818-4530 or Nader at (518) 536-4008.",
    url: `${siteUrl}/contact`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Contact SLD" }],
  },
};

export default function ContactPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Contact", url: `${siteUrl}/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch with Our Team"
        description="Contact us for investment opportunities, homeownership programs, and more. We're here to help you achieve your dream of homeownership."
        backgroundImage={SITE_IMAGES.elevation}
        badge="Let's Connect"
      />
      <div id="contact" className="scroll-mt-20 sm:scroll-mt-24">
        <Contact />
      </div>
    </>
  );
}
