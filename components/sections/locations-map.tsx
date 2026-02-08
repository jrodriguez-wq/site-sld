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
        className="h-[480px] sm:h-[520px] w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center"
        aria-label="Loading map"
      >
        <span className="text-slate-500">Loading map...</span>
      </div>
    ),
  }
);

const LocationsMap = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
      <LocationsMapInner />
    </div>
  );
};

export { LocationsMap };
