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
      color: "from-[#2d2c55] to-[#090040]",
    },
    {
      icon: FaCalendar,
      title: "Appointments",
      description:
        "The leads interested in our houses are scheduled for appointments, which are handled by our office team, assisting +140 families monthly.",
      metric: "+140 families/month",
      color: "from-[#090040] to-[#2d2c55]",
    },
    {
      icon: FaFileContract,
      title: "Client Assessment",
      description:
        "After the meeting, we assess clients' finances to match them with the best program.",
      color: "from-[#2d2c55] to-[#090040]",
    },
    {
      icon: FaCheckCircle,
      title: "Under Contract",
      description:
        "Our final step is a direct interview with the owner, followed by the contract signing.",
      color: "from-[#090040] to-[#090040]",
    },
  ];

  return (
    <section id="sales-journey" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative scroll-mt-28">
      {/* Subtle Background Pattern */}
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
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-6">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            A Seamless Lead-to-Conversion Process
          </h2>
          <p className="text-base sm:text-lg text-white/75 font-normal max-w-2xl mx-auto">
            From marketing to contract signing
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 hidden lg:block transform -translate-x-1/2" />
          
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
                    <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl ${
                      isEven ? "lg:ml-auto lg:max-w-lg" : "lg:mr-auto lg:max-w-lg"
                    }`}>
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? "lg:justify-end" : ""}`}>
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/20">
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" aria-hidden="true" />
                        </div>
                        <div className={isEven ? "lg:text-right" : ""}>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                            {step.title}
                          </h3>
                          {step.metric && (
                            <div className="text-sm sm:text-base font-semibold text-white/80">
                              {step.metric}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 text-white font-bold text-xl sm:text-2xl border-2 border-white/30 shadow-xl z-10">
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
