"use client";

import Image from "next/image";
import { Award, Building2, Briefcase, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedSection } from "@/components/ui/animated-section";

const TeamSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="team-heading"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3 sm:mb-4">
            Our Leadership
          </span>
          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-4 px-1"
          >
            Building Dreams with Family Values
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-snug sm:leading-relaxed px-1">
            Meet the team dedicated to creating affordable homeownership opportunities for American families
          </p>
        </AnimatedSection>

        <AnimatedSection.Stagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
          rootMargin="0px 0px -40px 0px"
        >
          {/* CEO - Michael J. Newell */}
          <article className="group relative flex flex-col bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:scale-[0.99]">
            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
              <Image
                src="/recurses/ceo-michael.jpg"
                alt="Michael J. Newell, CEO & Founder"
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 shrink-0" aria-hidden />
                  <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                    CEO & Founder
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  Michael J. Newell
                </h3>
                <p className="text-xs sm:text-sm text-white/80">Standard Land Development</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Over 13 years of experience in real estate. Founded SLD in 2016 with a vision to build affordable homes for families in Southwest Florida.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/70 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
                  13+ Years
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
                  2,875+ Homes
                </span>
              </div>
            </div>
          </article>

          {/* COO - Nader Hack */}
          <article className="group relative flex flex-col bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:scale-[0.99]">
            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
              <Image
                src="/recurses/coo.jpg"
                alt="Nader Hack - Chief Operating Officer"
                fill
                className="object-cover object-[center_25%] transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 shrink-0" aria-hidden />
                  <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                    COO
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  Nader Hack
                </h3>
                <p className="text-xs sm:text-sm text-white/80">Chief Operating Officer · Operations Excellence</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Leading our operations with precision and dedication to ensure every project meets our high standards of quality and efficiency.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/70 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
                  Operations
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
                  Quality Focus
                </span>
              </div>
            </div>
          </article>
        </AnimatedSection.Stagger>
      </Container>
    </section>
  );
};

export { TeamSection };
