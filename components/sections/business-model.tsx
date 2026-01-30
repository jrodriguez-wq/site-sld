import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBuilding, FaChartLine, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";

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
    <section id="business-model" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
            Standard Land Development - Building the Future of Affordable Housing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#471396]/50 transition-all hover:scale-105 shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#471396]/10 to-[#B13BFF]/10 border border-[#471396]/20">
                  <Icon className="h-7 w-7 text-[#471396]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#471396]/5 to-[#B13BFF]/5 rounded-3xl p-8 border border-[#471396]/20 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {problem.title}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {problem.description}
          </p>
        </div>
      </Container>
    </section>
  );
};

export { BusinessModel };
