import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { students } from "@/lib/data/students";
import { SectionHeader } from "@/components/section-header";

export function generateStaticParams() {
  return students.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const student = students.find((s) => s.id === slug);
    return { title: student ? `${student.displayName} — Fifth Elements` : "Not Found" };
  });
}

export default async function StudentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = students.findIndex((s) => s.id === slug);
  if (index === -1) notFound();

  const student = students[index];
  const prev = index > 0 ? students[index - 1] : null;
  const next = index < students.length - 1 ? students[index + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <SectionHeader title={student.displayName} backHref="/classmates" backLabel="All Classmates" />

      <div className="card-glow overflow-hidden">
        <div className="bg-[--color-surface] flex justify-center">
          <Image
            src={student.portraitPhoto}
            alt={student.displayName}
            width={423}
            height={265}
            className="object-contain max-h-[400px] w-auto"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-1">Date of Birth</h3>
              <p className="text-[--color-text-primary]">{student.dob}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-1">Phone</h3>
              <p className="text-[--color-text-primary]">{student.phone || "\u2014"}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-1">Address</h3>
              <p className="text-[--color-text-primary]">
                {student.house}<br />{student.address.join(", ")}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-1">Email</h3>
              <div className="space-y-1">
                {student.emails.map((email) => (
                  <p key={email} className="text-[--color-accent]">{email}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {prev ? (
          <Link href={`/classmates/${prev.id}`} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {prev.displayName}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/classmates/${next.id}`} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] flex items-center gap-1 transition-colors">
            {next.displayName}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
