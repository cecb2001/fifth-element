import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sessionOptions, SessionData } from "@/lib/session";
import { insertRegistration } from "@/lib/db";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  pin: string;
}

export async function POST(request: Request) {
  let body: RegisterRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { firstName, lastName, pin } = body;

  if (
    !firstName ||
    !lastName ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    firstName.trim().length === 0 ||
    lastName.trim().length === 0 ||
    firstName.trim().length > 100 ||
    lastName.trim().length > 100
  ) {
    return NextResponse.json(
      { error: "First name and last name are required (max 100 characters each)" },
      { status: 400 }
    );
  }

  if (!pin || typeof pin !== "string" || pin.length === 0) {
    return NextResponse.json({ error: "PIN is required" }, { status: 400 });
  }

  const hashB64 = process.env.BATCH_PIN_HASH_B64;
  if (!hashB64) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }
  const hash = Buffer.from(hashB64, "base64").toString("utf-8");
  const isValidPin = await bcrypt.compare(pin, hash);
  if (!isValidPin) {
    return NextResponse.json({ error: "Invalid batch PIN" }, { status: 401 });
  }

  if (process.env.DATABASE_URL) {
    try {
      await insertRegistration(firstName.trim(), lastName.trim());
    } catch {
      // DB insert failed silently — session still gets created
    }
  }

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  session.isLoggedIn = true;
  session.firstName = firstName.trim();
  session.lastName = lastName.trim();
  await session.save();

  return NextResponse.json({ success: true }, { status: 200 });
}
