"use client";

import { Container } from "@/components/ui/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FaHome, FaUsers, FaStar, FaDollarSign } from "react-icons/fa";

const stats = [
  {
    icon: FaHome,
    number: "2,875",
    label: "Homes Built",
    description: "Quality homes delivered to families",
    accent: "#090040",
  },
  {
    icon: FaUsers,
    number: "2,875",
    label: "Happy Families",
    description: "Families living their American dream",
    accent: "#2823bc",
  },
  {
    icon: FaStar,
    number: "Pioneers",
    label: "Rent to Own",
    description: "Pioneers in the Rent to Own program",
    accent: "#2d2c55",
  },
  {
    icon: FaDollarSign,
    number: "$0",
    label: "Down Payment",
    description: "Homeownership with $0 down payment",
    accent: "#FFCC00",
  },
];

const Statistics = () => {
  return (
    <section
      className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32"
      aria-labelledby="our-impact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#090040]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#090040]/5 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        {/* Header - compact on mobile */}
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-4">
            Our Impact
          </span>
          <h2
            id="our-impact-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4 px-1"
          >
            Building Dreams, One Home at a Time
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-1">
            Our numbers speak for themselves
          </p>
        </AnimatedSection>

        {/* Cards - 2x2 on mobile, 2 cols sm, 4 cols lg */}
        <AnimatedSection.Stagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          rootMargin="0px 0px -40px 0px"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.label}
                className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] min-h-0"
              >
                {/* Accent bar - top on mobile, subtle */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl opacity-90"
                  style={{
                    background: `linear-gradient(90deg, ${stat.accent}, ${stat.accent}99)`,
                  }}
                />

                {/* Icon - smaller on mobile */}
                <div className="mb-3 sm:mb-4 md:mb-5 flex justify-center">
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}18, ${stat.accent}08)`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                      style={{ color: stat.accent }}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Number */}
                <div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-0.5 sm:mb-1 md:mb-2 tabular-nums"
                  style={{ color: stat.accent }}
                >
                  {stat.number}
                </div>

                {/* Label */}
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-900 mb-1 sm:mb-2 leading-tight">
                  {stat.label}
                </h3>

                {/* Description - compact on mobile */}
                <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-slate-600 leading-snug line-clamp-2 sm:line-clamp-none mt-auto">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </AnimatedSection.Stagger>
      </Container>
    </section>
  );
};

export { Statistics };
