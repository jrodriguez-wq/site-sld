import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Home, Handshake, Award, Users, Building2, Target, Heart, TrendingUp, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Home,
      title: "Affordable Housing",
      description:
        "We believe affordable housing should be no more than 25% of monthly income, ensuring families can live comfortably.",
    },
    {
      icon: Handshake,
      title: "Win-Win Approach",
      description:
        "We look for win-win solutions in business and help each other along the way, creating positive domino effects.",
    },
    {
      icon: Users,
      title: "Team Mentality",
      description:
        "We believe in harnessing each team member's individual strengths to achieve multi-linear success throughout the organization.",
    },
    {
      icon: Award,
      title: "Ethical Business",
      description:
        "Founded on ethical business and social principles, we provide comprehensive support from beginning to end.",
    },
  ];

  return (
    <>
      {/* Hero Section - Light Background */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden scroll-mt-28">
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
          {/* Intro Text */}
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700 font-medium max-w-3xl mx-auto">
              <p>
                Standard Land Development was born in 2016 and founded by our CEO
                Michael J. Newell. Michael has been in the real estate business for
                over 13 years.
              </p>
              <p>
                Around 7 years ago, Michael opened his own business in hopes of
                building affordable homes for people in Southwest Florida. Today, we
                continue that mission with dedication, integrity, and a commitment to
                excellence.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <div className="text-center p-6 bg-gradient-to-br from-[#471396]/5 to-white rounded-2xl border border-[#471396]/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#471396] to-[#090040] bg-clip-text text-transparent mb-2">
                1,500+
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-700">Homes Built</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#471396]/5 to-white rounded-2xl border border-[#471396]/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#471396] to-[#090040] bg-clip-text text-transparent mb-2">
                13+
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-700">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#471396]/5 to-white rounded-2xl border border-[#471396]/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#471396] to-[#090040] bg-clip-text text-transparent mb-2">
                1,500+
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-700">Happy Families</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#471396]/5 to-white rounded-2xl border border-[#471396]/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#471396] to-[#090040] bg-clip-text text-transparent mb-2">
                $0
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-700">Down Payment</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder Section - Dark Background */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#471396] text-white relative overflow-hidden">
        {/* Elegant Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B13BFF] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#471396] rounded-full blur-3xl" />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10">

          {/* Founder Section */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
            {/* Image */}
            <div className="relative w-full order-1 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 sm:p-6 border border-white/20">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#471396]/20 to-[#B13BFF]/10">
                  <Image
                    src="/michael-ceo.webp"
                    alt="Michael J. Newell - CEO"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#B13BFF]/20 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 order-2 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
                  Leadership
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
                  About Our Founder
                </span>
              </h2>
              <div className="space-y-5 text-white/90">
                <p className="text-lg sm:text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                    Michael J. Newell
                  </span>{" "}
                  - Founder & CEO
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Michael J. Newell applies a &quot;Win-Win&quot; approach to business, creating affordable housing for everyday Americans. He has applied a &quot;team mentality&quot; strategy at M.J. Newell Homes, resulting in enormous growth and helping over 1,500 families achieve their dream of homeownership.
                </p>
                <blockquote className="relative border-l-4 border-[#D4AF37] pl-6 pr-4 py-5 bg-white/5 backdrop-blur-sm rounded-r-2xl italic text-white font-medium text-base sm:text-lg shadow-xl border-t border-r border-b border-white/10">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-2xl -z-10" />
                  &quot;The power of a team is crucial. You must recruit individuals who are both strong and trustworthy. I knew in order to be successful, I&apos;d have to enlist first-line powerhouses.&quot;
                  <footer className="mt-4 text-base font-semibold text-[#D4AF37]">— Michael J. Newell</footer>
                </blockquote>
                <p className="text-base sm:text-lg leading-relaxed">
                  Michael strongly believes that managing a business means getting to know your employees and cultivating a culture of respect and appreciation. He has diligently invested hundreds of hours with each team member to achieve multi-linear success throughout the organization.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
                  Our Purpose
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
                  Our Mission & Vision
                </span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-t-3xl" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-[#D4AF37]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                    <Target className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">Our Mission</h4>
                </div>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  &quot;We want to make prime-value homes available at an economical rate to all Americans. We believe that affordable housing should be no more than a quarter of their income.&quot;
                </p>
              </div>
              <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-[#B13BFF]/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-t-3xl" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-[#B13BFF]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#B13BFF]/20 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-[#B13BFF]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">Vision for 2026</h4>
                </div>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  By 2026, M.J. Newell Homes continues to build quality homes and expand our Rent to Own program, helping more families achieve their dream of homeownership.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
                  What Drives Us
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
                  Our Core Values
                </span>
              </h3>
            </div>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                const accentColors = ["#D4AF37", "#B13BFF", "#471396", "#090040"];
                const accent = accentColors[index];
                return (
                  <div
                    key={value.title}
                    className="group relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl"
                      style={{ background: accent }}
                    />
                    <div className="relative z-10">
                      <div
                        className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${accent}20`,
                        }}
                      >
                        <Icon
                          className="h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300"
                          style={{ color: accent }}
                        />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-3">{value.title}</h4>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export { About };
