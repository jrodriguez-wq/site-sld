"use client";

import Image from "next/image";
import { Award, Users, Heart, Building2, Briefcase, Home } from "lucide-react";

const TeamSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative scroll-mt-28">
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16 md:mb-20">
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-6">
            Our Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Building Dreams with Family Values
          </h2>
          <p className="text-base sm:text-lg text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
            Meet the team dedicated to creating affordable homeownership opportunities for American families
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* CEO - Michael J. Newell */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/recurses/ceo-michael.jpg"
                alt="Michael J. Newell - CEO"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-white/90" aria-hidden="true" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">CEO & Founder</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Michael J. Newell</h3>
                <p className="text-sm text-white/80">Standard Land Development</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Over 13 years of experience in real estate. Founded SLD in 2016 with a vision to build affordable homes for families in Southwest Florida.
              </p>
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  <span>13+ Years</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Home className="h-4 w-4" />
                  <span>1,500+ Homes</span>
                </div>
              </div>
            </div>
          </div>

          {/* COO */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/recurses/coo.jpg"
                alt="COO"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-white/90" aria-hidden="true" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">COO</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Chief Operating Officer</h3>
                <p className="text-sm text-white/80">Operations Excellence</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Leading our operations with precision and dedication to ensure every project meets our high standards of quality and efficiency.
              </p>
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span>Operations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  <span>Quality Focus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Family Values */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/recurses/familia.jpg"
                alt="Family Values"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Family Man</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Family First</h3>
                <p className="text-sm text-white/80">Building for Families</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                A family man who understands the importance of homeownership. We build homes for families, by a family man who values what matters most.
              </p>
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4" />
                  <span>Family Values</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TeamSection };
