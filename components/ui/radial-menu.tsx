"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  Info,
  Building2,
  TrendingUp,
  MapPin,
  Newspaper,
  Phone,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/config/contact";

type NavItem = {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: Array<{
    href?: string;
    label: string;
    description?: string;
    children?: Array<{ href?: string; label: string }>;
  }>;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: Info },
  {
    label: "Our Homes",
    icon: Building2,
    children: [
      { href: "/models", label: "All Models" },
      { href: "/models/louisiana", label: "Louisiana" },
      { href: "/models/viana", label: "Viana" },
      { href: "/models/langdon", label: "Langdon" },
      { href: "/models/delanie", label: "Delanie" },
      { href: "/models/emelia", label: "Emelia" },
      { href: "/models/aurora", label: "Aurora" },
      { href: "/models/duplex", label: "Duplex" },
      { href: "/commercial", label: "Commercial" },
    ],
  },
  {
    label: "Programs",
    icon: TrendingUp,
    children: [
      { href: "/programs", label: "Rent to Own" },
      { href: "/investment", label: "Cash Program" },
      { href: "/business-model", label: "Our Mission" },
    ],
  },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/blog", label: "Blog", icon: Newspaper },
];

interface RadialMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}

const RadialMenu = ({ isOpen, onToggle, onItemClick }: RadialMenuProps) => {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleItemClick = (item: NavItem) => {
    if (item.href) {
      onItemClick();
    } else if (item.children) {
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    }
  };

  const handleSubmenuLinkClick = () => {
    setOpenSubmenu(null);
    onItemClick();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-md touch-none lg:hidden"
            onClick={() => {
              if (openSubmenu) setOpenSubmenu(null);
              else onToggle();
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>


      {/* Mobile Menu - vertical line going up, Contact above house */}
      <div className="fixed bottom-8 right-6 left-6 flex justify-end z-[102] lg:hidden pb-[env(safe-area-inset-bottom,0px)]">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col-reverse items-end gap-2"
            >
              {/* House = close button at bottom */}
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                type="button"
                onClick={onToggle}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#090040]/85 backdrop-blur-xl border border-[#090040]/30 shadow-lg shadow-black/25 text-white hover:bg-[#090040] hover:border-[#D4AF37]/40 active:scale-95 transition-all touch-manipulation"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Contact - goes to contact page (inside menu) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.02 }}
              >
                <Link
                  href="/contact"
                  prefetch
                  onClick={onItemClick}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#090040] shadow-lg shadow-black/20 hover:bg-[#FFD700] active:scale-95 transition-transform touch-manipulation"
                  aria-label="Contacto"
                >
                  <Phone className="h-5 w-5" />
                </Link>
              </motion.div>

              {/* Nav items - line going upward, inline submenus */}
              {[...navItems].reverse().map((item, index) => {
                const Icon = item.icon;
                const isExpanded = openSubmenu === item.label;
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.04 + index * 0.02, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-end gap-1.5"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        prefetch
                        onClick={onItemClick}
                        className={cn(
                          "flex items-center justify-center gap-2 h-12 min-w-[48px] px-4 rounded-full bg-[#090040]/85 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/20 text-white text-sm font-medium",
                          "hover:bg-[#D4AF37]/90 hover:border-[#D4AF37]/60 hover:text-[#090040]",
                          "transition-all duration-200 touch-manipulation active:scale-95"
                        )}
                        aria-label={item.label}
                      >
                        <Icon className="h-5 w-5 shrink-0" aria-hidden />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className={cn(
                            "flex items-center justify-center gap-2 h-12 min-w-[48px] px-4 rounded-full backdrop-blur-xl border shadow-lg shadow-black/20 text-white text-sm font-medium",
                            "transition-all duration-200 touch-manipulation active:scale-95",
                            isExpanded
                              ? "bg-[#D4AF37]/90 border-[#D4AF37]/60 text-[#090040]"
                              : "bg-[#090040]/85 border-white/20 hover:bg-[#D4AF37]/90 hover:border-[#D4AF37]/60 hover:text-[#090040]"
                          )}
                          aria-label={item.label}
                          aria-expanded={isExpanded}
                        >
                          <Icon className="h-5 w-5 shrink-0" aria-hidden />
                          <span className="whitespace-nowrap">{item.label}</span>
                          {hasChildren && (
                            <ChevronDown
                              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")}
                              aria-hidden
                            />
                          )}
                        </button>
                        {/* Inline submenu - expand naturally below parent */}
                        <AnimatePresence>
                          {isExpanded && hasChildren && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="flex flex-col items-end gap-1 overflow-hidden"
                            >
                              {item.children!.map((child) => (
                                <motion.div
                                  key={child.href ?? child.label}
                                  initial={{ opacity: 0, x: 8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 }}
                                  className="flex justify-end"
                                >
                                  <Link
                                    href={child.href ?? "#"}
                                    prefetch
                                    onClick={handleSubmenuLinkClick}
                                    className={cn(
                                      "flex items-center gap-2 h-10 min-w-[44px] px-3 rounded-full text-xs font-medium",
                                      "bg-white/10 backdrop-blur-xl border border-white/15 text-white/95",
                                      "hover:bg-[#D4AF37]/80 hover:border-[#D4AF37]/50 hover:text-[#090040]",
                                      "transition-all duration-150 touch-manipulation active:scale-95"
                                    )}
                                    aria-label={child.label}
                                  >
                                    <span className="whitespace-nowrap">{child.label}</span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex flex-col items-end gap-2"
            >
              {/* Call - direct call button (outside menu) */}
              <a
                href={CONTACT_INFO.phone.href}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#090040] shadow-lg shadow-black/20 hover:bg-[#FFD700] active:scale-95 transition-transform touch-manipulation"
                aria-label="Llamar ahora"
              >
                <Phone className="h-5 w-5" />
              </a>
              {/* House - opens menu */}
              <button
                type="button"
                onClick={onToggle}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#090040]/85 backdrop-blur-xl border border-[#090040]/30 shadow-lg shadow-black/25 text-white hover:bg-[#090040] hover:border-[#D4AF37]/40 active:scale-95 transition-all duration-200 touch-manipulation"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Abrir menú de navegación"
                aria-expanded={isOpen}
              >
                <HomeIcon className="h-6 w-6" aria-hidden />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export { RadialMenu };
