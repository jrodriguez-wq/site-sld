"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ArrowRight, Phone, Info, MapPin, Briefcase, TrendingUp, Home as HomeIcon, Building2, ChevronDown, Building, Store, Newspaper } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const dropdownRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setIsMenuOpen(false);
  };

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
          label: "Commercial",
          icon: Store,
          children: [
            { href: "/commercial", label: "Commercial Spaces", description: "View commercial projects" },
            { href: "/commercial#gallery", label: "Commercial Gallery", description: "Explore our builds" },
          ]
        },
      ]
    },
    { 
      label: "Programs", 
      icon: TrendingUp,
      children: [
        { href: "/programs", label: "Rent to Own", description: "Flexible ownership options" },
        { href: "/investment", label: "Cash Program", description: "1st Position Lender Program" },
        { href: "/business-model", label: "Business Model", description: "How we work" },
      ]
    },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out overflow-visible",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/50"
          : "bg-transparent"
      )}
    >
      <div className="relative w-full h-20 sm:h-24">
        {/* Logo - Outside Container, Left Edge */}
        <div className="absolute left-4 sm:left-6 md:left-8 lg:left-6 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-10">
          <Link
            href="/"
            className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {scrolled ? (
              <Image
                src="/logos/sld-azul.png"
                alt="SLD Logo"
                width={160}
                height={64}
                className="h-10 sm:h-12 md:h-14 w-auto"
                priority
                quality={100}
              />
            ) : (
              <Image
                src="/logos/sld-blanco.png"
                alt="SLD Logo"
                width={160}
                height={64}
                className="h-10 sm:h-12 md:h-14 w-auto"
                priority
                quality={100}
              />
            )}
          </Link>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-full overflow-visible">
          <div className="flex h-full items-center justify-center lg:justify-between">
            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1 overflow-visible">
              <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4">
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
                          "px-3 xl:px-4 py-2.5 text-sm font-semibold transition-all duration-200 relative group whitespace-nowrap rounded-lg cursor-pointer",
                          scrolled
                            ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                            : "text-white/90 hover:text-white hover:bg-white/10",
                          isOpen && (scrolled ? "text-slate-900 bg-slate-100" : "text-white bg-white/10")
                        )}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                      >
                        <span className="flex items-center gap-1">
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-200",
                              isOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span className={cn(
                          "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out",
                          isOpen && "w-full",
                          scrolled ? "bg-slate-900" : "bg-white"
                        )} />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] xl:w-[480px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 z-[9999]"
                          role="menu"
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/5 via-transparent to-[#090040]/5 pointer-events-none" />
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#090040]/40 to-transparent" />
                          
                          <div className="relative p-5">
                            <div className="space-y-3">
                              {item.children.map((child, childIndex) => {
                                // Type guard: verificar si tiene submenú (children)
                                if ('children' in child && child.children) {
                                  const ChildIcon = 'icon' in child ? child.icon : null;
                                  return (
                                    <div key={child.label} className="space-y-2">
                                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#090040]/10 to-[#090040]/5 border border-[#090040]/20">
                                        {ChildIcon && (
                                          <ChildIcon className="h-4 w-4 text-[#090040] shrink-0" />
                                        )}
                                        <h4 className="text-sm font-bold text-[#090040] uppercase tracking-wide">
                                          {child.label}
                                        </h4>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 pl-3">
                                        {child.children.map((subChild: any) => (
                                          <Link
                                            key={subChild.href || subChild.label}
                                            href={subChild.href || "#"}
                                            onClick={handleLinkClick}
                                            className="group/item relative block rounded-lg p-3 transition-all duration-300 border border-transparent hover:border-[#090040]/30 bg-gray-50/50 hover:bg-gradient-to-br hover:from-[#090040]/5 hover:via-[#090040]/3 hover:to-transparent cursor-pointer hover:shadow-sm"
                                            role="menuitem"
                                          >
                                            <div className="relative">
                                              <div className="flex items-start gap-2">
                                                <div className="h-1 w-1 rounded-full bg-[#090040]/0 group-hover/item:bg-[#090040] transition-all duration-300 group-hover/item:scale-150 shrink-0 mt-2" />
                                                <div className="flex-1 min-w-0">
                                                  <h5 className="text-xs font-semibold leading-tight text-gray-900 group-hover/item:text-[#090040] transition-colors duration-300">
                                                    {subChild.label}
                                                  </h5>
                                                  {subChild.description && (
                                                    <p className="text-[10px] leading-snug text-gray-500 group-hover/item:text-gray-600 transition-colors duration-300 mt-0.5 line-clamp-1">
                                                      {subChild.description}
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                      {childIndex < item.children.length - 1 && (
                                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-3" />
                                      )}
                                    </div>
                                  );
                                }
                                
                                // Si es un link directo
                                if ('href' in child) {
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={handleLinkClick}
                                      className="group/item relative block rounded-xl p-4 transition-all duration-300 border-2 border-transparent hover:border-[#090040]/20 bg-gray-50/50 hover:bg-gradient-to-br hover:from-[#090040]/5 hover:via-[#090040]/3 hover:to-transparent cursor-pointer hover:shadow-md"
                                      role="menuitem"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/0 via-[#090040]/0 to-[#090040]/0 group-hover/item:from-[#090040]/10 group-hover/item:via-[#090040]/5 group-hover/item:to-transparent transition-all duration-200 rounded-xl opacity-0 group-hover/item:opacity-100" />
                                      
                                      <div className="relative flex items-start justify-between gap-3">
                                        <div className="flex-1 space-y-1.5 min-w-0">
                                          <div className="flex items-start gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#090040]/0 group-hover/item:bg-[#090040] transition-all duration-300 group-hover/item:scale-150 shrink-0 mt-1.5" />
                                            <h3 className="text-sm font-bold leading-tight text-gray-900 group-hover/item:text-[#090040] transition-colors duration-300">
                                              {child.label}
                                            </h3>
                                          </div>
                                          {'description' in child && child.description && (
                                            <p className="text-xs leading-snug text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300 pl-3.5 line-clamp-2">
                                              {child.description}
                                            </p>
                                          )}
                                        </div>
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover/item:text-[#090040] transition-all duration-300 -rotate-90 opacity-0 group-hover/item:opacity-100 shrink-0 mt-0.5" />
                                      </div>
                                      
                                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#090040]/0 to-transparent group-hover/item:via-[#090040]/40 transition-all duration-500" />
                                    </Link>
                                  );
                                }
                                
                                return null;
                              })}
                            </div>
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
                      "px-3 xl:px-4 py-2.5 text-sm font-semibold transition-all duration-200 relative group whitespace-nowrap rounded-lg cursor-pointer",
                      scrolled
                        ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out",
                      scrolled ? "bg-slate-900" : "bg-white"
                    )} />
                  </Link>
                );
              })}
              </div>
            </nav>

            {/* Desktop CTA - Single prominent button */}
            <div className="hidden lg:flex items-center justify-end gap-3">
              <Link
                href="/contact"
                prefetch={true}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap",
                  scrolled
                    ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg"
                    : "bg-white text-slate-900 hover:bg-white/95 shadow-lg hover:shadow-xl"
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu Button - Right Side on Mobile */}
            <div className="flex items-center justify-end lg:hidden absolute right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 2xl:right-20 top-1/2 -translate-y-1/2 z-10">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  aria-label="Toggle menu"
                >
                  <Menu className={cn(
                    "h-6 w-6 transition-colors duration-300",
                    scrolled ? "text-gray-700" : "text-white"
                  )} />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm bg-white p-0 border-0 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Header with Logo - Compact */}
                <SheetHeader className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-[#090040] to-[#2d2c55]">
                  <div className="flex items-center justify-between">
                    <Image
                      src="/logos/sld-blanco.png"
                      alt="SLD Logo"
                      width={120}
                      height={48}
                      className="h-10 w-auto"
                    />
                  </div>
                  <SheetTitle className="text-white text-left mt-3 text-base font-bold">
                    Navigation
                  </SheetTitle>
                  <SheetDescription className="text-white/90 text-left text-xs">
                    Explore our services and programs
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Items - Compact */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 bg-white">
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      
                      if (item.children) {
                        return (
                          <div key={item.label} className="space-y-1.5">
                            <button
                              onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#090040] text-gray-900 transition-all duration-300 group shadow-sm"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#090040] to-[#090040] transition-all duration-300 shadow-sm">
                                <Icon className="h-5 w-5 text-white transition-colors duration-300" />
                              </div>
                              <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-gray-600 transition-transform duration-300",
                                  openSubmenu === item.label && "rotate-180 text-[#090040]"
                                )}
                              />
                            </button>
                            {openSubmenu === item.label && (
                              <div className="pl-3 space-y-2 border-l-2 border-[#090040]/30 ml-2.5 animate-in slide-in-from-top-2 fade-in-0 duration-300">
                                {item.children.map((child) => {
                                  // Type guard: verificar si tiene submenú (children)
                                  if ('children' in child && child.children) {
                                    const ChildIcon = 'icon' in child ? child.icon : null;
                                    const submenuKey = `${item.label}-${child.label}`;
                                    return (
                                      <div key={child.label} className="space-y-1.5">
                                        <button
                                          onClick={() => setOpenSubmenu(openSubmenu === submenuKey ? null : submenuKey)}
                                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#090040]/10 to-[#090040]/5 border border-[#090040]/20 text-[#090040] transition-all duration-300 group/sub"
                                        >
                                          {ChildIcon && (
                                            <ChildIcon className="h-4 w-4 shrink-0" />
                                          )}
                                          <span className="font-bold text-xs uppercase tracking-wide flex-1 text-left">
                                            {child.label}
                                          </span>
                                          <ChevronDown
                                            className={cn(
                                              "h-3.5 w-3.5 transition-transform duration-300",
                                              openSubmenu === submenuKey && "rotate-180"
                                            )}
                                          />
                                        </button>
                                        {openSubmenu === submenuKey && (
                                          <div className="pl-2 space-y-1 border-l-2 border-[#090040]/20 ml-2 animate-in slide-in-from-top-1 fade-in-0 duration-200">
                                            {child.children.map((subChild: any) => (
                                              <Link
                                                key={subChild.href || subChild.label}
                                                href={subChild.href || "#"}
                                                prefetch={true}
                                                onClick={handleLinkClick}
                                                className="block px-3 py-2 rounded-md bg-gray-50/50 border border-gray-200 hover:border-[#090040]/30 hover:bg-gradient-to-r hover:from-[#090040]/5 hover:to-transparent text-gray-900 hover:text-[#090040] transition-all duration-300 group/subitem"
                                              >
                                                <h4 className="font-semibold text-xs mb-0.5">{subChild.label}</h4>
                                                {subChild.description && (
                                                  <p className="text-[10px] text-gray-500 group-hover/subitem:text-gray-600 line-clamp-1">
                                                    {subChild.description}
                                                  </p>
                                                )}
                                              </Link>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }
                                  
                                  // Si es un link directo
                                  if ('href' in child) {
                                    return (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        prefetch={true}
                                        onClick={handleLinkClick}
                                        className="block px-3 py-2.5 rounded-lg bg-gray-50/50 border border-gray-200 hover:border-[#090040]/50 hover:bg-gradient-to-r hover:from-[#090040]/5 hover:to-[#090040]/5 text-gray-900 hover:text-[#090040] transition-all duration-300 group/item"
                                      >
                                        <h3 className="font-bold text-sm mb-0.5">{child.label}</h3>
                                        {'description' in child && child.description && (
                                          <p className="text-xs text-gray-600 group-hover/item:text-gray-700 line-clamp-1">
                                            {child.description}
                                          </p>
                                        )}
                                      </Link>
                                    );
                                  }
                                  
                                  return null;
                                })}
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
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#090040] hover:to-[#2d2c55] text-gray-900 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] group-hover:bg-white transition-all duration-300 shadow-sm">
                            <Icon className="h-5 w-5 text-white group-hover:text-[#090040] transition-colors duration-300" />
                          </div>
                          <span className="font-semibold text-sm flex-1">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* CTA Footer */}
                <div className="px-3 py-4 border-t border-slate-200 bg-slate-50">
                  <Link
                    href="/contact"
                    prefetch={true}
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors duration-200 text-sm"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Contact Us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
