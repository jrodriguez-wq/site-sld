import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { CommercialIntro } from "@/components/sections/commercial-intro";
import { CommercialShowcase } from "@/components/sections/commercial-showcase";
import { TeamWorkSection } from "@/components/sections/team-work-section";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Commercial Spaces | Standard Land Development",
  description: "Explore our commercial construction projects. We build retail spaces, commercial units, and business locations with efficiency and teamwork.",
};

export default function CommercialPage() {
  return (
    <>
      <PageHero
        title="Commercial Spaces"
        subtitle="Our Commercial Projects"
        description="Discover our commercial construction projects. From retail spaces to business units, we deliver excellence in every build."
        backgroundImage="/constructions/ComunidadC.png"
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
