"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type AutoPlayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "muted" | "playsInline"
> & {
  src: string;
};

function primeSafariAutoplay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

function tryPlay(video: HTMLVideoElement) {
  primeSafariAutoplay(video);
  const playPromise = video.play();
  if (playPromise) {
    playPromise.catch(() => {
      primeSafariAutoplay(video);
      void video.play();
    });
  }
}

export default function AutoPlayVideo({
  src,
  className,
  poster,
  ...rest
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    primeSafariAutoplay(video);
    video.src = src;
    video.load();
    tryPlay(video);

    const onReady = () => tryPlay(video);
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("loadedmetadata", onReady);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay(video);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) tryPlay(video);
      },
      { threshold: 0.01 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("loadedmetadata", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      defaultMuted
      loop
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      className={`autoplay-video ${className ?? ""}`.trim()}
      {...{ "webkit-playsinline": "true" }}
      {...rest}
    />
  );
}
