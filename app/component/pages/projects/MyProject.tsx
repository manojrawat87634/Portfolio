'use client';

import { useState } from 'react';
import ProjectCard from '../../cards/ProjectCard';
import ProjectModal from './ProjectModal';
import { Project, projects } from './projectData';
// adjust to your file paths

export default function MyProject() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A selection of recent web applications and software development projects I&apos;ve built.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col h-full">
              <ProjectCard project={project} />
              
              {/* Case Study Trigger Button */}
              {project.caseStudy && (
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-3 w-full py-2 px-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Inspect Architecture & Case Study
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}