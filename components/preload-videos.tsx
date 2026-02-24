"use client";

import { useEffect, useRef } from "react";

/**
 * Preloads video URLs in the background so when the user scrolls to the section
 * and clicks play, the video is already in the browser cache (no re-download
 * when navigating away and back — Cache-Control headers handle that).
 *
 * Uses a hidden video with preload="auto" to prime the cache. Same URL in the
 * real <video> later = cache hit.
 */
const PRELOAD_VIDEOS = ["/SLD-video2.MP4"] as const;
const START_DELAY_MS = 2000;

export function PreloadVideos() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timer = setTimeout(() => {
      PRELOAD_VIDEOS.forEach((src) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("aria-hidden", "true");
        video.style.position = "absolute";
        video.style.width = "0";
        video.style.height = "0";
        video.style.pointerEvents = "none";
        video.style.opacity = "0";
        video.src = src;
        document.body.appendChild(video);
        // Let the browser load; no need to play. When user clicks play on the real
        // video with same URL, cache is used. Remove after canplay to free memory.
        video.addEventListener("canplaythrough", () => {
          video.remove();
        }, { once: true });
      });
    }, START_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
