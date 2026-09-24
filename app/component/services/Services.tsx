"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem, servicesData } from "./ServiceItem";

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-black py-24 text-white">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            What I Do
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Services & <span className="text-blue-500">Solutions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
            Specialized in Full Stack Web Development, Backend Systems, CRM Platforms, and Custom Business Portals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service: ServiceItem) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-950/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:bg-neutral-900/90 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div>
                  {/* Icon Box */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 transition-colors group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-400">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Skill Badges / Highlights */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized Systems Experience Highlight Banner */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-neutral-950/90 p-8 backdrop-blur-md sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Proven Project Track Record
              </span>
              <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Looking to build a CRM, Institute Portal, or Business Website?
              </h3>
              <p className="mt-2 text-xs text-neutral-400 sm:text-sm leading-relaxed">
                I have hands-on experience delivering Institute Management Systems, CRMs, Notes Sharing Platforms, Intern Portals, and high-converting Real Estate sites with custom contact pipelines.
              </p>
            </div>
            <Link
              href="/#contact"
              className="whitespace-nowrap rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-95 sm:text-sm"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}