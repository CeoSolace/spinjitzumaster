"use client";
import { useAudio } from "@/components/AudioProvider";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  embedUrl?: string;
  videoUrl?: string;
  thumbnail: string;
  featured?: boolean;
}

export default function VideoCard({ video }: { video: VideoItem }) {
  const { play } = useAudio();

  const handleClick = () => {
    play();
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg space-y-2 hover:bg-gray-700 cursor-pointer"
      onClick={handleClick}
    >
      {video.embedUrl ? (
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded"
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : video.videoUrl ? (
        <video
          className="w-full h-auto rounded"
          controls
          poster={video.thumbnail}
          src={video.videoUrl}
        ></video>
      ) : (
        <img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded" />
      )}
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-sm text-gray-400">{video.description}</p>
      <p className="text-xs italic text-red-300">Parody content. Do not attempt.</p>
    </div>
  );
}