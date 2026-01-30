import { Container } from "@/components/ui/container";
import { FaHome, FaUsers, FaStar, FaDollarSign } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: FaHome,
      number: "1,500+",
      label: "Homes Built",
      description: "Quality homes delivered to families",
      gradient: "from-[#2d2c55] to-[#2f2c79]",
      accent: "#471396",
    },
    {
      icon: FaUsers,
      number: "1,500+",
      label: "Happy Families",
      description: "Families living their American dream",
      gradient: "from-[#2f2c79] to-[#302c9b]",
      accent: "#2823bc",
    },
    {
      icon: FaStar,
      number: "Pioneers",
      label: "Rent to Own",
      description: "Pioneers in the Rent to Own program",
      gradient: "from-[#302c9b] to-[#471396]",
      accent: "#B13BFF",
    },
    {
      icon: FaDollarSign,
      number: "$0",
      label: "Down Payment",
      description: "Homeownership with $0 down payment",
      gradient: "from-[#471396] to-[#B13BFF]",
      accent: "#FFCC00",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#090040]/3 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#090040]/3 via-transparent to-transparent" />
      
      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#471396] bg-[#471396]/10 px-4 py-2 rounded-full">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] bg-clip-text text-transparent">
              Building Dreams, One Home at a Time
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Our numbers speak for themselves
          </p>
        </div>

        {/* Stats Grid - Premium Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#471396]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                }}
              >
                {/* Accent Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${stat.accent}, ${stat.accent}80)` }}
                />
                
                {/* Icon Container */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div 
                    className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}15, ${stat.accent}05)`,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${stat.accent}20, transparent 70%)`,
                      }}
                    />
                    <Icon 
                      className="relative z-10 h-7 w-7 sm:h-9 sm:w-9 transition-colors duration-300"
                      style={{ color: stat.accent }}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <div 
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 transition-colors duration-300"
                    style={{ color: stat.accent }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export { Statistics };
