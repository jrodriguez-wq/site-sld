"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Info, MapPin, TrendingUp, Home as HomeIcon, Building2, ChevronDown, Building, Store, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = React.useState<Set<string>>(new Set());
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

  // Cerrar dropdown al hacer clic fuera
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
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdown]);

  // Manejar hover con delay
  const handleMouseEnter = (itemLabel: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    if (openDropdown === itemLabel) return;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setOpenDropdown(itemLabel);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (openDropdown) {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
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
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
      setCloseTimeout(timeout);
    }
  };

  const handleClick = (itemLabel: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  const handleLinkClick = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(null);
    setOpenSubmenus(new Set());
    setIsMenuOpen(false);
  };

  const toggleMobileSubmenu = (key: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isMobileSubmenuOpen = (key: string) => openSubmenus.has(key);

  // Limpiar timeouts al desmontar
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [hoverTimeout, closeTimeout]);

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
          ]
        },
        {
          href: "/commercial",
          label: "Commercial",
          icon: Store,
          description: "Spaces & gallery",
        },
      ]
    },
    { 
      label: "Programs", 
      icon: TrendingUp,
      children: [
        { href: "/programs", label: "Rent to Own", description: "Flexible ownership options" },
        { href: "/investment", label: "Cash Program", description: "1st Position Lender Program" },
        { href: "/business-model", label: "Our Mission", description: "Our mission and how we work" },
      ]
    },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out overflow-visible",
        scrolled
          ? "bg-[#090040]/92 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-[#090040]/25 backdrop-blur-md border-b border-white/5"
      )}
    >
      <div className="relative w-full h-16 sm:h-[4.25rem] md:h-20">
        <div className="absolute left-4 sm:left-6 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-10">
          <Link
            href="/"
            className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Standard Land Development - Home"
          >
            {scrolled ? (
              <Image
                src="/logos/sld-blanco.png"
                alt=""
                width={160}
                height={64}
                className="h-10 sm:h-11 md:h-12 w-auto"
                priority
                quality={100}
              />
            ) : (
              <Image
                src="/logos/sld-blanco.png"
                alt=""
                width={160}
                height={64}
                className="h-10 sm:h-11 md:h-12 w-auto"
                priority
                quality={100}
              />
            )}
          </Link>
        </div>

        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 h-full overflow-visible">
          <div className="flex h-full items-center justify-center lg:justify-between">
            {/* Desktop Navigation - Center, compact */}
            <nav className="hidden lg:flex items-center justify-center flex-1 overflow-visible" role="navigation" aria-label="Main">
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
                          "px-3 xl:px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-lg cursor-pointer",
                          scrolled
                            ? "text-white/80 hover:text-[#D4AF37] hover:bg-white/5"
                            : "text-white/90 hover:text-white hover:bg-white/10",
                          isOpen && (scrolled ? "text-[#D4AF37] bg-white/5" : "text-white bg-white/10")
                        )}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                      >
                        <span className="flex items-center gap-0.5">
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-200",
                              isOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span className={cn(
                          "absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-200 ease-out",
                          isOpen && "w-full",
                          "bg-[#D4AF37]"
                        )} />
                      </button>

                      {/* Dropdown Menu - Our Homes: cleaner design */}
                      {isOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] xl:w-[380px] rounded-2xl border border-white/10 bg-[#090040]/98 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-1 duration-200 z-[9999]"
                          role="menu"
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          <div className="relative p-4 space-y-4">
                            {item.children.map((child, childIndex) => {
                              if ("children" in child && child.children) {
                                const ChildIcon = "icon" in child ? child.icon : null;
                                return (
                                  <div key={child.label} className="space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15">
                                      {ChildIcon && (
                                        <ChildIcon className="h-4 w-4 text-[#D4AF37] shrink-0" aria-hidden />
                                      )}
                                      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                                        {child.label}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {child.children.map((subChild: { href?: string; label: string; description?: string }) => (
                                        <Link
                                          key={subChild.href ?? subChild.label}
                                          href={subChild.href ?? "#"}
                                          onClick={handleLinkClick}
                                          className="rounded-lg px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-200 group/item"
                                          role="menuitem"
                                        >
                                          <span className="text-sm font-medium text-white group-hover/item:text-[#D4AF37] block leading-tight">
                                            {subChild.label}
                                          </span>
                                          {subChild.description && (
                                            <span className="text-[11px] text-white/50 mt-0.5 line-clamp-1 block">
                                              {subChild.description}
                                            </span>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                    {childIndex < item.children.length - 1 && (
                                      <div className="border-t border-white/10 my-1" />
                                    )}
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
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-200 group/item"
                                    role="menuitem"
                                  >
                                    {ChildIcon && (
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/15 group-hover/item:bg-[#D4AF37]/25">
                                        <ChildIcon className="h-4 w-4 text-[#D4AF37]" aria-hidden />
                                      </span>
                                    )}
                                    <div className="min-w-0">
                                      <span className="text-sm font-semibold text-white group-hover/item:text-[#D4AF37] block">
                                        {child.label}
                                      </span>
                                      {"description" in child && child.description && (
                                        <span className="text-xs text-white/50 block">{child.description}</span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    prefetch={true}
                    className={cn(
                      "px-3 xl:px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-lg cursor-pointer",
                      scrolled
                        ? "text-white/80 hover:text-[#D4AF37] hover:bg-white/5"
                        : "text-white/90 hover:text-white hover:bg-white/10"
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
                prefetch={true}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap bg-[#D4AF37] text-[#090040] hover:bg-[#FFD700] shadow-lg hover:shadow-xl"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center justify-end lg:hidden absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10">
            <Sheet
              open={isMenuOpen}
              onOpenChange={(open) => {
                setIsMenuOpen(open);
                if (!open) setOpenSubmenus(new Set());
              }}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg touch-manipulation text-white hover:bg-white/10 hover:text-[#D4AF37]"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 transition-colors duration-200" aria-hidden="true" />
                </Button>
              </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[min(340px,100vw)] sm:max-w-sm p-0 border-0 shadow-2xl bg-transparent [&>button]:hidden rounded-l-2xl overflow-hidden transition-transform duration-300 ease-out data-[state=open]:duration-300 data-[state=closed]:duration-250"
              aria-describedby={undefined}
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex flex-col h-full bg-gradient-to-b from-[#090040] via-[#0d0a52] to-[#2d2c55]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                  <Link href="/" onClick={handleLinkClick} className="flex items-center">
                    <Image src="/logos/sld-blanco.png" alt="SLD" width={130} height={52} className="h-11 w-auto" />
                  </Link>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white/80 hover:text-[#D4AF37] hover:bg-white/10 transition-colors duration-200 touch-manipulation"
                      aria-label="Cerrar menú"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </SheetTrigger>
                </div>

                <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-label="Menú">
                  <motion.ul
                    className="space-y-2"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
                      closed: {},
                    }}
                  >
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      if (item.children) {
                        const isParentOpen = isMobileSubmenuOpen(item.label);
                        return (
                          <motion.li
                            key={item.label}
                            variants={{
                              closed: { opacity: 0, x: 12 },
                              open: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => toggleMobileSubmenu(item.label)}
                              className="w-full flex items-center gap-3 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/30 text-white transition-all duration-200 touch-manipulation min-h-[48px] active:scale-[0.99]"
                              aria-expanded={isParentOpen}
                              aria-controls={`submenu-${item.label.replace(/\s/g, "-")}`}
                              aria-label={`${item.label}, ${isParentOpen ? "cerrar" : "abrir"} submenú`}
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                                <Icon className="h-4 w-4" aria-hidden />
                              </span>
                              <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={cn("h-4 w-4 text-white/50 shrink-0 transition-transform duration-300", isParentOpen && "rotate-180 text-[#D4AF37]")}
                                aria-hidden
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isParentOpen && (
                                <motion.div
                                  id={`submenu-${item.label.replace(/\s/g, "-")}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden pl-4 mt-2 ml-3 border-l-2 border-[#D4AF37]/30"
                                >
                                  <ul className="space-y-1.5 pb-2">
                                    {item.children.map((child) => {
                                      if ("children" in child && child.children) {
                                        const ChildIcon = "icon" in child ? child.icon : null;
                                        const submenuKey = `${item.label}-${child.label}`;
                                        const isNestedOpen = isMobileSubmenuOpen(submenuKey);
                                        return (
                                          <li key={child.label}>
                                            <button
                                              type="button"
                                              onClick={() => toggleMobileSubmenu(submenuKey)}
                                              className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-lg bg-white/[0.06] border border-white/10 hover:border-[#D4AF37]/25 text-white/90 text-left touch-manipulation min-h-[44px] transition-all duration-200"
                                              aria-expanded={isNestedOpen}
                                              aria-label={`${child.label}, ${isNestedOpen ? "cerrar" : "abrir"}`}
                                            >
                                              {ChildIcon && <ChildIcon className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" aria-hidden />}
                                              <span className="font-semibold text-xs uppercase tracking-wide flex-1">{child.label}</span>
                                              <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-300", isNestedOpen && "rotate-180")} aria-hidden />
                                            </button>
                                            <AnimatePresence initial={false}>
                                              {isNestedOpen && (
                                                <motion.ul
                                                  initial={{ height: 0, opacity: 0 }}
                                                  animate={{ height: "auto", opacity: 1 }}
                                                  exit={{ height: 0, opacity: 0 }}
                                                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                  className="overflow-hidden pl-3 ml-2 space-y-0.5 border-l border-white/10"
                                                >
                                                  {child.children.map((subChild: { href?: string; label: string }) => (
                                                    <li key={subChild.href ?? subChild.label}>
                                                      <Link
                                                        href={subChild.href ?? "#"}
                                                        prefetch={true}
                                                        onClick={handleLinkClick}
                                                        className="flex items-center py-2.5 px-3 rounded-lg text-white/70 hover:text-[#D4AF37] hover:bg-white/5 text-sm font-medium min-h-[44px] touch-manipulation transition-colors duration-200"
                                                      >
                                                        {subChild.label}
                                                      </Link>
                                                    </li>
                                                  ))}
                                                </motion.ul>
                                              )}
                                            </AnimatePresence>
                                          </li>
                                        );
                                      }
                                      if ("href" in child) {
                                        const ChildIcon = "icon" in child ? child.icon : null;
                                        return (
                                          <li key={child.href}>
                                            <Link
                                              href={child.href}
                                              prefetch={true}
                                              onClick={handleLinkClick}
                                              className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-transparent hover:border-[#D4AF37]/20 text-white min-h-[44px] touch-manipulation transition-all duration-200"
                                            >
                                              {ChildIcon && (
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/15">
                                                  <ChildIcon className="h-4 w-4 text-[#D4AF37]" aria-hidden />
                                                </span>
                                              )}
                                              <span className="text-sm font-medium flex-1 text-left">{child.label}</span>
                                            </Link>
                                          </li>
                                        );
                                      }
                                      return null;
                                    })}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      }
                      return (
                        <motion.li
                          key={item.label}
                          variants={{
                            closed: { opacity: 0, x: 12 },
                            open: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                          }}
                        >
                          <Link
                            href={item.href || "#"}
                            prefetch={true}
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/30 text-white font-medium text-sm min-h-[48px] touch-manipulation transition-all duration-200 active:scale-[0.99]"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="flex-1 text-left">{item.label}</span>
                            <ArrowRight className="h-4 w-4 text-white/40 shrink-0" aria-hidden />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </nav>

                <div className="shrink-0 p-4 pt-3 border-t border-white/10 bg-[#090040]/50">
                  <Link
                    href="/contact"
                    prefetch={true}
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 w-full py-4 px-5 rounded-xl bg-[#D4AF37] text-[#090040] font-semibold text-sm hover:bg-[#FFD700] active:scale-[0.98] transition-all duration-200 touch-manipulation"
                    aria-label="Contactar"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Contact Us
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export { Header };
