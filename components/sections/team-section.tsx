"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Award, Users, Heart, Building2, Briefcase, Home } from "lucide-react";

const TeamSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#471396] relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20">
              Our Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white">
            Building Dreams with{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
              Family Values
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto">
            Meet the team dedicated to creating affordable homeownership opportunities for American families
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* CEO - Michael J. Newell */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="relative h-80 sm:h-96 overflow-hidden">
              <Image
                src="/recurses/ceo-michael.jpg"
                alt="Michael J. Newell - CEO"
                fill
                className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-[#D4AF37]" />
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
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="relative h-80 sm:h-96 overflow-hidden">
              <Image
                src="/recurses/coo.jpg"
                alt="COO"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-[#D4AF37]" />
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
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="relative h-80 sm:h-96 overflow-hidden">
              <Image
                src="/recurses/familia.jpg"
                alt="Family Values"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
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
      </Container>
    </section>
  );
};

export { TeamSection };
