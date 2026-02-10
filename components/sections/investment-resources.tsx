"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FileText, Building2, Newspaper, ArrowRight } from "lucide-react";

const resources = [
  {
    href: "/business-model",
    icon: Building2,
    title: "Our Mission",
    description: "Our mission and how we develop in South Florida.",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog & News",
    description: "Latest updates, press releases, and insights from SLD.",
  },
  {
    href: "/contact",
    icon: FileText,
    title: "Contact Us",
    description: "Schedule a meeting or get in touch with our team.",
  },
];

export const InvestmentResources = () => (
  <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative">
    <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
    <Container className="relative z-10">
      <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
        <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-4">
          Learn More
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Explore & Connect
        </h2>
        <p className="text-base text-white/80">
          Discover our approach, read our latest news, or reach out to discuss investment opportunities.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Link
              key={resource.href}
              href={resource.href}
              className="group flex flex-col p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-4 group-hover:bg-white/20 transition-colors">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed flex-1 mb-4">
                {resource.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  </section>
);
