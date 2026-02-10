"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Heart, Home, Users, Truck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { YouTubeVideo } from "@/components/ui/youtube-video";

const stats = [
  {
    icon: Home,
    value: "2,875",
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

const CharityNews = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32"
      aria-labelledby="charity-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative blurs - smaller on mobile */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-[#090040]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-[#090040]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Video */}
        <AnimatedSection className="mb-8 sm:mb-12 md:mb-16">
          <div className="relative w-full max-w-6xl mx-auto aspect-video rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl border border-white/10 bg-gradient-to-br from-[#090040] to-[#2d2c55]">
            {isPlaying ? (
              <YouTubeVideo
                url="https://www.youtube.com/embed/vNogIQG-uZM"
                title="Learn To Build by Michael J Newell"
                className="w-full h-full"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/90 via-[#2d2c55]/85 to-[#090040]/90" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
                    News Coverage
                  </span>
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg px-2">
                    SLD&apos;s Relief Efforts
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto mb-4 sm:mb-6 px-1">
                    Watch how our team helped rebuild communities after natural disasters
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center z-10 min-h-[44px] min-w-[44px] touch-manipulation"
                  aria-label="Play video: SLD Relief Efforts"
                >
                  <span className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:scale-95 border border-white/30 shadow-xl transition-all duration-200">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 text-white ml-0.5" aria-hidden />
                  </span>
                </button>
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-8">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/80 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
              Community Impact
            </span>

            <h2
              id="charity-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white px-1"
            >
              Building Hope After Disaster
            </h2>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-snug sm:leading-relaxed max-w-3xl mx-auto px-1">
              <p>
                When tornadoes and hurricanes devastated Florida, Michael Newell and the SLD team didn&apos;t hesitate to step up and help our community rebuild.
              </p>
              <p>
                Our team worked tirelessly to construct homes, deliver essential supplies, and provide hope to families affected by natural disasters. We brought food, water, clothing, and resources to those who needed it most.
              </p>
            </div>

            {/* Stats - 1 col mobile, 3 cols sm+ */}
            <AnimatedSection.Stagger
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6"
              rootMargin="0px 0px -40px 0px"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article
                    key={stat.label}
                    className="relative flex flex-col items-center text-center rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/20 mb-2 sm:mb-3">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" aria-hidden />
                    </div>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tabular-nums">
                      {stat.value}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 sm:mt-1">
                      {stat.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-300 mt-1 line-clamp-2 sm:line-clamp-none">
                      {stat.description}
                    </p>
                  </article>
                );
              })}
            </AnimatedSection.Stagger>

            <div className="pt-6 sm:pt-8">
              <Link
                href="/blog/sld-relief-efforts-building-hope-after-natural-disasters"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 py-3 sm:px-6 sm:py-3 bg-white hover:bg-white/95 text-[#090040] font-semibold rounded-xl transition-colors duration-200 shadow-lg touch-manipulation"
                aria-label="Read full story about SLD relief efforts"
              >
                Read Full Story
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};

export { CharityNews };
