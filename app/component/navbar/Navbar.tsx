"use client";

import Link from "next/link";
import { navItems } from "./NavItem";
 // Adjust path if needed

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <Link 
          href="/" 
          className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Manoj Rawat<span className="text-blue-500">.</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}