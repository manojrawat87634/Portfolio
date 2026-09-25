"use client";

import Link from "next/link";
import LaptopNavbar from "./laptop/LaptopNav";
import PhoneNav from "./phone/PhoneNav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Portfolio Owner Name */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          Manoj Rawat<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <LaptopNavbar />
      </div>
    </header>
  );
}