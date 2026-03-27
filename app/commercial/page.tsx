import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { CommercialIntro } from "@/components/sections/commercial-intro";
import { CommercialShowcase } from "@/components/sections/commercial-showcase";
import { TeamWorkSection } from "@/components/sections/team-work-section";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Commercial Construction in Southwest Florida | Standard Land Development",
  description:
    "Standard Land Development builds retail spaces, commercial units, and business locations across Southwest Florida. Quality commercial construction with the SLD team's expertise in LaBelle, Lehigh Acres, and surrounding areas.",
  alternates: { canonical: `${siteUrl}/commercial` },
  openGraph: {
    title: "Commercial Construction in Southwest Florida | Standard Land Development",
    description: "Retail spaces, commercial units, and business locations. Quality construction in Southwest Florida.",
    url: `${siteUrl}/commercial`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Commercial Construction" }],
  },
};

export default function CommercialPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Commercial Spaces", url: `${siteUrl}/commercial` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Commercial Spaces"
        subtitle="Our Commercial Projects"
        description="Discover our commercial construction projects. From retail spaces to business units, we deliver excellence in every build."
        backgroundImage="/constructions/ComunidadC.webp"
        badge="Commercial Construction"
      />
      <div id="commercial-content" className="scroll-mt-28">
        <CommercialIntro />
        <CommercialShowcase />
        <TeamWorkSection />
        {/* CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <Container className="relative z-10 text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to Start Your Commercial Project?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Contact our team to discuss your commercial construction needs. We deliver quality, efficiency, and excellence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090040] font-semibold hover:bg-[#B8860B] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090040]"
              aria-label="Contact us for your commercial project"
            >
              Get in Touch
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Container>
        </section>
      </div>
    </>
  );
}
