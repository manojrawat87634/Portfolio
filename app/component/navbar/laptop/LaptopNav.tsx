"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "../NavItem";

export default function LaptopNavbar() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navItems.map((item) => {
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

        return (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}