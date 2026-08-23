import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SITE_IMAGES } from "@/config/site-images";

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        backgroundImage={SITE_IMAGES.elevation}
        badge="Legal"
      />
      <div className="bg-white py-14 sm:py-20">
        <Container>
          <article className="max-w-3xl mx-auto space-y-8 text-slate-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#090040] [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
            <p className="text-sm text-slate-500">
              Last updated: August 23, 2026 · Standard Land Development, LLC · LaBelle, Florida
            </p>
            {children}
          </article>
        </Container>
      </div>
    </>
  );
}
