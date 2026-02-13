"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { Building2, Target, Award } from "lucide-react";

export const CommercialIntro = () => {
  const features = [
    {
      icon: Building2,
      title: "Quality Construction",
      description:
        "We build commercial spaces with the highest standards of quality and craftsmanship, ensuring durability and functionality.",
    },
    {
      icon: Target,
      title: "On-Time Delivery",
      description:
        "Our efficient team works diligently to complete projects on schedule, minimizing delays and maximizing value.",
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description:
        "With years of experience, we have delivered successful commercial projects that exceed client expectations.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white relative" aria-labelledby="commercial-intro-heading">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <Container className="relative z-10">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 sm:gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3 sm:mb-4">
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
              Why Choose Us
              <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
            </span>
            <h2
              id="commercial-intro-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-slate-900 mb-2 sm:mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Excellence in Commercial Construction
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              We specialize in building commercial spaces that combine functionality, aesthetics, and efficiency. Our team brings expertise and dedication to every project.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.title} delay={0.1 * (index + 1)}>
                  <div className="group relative bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-[#090040]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#090040]/10">
                      <Icon className="h-6 w-6 text-[#090040]" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};
