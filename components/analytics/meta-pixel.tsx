"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent, onConsentChange } from "@/lib/consent/cookie-consent";

const FB_PIXEL_ID = "2334086850432806";

export function MetaPixel() {
  const [allowed, setAllowed] = useState(
    () => getStoredConsent() === "accepted"
  );

  useEffect(() => {
    return onConsentChange((status) => setAllowed(status === "accepted"));
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* Meta Pixel fallback requires a 1×1 tracking pixel, not next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
