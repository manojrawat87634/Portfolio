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
} from 'lucide-react';
import { Project } from './projectData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges'>('overview');

  // Lightbox & Slider States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [deviceView, setDeviceView] = useState<'laptop' | 'phone'>('laptop');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Lock background scroll when modal or lightbox is open
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

  // Handle keyboard navigation for Lightbox (Left/Right arrows & Escape key)
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

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const resetZoom = () => setZoomLevel(1);

  return (
    <>
      {/* ---------------- MAIN CASE STUDY MODAL ---------------- */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {caseStudy.role}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified System Case Study
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/30 px-6 gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
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
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
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
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'challenges'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              Engineering Challenges
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    System Overview
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{caseStudy.overview}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Technologies Applied
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screenshots Grid with Zoom Trigger */}
                {project.images.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Screenshots ({project.images.length})
                      </h3>
                      <span className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
                        <Maximize2 className="w-3 h-3" /> Click any image to open Device Zoom View
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleOpenLightbox(idx)}
                          className="group relative h-32 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer transition-all duration-300 hover:border-indigo-500/80 hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                            <Maximize2 className="w-4 h-4 text-indigo-400" />
                            <span>Expand</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Core Architectural Decisions
                  </h3>
                  <ul className="space-y-2.5">
                    {caseStudy.architectureHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {caseStudy.databaseSchemaHighlights && (
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h3 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Key Database Entities & Schemas
                    </h3>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                      {caseStudy.databaseSchemaHighlights.map((schema, idx) => (
                        <li key={idx}>{schema}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Engineering Depth & Solutions
                </h3>
                <div className="space-y-4">
                  {caseStudy.keyChallenges.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-2"
                    >
                      <p className="text-xs font-semibold text-amber-400 uppercase">
                        Challenge #{idx + 1}
                      </p>
                      <p className="text-sm font-medium text-white">{item.challenge}</p>
                      <p className="text-xs font-semibold text-emerald-400 uppercase pt-2">
                        Solution
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-xs">
            <span className="text-slate-500">
              {project.githubUrl ? 'Open Source Project' : 'Private Enterprise Project'}
            </span>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1.5"
              >
                Visit Production Link
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- DEVICE LIGHTBOX MODAL WITH SLIDER & ZOOM ---------------- */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-lg animate-in fade-in duration-200 p-2 sm:p-6">
          {/* Top Control Toolbar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
            {/* Left: Device Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline mr-2">
                {project.title} ({lightboxIndex + 1}/{project.images.length})
              </span>

              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setDeviceView('laptop')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    deviceView === 'laptop'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Laptop Frame</span>
                </button>
                <button
                  onClick={() => setDeviceView('phone')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    deviceView === 'phone'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Phone Frame</span>
                </button>
              </div>
            </div>

            {/* Right: Zoom & Close Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 p-1">
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
                  disabled={zoomLevel >= 3}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomLevel > 1 && (
                  <button
                    onClick={resetZoom}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors border-l border-slate-700 ml-1 pl-2"
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
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 z-20 p-3 text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-full transition-all hover:scale-110 shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 z-20 p-3 text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-full transition-all hover:scale-110 shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Central Mockup Viewport */}
          <div className="w-full h-full flex items-center justify-center p-4 pt-20 pb-16 overflow-auto">
            {deviceView === 'laptop' ? (
              /* -------- LAPTOP FRAME MOCKUP -------- */
              <div className="relative w-full max-w-5xl flex flex-col items-center">
                {/* Laptop Display Outer Body */}
                <div className="relative w-full aspect-[16/10] max-h-[75vh] bg-slate-900 border-[10px] border-slate-800 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col">
                  {/* Laptop Camera Notch / Bar */}
                  <div className="h-5 bg-slate-950 flex items-center justify-center px-4 border-b border-slate-800 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                  </div>

                  {/* Screen Content Box */}
                  <div className="relative flex-1 bg-black overflow-auto">
                    <div
                      className="relative w-full h-full min-h-[500px] transition-transform duration-200 origin-center"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      <Image
                        src={project.images[lightboxIndex]}
                        alt="Zoomed laptop screenshot"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Laptop Base Stand */}
                <div className="w-[108%] h-4 bg-slate-700 rounded-b-xl shadow-2xl relative flex items-center justify-center border-t border-slate-600">
                  <div className="w-16 h-1.5 bg-slate-500/60 rounded-full" />
                </div>
              </div>
            ) : (
              /* -------- PHONE FRAME MOCKUP -------- */
              <div className="relative h-[78vh] aspect-[9/19.5] bg-slate-900 border-[12px] border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-700">
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-10 flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Phone Screen Box */}
                <div className="relative flex-1 bg-black overflow-auto pt-6">
                  <div
                    className="relative w-full h-full min-h-[600px] transition-transform duration-200 origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <Image
                      src={project.images[lightboxIndex]}
                      alt="Zoomed mobile screenshot"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-md">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setLightboxIndex(idx);
                  setZoomLevel(1);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === lightboxIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}