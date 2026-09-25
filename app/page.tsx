"use client";

import { useState } from "react";
import Hero from "./component/hero/Hero";
import SelfModal from "./component/modal/SelfModal";
import Navbar from "./component/navbar/Navbar";
import ProjectEnquiryForm from "./component/pages/forms/ProjectEnquiry";
import Services from "./component/services/Services";
import Projects from "./component/pages/projects/Project";

export default function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Pass modal trigger to Navbar (e.g., for a "Contact Us" or "Hire Us" CTA button) */}
      <Navbar  />

      <main className="mx-auto md:max-w-7xl px-6">
        {/* Pass modal trigger to Hero (e.g., for "Get Started" or "Start a Project" button) */}
        <Hero  />
      </main>

      <main className="mx-auto md:max-w-7xl px-6">
        <Services onOpenEnquiry={() => setIsEnquiryOpen(true)}/>
      </main>

      {/* SelfModal controlled by state */}
      <SelfModal
        ModuleCompItem={ProjectEnquiryForm}
        isItemOpen={isEnquiryOpen}
        setIsItemOpen={setIsEnquiryOpen}
        width="max-w-3xl w-full"
      />
  <Projects />
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}