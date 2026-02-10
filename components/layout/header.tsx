"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ArrowRight, Phone, Info, MapPin, TrendingUp, Home as HomeIcon, Building2, ChevronDown, Building, Store, Newspaper } from "lucide-react";
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
  /** Mobile: set of open submenu keys so "Our Homes" + "Residential" can both be open */
  const [openSubmenus, setOpenSubmenus] = React.useState<Set<string>>(new Set());
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out overflow-visible",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/50"
          : "bg-transparent"
      )}
    >
      <div className="relative w-full h-14 sm:h-16 md:h-[4.25rem]">
        {/* Logo - compact */}
        <div className="absolute left-3 sm:left-4 md:left-6 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-10">
          <Link
            href="/"
            className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Standard Land Development - Home"
          >
            {scrolled ? (
              <Image
                src="/logos/sld-azul.png"
                alt=""
                width={140}
                height={56}
                className="h-7 sm:h-8 md:h-9 w-auto"
                priority
                quality={100}
              />
            ) : (
              <Image
                src="/logos/sld-blanco.png"
                alt=""
                width={140}
                height={56}
                className="h-7 sm:h-8 md:h-9 w-auto"
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
                          "px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-md cursor-pointer",
                          scrolled
                            ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                            : "text-white/85 hover:text-white hover:bg-white/10",
                          isOpen && (scrolled ? "text-slate-900 bg-slate-100/80" : "text-white bg-white/10")
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
                          scrolled ? "bg-slate-900" : "bg-white"
                        )} />
                      </button>

                      {/* Dropdown Menu - Our Homes: cleaner design */}
                      {isOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] xl:w-[380px] rounded-2xl border border-slate-200/90 bg-white shadow-xl overflow-hidden animate-in fade-in-0 slide-in-from-top-1 duration-200 z-[9999]"
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
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090040]/8">
                                      {ChildIcon && (
                                        <ChildIcon className="h-4 w-4 text-[#090040] shrink-0" aria-hidden />
                                      )}
                                      <span className="text-xs font-bold text-[#090040] uppercase tracking-wider">
                                        {child.label}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {child.children.map((subChild: { href?: string; label: string; description?: string }) => (
                                        <Link
                                          key={subChild.href ?? subChild.label}
                                          href={subChild.href ?? "#"}
                                          onClick={handleLinkClick}
                                          className="rounded-lg px-3 py-2.5 bg-slate-50 hover:bg-[#090040]/5 border border-transparent hover:border-[#090040]/15 transition-all duration-200 group/item"
                                          role="menuitem"
                                        >
                                          <span className="text-sm font-medium text-slate-900 group-hover/item:text-[#090040] block leading-tight">
                                            {subChild.label}
                                          </span>
                                          {subChild.description && (
                                            <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 block">
                                              {subChild.description}
                                            </span>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                    {childIndex < item.children.length - 1 && (
                                      <div className="border-t border-slate-100 my-1" />
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
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-slate-50 hover:bg-[#090040]/10 border border-slate-100 hover:border-[#090040]/20 transition-all duration-200 group/item"
                                    role="menuitem"
                                  >
                                    {ChildIcon && (
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#090040]/10 group-hover/item:bg-[#090040]/20">
                                        <ChildIcon className="h-4 w-4 text-[#090040]" aria-hidden />
                                      </span>
                                    )}
                                    <div className="min-w-0">
                                      <span className="text-sm font-semibold text-slate-900 group-hover/item:text-[#090040] block">
                                        {child.label}
                                      </span>
                                      {"description" in child && child.description && (
                                        <span className="text-xs text-slate-500 block">{child.description}</span>
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
                      "px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 relative group whitespace-nowrap rounded-md cursor-pointer",
                      scrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-200 ease-out",
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
                  className="h-9 w-9 rounded-lg touch-manipulation"
                  aria-label="Open menu"
                >
                  <Menu className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    scrolled ? "text-slate-700" : "text-white"
                  )} aria-hidden="true" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[min(320px,100vw)] sm:max-w-sm bg-white p-0 border-0 shadow-xl">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-3 py-3 border-b border-white/10 bg-gradient-to-r from-[#090040] to-[#2d2c55]">
                  <div className="flex items-center justify-between">
                    <Image
                      src="/logos/sld-blanco.png"
                      alt=""
                      width={100}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </div>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="text-white/80 text-left text-[11px] mt-1.5">
                    Menu
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Items - compact */}
                <nav className="flex-1 overflow-y-auto px-2.5 py-3 bg-white" aria-label="Mobile menu">
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      
                      if (item.children) {
                        const isParentOpen = isMobileSubmenuOpen(item.label);
                        return (
                          <div key={item.label} className="space-y-0.5">
                            <button
                              type="button"
                              onClick={() => toggleMobileSubmenu(item.label)}
                              className="w-full flex items-center gap-2.5 py-2.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#090040]/30 text-gray-900 transition-all duration-200 touch-manipulation min-h-[44px]"
                              aria-expanded={isParentOpen}
                              aria-controls={`submenu-${item.label.replace(/\s/g, "-")}`}
                              aria-label={`${item.label}, ${isParentOpen ? "collapse" : "expand"} submenu`}
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#090040]">
                                <Icon className="h-4 w-4 text-white" aria-hidden />
                              </div>
                              <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={cn(
                                  "h-3.5 w-3.5 text-slate-500 transition-transform duration-200 shrink-0",
                                  isParentOpen && "rotate-180 text-[#090040]"
                                )}
                                aria-hidden
                              />
                            </button>
                            {isParentOpen && (
                              <div id={`submenu-${item.label.replace(/\s/g, "-")}`} className="pl-2 space-y-1 border-l-2 border-[#090040]/20 ml-3 animate-in slide-in-from-top-1 fade-in-0 duration-150">
                                {item.children.map((child) => {
                                  if ('children' in child && child.children) {
                                    const ChildIcon = 'icon' in child ? child.icon : null;
                                    const submenuKey = `${item.label}-${child.label}`;
                                    const isNestedOpen = isMobileSubmenuOpen(submenuKey);
                                    return (
                                      <div key={child.label} className="space-y-0.5">
                                        <button
                                          type="button"
                                          onClick={() => toggleMobileSubmenu(submenuKey)}
                                          className="w-full flex items-center gap-2 px-2 py-2 rounded-md bg-[#090040]/10 border border-[#090040]/15 text-[#090040] text-left touch-manipulation min-h-[40px]"
                                          aria-expanded={isNestedOpen}
                                          aria-label={`${child.label}, ${isNestedOpen ? "collapse" : "expand"}`}
                                        >
                                          {ChildIcon && <ChildIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                                          <span className="font-semibold text-[11px] uppercase tracking-wide flex-1">{child.label}</span>
                                          <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", isNestedOpen && "rotate-180")} aria-hidden />
                                        </button>
                                        {isNestedOpen && (
                                          <div className="pl-1.5 space-y-0.5 border-l border-slate-200 ml-2 pb-1">
                                            {child.children.map((subChild: { href?: string; label: string }) => (
                                              <Link
                                                key={subChild.href ?? subChild.label}
                                                href={subChild.href ?? "#"}
                                                prefetch={true}
                                                onClick={handleLinkClick}
                                                className="block px-2 py-2 rounded-md text-gray-700 hover:bg-[#090040]/5 hover:text-[#090040] text-xs font-medium min-h-[40px] flex items-center touch-manipulation"
                                              >
                                                {subChild.label}
                                              </Link>
                                            ))}
                                          </div>
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
                                        prefetch={true}
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50/80 hover:bg-[#090040]/5 text-gray-900 hover:text-[#090040] text-sm font-medium min-h-[44px] touch-manipulation"
                                      >
                                        {ChildIcon && (
                                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#090040]/10">
                                            <ChildIcon className="h-4 w-4 text-[#090040]" aria-hidden />
                                          </span>
                                        )}
                                        <span className="flex-1 text-left">{child.label}</span>
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
                          className="flex items-center gap-2.5 py-2.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#090040]/30 hover:bg-[#090040]/5 text-gray-900 hover:text-[#090040] transition-all duration-200"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#D4AF37]">
                            <Icon className="h-4 w-4 text-white" aria-hidden />
                          </div>
                          <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* CTA Footer - compact */}
                <div className="px-2.5 py-3 border-t border-slate-200 bg-slate-50/80">
                  <Link
                    href="/contact"
                    prefetch={true}
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200 text-xs"
                    aria-label="Contact us"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Contact Us
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
