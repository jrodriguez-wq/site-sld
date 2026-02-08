"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import Link from "next/link";
import { Play, Heart, Home, Users, Truck, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { YouTubeVideo } from "@/components/ui/youtube-video";

const CharityNews = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const stats = [
    {
      icon: Home,
      value: "2,100",
      label: "Homes Built",
      description: "Homes constructed for families in need",
    },
    {
      icon: Users,
      value: "54",
      label: "Team Members",
      description: "Dedicated employees helping communities",
    },
    {
      icon: Truck,
      value: "100%",
      label: "Community Support",
      description: "Food, water, clothing & resources delivered",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#090040]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ maxWidth: '50vw' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#090040]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ maxWidth: '50vw' }} />

      <Container className="relative z-10">
        {/* Video Section - Full Width and Prominent */}
        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div className="relative w-full max-w-6xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#090040] to-[#2d2c55] border border-white/10">
            {isPlaying ? (
              <YouTubeVideo
                url="https://www.youtube.com/embed/vNogIQG-uZM"
                title="Learn To Build by Michael J Newell"
                className="w-full h-full"
              />
            ) : (
              <>
                {/* Thumbnail/Poster */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/90 via-[#2d2c55]/80 to-[#090040]/90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6 sm:px-8">
                      <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider">
                        <Heart className="h-4 w-4" />
                        News Coverage
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                        SLD&apos;s Relief Efforts
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
                        Watch how our team helped rebuild communities after natural disasters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group/btn relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 shadow-2xl transition-all duration-200 flex items-center justify-center z-10 cursor-pointer"
                    aria-label="Play charity news video"
                  >
                    <Play className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 text-white ml-1 transition-transform group-hover/btn:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" aria-hidden="true" />
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-200" aria-hidden="true" />
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Content Section */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            {/* Badge */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Heart className="h-4 w-4" />
                Community Impact
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Building Hope After Disaster
            </h2>

            {/* Description */}
            <div className="space-y-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              <p>
                When tornadoes and hurricanes devastated Florida, Michael Newell and the SLD team didn&apos;t hesitate to step up and help our community rebuild.
              </p>
              <p>
                Our team worked tirelessly to construct homes, deliver essential supplies, and provide hope to families affected by the natural disasters. We brought food, water, clothing, and resources to those who needed it most.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/20 mb-3 sm:mb-4">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Read More Link */}
            <div className="pt-8">
              <Link
                href="/blog/sld-relief-efforts-building-hope-after-natural-disasters"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/95 text-[#090040] font-semibold rounded-xl transition-colors duration-200 shadow-lg cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};

export { CharityNews };
