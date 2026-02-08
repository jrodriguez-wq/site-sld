"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Building2, Target, Award } from "lucide-react";

const CONTAINER_CLASS = "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

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
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className={CONTAINER_CLASS}>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Excellence in Commercial Construction
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We specialize in building commercial spaces that combine
              functionality, aesthetics, and efficiency. Our team brings
              expertise and dedication to every project.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.title} delay={0.1 * (index + 1)}>
                  <div className="group relative bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-[#090040]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#090040]/10">
                      <Icon
                        className="h-7 w-7 text-[#090040]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
