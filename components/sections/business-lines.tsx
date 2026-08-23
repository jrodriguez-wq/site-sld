import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_IMAGES } from "@/config/site-images";

const lines = [
  {
    id: "communities",
    kicker: "Southwest Florida",
    title: "Communities delivered, not renderings.",
    proof:
      "Since 2016 we have closed 2,877 homes across Hendry, Lee, and neighboring counties. LaBelle is the principal office. Street inventory and floor plans stay on separate pages.",
    extra:
      "Active work in LaBelle, Lehigh Acres, and the wider Southwest Florida corridor — Fort Myers, Cape Coral, Naples, Immokalee, and Clewiston.",
    href: "/locations",
    cta: "See where we build",
    image: SITE_IMAGES.aerial,
    imageAlt: "Aerial of an SLD community in Southwest Florida",
    tone: "light" as const,
  },
  {
    id: "plans",
    kicker: "Floor plans",
    title: "Seven models specified for this climate.",
    proof:
      "Louisiana, Viana, Langdon, Delanie, Emelia, Aurora, and Duplex. Compare beds, baths, and square footage on the models index — those photos are model photography, not a specific street address.",
    extra: "Starting specifications published on each model page. Tour a model home from the LaBelle office.",
    href: "/models",
    cta: "Compare floor plans",
    image: SITE_IMAGES.models,
    imageAlt: "Completed SLD model home elevation",
    tone: "cream" as const,
  },
  {
    id: "craft",
    kicker: "Vertical construction",
    title: "Dirt to certificate of occupancy, in-house.",
    proof:
      "Land development and homebuilding under one company. The before/after on this site is a real SLD street — foundation through landscaping — not a stock transformation.",
    extra: "Watch job-site video or walk a finished block with the team.",
    href: "/about",
    cta: "How SLD builds",
    image: SITE_IMAGES.community,
    imageAlt: "Finished SLD street with landscaping",
    tone: "navy" as const,
  },
  {
    id: "commercial",
    kicker: "Commercial",
    title: "Retail and workplace in the same towns.",
    proof:
      "Commercial is a separate product line from residential models. Gallery first, then a visit to the office — we do not reuse a floor-plan photo as “this storefront.”",
    extra: "Ask the LaBelle desk for current commercial work.",
    href: "/commercial",
    cta: "View commercial work",
    image: SITE_IMAGES.elevation,
    imageAlt: "Professional photography of SLD construction quality",
    tone: "light" as const,
  },
];

export function BusinessLines() {
  return (
    <section aria-labelledby="business-lines-heading" className="bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#090040]/70">Florida home builder</p>
          <h2 id="business-lines-heading" className="mt-2 text-3xl sm:text-4xl font-semibold text-[#090040]">
            A production builder with a track record you can count
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Standard Land Development is a Southwest Florida land developer and homebuilder. The job of this site is to show completed work, floor plans, and communities — then get you to a scheduled visit in LaBelle.
          </p>
        </div>

        <div className="space-y-10 lg:space-y-14">
          {lines.map((line, i) => {
            const reverse = i % 2 === 1;
            const navy = line.tone === "navy";
            const cream = line.tone === "cream";
            return (
              <article
                key={line.id}
                className={
                  navy
                    ? "rounded-2xl overflow-hidden bg-[#090040] text-white"
                    : cream
                      ? "rounded-2xl overflow-hidden bg-[#f6f1e4] text-[#090040]"
                      : "rounded-2xl overflow-hidden border border-slate-200 bg-white"
                }
              >
                <div className={`grid lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative min-h-[240px] lg:min-h-[340px]">
                    <Image
                      src={line.image}
                      alt={line.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${navy ? "text-[#D4AF37]" : "text-[#090040]/60"}`}>
                      {line.kicker}
                    </p>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">{line.title}</h3>
                    <p className={`mt-4 text-sm sm:text-base leading-relaxed ${navy ? "text-white/75" : "text-slate-600"}`}>
                      {line.proof}
                    </p>
                    <p className={`mt-3 text-sm leading-relaxed ${navy ? "text-white/60" : "text-slate-500"}`}>
                      {line.extra}
                    </p>
                    <Link
                      href={line.href}
                      className={`mt-6 inline-flex items-center gap-2 self-start min-h-11 font-semibold text-sm ${
                        navy ? "text-[#D4AF37] hover:text-white" : "text-[#090040] hover:underline"
                      }`}
                    >
                      {line.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
