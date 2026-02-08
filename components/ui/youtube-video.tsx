"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface YouTubeVideoProps {
  url: string;
  className?: string;
  title?: string;
}

export const YouTubeVideo = ({ url, className, title }: YouTubeVideoProps) => {
  // Extract video ID from YouTube URL or use embed URL directly
  const embedUrl = useMemo(() => {
    // If it's already an embed URL, use it directly
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
    // Extract video ID from various YouTube URL formats
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
  }, [url]);

  if (!embedUrl) {
    return (
      <div className={cn("aspect-video bg-gray-100 rounded-lg flex items-center justify-center", className)}>
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full rounded-lg overflow-hidden", className)}>
      <iframe
        src={embedUrl}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full"
      />
    </div>
  );
};
