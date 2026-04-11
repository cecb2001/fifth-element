import Image from "next/image";
import Link from "next/link";
import { farewellText } from "@/lib/data/farewell";

export default function Home() {
  const paragraphs = farewellText.split("\n\n");

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full">
        <Image
          src="/photos/ui/class.jpg"
          alt="B Batch Class Photo"
          width={749}
          height={352}
          className="w-full h-auto opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[--color-surface]/40 via-[--color-surface]/60 to-[--color-surface]" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 animate-fade-up">
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-gradient tracking-tight mb-4">
            Fifth Elements
          </h1>
          <p className="text-lg md:text-xl text-[--color-text-secondary] mb-2 tracking-widest uppercase text-sm">
            College of Engineering, Chengannur
          </p>
          <p className="text-[--color-text-muted] mb-10 tracking-wider">
            B Batch 1997 &ndash; 2001
          </p>
          <Link
            href="/classmates"
            className="inline-flex items-center gap-2 bg-[--color-accent] text-[--color-surface] font-semibold px-8 py-3 rounded-full hover:bg-[--color-accent-light] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]"
          >
            Enter the Yearbook
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[--color-accent] mb-10 italic">
          Our Story
        </h2>
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[--color-text-secondary] leading-relaxed text-lg" style={{ animationDelay: `${i * 0.15}s` }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="w-full border-t border-[--color-border-subtle] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[--color-text-primary] mb-10 text-center">
            Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/classmates", title: "Classmates", desc: "39 friends, one batch" },
              { href: "/gallery", title: "Photo Gallery", desc: "460+ photos across 4 years" },
              { href: "/movies", title: "Movies & Tours", desc: "Video memories from campus" },
              { href: "/fun", title: "Fun Stuff", desc: "The lighter side of college" },
              { href: "/credits", title: "The Makers", desc: "The team behind this yearbook" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-glow p-6 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[--color-accent] mb-1 group-hover:text-[--color-accent-light] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[--color-text-muted]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
