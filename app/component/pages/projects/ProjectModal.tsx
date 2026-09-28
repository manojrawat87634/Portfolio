'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Code,
  Cpu,
  Database,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Laptop,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Project } from './projectData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges'>('overview');

  // Lightbox & Viewer States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [deviceView, setDeviceView] = useState<'laptop' | 'phone'>('laptop');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Prevent background scrolling when modal or preview is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard Navigation Listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null || !project) return;

      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < project.images.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.images.length - 1));
        setZoomLevel(1);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
        setZoomLevel(1);
      }
    },
    [lightboxIndex, project]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project || !project.caseStudy) return null;

  const { caseStudy } = project;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < project.images.length - 1 ? prev! + 1 : 0));
      setZoomLevel(1);
    }
  };

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : project.images.length - 1));
      setZoomLevel(1);
    }
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const resetZoom = () => setZoomLevel(1);

  return (
    <>
      {/* =========================================================================
          PRIMARY CASE STUDY MODAL
         ========================================================================= */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/95 border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 ring-1 ring-white/10">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {caseStudy.role}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified System Architecture
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{project.title}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-xl transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/40 px-6 gap-8 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Overview & Stack
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-4 h-4" />
              Architecture & DB
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'challenges'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              Engineering Challenges
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Executive Summary
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{caseStudy.overview}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Technologies & Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/80 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screenshots Gallery Grid */}
                {project.images.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Production Screenshots ({project.images.length})
                      </h3>
                      <span className="text-[11px] text-indigo-400 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3" /> Click image to expand interactive viewport
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleOpenLightbox(idx)}
                          className="group relative h-32 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer transition-all duration-300 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} preview ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-medium backdrop-blur-[2px]">
                            <Maximize2 className="w-4 h-4 text-indigo-400" />
                            <span>Preview</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Core Architectural Highlights
                  </h3>
                  <ul className="space-y-3">
                    {caseStudy.architectureHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {caseStudy.databaseSchemaHighlights && (
                  <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <h3 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Key Database Schemas & Entities
                    </h3>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1.5">
                      {caseStudy.databaseSchemaHighlights.map((schema, idx) => (
                        <li key={idx}>{schema}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CHALLENGES TAB */}
            {activeTab === 'challenges' && (
              <div className="space-y-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Technical Obstacles & Solutions
                </h3>
                <div className="space-y-4">
                  {caseStudy.keyChallenges.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-2"
                    >
                      <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                        Challenge #{idx + 1}
                      </p>
                      <p className="text-sm font-semibold text-white">{item.challenge}</p>
                      <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider pt-2">
                        Engineering Solution
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">
              {project.githubUrl ? 'Open Source Project' : 'Private Enterprise Solution'}
            </span>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
              >
                Launch Live App
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE DEVICE LIGHTBOX & SLIDER
         ========================================================================= */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200 p-2 sm:p-6">
          
          {/* Header Toolbar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white bg-slate-900/90 border border-slate-800 p-3 rounded-2xl backdrop-blur-md shadow-2xl">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                {project.title} &bull; Image {lightboxIndex + 1} of {project.images.length}
              </span>

              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
                <button
                  onClick={() => {
                    setDeviceView('laptop');
                    setZoomLevel(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    deviceView === 'laptop'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop Frame</span>
                </button>
                <button
                  onClick={() => {
                    setDeviceView('phone');
                    setZoomLevel(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    deviceView === 'phone'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile Frame</span>
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800/80 rounded-xl border border-slate-700/80 p-1">
                <button
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs px-2 font-mono text-slate-300">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={zoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomLevel > 1 && (
                  <button
                    onClick={resetZoom}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors border-l border-slate-700/80 ml-1 pl-2"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setLightboxIndex(null);
                  setZoomLevel(1);
                }}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Prev/Next Navigation Controls */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 z-20 p-3 text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-all hover:scale-105 shadow-2xl backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 z-20 p-3 text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-all hover:scale-105 shadow-2xl backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Central Mockup Viewport */}
          <div className="w-full h-full flex items-center justify-center p-4 pt-24 pb-16 overflow-hidden">
            {deviceView === 'laptop' ? (
              /* LAPTOP MOCKUP FRAME */
              <div className="relative w-full max-w-5xl flex flex-col items-center">
                {/* Display Body */}
                <div className="relative w-full aspect-[16/10] max-h-[70vh] bg-slate-900 border-[10px] border-slate-800 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-700/80">
                  {/* Camera Bar */}
                  <div className="h-5 bg-slate-950 flex items-center justify-center border-b border-slate-800/80 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                  </div>

                  {/* Screen Canvas */}
                  <div className="relative flex-1 bg-slate-950 overflow-auto flex items-center justify-center">
                    <div
                      className="relative w-full h-full min-h-[450px] transition-transform duration-200 origin-center flex items-center justify-center p-2"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      <Image
                        src={project.images[lightboxIndex]}
                        alt="Desktop view screenshot"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Laptop Base Stand */}
                <div className="w-[106%] h-3.5 bg-slate-700/90 rounded-b-xl shadow-2xl relative flex items-center justify-center border-t border-slate-600/80">
                  <div className="w-16 h-1 bg-slate-500/60 rounded-full" />
                </div>
              </div>
            ) : (
              /* PHONE MOCKUP FRAME */
              <div className="relative h-[75vh] aspect-[9/19.5] bg-slate-900 border-[10px] border-slate-800 rounded-[38px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-700/80">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-10 flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>

                {/* Mobile Screen Canvas */}
                <div className="relative flex-1 bg-slate-950 overflow-auto pt-6 flex items-center justify-center">
                  <div
                    className="relative w-full h-full min-h-[550px] transition-transform duration-200 origin-center flex items-center justify-center p-2"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <Image
                      src={project.images[lightboxIndex]}
                      alt="Mobile view screenshot"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-md shadow-2xl">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setLightboxIndex(idx);
                  setZoomLevel(1);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === lightboxIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}