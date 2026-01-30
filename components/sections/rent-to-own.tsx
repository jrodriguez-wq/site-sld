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
        "A portion of the monthly payment goes toward the down payment, allowing them to save while renting and building family wealth.",
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
    <section id="rent-to-own" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#090040]/3 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#090040]/3 via-transparent to-transparent" />

      <Container className="relative z-10">
        {/* Intro */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-6 sm:mb-8 max-w-2xl mx-auto">
            Pioneers in the Rent to Own program - Making homeownership accessible
          </p>
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#D4AF37]/20 shadow-lg">
            <FaAward className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4AF37]" />
            <div className="text-left">
              <div className="font-bold text-[#090040] text-sm sm:text-base">Pioneers</div>
              <div className="text-xs sm:text-sm text-gray-600">in Rent to Own</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} rounded-t-2xl sm:rounded-t-3xl`} />
                
                {/* Icon */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div 
                    className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.color} transition-all duration-300 group-hover:scale-110 shadow-lg`}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-white">
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
              $0
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Down Payment
            </h3>
            <p className="text-base sm:text-lg text-white/90 font-medium max-w-md mx-auto">
              Start your journey to homeownership with no down payment required
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { RentToOwn };
