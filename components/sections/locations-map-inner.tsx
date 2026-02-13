"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { OFFICES, getDirectionsUrl } from "@/data/offices";

const createCustomIcon = (isMainOffice: boolean) =>
  L.divIcon({
    html: `
      <div style="
        width: ${isMainOffice ? "28" : "24"}px;
        height: ${isMainOffice ? "28" : "24"}px;
        background: ${isMainOffice ? "#D4AF37" : "#090040"};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 10px rgba(0,0,0,0.35);
      "></div>
    `,
    className: "custom-marker",
    iconSize: [isMainOffice ? 28 : 24, isMainOffice ? 28 : 24],
    iconAnchor: [isMainOffice ? 14 : 12, isMainOffice ? 28 : 24],
  });

const MapBounds = ({ offices }: { offices: typeof OFFICES }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      offices.map((o) => [o.lat, o.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
  }, [map, offices]);
  return null;
};

export const LocationsMapInner = () => {
  return (
    <MapContainer
      center={[26.65, -80.8]}
      zoom={8}
      className="min-h-[320px] sm:min-h-[420px] h-[520px] sm:h-[580px] lg:h-[640px] w-full rounded-xl sm:rounded-2xl z-0"
      scrollWheelZoom
      style={{ minHeight: "320px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      <MapBounds offices={OFFICES} />
      {OFFICES.map((office, index) => (
        <Marker
          key={office.name}
          position={[office.lat, office.lng]}
          icon={createCustomIcon(index === 0)}
        >
          <Popup>
            <a
              href={getDirectionsUrl(office.address, office.city)}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-w-[200px] text-slate-900 hover:opacity-90 transition-opacity cursor-pointer"
              aria-label={`Get directions to ${office.name}`}
            >
              <p className="font-bold">{office.name}</p>
              <p className="text-sm text-slate-600">{office.address}</p>
              <p className="text-sm text-slate-600">{office.city}</p>
              <span className="text-sm text-[#090040] font-medium mt-2 inline-flex items-center gap-1 hover:underline">
                Get directions →
              </span>
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
