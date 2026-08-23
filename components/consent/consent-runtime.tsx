"use client";

import dynamic from "next/dynamic";

const CookieConsentBanner = dynamic(
  () =>
    import("@/components/consent/cookie-consent-banner").then(
      (m) => m.CookieConsentBanner
    ),
  { ssr: false }
);

const MetaPixel = dynamic(
  () => import("@/components/analytics/meta-pixel").then((m) => m.MetaPixel),
  { ssr: false }
);

export function ConsentRuntime() {
  return (
    <>
      <MetaPixel />
      <CookieConsentBanner />
    </>
  );
}
