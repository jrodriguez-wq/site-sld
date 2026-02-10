"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/config/contact";
import { Calendar } from "lucide-react";

const InvestmentTeaser = () => (
  <section
    id="investment-content"
    className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative scroll-mt-20 sm:scroll-mt-24"
  >
    <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <Container className="relative z-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-6 sm:mb-8">
          Earn up to <span className="text-[#090040] font-bold">22% annual return</span> on your money. Real property-backed. Learn how in a quick call.
        </p>
        <Link
          href={CONTACT_INFO.scheduleCall}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-xl bg-[#090040] text-white font-semibold text-base sm:text-lg hover:bg-[#0a0044] active:scale-[0.99] transition-all shadow-lg hover:shadow-xl touch-manipulation"
          aria-label="Schedule a call to learn about our investment program"
        >
          <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
          Schedule a Call
        </Link>
      </div>
    </Container>
  </section>
);

export { InvestmentTeaser };
