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
        "We develop high demand urban projects. The majority of our projects are located in Southwest Florida.",
    },
    {
      icon: FaChartLine,
      title: "Big Opportunity",
      description:
        "Southwest Florida is booming with growth. Fort Myers was named one of the fastest growing cities in America in 2021.",
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
        "Before entering a market we complete a comprehensive area analysis to ensure the product we build is in the most demand in the community.",
    },
  ];

  const problem = {
    title: "Solving the American Affordable Housing Shortage",
    description:
      "Currently there is a shortage of 4 million+ homes. We are committed to addressing this crisis by building quality, affordable homes for American families.",
  };

  return (
    <>
      {/* Section 1 - LIGHT: Features */}
      <section
        id="business-model"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white text-slate-900 relative scroll-mt-28"
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
          <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Building the Future of Affordable Housing
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              Standard Land Development develops high-demand urban projects across Southwest Florida
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#090040]/10">
                    <Icon className="h-6 w-6 text-[#090040]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section 2 - DARK: Problem/Solution */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/20">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {problem.title}
              </h3>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                {problem.description}
              </p>
              <Link
                href="/investment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#090040] font-semibold hover:bg-white/95 transition-colors"
              >
                Investment Program
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export { BusinessModel };
