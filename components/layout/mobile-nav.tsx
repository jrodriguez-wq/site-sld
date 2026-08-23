"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE_NAV, SCHEDULE_HREF, SCHEDULE_LABEL } from "@/config/site-nav";
import { CONTACT_INFO } from "@/config/contact";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100vw,22rem)] bg-[#090040] text-white border-l border-white/10 p-0"
      >
        <SheetHeader className="px-5 pt-6 pb-4 border-b border-white/10 text-left">
          <SheetTitle className="text-white font-serif text-xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-3 py-4" aria-label="Mobile">
          {SITE_NAV.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="py-2">
                  <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base text-white/90 hover:bg-white/10 min-h-12"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 min-h-12"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={SCHEDULE_HREF}
            onClick={() => setOpen(false)}
            className={cn(
              "mt-4 mx-3 inline-flex items-center justify-center min-h-12 rounded-lg",
              "bg-[#D4AF37] text-[#090040] font-semibold text-sm px-4"
            )}
          >
            {SCHEDULE_LABEL}
          </Link>
          <div className="mt-6 px-3 pt-4 border-t border-white/10 space-y-2 text-sm text-white/70">
            {CONTACT_INFO.contacts.map((c) => (
              <a key={c.name} href={c.href} className="block min-h-11 py-2 hover:text-[#D4AF37]">
                {c.name}: {c.display}
              </a>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
