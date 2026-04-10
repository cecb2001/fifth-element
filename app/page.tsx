"use client";

import { useState, useEffect, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Deterministic seeded random for SSR/client consistency             */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const CONFETTI_COLORS = ["#ffd700", "#c0c0c0", "#d4a574", "#b76e79"];

const confettiParticles = Array.from({ length: 28 }, (_, i) => {
  const r = (n: number) => seededRandom(i * 7 + n);
  return {
    id: i,
    left: `${(r(1) * 100).toFixed(2)}%`,
    width: `${(8 + r(2) * 4).toFixed(2)}px`,
    height: `${(4 + r(3) * 2).toFixed(2)}px`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    rotation: Math.floor(r(4) * 360),
    delay: `${(r(5) * 8).toFixed(2)}s`,
    duration: `${(4 + r(6) * 4).toFixed(2)}s`,
    drift: Math.floor(-30 + r(7) * 60),
  };
});

const sparkles = Array.from({ length: 10 }, (_, i) => {
  const r = (n: number) => seededRandom(i * 11 + n + 200);
  return {
    id: i,
    top: `${(10 + r(1) * 40).toFixed(2)}%`,
    left: `${(15 + r(2) * 70).toFixed(2)}%`,
    size: `${(4 + r(3) * 6).toFixed(2)}px`,
    delay: `${(r(4) * 3).toFixed(2)}s`,
    duration: `${(2 + r(5) * 1).toFixed(2)}s`,
    color: i % 3 === 0 ? "#ffffff" : "#ffd700",
  };
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SilverJubileePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, pin }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/home";
        }, 900);
      } else {
        const data = await res.json();
        setError(data.error || "Invalid batch PIN");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <>
      {/* ---------- Inline keyframes ---------- */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(45deg);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(212, 165, 116, 0.15);
          }
          50% {
            box-shadow: 0 0 40px rgba(212, 165, 116, 0.3), 0 0 80px rgba(255, 215, 0, 0.1);
          }
        }

        @keyframes success-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        @keyframes corner-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes radial-reveal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .shimmer-text {
          background: linear-gradient(
            135deg,
            #c0c0c0 0%,
            #ffd700 25%,
            #c0c0c0 50%,
            #ffd700 75%,
            #c0c0c0 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
        }

        .confetti-particle {
          position: fixed;
          top: -5%;
          pointer-events: none;
          z-index: 1;
          border-radius: 1px;
          animation: confetti-fall linear infinite;
        }

        .sparkle-dot {
          position: absolute;
          pointer-events: none;
          z-index: 2;
          animation: sparkle ease-in-out infinite;
        }

        .jubilee-card {
          position: relative;
          animation: radial-reveal 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        /* Ornamental corner decorations */
        .jubilee-card::before,
        .jubilee-card::after {
          content: '';
          position: absolute;
          width: 32px;
          height: 32px;
          pointer-events: none;
          z-index: 3;
          animation: corner-glow 3s ease-in-out infinite;
        }

        /* Top-left corner */
        .jubilee-card::before {
          top: -1px;
          left: -1px;
          border-top: 2px solid #d4a574;
          border-left: 2px solid #d4a574;
          border-top-left-radius: 16px;
        }

        /* Bottom-right corner */
        .jubilee-card::after {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid #d4a574;
          border-right: 2px solid #d4a574;
          border-bottom-right-radius: 16px;
          animation-delay: 1.5s;
        }

        .corner-tr,
        .corner-bl {
          position: absolute;
          width: 32px;
          height: 32px;
          pointer-events: none;
          z-index: 3;
          animation: corner-glow 3s ease-in-out infinite;
        }

        .corner-tr {
          top: -1px;
          right: -1px;
          border-top: 2px solid #d4a574;
          border-right: 2px solid #d4a574;
          border-top-right-radius: 16px;
          animation-delay: 0.75s;
        }

        .corner-bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid #d4a574;
          border-left: 2px solid #d4a574;
          border-bottom-left-radius: 16px;
          animation-delay: 2.25s;
        }

        .hero-section {
          animation: fade-in-up 1s ease-out forwards;
        }

        .jubilee-subtitle {
          animation: fade-in-up 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .jubilee-tagline {
          animation: fade-in-up 0.8s ease-out forwards;
          animation-delay: 0.35s;
          opacity: 0;
        }

        .input-focus-ring:focus {
          border-color: #d4a574;
          box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.15);
          outline: none;
        }

        .btn-yearbook {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-yearbook:hover:not(:disabled) {
          box-shadow: 0 0 30px rgba(212, 165, 116, 0.4), 0 0 60px rgba(255, 215, 0, 0.15);
          transform: translateY(-1px);
        }

        .btn-yearbook:active:not(:disabled) {
          transform: translateY(0);
        }

        .success-state {
          animation: success-pulse 0.45s ease-in-out 2;
        }

        /* Decorative divider */
        .ornament-divider {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ornament-divider::before,
        .ornament-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #d4a574,
            transparent
          );
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinner {
          animation: spin-slow 0.8s linear infinite;
        }
      `}</style>

      {/* ---------- Confetti particles ---------- */}
      {confettiParticles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* ---------- Main container ---------- */}
      <div className="relative z-10 flex flex-col items-center px-4 py-6 overflow-y-auto min-h-screen">
        {/* Radial ambient glow behind the hero */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #ffd700 0%, #d4a574 40%, transparent 70%)",
          }}
        />

        {/* ========== HERO SECTION ========== */}
        <section className="hero-section relative flex flex-col items-center text-center mb-4 md:mb-6 pt-2 md:pt-4">
          {/* Sparkles around the 25 */}
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle-dot"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                backgroundColor: s.color,
                animationDelay: s.delay,
                animationDuration: s.duration,
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
          ))}

          {/* The big "25" */}
          <div
            className="shimmer-text font-[family-name:var(--font-display)] font-bold leading-none select-none"
            style={{
              fontSize: "clamp(72px, 15vw, 160px)",
              animation:
                "shimmer 4s ease-in-out infinite, gentle-float 6s ease-in-out infinite",
            }}
            aria-hidden="true"
          >
            25
          </div>

          {/* Silver Jubilee */}
          <h1
            className="jubilee-subtitle font-[family-name:var(--font-display)] italic text-[--color-accent-light] tracking-wide"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            Silver Jubilee
          </h1>

          {/* Ornamental divider */}
          <div className="ornament-divider w-48 md:w-64 my-3 md:my-4">
            <span
              className="text-[--color-accent] text-xs"
              style={{ lineHeight: 1 }}
            >
              &#10022;
            </span>
          </div>

          {/* Batch name */}
          <p
            className="jubilee-tagline font-[family-name:var(--font-display)] text-[--color-text-primary] text-lg md:text-2xl tracking-wider font-semibold"
          >
            Fifth Elements &mdash; B Batch 2001
          </p>

          {/* Tagline */}
          <p
            className="mt-2 text-[--color-text-secondary] text-sm md:text-base tracking-widest uppercase"
            style={{
              animation: "fade-in-up 0.8s ease-out 0.5s forwards",
              opacity: 0,
            }}
          >
            25 Years of Friendship
          </p>
        </section>

        {/* ========== REGISTRATION FORM ========== */}
        <section className="w-full max-w-md">
          <div
            className={`jubilee-card bg-[#111118]/80 backdrop-blur-xl border border-[#222230] rounded-2xl p-6 md:p-10 ${
              success ? "success-state" : ""
            }`}
            style={{
              animation: success
                ? "success-pulse 0.45s ease-in-out 2, radial-reveal 0.8s ease-out forwards"
                : undefined,
            }}
          >
            {/* Extra corner decorations (top-right, bottom-left) */}
            <div className="corner-tr" />
            <div className="corner-bl" />

            {/* Card heading */}
            <div className="text-center mb-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-[--color-text-primary] mb-1">
                Welcome Back
              </h2>
              <p className="text-[--color-text-muted] text-sm">
                Enter your details to access the yearbook
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-1.5"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="input-focus-ring w-full rounded-lg bg-[#0a0a10] border border-[#222230] px-4 py-3 text-[--color-text-primary] placeholder:text-[--color-text-muted] text-sm transition-all duration-200"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-1.5"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Your last name"
                  className="input-focus-ring w-full rounded-lg bg-[#0a0a10] border border-[#222230] px-4 py-3 text-[--color-text-primary] placeholder:text-[--color-text-muted] text-sm transition-all duration-200"
                />
              </div>

              {/* Batch PIN */}
              <div>
                <label
                  htmlFor="batchPin"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-1.5"
                >
                  Batch PIN
                </label>
                <input
                  id="batchPin"
                  type="password"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Shared batch PIN"
                  className="input-focus-ring w-full rounded-lg bg-[#0a0a10] border border-[#222230] px-4 py-3 text-[--color-text-primary] placeholder:text-[--color-text-muted] text-sm tracking-widest transition-all duration-200"
                />
              </div>

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2 text-sm rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || success}
                className="btn-yearbook w-full rounded-full bg-[--color-accent] text-[#08080c] font-semibold py-3.5 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="spinner w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Verifying...
                  </>
                ) : success ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Welcome Home!
                  </>
                ) : (
                  "Enter the Yearbook"
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-[--color-text-muted] text-xs mt-6 tracking-wide">
            College of Engineering, Chengannur &middot; 2001 &ndash; 2026
          </p>
        </section>
      </div>
    </>
  );
}
