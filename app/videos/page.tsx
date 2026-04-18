import videos from "@/data/videos";
import VideoCard from "@/components/VideoCard";

export default function VideosPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Spinjitzu Master Videos</h1>
      <p className="text-lg text-gray-300">
        Curated archives of official nonsense from the council. All content here
        is staged and for parody only.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}