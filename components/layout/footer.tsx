"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/config/contact";
import {
  PhoneCall,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  ChevronUp,
} from "lucide-react";

const footerColumns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/models", label: "Floor plans" },
      { href: "/locations", label: "Communities" },
      { href: "/commercial", label: "Commercial" },
      { href: "/contact", label: "Schedule a visit" },
      { href: "/help", label: "Help" },
      { href: CONTACT_INFO.mjNewellHomesUrl, label: "M.J. Newell Homes", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/sld-news", label: "Company news" },
      { href: "/blog", label: "Stories" },
      { href: "/investment", label: "Cash program" },
      { href: "/business-model", label: "Our mission" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/help", label: "Help" },
    ],
  },
];

type SocialItem = {
  icon: typeof Facebook | typeof Linkedin | typeof Instagram;
  href: string;
  label: string;
  who: "SLD" | "CEO";
};

/** Social links grouped by Company (SLD) and CEO (Michael J. Newell) */
const getSocialByWho = () => {
  const { social } = CONTACT_INFO as typeof CONTACT_INFO & {
    social?: {
      facebook?: string;
      instagram?: string;
      instagramMichael?: string;
      linkedInCompany?: string;
      linkedInMichael?: string;
    };
  };
  const sld: SocialItem[] = [];
  const ceo: SocialItem[] = [];
  if (social?.facebook) {
    sld.push({ icon: Facebook, href: social.facebook, label: "Facebook - Standard Land Development", who: "SLD" });
  }
  if (social?.instagram) {
    sld.push({ icon: Instagram, href: social.instagram, label: "Instagram - Standard Land Development", who: "SLD" });
  }
  if (social?.linkedInCompany) {
    sld.push({ icon: Linkedin, href: social.linkedInCompany, label: "LinkedIn - Standard Land Development", who: "SLD" });
  }
  if (social?.instagramMichael) {
    ceo.push({ icon: Instagram, href: social.instagramMichael, label: "Instagram - Michael J. Newell, CEO", who: "CEO" });
  }
  if (social?.linkedInMichael) {
    ceo.push({ icon: Linkedin, href: social.linkedInMichael, label: "LinkedIn - Michael J. Newell, CEO", who: "CEO" });
  }
  return { sld, ceo };
};

const { sld: socialSLD, ceo: socialCEO } = getSocialByWho();

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/10 bg-linear-to-br from-[#070033] via-[#1e2454] to-[#070033] text-white overflow-hidden"
    >
      {/* Background texture - design system */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="py-14 sm:py-16 md:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <Image
                  src="/logos/sld-blanco.svg"
                  alt="Standard Land Development"
                  width={200}
                  height={80}
                  className="h-16 sm:h-20 w-auto transition-opacity group-hover:opacity-90"
                />
              </Link>
              <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-xs">
                Creating the opportunity of home ownership for American Families. Building affordable homes in Southwest Florida since 2016.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                <p className="text-sm font-medium italic text-[#D4AF37] mb-1">
                  &quot;We Build so American Families can OWN the American Dream, NOT rent the American Dream&quot;
                </p>
                <p className="text-xs text-white/50">— Michael J. Newell, CEO</p>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  {CONTACT_INFO.contacts.map((contact) => (
                    <a
                      key={contact.name}
                      href={contact.href}
                      className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      <PhoneCall className="w-4 h-4 shrink-0" />
                      <span>
                        <span className="text-white/80">{contact.name}:</span> {contact.display}
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href={CONTACT_INFO.email.href}
                  className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_INFO.email.display}
                </a>
                <a
                  href={CONTACT_INFO.address.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  {CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}
                </a>
              </div>
              <div className="flex flex-wrap items-start gap-6 mt-8">
                {/* Redes de la empresa */}
                {socialSLD.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">Company</p>
                    <div className="flex items-center gap-2">
                      {socialSLD.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.label}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all duration-300"
                            aria-label={social.label}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* CEO social links */}
                {socialCEO.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">CEO</p>
                    <div className="flex items-center gap-2">
                      {socialCEO.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.label}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all duration-300"
                            aria-label={social.label}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs font-semibold text-[#D4AF37] mb-2 uppercase tracking-wider">Our Impact</p>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li>2,877 Homes Built</li>
                  <li>2,877 Happy Families</li>
                </ul>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <h4 className="text-white font-semibold text-sm tracking-[0.14em] uppercase mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => {
                        const isExternal = "external" in link && link.external;
                        const className = "text-white/50 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2 group";
                        return (
                          <li key={link.href + link.label}>
                            {isExternal ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={className}
                              >
                                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                {link.label}
                              </a>
                            ) : (
                              <Link href={link.href} prefetch className={className}>
                                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                {link.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-5 sm:py-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/55 text-xs text-center sm:text-left max-w-xl leading-relaxed">
              We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
            </p>
            <p className="text-white/35 text-[11px] text-center sm:text-right">
              © {currentYear} Standard Land Development. All rights reserved.
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="hidden sm:flex items-center gap-2 text-xs text-white/40 hover:text-[#D4AF37] transition-colors group"
              aria-label="Back to top"
            >
              Back to top
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Decorative gradient line - design system */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </footer>
  );
};

export { Footer };
