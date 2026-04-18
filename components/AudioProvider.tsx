"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AudioContextProps {
  play: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const AudioContext = createContext<AudioContextProps>({
  play: () => {},
  soundEnabled: false,
  toggleSound: () => {},
});

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    // instantiate audio element on mount
    const audioElement = new Audio("/audio/spinjitzu-master.mp3");
    audioElement.volume = 0.8;
    setAudio(audioElement);
    // load saved sound preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("spinjitzu_sound_enabled");
      setSoundEnabled(saved === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("spinjitzu_sound_enabled", soundEnabled.toString());
    }
  }, [soundEnabled]);

  const play = () => {
    if (!soundEnabled || !audio) return;
    const now = Date.now();
    if (now < cooldown) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setCooldown(now + 3000);
  };

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <AudioContext.Provider value={{ play, soundEnabled, toggleSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}