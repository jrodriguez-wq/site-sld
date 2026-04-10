import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";
import { JsonLd } from "@/components/seo/json-ld";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generatePersonSchema,
} from "@/lib/seo/structured-data";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});



const siteName = SEO_CONFIG.siteName;
const siteUrl = SEO_CONFIG.siteUrl;
const defaultDescription =
  "Standard Land Development - Creating the opportunity of home ownership for American Families. Founded in 2016 by CEO Michael J. Newell. Over 2,875 homes built. 22% annual return to our lenders. Investment opportunities with 1st Position Lender Cash Program.";

const allKeywords = [
  "real estate investment",
  "Southwest Florida",
  "affordable housing",
  "land development",
  "construction financing",
  "rent to own",
  "Michael J. Newell",
  "Standard Land Development",
  ...getLocalKeywords(),
  ...getServiceKeywords(),
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Investment Opportunities in Southwest Florida`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: allKeywords,
  authors: [{ name: "Standard Land Development" }],
  creator: "Standard Land Development",
  publisher: "Standard Land Development",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/SLD16X16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/SLD16X16.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/SLD16X16.svg", type: "image/svg+xml" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Investment Opportunities in Southwest Florida`,
    description: defaultDescription,
    images: [
      {
        // OG image must be JPG/WebP 1200x630 — SVG not supported by social crawlers
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Standard Land Development — Affordable Homes in Southwest Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Investment Opportunities in Southwest Florida`,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "facebook-domain-verification": "52y0vaxl4stj4h9bpzby361n3bo68f",
    "msapplication-TileColor": "#090040",
    "theme-color": "#090040",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
    generatePersonSchema(),
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased min-h-screen touch-manipulation`}
        suppressHydrationWarning
      >
        <MetaPixel />
        <JsonLd data={globalSchemas} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-24 sm:pb-24 lg:pb-0 min-h-0">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
