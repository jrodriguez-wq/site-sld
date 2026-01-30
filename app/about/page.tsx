import { About } from "@/components/sections/about";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "About Us | Standard Land Development",
  description: "Learn about Standard Land Development, our mission, vision, and core values. Founded in 2016 by CEO Michael J. Newell.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Creating the opportunity of home ownership for American Families"
        description="Learn about Standard Land Development, our mission, vision, and core values. Founded in 2016 by CEO Michael J. Newell."
        backgroundImage="/houses/4090/principal.jpg"
        badge="Our Story"
      />
      <div id="about" className="scroll-mt-28">
        <About />
      </div>
    </>
  );
}
