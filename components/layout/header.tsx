"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ArrowRight, Phone, Info, MapPin, Briefcase, TrendingUp, Home as HomeIcon, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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
      label: "Home Models", 
      icon: Building2,
      children: [
        { href: "/models", label: "All Models", description: "Browse all available home models" },
        { href: "/models/louisiana", label: "Louisiana", description: "Spacious family home" },
        { href: "/models/viana", label: "Viana", description: "Modern design" },
        { href: "/models/langdon", label: "Langdon", description: "Premium features" },
        { href: "/models/delanie", label: "Delanie", description: "Comfortable living" },
      ]
    },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/business-model", label: "Business Model", icon: Briefcase },
    { 
      label: "Investment", 
      icon: TrendingUp,
      children: [
        { href: "/investment", label: "Cash Program", description: "1st Position Lender Program" },
        { href: "/programs", label: "Rent to Own", description: "Flexible ownership options" },
      ]
    },
    { href: "/programs", label: "Programs", icon: HomeIcon },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200/30"
          : "bg-transparent"
      )}
    >
      <div className="relative w-full h-24 sm:h-28">
        {/* Logo - Outside Container, Left Edge */}
        <div className="absolute left-4 sm:left-6 md:left-8 lg:left-6 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-10">
          <Link
            href="/"
            className="flex items-center"
          >
            {scrolled ? (
              <Image
                src="/logos/sld-azul.png"
                alt="SLD Logo"
                width={200}
                height={80}
                className="h-16 sm:h-20 w-auto"
                priority
                quality={100}
              />
            ) : (
              <Image
                src="/logos/sld-blanco.png"
                alt="SLD Logo"
                width={200}
                height={80}
                className="h-16 sm:h-20 w-auto"
                priority
                quality={100}
              />
            )}
          </Link>
        </div>

        <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-full">
          <div className="flex h-full items-center justify-center lg:justify-between">
            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
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
                          "px-4 xl:px-5 2xl:px-6 py-2.5 text-sm xl:text-base font-semibold transition-all duration-300 ease-in-out relative group whitespace-nowrap rounded-lg",
                          scrolled
                            ? "text-gray-700 hover:text-[#090040] hover:bg-gray-100/50"
                            : "text-white/90 hover:text-white hover:bg-white/10",
                          isOpen && (scrolled ? "text-[#090040] bg-gray-100/50" : "text-white bg-white/10")
                        )}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                      >
                        <span className="flex items-center gap-1.5">
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                          />
                        </span>
                        <span className={cn(
                          "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500 ease-out",
                          isOpen && "w-full",
                          scrolled
                            ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"
                            : "bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                        )} />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] xl:w-[380px] rounded-2xl border-2 border-gray-200 bg-white/98 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-3 duration-300 z-50"
                          role="menu"
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#471396]/5 via-transparent to-[#090040]/5 pointer-events-none" />
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#471396]/40 to-transparent" />
                          
                          <div className="relative p-4">
                            <div className="grid gap-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={handleLinkClick}
                                  className="group/item relative block rounded-xl p-4 transition-all duration-300 border-2 border-transparent hover:border-[#471396]/20 bg-gray-50/50 hover:bg-gradient-to-br hover:from-[#471396]/5 hover:via-[#471396]/3 hover:to-transparent cursor-pointer hover:shadow-md"
                                  role="menuitem"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-br from-[#471396]/0 via-[#471396]/0 to-[#471396]/0 group-hover/item:from-[#471396]/10 group-hover/item:via-[#471396]/5 group-hover/item:to-transparent transition-all duration-200 rounded-xl opacity-0 group-hover/item:opacity-100" />
                                  
                                  <div className="relative flex items-start justify-between gap-3">
                                    <div className="flex-1 space-y-1.5 min-w-0">
                                      <div className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#471396]/0 group-hover/item:bg-[#471396] transition-all duration-300 group-hover/item:scale-150 shrink-0 mt-1.5" />
                                        <h3 className="text-sm font-bold leading-tight text-gray-900 group-hover/item:text-[#471396] transition-colors duration-300">
                                          {child.label}
                                        </h3>
                                      </div>
                                      {child.description && (
                                        <p className="text-xs leading-snug text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300 pl-3.5 line-clamp-2">
                                          {child.description}
                                        </p>
                                      )}
                                    </div>
                                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover/item:text-[#471396] transition-all duration-300 -rotate-90 opacity-0 group-hover/item:opacity-100 shrink-0 mt-0.5" />
                                  </div>
                                  
                                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#471396]/0 to-transparent group-hover/item:via-[#471396]/40 transition-all duration-500" />
                                </Link>
                              ))}
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
                      "px-4 xl:px-5 2xl:px-6 py-2.5 text-sm xl:text-base font-semibold transition-all duration-300 ease-in-out relative group whitespace-nowrap rounded-lg",
                      scrolled
                        ? "text-gray-700 hover:text-[#090040] hover:bg-gray-100/50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500 ease-out",
                      scrolled
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"
                        : "bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                    )} />
                  </Link>
                );
              })}
              </div>
            </nav>

            {/* Desktop CTA Buttons - Right Side */}
            <div className="hidden lg:flex items-center justify-end gap-4 xl:gap-5 2xl:gap-6">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "font-semibold text-sm xl:text-base px-4 xl:px-5 py-2 transition-colors duration-300 ease-in-out whitespace-nowrap",
                scrolled
                  ? "text-gray-700 hover:text-[#090040] hover:bg-gray-100"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
              asChild
            >
              <Link href="/contact" prefetch={true} className="flex items-center gap-2">
                <Phone className="h-4 w-4 xl:h-5 xl:w-5" />
                <span className="hidden xl:inline">Contact</span>
                <span className="xl:hidden">Call</span>
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white hover:from-[#B8860B] hover:to-[#D4AF37] font-bold text-sm xl:text-base shadow-lg hover:shadow-[#D4AF37]/50 hover:scale-105 transition-all duration-300 ease-in-out rounded-full px-5 xl:px-7 py-2.5 xl:py-3 border-2 border-[#D4AF37]/30 whitespace-nowrap"
              asChild
            >
              <Link href="/contact" prefetch={true} className="flex items-center gap-2">
                Invest Now
                <ArrowRight className="h-4 w-4 xl:h-5 xl:w-5" />
              </Link>
            </Button>
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
                              className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#471396] text-gray-900 transition-all duration-300 group shadow-sm"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#471396] to-[#090040] transition-all duration-300 shadow-sm">
                                <Icon className="h-5 w-5 text-white transition-colors duration-300" />
                              </div>
                              <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-gray-600 transition-transform duration-300",
                                  openSubmenu === item.label && "rotate-180 text-[#471396]"
                                )}
                              />
                            </button>
                            {openSubmenu === item.label && (
                              <div className="pl-3 space-y-1.5 border-l-2 border-[#471396]/30 ml-2.5 animate-in slide-in-from-top-2 fade-in-0 duration-300">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    prefetch={true}
                                    onClick={handleLinkClick}
                                    className="block px-3 py-2.5 rounded-lg bg-gray-50/50 border border-gray-200 hover:border-[#471396]/50 hover:bg-gradient-to-r hover:from-[#471396]/5 hover:to-[#090040]/5 text-gray-900 hover:text-[#471396] transition-all duration-300 group/item"
                                  >
                                    <h3 className="font-bold text-sm mb-0.5">{child.label}</h3>
                                    {child.description && (
                                      <p className="text-xs text-gray-600 group-hover/item:text-gray-700 line-clamp-1">
                                        {child.description}
                                      </p>
                                    )}
                                  </Link>
                                ))}
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

                {/* CTA Buttons Footer - Compact */}
                <div className="px-3 py-4 border-t border-gray-200 bg-white space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center border-2 border-[#090040] text-[#090040] hover:bg-[#090040] hover:text-white font-semibold h-11 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                    onClick={handleLinkClick}
                    asChild
                  >
                    <Link href="/contact" prefetch={true} className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-11 rounded-lg text-sm"
                    onClick={handleLinkClick}
                    asChild
                  >
                    <Link href="/contact" prefetch={true} className="flex items-center justify-center gap-2">
                      Invest Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
            </Sheet>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export { Header };
