import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FaBuilding, 
  FaTools, 
  FaHome, 
  FaChartLine,
  FaKey,
  FaUsers
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaBuilding,
      title: "Land Development",
      description:
        "Expert land acquisition and development services to transform raw land into buildable lots.",
    },
    {
      icon: FaHome,
      title: "Home Construction",
      description:
        "Quality construction of affordable single-family homes tailored to your needs and budget.",
    },
    {
      icon: FaTools,
      title: "Renovation & Remodeling",
      description:
        "Transform existing properties with our professional renovation and remodeling services.",
    },
    {
      icon: FaChartLine,
      title: "Real Estate Consulting",
      description:
        "Leverage our 13+ years of experience with expert real estate consulting and guidance.",
    },
    {
      icon: FaKey,
      title: "Property Management",
      description:
        "Comprehensive property management services to protect and maximize your investment.",
    },
    {
      icon: FaUsers,
      title: "Investment Opportunities",
      description:
        "Explore real estate investment opportunities in Southwest Florida&apos;s growing market.",
    },
  ];

  return (
    <section id="services" className="bg-muted/50 py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Comprehensive real estate and construction services to meet all your
            needs in Southwest Florida.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export { Services };
