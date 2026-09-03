import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_UNDER_CONSTRUCTION } from "@/config/site-mode";

/**
 * While under construction: every page and API hits the placeholder home.
 * Static assets (_next, images, favicon, logos) stay reachable for the page itself.
 */
export function middleware(request: NextRequest) {
  if (!SITE_UNDER_CONSTRUCTION) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/logos") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/og-image.jpg" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Site temporarily unavailable." },
      { status: 503 }
    );
  }

  if (pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
