"use client";

import { useEffect } from "react";

const CALENDLY_SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";

interface CalendlyInlineWidgetProps {
  url: string;
  minWidth?: number;
  height?: number;
  className?: string;
}

const CalendlyInlineWidget = ({
  url,
  minWidth = 320,
  height = 700,
  className = "",
}: CalendlyInlineWidgetProps) => {
  useEffect(() => {
    if (!url) return;

    const existing = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_URL}"]`
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [url]);

  return (
    <div className={className} style={{ minWidth, height }}>
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth, height }}
      />
    </div>
  );
};

export { CalendlyInlineWidget };
