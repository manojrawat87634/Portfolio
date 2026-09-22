"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-start justify-center pt-24 pb-20 md:pt-36 md:pb-32">
      {/* 1. Status Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        Available for new opportunities
      </div>

      {/* 2. Main Headline */}
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
        Building modern, scalable <br />
        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
          web experiences.
        </span>
      </h1>

      {/* 3. Subtitle / Value Proposition */}
      <p className="mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl leading-relaxed">
        Hi, I'm <strong className="text-white font-semibold">Manoj Rawat</strong> — a Full-Stack Developer specializing in high-performance web applications using Next.js, TypeScript, and modern UI engineering.
      </p>

      {/* 4. Call-To-Action (CTA) Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="#projects"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
        >
          View My Projects
        </Link>
        <Link
          href="#contact"
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25 active:scale-95"
        >
          Get in Touch
        </Link>
      </div>

      {/* 5. Quick Tech Stack Pills */}
      <div className="mt-14 pt-8 border-t border-white/10 w-full flex flex-col gap-3">
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
          Core Technologies
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Next.js 14+
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            TypeScript
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Tailwind CSS
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Node.js
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            PostgreSQL
          </span>
        </div>
      </div>
    </section>
  );
}