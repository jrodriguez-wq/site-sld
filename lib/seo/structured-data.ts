import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;
const siteName = "Standard Land Development";
const mjnUrl = CONTACT_INFO.mjNewellHomesUrl || "https://www.mjnewellhomes.com";

// ─── Organization ────────────────────────────────────────────────────────────
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "SLD",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logos/sld-azul.svg`,
      width: 200,
      height: 60,
    },
    image: `${siteUrl}/og-image.jpg`,
    description:
      "Standard Land Development — Creating the opportunity of home ownership for American Families. Founded in 2016 by CEO Michael J. Newell. Over 2,875 homes built across Southwest Florida. Investment opportunities with 22% annual return.",
    foundingDate: "2016",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 54 },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      addressRegion: CONTACT_INFO.address.state,
      postalCode: CONTACT_INFO.address.zip,
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_INFO.phone.href,
        contactType: "customer service",
        email: CONTACT_INFO.email.raw,
        areaServed: ["US-FL", "LaBelle", "Lehigh Acres", "Fort Myers", "Cape Coral", "Naples"],
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      CONTACT_INFO.social.facebook,
      CONTACT_INFO.social.instagram,
      CONTACT_INFO.social.linkedInCompany,
      mjnUrl,
    ].filter(Boolean),
    // Cross-link with sister company (EEAT signal: same founder, verifiable entity)
    subOrganization: {
      "@type": "Organization",
      name: "M.J. Newell Homes",
      url: mjnUrl,
      description: "The home sales and rental division of Standard Land Development.",
    },
  };
}

// ─── LocalBusiness ───────────────────────────────────────────────────────────
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteUrl}/#localbusiness`,
    name: siteName,
    url: siteUrl,
    telephone: CONTACT_INFO.phone.href,
    email: CONTACT_INFO.email.raw,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      addressRegion: CONTACT_INFO.address.state,
      postalCode: CONTACT_INFO.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.7615,
      longitude: -81.4381,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "LaBelle", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Lehigh Acres", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Fort Myers", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Cape Coral", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Naples", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Immokalee", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Clewiston", containedInPlace: { "@type": "State", name: "Florida" } },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: ["Cash", "Financing", "Construction Loan"],
  };
}

// ─── WebSite ─────────────────────────────────────────────────────────────────
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Person — Michael J. Newell (EEAT: named founder with credentials) ───────
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#michael-j-newell`,
    name: "Michael J. Newell",
    jobTitle: "Founder & CEO",
    worksFor: [
      { "@type": "Organization", name: siteName, url: siteUrl },
      { "@type": "Organization", name: "M.J. Newell Homes", url: mjnUrl },
    ],
    description:
      "Michael J. Newell is the Founder and CEO of Standard Land Development and M.J. Newell Homes. Since 2016, Michael has led the construction of over 2,875 homes across Southwest Florida, making affordable homeownership accessible to American families.",
    url: siteUrl,
    sameAs: [
      CONTACT_INFO.social.linkedInMichael,
      CONTACT_INFO.social.instagramMichael,
    ].filter(Boolean),
    knowsAbout: [
      "Real Estate Development",
      "Residential Construction",
      "Land Development",
      "Affordable Housing",
      "Rent to Own Programs",
      "Southwest Florida Real Estate",
      "Construction Financing",
    ],
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function generateBreadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ─── FinancialProduct — Investment Program ────────────────────────────────────
export function generateInvestmentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "1st Position Lender — Real Estate Investment Program",
    description:
      "Earn up to 22% annual return secured by 1st position lien on real property. Minimum investment. Backed by Standard Land Development's track record of over 2,875 homes built in Southwest Florida.",
    provider: { "@id": `${siteUrl}/#organization` },
    feesAndCommissionsSpecification: "No hidden fees. Fixed annual return. Real property-backed.",
    annualPercentageRate: 22,
    interestRate: 22,
    currency: "USD",
    url: `${siteUrl}/investment`,
  };
}

// ─── Article schema (for blog posts) ─────────────────────────────────────────
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteUrl}/#michael-j-newell`,
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/og-image.jpg`,
    inLanguage: "en-US",
    isPartOf: { "@type": "Blog", name: "Standard Land Development Blog", url: `${siteUrl}/blog` },
  };
}
