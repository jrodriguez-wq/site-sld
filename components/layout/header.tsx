"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { SITE_NAV, SCHEDULE_HREF, SCHEDULE_LABEL } from "@/config/site-nav";
import { CONTACT_INFO } from "@/config/contact";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const Header = () => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  React.useEffect(() => () => clearClose(), []);

  const addr = CONTACT_INFO.address;
  const pathname = usePathname();

  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="hidden md:block bg-[#070033] text-white/80 text-xs border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-9 flex items-center justify-between gap-4">
          <a
            href={addr.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-8 hover:text-[#D4AF37]"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>
              {addr.street}, {addr.city}, {addr.state} {addr.zip}
            </span>
          </a>
          <div className="flex items-center gap-5">
            {CONTACT_INFO.contacts.map((c) => (
              <a
                key={c.name}
                href={c.href}
                className="inline-flex items-center gap-1.5 min-h-8 hover:text-[#D4AF37]"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {c.name} {c.display}
              </a>
            ))}
            <a href={CONTACT_INFO.email.href} className="hidden xl:inline hover:text-[#D4AF37] min-h-8 leading-8">
              {CONTACT_INFO.email.display}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#090040] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 h-16 lg:h-[4.25rem] flex items-center gap-4">
          <Link href="/" className="shrink-0" aria-label="Standard Land Development home">
            <Image
              src="/logos/sld-blanco.svg"
              alt="Standard Land Development"
              width={160}
              height={48}
              className="h-9 sm:h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5" aria-label="Main">
            {SITE_NAV.map((item) => {
              if (item.children) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      clearClose();
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2.5 text-sm font-medium rounded-md min-h-11",
                        "text-white/85 hover:text-white hover:bg-white/5",
                        isOpen && "text-[#D4AF37] bg-white/5"
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-3.5 w-3.5", isOpen && "rotate-180")} aria-hidden />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-white/10 bg-[#090040] shadow-xl py-2 z-50"
                          onMouseEnter={clearClose}
                          onMouseLeave={scheduleClose}
                          role="menu"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className="block px-4 py-2.5 hover:bg-white/10"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="block text-sm text-white">{child.label}</span>
                              {child.description && (
                                <span className="block text-xs text-white/55 mt-0.5">{child.description}</span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md min-h-11 inline-flex items-center",
                    pathname === item.href
                      ? "text-[#D4AF37] bg-white/5"
                      : "text-white/85 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href={SCHEDULE_HREF}
              className="hidden lg:inline-flex items-center justify-center min-h-11 px-5 rounded-md bg-[#D4AF37] text-[#090040] text-sm font-semibold hover:bg-[#e4c04a]"
            >
              {SCHEDULE_LABEL}
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
    <div className="h-[var(--site-header-h)] shrink-0" aria-hidden />
    </>
  );
};

export { Header };
