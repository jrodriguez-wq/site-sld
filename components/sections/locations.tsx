"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  MapPin,
  Route,
  Building2,
  ArrowRight,
  ExternalLink,
  Users,
  TrendingUp,
  Landmark,
  Home,
  Sparkles,
  Waves,
  Ship,
} from "lucide-react";
import { LocationsMap } from "./locations-map";
import { OFFICES, getDirectionsUrl } from "@/data/offices";


const DISTANCES = [
  { city: "Miami", miles: "128", Icon: Waves },
  { city: "Tampa", miles: "148", Icon: Ship },
  { city: "Orlando", miles: "172", Icon: Building2 },
];

const COUNTIES = [
  "Palm Beach",
  "Broward",
  "Hendry",
  "Glades",
  "Collier",
  "Lee",
];

const KEY_ATTRACTIONS = [
  {
    title: "Recent Growth",
    description:
      "Moderate increase in housing prices with a median home price of $360,000 (Jan 2025), showing market stability.",
    icon: TrendingUp,
  },
  {
    title: "Government Incentives",
    description: "USDA programs support homeownership and development.",
    icon: Landmark,
  },
  {
    title: "Affordable Housing",
    description: "Attractive for young families and first-time buyers.",
    icon: Home,
  },
  {
    title: "Future Outlook",
    description:
      "Continued growth fueled by transportation access, affordability, and strategic location.",
    icon: Sparkles,
  },
];

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const Locations = () => (
  <>
    {/* Section 1: Map Hero - Full Width */}
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <Container className="relative z-10">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto px-1">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2 sm:mb-3">
              Interactive Map
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
              Our Offices Across South Florida
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg">
              Tap each marker for office details and directions
            </p>
          </div>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-xl ring-1 ring-slate-900/5 min-h-[280px] sm:min-h-[360px]">
            <LocationsMap />
          </div>
        </div>
      </Container>
    </section>

      {/* Section 2: Offices + Strategic Location - Dark */}
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative z-10">
          <SectionWrapper>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
              {/* Our Offices */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Our Offices
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm">
                      Multiple locations across South Florida
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {OFFICES.map((office, index) => (
                    <a
                      key={office.name}
                      href={getDirectionsUrl(office.address, office.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.99] transition-all duration-300 cursor-pointer touch-manipulation min-h-[44px]"
                      aria-label={`Get directions to ${office.name}`}
                    >
                      <span className="text-[10px] sm:text-xs font-semibold text-white/60 uppercase tracking-wider">
                        Office {index + 1}
                      </span>
                      <span className="font-bold text-white text-sm sm:text-base group-hover:text-white">
                        {office.name}
                      </span>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2">{office.address}</p>
                      <p className="text-xs sm:text-sm text-white/60">{office.city}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 mt-1.5 sm:mt-2 group-hover:gap-2 transition-all">
                        Get directions
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Strategic Location */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl shrink-0">
                    <Route className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Strategic Location
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm">
                      Proximity to major Florida cities
                    </p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {DISTANCES.map((d) => (
                    <div
                      key={d.city}
                      className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                          <d.Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-white text-base sm:text-lg truncate">
                          {d.city}
                        </span>
                      </div>
                      <span className="text-white/90 font-semibold text-sm sm:text-base shrink-0">
                        {d.miles} mi
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-xs sm:text-sm pt-1 sm:pt-2">
                  Easy access from major metropolitan areas for business meetings
                  and site visits.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </Container>
      </section>

      {/* Section 3: Development Areas - Light */}
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative z-10">
          <SectionWrapper>
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 px-1">
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2 sm:mb-4">
                Where We Develop
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4">
                Development Areas
              </h2>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                We develop projects across multiple counties in South Florida
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {COUNTIES.map((county) => (
                <span
                  key={county}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200/80 hover:bg-[#090040]/5 hover:border-[#090040]/20 hover:text-[#090040] transition-colors"
                >
                  {county}
                </span>
              ))}
            </div>
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
              We develop high demand urban projects. The majority of our projects
              are located in South Florida.
            </p>
          </SectionWrapper>
        </Container>
      </section>

      {/* Section 4: Key Attractions - Light/Slate */}
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-slate-50 relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative z-10">
          <SectionWrapper>
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 px-1">
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2 sm:mb-4">
                Hendry & Glades Counties
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4">
                Key Attractions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                Why families and investors are choosing South Florida
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {KEY_ATTRACTIONS.map((attraction) => {
                const Icon = attraction.icon;
                return (
                  <div
                    key={attraction.title}
                    className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
                  >
                    <div className="mb-3 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#090040]/10 shrink-0">
                      <Icon
                        className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">
                      {attraction.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionWrapper>
        </Container>
      </section>

      {/* Section 5: Target Demographics + CTA - Dark */}
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative z-10">
          <SectionWrapper>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      Target Demographics
                    </h2>
                    <p className="text-white/70 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Who we build for
                    </p>
                  </div>
                </div>
                <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 md:p-8">
                  <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                    Young to middle-aged families with moderate incomes, seeking a
                    peaceful community with urban convenience. Income range:{" "}
                    <span className="font-bold text-white">$60k - $80K</span>
                  </p>
                </div>
                <p className="text-white/60 text-xs sm:text-sm">
                  South Florida offers the perfect balance of affordability,
                  quality of life, and growth potential.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:flex-col">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white text-[#090040] hover:bg-white/95 active:scale-[0.99] transition-all touch-manipulation min-h-[44px]"
                  aria-label="Contact us to schedule a visit"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="p-2.5 sm:p-3 bg-[#090040]/10 rounded-xl shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        Schedule a Visit
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        Talk to our team about your project
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-[#090040] group-hover:translate-x-1 transition-transform shrink-0"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/models"
                  className="group flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/20 text-white hover:bg-white/10 active:scale-[0.99] transition-all touch-manipulation min-h-[44px]"
                  aria-label="Explore our home models"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl shrink-0">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="font-bold text-sm sm:text-base">View Home Models</span>
                      <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                        Discover our floor plans
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 group-hover:translate-x-1 transition-transform shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </SectionWrapper>
        </Container>
      </section>
    </>
  );

export { Locations };
