import { Container } from "@/components/ui/container";
import { FaLock, FaPiggyBank, FaUserTie, FaClock, FaAward } from "react-icons/fa";

const RentToOwn = () => {
  const benefits = [
    {
      icon: FaLock,
      title: "Fixed Price for 5 Years",
      description:
        "The buyer can lock in today's price, protecting themselves from rising interest rates and home prices, while enjoying stable payments without worrying about rent hikes for the next five years.",
      color: "from-[#D4AF37] to-[#B8860B]",
    },
    {
      icon: FaPiggyBank,
      title: "Build Equity",
      description:
        "A portion of the monthly payment goes toward building equity, allowing them to save while renting and building family wealth.",
      color: "from-[#B8860B] to-[#8B6914]",
    },
    {
      icon: FaUserTie,
      title: "Free Expert Guidance",
      description:
        "They will receive professional advice to help improve their financial profile, increasing their chances of homeownership.",
      color: "from-[#8B6914] to-[#6B4E00]",
    },
    {
      icon: FaClock,
      title: "Time to Prepare",
      description:
        "It gives them time to improve their credit score, save for taxes, and organize their finances while living in their future home.",
      color: "from-[#6B4E00] to-[#4A3500]",
    },
  ];

  return (
    <section id="rent-to-own" className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white relative scroll-mt-20 sm:scroll-mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      <Container className="relative z-10">
        {/* Intro - compact on mobile */}
        <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-1">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
            Pioneers in the Rent to Own program — Making homeownership accessible
          </p>
          <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-slate-900/5 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 border border-slate-200">
            <FaAward className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-slate-900 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <div className="font-bold text-[#090040] text-xs sm:text-sm md:text-base">Pioneers</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">in Rent to Own</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid - 1 col mobile, touch-friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99]"
              >
                {/* Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-slate-900 rounded-t-xl sm:rounded-t-2xl" />
                
                {/* Icon */}
                <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors duration-200 shrink-0">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" aria-hidden="true" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Card - compact on mobile */}
        <div className="text-center">
          <div className="inline-block bg-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl w-full max-w-md mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Start Your Journey
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium max-w-md mx-auto px-1">
              Get in touch to learn how our Rent to Own program can help you achieve homeownership
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { RentToOwn };
