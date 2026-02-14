"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
  Phone,
  ChevronDown,
  Building,
  Store,
  ArrowRight,
  Info,
  MapPin,
  TrendingUp,
  Home as HomeIcon,
  Building2,
  Newspaper,
} from "lucide-react";
import { RadialMenu } from "@/components/ui/radial-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isRadialOpen, setIsRadialOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const dropdownRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 80;
    if (latest > threshold) {
      setVisible(latest <= lastScrollY);
    } else {
      setVisible(true);
    }
    setScrolled(latest > 24);
    setLastScrollY(latest);
  });

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const handleMouseEnter = (itemLabel: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    if (openDropdown === itemLabel) return;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setOpenDropdown(itemLabel), 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (openDropdown) {
      const timeout = setTimeout(() => setOpenDropdown(null), 200);
      setCloseTimeout(timeout);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (openDropdown) {
      const timeout = setTimeout(() => setOpenDropdown(null), 200);
      setCloseTimeout(timeout);
    }
  };

  const handleClick = (itemLabel: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  const handleLinkClick = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpenDropdown(null);
    setIsRadialOpen(false);
  };

  React.useEffect(
    () => () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      if (closeTimeout) clearTimeout(closeTimeout);
    },
    [hoverTimeout, closeTimeout]
  );

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/about", label: "About", icon: Info },
    {
      label: "Our Homes",
      icon: Building2,
      children: [
        {
          label: "Residential",
          icon: Building,
          children: [
            { href: "/models", label: "All Models", description: "Browse all residential models" },
            { href: "/models/louisiana", label: "Louisiana", description: "Spacious family home" },
            { href: "/models/viana", label: "Viana", description: "Modern design" },
            { href: "/models/langdon", label: "Langdon", description: "Premium features" },
            { href: "/models/delanie", label: "Delanie", description: "Comfortable living" },
            { href: "/models/emelia", label: "Emelia", description: "Elegant design" },
            { href: "/models/aurora", label: "Aurora", description: "Beautiful architecture" },
            { href: "/models/duplex", label: "Duplex", description: "Two-unit design" },
          ],
        },
        {
          href: "/commercial",
          label: "Commercial",
          icon: Store,
          description: "Spaces & gallery",
        },
      ],
    },
    {
      label: "Programs",
      icon: TrendingUp,
      children: [
        { href: "/programs", label: "Rent to Own", description: "Flexible ownership options" },
        { href: "/investment", label: "Cash Program", description: "1st Position Lender Program" },
        { href: "/business-model", label: "Our Mission", description: "Our mission and how we work" },
      ],
    },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <>
      {/* Desktop only: floating navbar - hidden on mobile */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto lg:top-6 lg:left-6 lg:right-6"
      >
        <div
          className={cn(
            "rounded-2xl border transition-all duration-500 ease-in-out overflow-visible",
            "bg-[#090040]/85 backdrop-blur-xl border-white/10 shadow-xl",
            scrolled && "bg-[#090040]/92 shadow-2xl"
          )}
        >
          <div className="relative w-full h-14 sm:h-16 md:h-[4.25rem]">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full overflow-visible">
              <div className="flex h-full items-center justify-center lg:justify-between">
                {/* Desktop Navigation - center nav, right CTA */}
                <nav
                  className="hidden lg:flex items-center justify-center flex-1 overflow-visible"
                  role="navigation"
                  aria-label="Main"
                >
                  <div className="flex items-center gap-0.5 xl:gap-1">
                    {navItems.map((item) => {
                      if (item.children) {
                        const isOpen = openDropdown === item.label;
                        return (
                          <div
                            key={item.label}
                            className="relative"
                            ref={(el) => {
                              dropdownRefs.current[item.label] = el;
                            }}
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <button
                              onClick={() => handleClick(item.label)}
                              className={cn(
                                "px-3 xl:px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-xl cursor-pointer",
                                "text-white/80 hover:text-[#D4AF37] hover:bg-white/5",
                                isOpen && "text-[#D4AF37] bg-white/5"
                              )}
                              aria-expanded={isOpen}
                              aria-haspopup="true"
                              aria-label={`${item.label} menu`}
                            >
                              <span className="flex items-center gap-0.5">
                                {item.label}
                                <ChevronDown
                                  className={cn("h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                                  aria-hidden
                                />
                              </span>
                              <span
                                className={cn(
                                  "absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-200 ease-out bg-[#D4AF37]",
                                  isOpen && "w-full"
                                )}
                              />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] rounded-2xl border border-white/10 bg-[#090040]/95 backdrop-blur-xl shadow-xl overflow-hidden z-[9999]"
                                role="menu"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                              >
                                <div className="py-2">
                                  {item.children.map((child) => {
                                    if ("children" in child && child.children) {
                                      const ChildIcon = "icon" in child ? child.icon : null;
                                      return (
                                        <div key={child.label}>
                                          <div className="flex items-center gap-2 px-4 py-2">
                                            {ChildIcon && (
                                              <ChildIcon className="h-3.5 w-3.5 text-[#D4AF37]/80 shrink-0" aria-hidden />
                                            )}
                                            <span className="text-[11px] font-semibold text-[#D4AF37]/90 uppercase tracking-wider">
                                              {child.label}
                                            </span>
                                          </div>
                                          <div className="space-y-0.5 pl-4 pr-2 pb-2">
                                            {child.children.map((subChild: { href?: string; label: string }) => (
                                              <Link
                                                key={subChild.href ?? subChild.label}
                                                href={subChild.href ?? "#"}
                                                onClick={handleLinkClick}
                                                className="block rounded-lg px-3 py-2 text-sm text-white/85 hover:text-[#D4AF37] hover:bg-white/5 transition-colors duration-150 group/item"
                                                role="menuitem"
                                              >
                                                {subChild.label}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    }
                                    if ("href" in child) {
                                      const ChildIcon = "icon" in child ? child.icon : null;
                                      return (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={handleLinkClick}
                                          className="flex items-center gap-3 rounded-lg mx-2 px-3 py-2.5 text-sm text-white/85 hover:text-[#D4AF37] hover:bg-white/5 transition-colors duration-150 group/item"
                                          role="menuitem"
                                        >
                                          {ChildIcon && (
                                            <ChildIcon className="h-4 w-4 text-[#D4AF37]/70 shrink-0" aria-hidden />
                                          )}
                                          <span>{child.label}</span>
                                        </Link>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          href={item.href || "#"}
                          prefetch
                          className={cn(
                            "px-3 xl:px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-xl cursor-pointer",
                            "text-white/80 hover:text-[#D4AF37] hover:bg-white/5"
                          )}
                        >
                          {item.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-200 ease-out bg-[#D4AF37]" />
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                <div className="hidden lg:flex items-center justify-end gap-3">
                  <Link
                    href="/contact"
                    prefetch
                    onClick={handleLinkClick}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap bg-[#D4AF37] text-[#090040] hover:bg-[#FFD700] shadow-lg hover:shadow-xl"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Contact Us
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>

                {/* Mobile: empty bar - RadialMenu FAB handles nav */}
                <div className="lg:hidden flex-1" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile: Circular Radial Menu - fixed bottom-right */}
      <RadialMenu
        isOpen={isRadialOpen}
        onToggle={() => setIsRadialOpen((prev) => !prev)}
        onItemClick={handleLinkClick}
      />
    </>
  );
};

export { Header };
