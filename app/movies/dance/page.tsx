import { SectionHeader } from "@/components/section-header";
import { VideoPlayer } from "@/components/video-player";

export default function DancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionHeader title="Dance" backHref="/movies" backLabel="All Movies" />
      <VideoPlayer src="/video/dance.mp4" title="Dance" />
    </div>
  );
}
