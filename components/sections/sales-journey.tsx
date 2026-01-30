import { Container } from "@/components/ui/container";
import { FaBullhorn, FaPhone, FaCalendar, FaFileContract, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const SalesJourney = () => {
  const steps = [
    {
      icon: FaBullhorn,
      title: "Marketing Campaigns",
      description:
        "We run targeted marketing campaigns (digital ads, billboards, etc.) that generate +1000 leads per month.",
      metric: "+1000 leads/month",
      color: "from-[#090040] to-[#2d2c55]",
    },
    {
      icon: FaPhone,
      title: "C.R.M. & Call Centralization",
      description:
        "These leads are routed through our call centralization system, where 4 agents follow up with +600 calls per day to provide program information.",
      metric: "+600 calls/day",
      color: "from-[#2d2c55] to-[#2f2c79]",
    },
    {
      icon: FaCalendar,
      title: "Appointments",
      description:
        "The leads interested in our houses are scheduled for appointments, which are handled by our office team, assisting +140 families monthly.",
      metric: "+140 families/month",
      color: "from-[#2f2c79] to-[#302c9b]",
    },
    {
      icon: FaFileContract,
      title: "Client Assessment",
      description:
        "After the meeting, we assess clients' finances to match them with the best program.",
      color: "from-[#302c9b] to-[#471396]",
    },
    {
      icon: FaCheckCircle,
      title: "Under Contract",
      description:
        "Our final step is a direct interview with the owner, followed by the contract signing.",
      color: "from-[#471396] to-[#090040]",
    },
  ];

  return (
    <section id="sales-journey" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden scroll-mt-28">
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
        {/* Intro */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            A Seamless Lead-to-Conversion Process
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#471396] via-[#471396]/50 to-[#471396] hidden lg:block transform -translate-x-1/2" />
          
          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 w-full ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                    <div className={`bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-[#471396]/50 transition-all duration-300 hover:shadow-2xl ${
                      isEven ? "lg:ml-auto lg:max-w-lg" : "lg:mr-auto lg:max-w-lg"
                    }`}>
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? "lg:justify-end" : ""}`}>
                        <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} border border-gray-200`}>
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div className={isEven ? "lg:text-right" : ""}>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          {step.metric && (
                            <div className="text-sm sm:text-base font-semibold text-[#471396]">
                              {step.metric}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#471396] to-[#B13BFF] text-white font-bold text-xl sm:text-2xl border-4 border-gray-200 shadow-xl z-10">
                    {index + 1}
                  </div>
                  
                  {/* Spacer for desktop */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export { SalesJourney };
