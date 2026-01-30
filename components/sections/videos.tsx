"use client";

import { Container } from "@/components/ui/container";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const videos = [
    {
      id: "video1",
      src: "/SLD-video1.mp4",
      title: "Construction Progress",
      description: "Watch our construction process in action, from foundation to finish",
      thumbnail: "/recurses/casa.jpg", // Using existing image as thumbnail placeholder
    },
    {
      id: "video2",
      src: "/SLD-video2.MP4",
      title: "Project Development",
      description: "See how we develop quality homes with attention to every detail",
      thumbnail: "/recurses/casas.jpg", // Using existing image as thumbnail placeholder
    },
  ];

  const handleVideoClick = (videoId: string) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  // Generate video thumbnail
  useEffect(() => {
    videos.forEach((video) => {
      const videoElement = document.createElement("video");
      videoElement.src = video.src;
      videoElement.currentTime = 1; // Get frame at 1 second
      videoElement.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0);
          // Thumbnail is now in canvas, can be used if needed
        }
      });
    });
  }, []);

  return (
    <section id="videos" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#471396] bg-[#471396]/10 px-4 py-2 rounded-full">
              Construction Videos
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] bg-clip-text text-transparent">
              See Our Work in Action
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Watch our construction and development process, showcasing our commitment to quality and excellence
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-[#090040] to-[#2d2c55]"
            >
              {playingVideo === video.id ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[video.id] = el;
                    }}
                    src={video.src}
                    controls
                    autoPlay
                    muted={muted}
                    className="w-full h-full object-contain"
                    onEnded={() => setPlayingVideo(null)}
                  />
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                      onClick={toggleMute}
                    >
                      {muted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                      onClick={() => toggleFullscreen(video.id)}
                    >
                      <Maximize2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Thumbnail */}
                  <div className="relative w-full h-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/80 via-[#2d2c55]/70 to-[#471396]/80" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8 cursor-pointer">
                    <button
                      onClick={() => handleVideoClick(video.id)}
                      className="group/btn relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-10"
                      aria-label={`Play ${video.title}`}
                    >
                      <Play className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white ml-1 transition-transform group-hover/btn:scale-110" />
                      <div className="absolute inset-0 rounded-full bg-[#D4AF37]/50 animate-ping opacity-75" />
                    </button>
                    <div className="text-center px-4 z-10">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {video.title}
                      </h3>
                      <p className="text-white/90 font-medium text-sm sm:text-base md:text-lg drop-shadow max-w-md mx-auto">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-300" />
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { Videos };

