import Hero from "./component/hero/Hero";
import Navbar from "./component/navbar/Navbar";
import Services from "./component/services/Services";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* 1. Navbar stays fixed at the top */}
      <Navbar />

      <main className="mx-auto md:max-w-7xl px-6">
        <Hero />
      </main>
      <main className="mx-auto md:max-w-7xl px-6">
        <Services />
      </main>
      {/* 3. Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}