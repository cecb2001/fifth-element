import Image from "next/image";
import Link from "next/link";
import type { Student } from "@/lib/data/students";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Link
      href={`/classmates/${student.id}`}
      className="group card-glow block overflow-hidden"
    >
      <div className="flex justify-center pt-4 px-4">
        <Image
          src={student.passportPhoto}
          alt={student.displayName}
          width={98}
          height={124}
          className="rounded-md object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <p className="text-sm font-medium text-[--color-text-secondary] group-hover:text-[--color-accent] transition-colors truncate">
          {student.displayName}
        </p>
      </div>
    </Link>
  );
}
