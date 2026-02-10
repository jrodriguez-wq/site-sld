"use client";

import Image from "next/image";
import {
  Home,
  Handshake,
  Award,
  Users,
  Target,
  TrendingUp,
  Building2,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const SECTION_CLASSES = {
  light: "bg-white text-slate-900",
  dark: "bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white",
};

const teamMembers = [
  {
    key: "michael",
    name: "Michael J. Newell",
    role: "CEO & Founder",
    company: "Standard Land Development & M.J. Newell Homes",
    image: "/michael-ceo.webp",
    bio: "Michael J. Newell founded Standard Land Development in 2016 with a clear mission: to build affordable homes for American families. With over 13 years of experience in real estate and construction, he leads both SLD and M.J. Newell Homes, overseeing the development of more than 1,500 homes across Southwest Florida. His vision—that housing should never exceed 25% of a family's income—guides every decision and has earned recognition in national media.",
    stats: [
      { label: "13+ Years", icon: Building2 },
      { label: "1,500+ Homes", icon: Home },
    ],
    quote: "The power of a team is crucial. You must recruit individuals who are both strong and trustworthy. I knew in order to be successful, I'd have to enlist first-line powerhouses.",
  },
  {
    key: "nader",
    name: "Nader Hack",
    role: "COO & Director of Financial Operations",
    company: "Standard Land Development",
    image: "/recurses/coo.jpg",
    bio: "Nader Hack oversees operations and financial strategy at Standard Land Development. As COO and Director of Financial Operations, he ensures every project runs efficiently and meets the highest standards of quality. His expertise in financial planning and operational excellence has been instrumental in scaling SLD's impact while maintaining affordability for families.",
    stats: [
      { label: "Operations", icon: Briefcase },
      { label: "Financial Strategy", icon: Award },
    ],
    quote: "Precision in operations and integrity in numbers—that's how we deliver quality homes that families can actually afford.",
  },
];

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
      {/* Section 1 - LIGHT: Our Story */}
      <section
        id="about-story"
        className={`py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 ${SECTION_CLASSES.light} relative scroll-mt-20 sm:scroll-mt-24`}
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
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="px-1">
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-6">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
                Building Affordable Homes Since 2016
              </h2>
              <div className="space-y-4 sm:space-y-5 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  Standard Land Development was founded in 2016 by CEO Michael J. Newell.
                  With over 13 years in real estate, Michael opened his business with a clear
                  mission: build affordable homes for families in Southwest Florida.
                </p>
                <p>
                  Today, we continue that mission with dedication, integrity, and a commitment
                  to excellence—helping over 1,500 families achieve their dream of homeownership.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="/recurses/casas.jpg"
                  alt="SLD housing development in Southwest Florida"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2 - DARK: Leadership Team */}
      <section
        id="about-leadership"
        className={`py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 ${SECTION_CLASSES.dark} relative`}
      >
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
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-1">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3 sm:mb-6">
              Our Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-4">
              Meet the Team Behind SLD
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
              Experienced professionals dedicated to creating affordable homeownership opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
                <div
                  key={member.key}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                        {member.role}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5 sm:mt-1">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-white/80">{member.company}</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-white/90 text-sm leading-relaxed mb-4">{member.bio}</p>
                    {member.quote && (
                      <blockquote className="text-sm text-white/70 italic border-l-2 border-white/30 pl-4 mb-4">
                        &quot;{member.quote}&quot;
                      </blockquote>
                    )}
                    <div className="flex items-center gap-4 text-white/70 text-xs">
                      {member.stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            <span>{stat.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3 - LIGHT: Mission & Vision */}
      <section
        id="about-mission"
        className={`py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 ${SECTION_CLASSES.light} relative`}
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
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16 px-1">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-6">
              Our Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4">
              Mission & Vision
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 bg-[#090040]/10 rounded-xl shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  &quot;We want to make prime-value homes available at an economical rate to all Americans.
                  We believe that affordable housing should be no more than a quarter of their income.&quot;
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 bg-[#090040]/10 rounded-xl shrink-0">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Vision for 2026</h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  By 2026, M.J. Newell Homes continues to build quality homes and expand our Rent to Own
                  program, helping more families achieve their dream of homeownership.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="/recurses/foto-aerea.png"
                  alt="Aerial view of SLD development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4 - LIGHT: Core Values - clean cards, visible icons */}
      <section
        id="about-values"
        className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-slate-50 relative"
      >
        <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16 px-1">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-6">
              What Drives Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="mb-3 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#090040]/10 shrink-0">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#090040]" aria-hidden="true" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{value.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
};

export { About };
