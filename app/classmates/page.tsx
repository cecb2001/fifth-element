import { students } from "@/lib/data/students";
import { StudentCard } from "@/components/student-card";
import { SectionHeader } from "@/components/section-header";

const letterGroups = students.reduce(
  (acc, student) => {
    const letter = student.displayName[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(student);
    return acc;
  },
  {} as Record<string, typeof students>,
);

const letters = Object.keys(letterGroups).sort();

export default function ClassmatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeader
        title="Classmates"
        subtitle="B Batch 1997-2001 — 39 friends, one journey"
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[--color-surface-raised] border border-[--color-border-subtle] text-[--color-accent] font-semibold text-sm hover:bg-[--color-accent]/10 hover:border-[--color-accent]/30 transition-all"
          >
            {letter}
          </a>
        ))}
      </div>

      {letters.map((letter) => (
        <div key={letter} id={letter} className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[--color-border-subtle] mb-4">
            {letter}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {letterGroups[letter].map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
