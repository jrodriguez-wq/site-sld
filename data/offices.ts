export const getDirectionsUrl = (address: string, city: string) =>
  `https://www.google.com/maps/dir//${encodeURIComponent(`${address}, ${city}`)}`;

export const OFFICES = [
  {
    name: "West Palm Beach",
    address: "2721 Vista Parkway",
    city: "West Palm Beach, FL 33411",
    lat: 26.7153,
    lng: -80.0534,
  },
  {
    name: "Wellington",
    address: "12773 W. Forest Hill Blvd",
    city: "Wellington, FL 33414",
    lat: 26.6587,
    lng: -80.2414,
  },
  {
    name: "Boca Raton",
    address: "1001 FL – 704",
    city: "Boca Raton, FL 33443",
    lat: 26.3587,
    lng: -80.0831,
  },
  {
    name: "Fort Lauderdale",
    address: "1500 Cordova Rd",
    city: "Fort Lauderdale, FL 33316",
    lat: 26.1224,
    lng: -80.1373,
  },
  {
    name: "LaBelle",
    address: "45 Bridge St",
    city: "LaBelle, FL 33935",
    lat: 26.7616,
    lng: -81.4382,
  },
  {
    name: "Lake Placid",
    address: "Downtown",
    city: "Lake Placid, FL 33852",
    lat: 27.2931,
    lng: -81.3629,
  },
] as const;
