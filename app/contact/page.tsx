import { Contact } from "@/components/sections/contact";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Contact Us | Standard Land Development",
  description: "Get in touch with Standard Land Development. Contact us for investment opportunities, homeownership programs, and more.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch with Our Team"
        description="Contact us for investment opportunities, homeownership programs, and more. We're here to help you achieve your dream of homeownership."
        backgroundImage="/houses/3941/principal.jpg"
        badge="Let's Connect"
      />
      <div id="contact" className="scroll-mt-20 sm:scroll-mt-24">
        <Contact />
      </div>
    </>
  );
}
