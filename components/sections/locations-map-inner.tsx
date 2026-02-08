"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { OFFICES, getDirectionsUrl } from "@/data/offices";

const createCustomIcon = () =>
  L.divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: #090040;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

const MapBounds = ({ offices }: { offices: typeof OFFICES }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      offices.map((o) => [o.lat, o.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
  }, [map, offices]);
  return null;
};

export const LocationsMapInner = () => {
  return (
    <MapContainer
      center={[26.5, -80.15]}
      zoom={9}
      className="h-[480px] sm:h-[520px] w-full rounded-2xl z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
      />
      <MapBounds offices={OFFICES} />
      {OFFICES.map((office) => (
        <Marker
          key={office.name}
          position={[office.lat, office.lng]}
          icon={createCustomIcon()}
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
