"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export { OFFICES } from "@/data/offices";

const LocationsMapInner = dynamic(
  () =>
    import("./locations-map-inner").then((mod) => mod.LocationsMapInner),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[320px] sm:min-h-[420px] h-[520px] sm:h-[580px] lg:h-[640px] w-full rounded-xl sm:rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center"
        aria-label="Loading map"
      >
        <span className="text-slate-500 text-sm sm:text-base">Loading map...</span>
      </div>
    ),
  }
);

const LocationsMap = () => {
  return (
    <div className="w-full min-h-[320px] sm:min-h-[420px] h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden rounded-xl sm:rounded-2xl border-0 shadow-none">
      <LocationsMapInner />
    </div>
  );
};

export { LocationsMap };
