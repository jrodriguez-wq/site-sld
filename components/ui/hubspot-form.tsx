"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  className?: string;
  redirectUrl?: string;
}

export const HubSpotForm = ({ portalId, formId, className, redirectUrl }: HubSpotFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    // Create script element
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";

    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId,
          formId,
          target: `#hubspot-form-${formId}`,
          redirectUrl,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId, redirectUrl]);

  return (
    <div
      id={`hubspot-form-${formId}`}
      ref={formRef}
      className={cn(className)}
    />
  );
};

// Extend Window interface for HubSpot
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          redirectUrl?: string;
        }) => void;
      };
    };
  }
}
