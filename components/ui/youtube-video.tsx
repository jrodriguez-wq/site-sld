"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface YouTubeVideoProps {
  url: string;
  className?: string;
  title?: string;
}

export const YouTubeVideo = ({ url, className, title }: YouTubeVideoProps) => {
  // Extract video ID from YouTube URL
  const videoId = useMemo(() => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match && match[1] ? match[1] : null;
  }, [url]);

  if (!videoId) {
    return (
      <div className={cn("aspect-video bg-gray-100 rounded-lg flex items-center justify-center", className)}>
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={cn("aspect-video rounded-lg overflow-hidden", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};
