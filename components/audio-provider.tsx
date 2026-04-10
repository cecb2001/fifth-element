"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { getAudioForPath } from "@/lib/data/audio";

interface AudioContextValue {
  isEnabled: boolean;
  isPlaying: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  isEnabled: false,
  isPlaying: false,
  toggle: () => {},
});

const STORAGE_KEY = "yearbook-audio-enabled";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsEnabled(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = getAudioForPath(pathname);
    if (!src) return;
    if (audio.src !== new URL(src, window.location.origin).href) {
      audio.src = src;
      audio.load();
    }

    if (isEnabled) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [pathname, isEnabled]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !isEnabled;
    setIsEnabled(next);
    localStorage.setItem(STORAGE_KEY, String(next));

    if (next) {
      const src = getAudioForPath(pathname);
      if (src && (!audio.src || audio.src !== new URL(src, window.location.origin).href)) {
        audio.src = src;
        audio.load();
      }
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isEnabled, pathname]);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => setIsPlaying(false), []);

  return (
    <AudioContext value={{ isEnabled, isPlaying, toggle }}>
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />
      {children}
    </AudioContext>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
