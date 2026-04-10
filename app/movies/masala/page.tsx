import { SectionHeader } from "@/components/section-header";
import { VideoPlayer } from "@/components/video-player";

export default function MasalaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionHeader title="Masala Mix" backHref="/movies" backLabel="All Movies" />
      <VideoPlayer src="/video/masala.mp4" title="Masala Mix" />
    </div>
  );
}
