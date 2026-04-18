import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import videos from "@/data/videos";
import VideoCard from "@/components/VideoCard";

export default function HomePage() {
  const previewVideos = videos.slice(0, 3);
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Welcome to SPINJITZUMASTER.guru</h1>
      <p className="text-center text-lg text-gray-300">
        Join the dojo and help unlock the full platform.
      </p>
      <ProgressBar />
      <div className="text-center">
        <Link
          href="/join"
          className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg"
        >
          Join Now
        </Link>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}