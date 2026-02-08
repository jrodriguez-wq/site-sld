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

const CONTAINER_CLASS = "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

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
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className={CONTAINER_CLASS}>
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
                Interactive Map
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Our Offices Across Southwest Florida
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Click on each marker to view office details and get directions
              </p>
            </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl ring-1 ring-slate-900/5">
            <LocationsMap />
          </div>
        </div>
      </div>
    </section>

      {/* Section 2: Offices + Strategic Location - Dark */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className={CONTAINER_CLASS}>
          <SectionWrapper>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Our Offices */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Our Offices
                    </h3>
                    <p className="text-white/70 text-sm">
                      Multiple locations across Southwest Florida
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {OFFICES.map((office, index) => (
                    <a
                      key={office.name}
                      href={getDirectionsUrl(office.address, office.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                      aria-label={`Get directions to ${office.name}`}
                    >
                      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                        Office {index + 1}
                      </span>
                      <span className="font-bold text-white group-hover:text-white">
                        {office.name}
                      </span>
                      <p className="text-sm text-white/80">{office.address}</p>
                      <p className="text-sm text-white/60">{office.city}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 mt-2 group-hover:gap-2 transition-all">
                        Get directions
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Strategic Location */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Route className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Strategic Location
                    </h3>
                    <p className="text-white/70 text-sm">
                      Proximity to major Florida cities
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {DISTANCES.map((d) => (
                    <div
                      key={d.city}
                      className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                          <d.Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-white text-lg">
                          {d.city}
                        </span>
                      </div>
                      <span className="text-white/90 font-semibold">
                        {d.miles} miles
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm pt-2">
                  Easy access from major metropolitan areas for business meetings
                  and site visits.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Section 3: Development Areas - Light */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className={CONTAINER_CLASS}>
          <SectionWrapper>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">
                Where We Develop
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Development Areas
              </h2>
              <p className="text-slate-600 text-lg">
                We develop projects across multiple counties in Southwest Florida
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {COUNTIES.map((county) => (
                <span
                  key={county}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200/80 hover:bg-[#090040]/5 hover:border-[#090040]/20 hover:text-[#090040] transition-colors"
                >
                  {county}
                </span>
              ))}
            </div>
            <p className="text-center text-slate-600 max-w-2xl mx-auto">
              We develop high demand urban projects. The majority of our projects
              are located in Southwest Florida.
            </p>
          </SectionWrapper>
        </div>
      </section>

      {/* Section 4: Key Attractions - Light/Slate */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-slate-50 relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className={CONTAINER_CLASS}>
          <SectionWrapper>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">
                Hendry & Glades Counties
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Key Attractions
              </h2>
              <p className="text-slate-600 text-lg">
                Why families and investors are choosing Southwest Florida
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {KEY_ATTRACTIONS.map((attraction) => {
                const Icon = attraction.icon;
                return (
                  <div
                    key={attraction.title}
                    className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#090040]/10">
                      <Icon
                        className="h-6 w-6 text-[#090040]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {attraction.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Section 5: Target Demographics + CTA - Dark */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className={CONTAINER_CLASS}>
          <SectionWrapper>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Target Demographics
                    </h2>
                    <p className="text-white/70 text-sm mt-1">
                      Who we build for
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
                  <p className="text-white/90 text-lg leading-relaxed">
                    Young to middle-aged families with moderate incomes, seeking a
                    peaceful community with urban convenience. Income range:{" "}
                    <span className="font-bold text-white">$60k - $80K</span>
                  </p>
                </div>
                <p className="text-white/60 text-sm">
                  Southwest Florida offers the perfect balance of affordability,
                  quality of life, and growth potential.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:flex-col">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-white text-[#090040] hover:bg-white/95 transition-all"
                  aria-label="Contact us to schedule a visit"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#090040]/10 rounded-xl">
                      <MapPin className="h-6 w-6 text-[#090040]" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-slate-900">
                        Schedule a Visit
                      </span>
                      <p className="text-sm text-slate-600 mt-0.5">
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
                  className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all"
                  aria-label="Explore our home models"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Building2 className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold">View Home Models</span>
                      <p className="text-sm text-white/70 mt-0.5">
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
        </div>
      </section>
    </>
  );

export { Locations };
