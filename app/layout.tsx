import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = SEO_CONFIG.siteName;
const siteUrl = SEO_CONFIG.siteUrl;
const defaultDescription =
  "Standard Land Development - Creating the opportunity of home ownership for American Families. Founded in 2016 by CEO Michael J. Newell. Over 1,500+ homes built. Investment opportunities with 1st Position Lender Cash Program.";

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
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
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
        url: `${siteUrl}/logos/sld-azul.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Investment Opportunities in Southwest Florida`,
    description: defaultDescription,
    images: [`${siteUrl}/logos/sld-azul.png`],
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
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "msapplication-TileColor": "#090040",
    "msapplication-config": "/favicon/browserconfig.xml",
    "theme-color": "#090040",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-20 sm:pt-24">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
