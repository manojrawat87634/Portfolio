"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { navItems } from "../NavItem";

export default function PhoneNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeDrawer = () => setIsMenuOpen(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="md:hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-neutral-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
        aria-label="Open Navigation Menu"
      >
        <FaBars size={18} />
      </button>

      {/* Dark Overlay / Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-sm flex-col bg-neutral-950/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out border-l border-white/10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" onClick={closeDrawer} className="text-lg font-bold text-white">
            Manoj Rawat<span className="text-blue-500">.</span>
          </Link>
          <button
            onClick={closeDrawer}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close Navigation Menu"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Links Navigation Container */}
        <div className="mt-8 flex flex-col gap-3 overflow-y-auto">
          {navItems.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDrawer}
                  className="mt-2 flex w-full items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-400 shadow-lg shadow-blue-500/5 transition-all hover:bg-blue-500/20 active:scale-95"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeDrawer}
                className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 text-sm font-medium text-neutral-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.99]"
              >
                <span>{item.label}</span>
                <span className="text-neutral-600">→</span>
              </Link>
            );
          })}
        </div>

        {/* Drawer Bottom CTA */}
        <div className="mt-auto border-t border-white/10 pt-5">
          <Link
            href="/#contact"
            onClick={closeDrawer}
            className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-200 active:scale-95"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}