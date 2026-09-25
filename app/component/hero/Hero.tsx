"use client";

import Link from "next/link";
import Image from "next/image";
import TypingEffect from "../typingEffect/TypingEffect";
import SocialLinks from "../socialMedia/SocialMedia";

export default function Hero() {
  return (
    <section className="relative pt-4">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Column: Text & Content */}
        <div className="flex flex-col items-start lg:col-span-7">
          {/* 1. Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>

          {/* 2. Main Headline */}
          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building modern, scalable <br />
            <span className="inline-flex items-center bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              <TypingEffect />
            </span>
          </h1>

          {/* 3. Subtitle / Value Proposition */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Hi, I'm <strong className="font-semibold text-white">Manoj Rawat</strong> — a Full-Stack Developer specializing in robust backend architectures, API integration, payment systems, and scalable full-stack web applications.
          </p>

          {/* 4. Call-To-Action (CTA) Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-200 active:scale-95"
            >
              View My Projects
            </Link>
            <Link
              href="#contact"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10 active:scale-95"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Photo Section */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          {/* Ambient Glow / Background Gradient */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-30 blur-2xl transition duration-1000 group-hover:opacity-100"></div>

          {/* Image Container Card */}
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-full border border-white/10 bg-neutral-900/60 p-2 shadow-2xl backdrop-blur-xl">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile1.jpg"
                alt="Manoj Rawat"
                fill
                priority
                className="rounded-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <SocialLinks />


      {/* 5. Quick Tech Stack Pills */}
      <div className="mt-14 flex w-full flex-col gap-3 border-t border-white/10 pt-8">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Core Technologies
        </span>
        <div className="flex flex-wrap gap-2 font-mono text-xs text-neutral-300">
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Next.js 14+
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Spring Boot(java)
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            SQL & mongodb
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Node.js
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Django(Python)
          </span>
          <span className="rounded-md border border-white/10 bg-neutral-900/80 px-2.5 py-1">
            Devops
          </span>
        </div>
      </div>
    </section>
  );
}