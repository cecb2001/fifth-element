import { SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "fifth-elements-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 365,
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
  firstName: "",
  lastName: "",
};
