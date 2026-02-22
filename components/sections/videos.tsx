"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: "video1",
    src: "/SLD-video1.mp4",
    title: "Construction Progress",
    description: "Watch our construction process in action, from foundation to finish",
    thumbnail: "/recurses/casa.webp",
  },
  {
    id: "video2",
    src: "/SLD-video2.MP4",
    title: "Project Development",
    description: "See how we develop quality homes with attention to every detail",
    thumbnail: "/recurses/casas.webp",
  },
];

const Videos = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlay = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  const toggleFullscreen = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (!video) return;
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="videos-heading"
    >
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 sm:mb-4">
            Construction Videos
          </span>
          <h2
            id="videos-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4 px-1"
          >
            See Our Work in Action
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-snug sm:leading-relaxed px-1">
            Watch our construction and development process, showcasing our commitment to quality and excellence
          </p>
        </AnimatedSection>

        <AnimatedSection.Stagger
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          rootMargin="0px 0px -40px 0px"
        >
          {videos.map((video) => (
            <article
              key={video.id}
              className="group relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900 border border-slate-200/50"
            >
              {playingVideo === video.id ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[video.id] = el;
                    }}
                    src={video.src}
                    poster={video.thumbnail}
                    preload="auto"
                    controls
                    autoPlay
                    muted={muted}
                    playsInline
                    className="w-full h-full object-contain"
                    onEnded={() => setPlayingVideo(null)}
                    title={video.title}
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm touch-manipulation"
                      onClick={() => setMuted(!muted)}
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? (
                        <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      ) : (
                        <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm touch-manipulation"
                      onClick={() => toggleFullscreen(video.id)}
                      aria-label="Full screen"
                    >
                      <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePlay(video.id)}
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 touch-manipulation"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <span className="flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/25 hover:bg-white/35 border border-white/40 shadow-lg transition-all duration-200 active:scale-95 shrink-0">
                      <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 text-white ml-0.5" aria-hidden />
                    </span>
                    <div className="text-center px-2 max-w-md">
                      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        {video.title}
                      </h3>
                      <p className="text-white/95 text-xs sm:text-sm md:text-base line-clamp-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                        {video.description}
                      </p>
                    </div>
                  </button>
                </>
              )}
            </article>
          ))}
        </AnimatedSection.Stagger>
      </Container>
    </section>
  );
};

export { Videos };
