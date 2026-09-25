"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "../NavItem";

export default function LaptopNavbar() {
  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => {
        // High-visibility Call Button designed for instant recognition
        if (item.isCallButton) {
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
            >
              {/* Phone Icon for immediate visual recognition */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 animate-pulse"
              >
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.32.417.976 1.258 1.817.84.84 1.498 1.122 1.818 1.258l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              <span>{item.label}</span>
            </a>
          );
        }

        // External Link (e.g., Resume)
        if (item.isExternal) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/20 active:scale-95"
            >
              {item.label}
            </a>
          );
        }

        // Standard Navigation Links
        return (
          <Link
            key={item.label}
            href={item.href}
            className="text-md text-neutral-400 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}