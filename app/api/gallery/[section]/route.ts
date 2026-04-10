import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const validSections = ["s3", "s5", "s7", "misc"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;

  if (!validSections.includes(section)) {
    return NextResponse.json({ photos: [] }, { status: 404 });
  }

  const photosDir = path.join(process.cwd(), "public", "photos", section);

  try {
    const files = fs.readdirSync(photosDir);
    const photos = files
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .sort()
      .map((f) => `/photos/${section}/${f}`);

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: [] });
  }
}
