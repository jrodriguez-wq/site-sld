"use client";

import Link from "next/link";
import { MapPin, Route, Building2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { OFFICES } from "@/data/offices";

const SECTION_CLASSES = {
  light: "bg-white text-slate-900",
  dark: "bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white",
};

const CONTAINER_CLASS = "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const DISTANCES = [
  { city: "Miami", miles: "128 miles" },
  { city: "Tampa", miles: "148 miles" },
  { city: "Orlando", miles: "172 miles" },
];

const COUNTIES = ["Palm Beach", "Broward", "Hendry", "Glades", "Collier", "Lee"];

const KEY_ATTRACTIONS = [
  {
    title: "Recent Growth",
    description:
      "Moderate increase in housing prices with a median home price of $360,000 (Jan 2025), showing market stability.",
  },
  {
    title: "Government Incentives",
    description: "USDA programs support homeownership and development.",
  },
  {
    title: "Affordable Housing",
    description: "Attractive for young families and first-time buyers.",
  },
  {
    title: "Future Outlook",
    description:
      "Continued growth fueled by transportation access, affordability, and strategic location.",
  },
];

export const AboutLocations = () => {
  return (
    <>
      {/* Section: Where We Build - DARK */}
      <section
        id="about-locations"
        className={`py-16 sm:py-20 md:py-24 lg:py-28 ${SECTION_CLASSES.dark} relative scroll-mt-28`}
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
        <div className={CONTAINER_CLASS}>
          <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-6">
              Where We Build
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Our Locations
            </h2>
            <p className="text-base sm:text-lg text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
              Building Across Southwest Florida
            </p>
            <p className="text-sm sm:text-base text-white/60 mt-4 max-w-2xl mx-auto">
              Explore our development locations in Southwest Florida. We develop
              projects in Palm Beach, Broward, Hendry, Glades, Collier and Lee
              counties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Our Offices */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Our Offices</h3>
                  <p className="text-sm text-white/70">
                    Multiple locations across Southwest Florida
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {OFFICES.map((office) => (
                  <li key={office.name} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-white/80 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{office.address}</p>
                      <p className="text-sm text-white/70">{office.city}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Location */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Route className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Strategic Location
                  </h3>
                  <p className="text-sm text-white/70">
                    Proximity to major Florida cities
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {DISTANCES.map((d) => (
                  <li
                    key={d.city}
                    className="flex items-center justify-between text-white"
                  >
                    <span className="font-semibold">{d.city}</span>
                    <span className="text-white/90 font-medium">{d.miles}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Development Areas */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                <Building2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Development Areas
                </h3>
                <p className="text-sm text-white/70">
                  We develop projects across multiple counties in Southwest
                  Florida
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {COUNTIES.map((county) => (
                <span
                  key={county}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium text-sm"
                >
                  {county}
                </span>
              ))}
            </div>
            <p className="mt-6 text-white/70 text-sm text-center max-w-2xl mx-auto">
              We develop high demand urban projects. The majority of our projects
              are located in Southwest Florida.
            </p>
          </div>

          {/* Key Attractions - Hendry and Glades */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
              Key Attractions - Hendry and Glades Counties, FL
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {KEY_ATTRACTIONS.map((attraction) => (
                <div
                  key={attraction.title}
                  className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/20"
                >
                  <h4 className="font-bold text-white mb-2">
                    {attraction.title}
                  </h4>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Demographics */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <h3 className="text-xl font-bold text-white mb-3">
              Target Demographics
            </h3>
            <p className="text-white/85 leading-relaxed">
              Young to middle-aged families with moderate incomes, seeking a
              peaceful community with urban convenience (Income $60k - $80K)
            </p>
          </div>

          {/* CTA to Locations Page */}
          <div className="text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#090040] font-semibold hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#090040]"
              aria-label="Explore our locations on the map"
            >
              Explore Our Locations on the Map
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
