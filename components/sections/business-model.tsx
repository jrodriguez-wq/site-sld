import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaBuilding, FaChartLine, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const BusinessModel = () => {
  const features = [
    {
      icon: FaBuilding,
      title: "Development",
      description:
        "We develop high demand urban projects. The majority of our projects are located in South Florida.",
    },
    {
      icon: FaChartLine,
      title: "Big Opportunity",
      description:
        "South Florida is booming with growth. We build where families and communities are growing.",
    },
    {
      icon: FaShieldAlt,
      title: "Real Property Backed",
      description:
        "All of the capital we deploy is backed by real property.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Comprehensive Analysis",
      description:
        "Before entering a market we complete a comprehensive area analysis so the product we build is what the community needs most.",
    },
  ];

  const problem = {
    title: "Solving the American Affordable Housing Shortage",
    description:
      "There is a shortage of 4 million+ homes. We are committed to addressing this crisis by building quality, affordable homes for American families.",
  };

  return (
    <>
      {/* Section 1 - Our Mission / Pillars - mobile-first */}
      <section
        id="business-model"
        className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white text-slate-900 relative scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8 md:mb-12 px-2 sm:px-0">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2 sm:mb-4">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3 leading-tight">
              Building the Future of Affordable Housing
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed">
              We develop high-demand urban projects across South Florida with a focus on families and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
                >
                  <div className="mb-2 sm:mb-3 md:mb-4 flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-[#090040]/10 shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#090040]" aria-hidden="true" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section 2 - Why we do it - dark, mobile-first */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <Container className="relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                {problem.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                {problem.description}
              </p>
              <Link
                href="/investment"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-4 py-3 sm:px-6 sm:py-3 rounded-xl bg-white text-[#090040] font-semibold text-sm sm:text-base hover:bg-white/95 active:scale-[0.99] transition-colors touch-manipulation"
                aria-label="Learn about our investment program"
              >
                Investment Program
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export { BusinessModel };
