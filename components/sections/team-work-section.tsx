"use client";

import { Users, Target, Zap, Award, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const CONTAINER_CLASS = "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const teamValues = [
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Our experienced team works together seamlessly, bringing expertise from every aspect of construction to deliver exceptional results.",
  },
  {
    icon: Zap,
    title: "Efficient Process",
    description:
      "We streamline our construction process to maximize efficiency without compromising on quality, ensuring timely project completion.",
  },
  {
    icon: Target,
    title: "Precision & Quality",
    description:
      "Every detail matters. We maintain the highest standards of craftsmanship and precision in every commercial and residential project.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description:
      "With over 1,500+ successful projects, our track record speaks for itself. We deliver on time, on budget, and beyond expectations.",
  },
];

const processSteps = [
  { label: "Initial Consultation & Planning", num: "01" },
  { label: "Design & Permits", num: "02" },
  { label: "Construction Execution", num: "03" },
  { label: "Quality Inspection", num: "04" },
  { label: "Final Delivery", num: "05" },
];

export const TeamWorkSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-slate-50 relative">
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
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Teamwork & Efficiency
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We work hard as a team, combining expertise, efficiency, and
              dedication to build commercial spaces and homes that exceed
              expectations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-20">
            {teamValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={0.08 * (index + 1)}>
                  <div className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 hover:border-[#090040]/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#090040]/10">
                      <Icon
                        className="h-6 w-6 text-[#090040]"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 text-center">
                Our Construction Process
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
                {processSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-xs font-bold text-[#090040]/60">
                        {step.num}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#090040]">
                        <CheckCircle2
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                      {step.label}
                    </p>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-5 left-[70%] w-[60%] h-px bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
};
