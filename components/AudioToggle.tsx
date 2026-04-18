"use client";
import { useAudio } from "@/components/AudioProvider";

export default function AudioToggle() {
  const { soundEnabled, toggleSound } = useAudio();
  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-lg"
      title={soundEnabled ? "Disable sound" : "Enable sound"}
    >
      {soundEnabled ? "🔊" : "🔈"}
    </button>
  );
}