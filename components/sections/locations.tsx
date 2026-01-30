import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";

const Locations = () => {
  const offices = [
    {
      address: "2721 Vista Parkway",
      city: "West Palm Beach, FL 33411",
    },
    {
      address: "12773 W. Forest Hill Blvd",
      city: "Wellington, FL 33414",
    },
    {
      address: "1001 FL – 704",
      city: "Boca Raton, FL 33443",
    },
    {
      address: "1500 Cordova Rd",
      city: "Fort Lauderdale, FL 33316",
    },
  ];

  const distances = [
    { city: "Miami", miles: "128 miles" },
    { city: "Tampa", miles: "148 miles" },
    { city: "Orlando", miles: "172 miles" },
  ];

  const counties = [
    "Palm Beach",
    "Broward",
    "Hendry",
    "Glades",
    "Collier",
    "Lee",
  ];

  const keyAttractions = [
    {
      title: "Recent Growth",
      description:
        "Moderate increase in housing prices with a median home price of $360,000 (Jan 2025), showing market stability.",
    },
    {
      title: "Government Incentives",
      description:
        "USDA programs support homeownership and development.",
    },
    {
      title: "Affordable Housing",
      description:
        "Attractive for young families and first-time buyers.",
    },
    {
      title: "Future Outlook",
      description:
        "Continued growth fueled by transportation access, affordability, and strategic location.",
    },
  ];

  return (
    <section id="locations" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
            Southwest Florida - A Dynamic Region for Growth
          </p>
        </div>

        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#471396]/10 to-[#B13BFF]/10 border border-[#471396]/20">
                  <FaMapMarkerAlt className="h-6 w-6 text-[#471396]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Offices</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Multiple locations across Southwest Florida
              </p>
              <ul className="space-y-4">
                {offices.map((office, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#471396]" />
                    <div>
                      <div className="font-semibold text-gray-900">{office.address}</div>
                      <div className="text-sm text-gray-600">
                        {office.city}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#471396]/10 to-[#B13BFF]/10 border border-[#471396]/20">
                  <FaRoute className="h-6 w-6 text-[#471396]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Strategic Location</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Proximity to major Florida cities
              </p>
              <ul className="space-y-4">
                {distances.map((distance) => (
                  <li key={distance.city} className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{distance.city}</span>
                    <span className="text-[#471396] font-bold">
                      {distance.miles}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Card className="border-2 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Development Areas</CardTitle>
              <CardDescription>
                We develop projects across multiple counties in Southwest Florida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {counties.map((county) => (
                  <div
                    key={county}
                    className="rounded-lg border-2 bg-muted/50 p-4 text-center font-semibold"
                  >
                    {county}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-muted-foreground">
                We develop high demand urban projects. The majority of our
                projects are located in Southwest Florida.
              </p>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8">
              Key Attractions - Hendry and Glades Counties, FL
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {keyAttractions.map((attraction) => (
                <Card key={attraction.title} className="border-2">
                  <CardHeader>
                    <CardTitle>{attraction.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {attraction.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Target Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Young to middle-aged families with moderate incomes, seeking a
                peaceful community with urban convenience (Income $60k - $80K)
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export { Locations };
