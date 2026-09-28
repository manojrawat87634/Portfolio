'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';import { Project } from '../pages/projects/Project';


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <article className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:border-slate-500 flex flex-col h-full">
      {/* Image Carousel */}
      <div className="relative h-48 w-full overflow-hidden group">
        <Image
          src={project.images[currentImageIndex] || '/projects/placeholder.png'}
          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-500"
        />

        {/* Carousel Arrow Controls (Shows if more than 1 image) */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? 'bg-indigo-400 w-4'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                Source Code
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 cursor-not-allowed">
                <Lock className="w-3.5 h-3.5" />
                Private Repo
              </span>
            )}

            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </Link>
            ) : (
              <span className="text-xs text-slate-500 italic">
                Internal / Offline
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}