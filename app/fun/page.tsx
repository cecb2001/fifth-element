import { funStuff } from "@/lib/data/movies";
import { SectionHeader } from "@/components/section-header";
import { VideoPlayer } from "@/components/video-player";

export default function FunPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionHeader title="Fun Stuff" subtitle="The lighter side of college life" />
      <div className="space-y-14">
        {funStuff.map((item) => (
          <div key={item.id}>
            <VideoPlayer src={item.video} title={item.label} />
          </div>
        ))}
      </div>
    </div>
  );
}
