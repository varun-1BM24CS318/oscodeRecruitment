/**
 * Projects.jsx
 * Filterable project card grid with category tabs.
 * Cards display tech stack tags and a GitHub link.
 */

import { useState } from "react";
import { projects } from "../data/projects";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Button } from "./ui/neon-button";


const filters = ["All", "Web", "AI", "Tools"];

const categoryColors = {
  Web: { bg: "#4f8ef715", text: "#93c5fd", border: "#4f8ef740" },
  AI: { bg: "#ec489915", text: "#f9a8d4", border: "#ec489940" },
  Tools: { bg: "#10b98115", text: "#6ee7b7", border: "#10b98140" },
  React: { bg: "#06b6d415", text: "#67e8f9", border: "#06b6d440" },
  Python: { bg: "#f59e0b15", text: "#fcd34d", border: "#f59e0b40" },
  TypeScript: { bg: "#7c3aed15", text: "#c4b5fd", border: "#7c3aed40" },
};

const getTechColor = (tech) =>
  categoryColors[tech] || { bg: "#ffffff10", text: "#94a3b8", border: "#ffffff20" };

/**
 * Single project card
 */
const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-card project-card fade-up ${isVisible ? "fade-up--visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      {/* Header */}
      <div className="project-card__header">
        <div className="project-card__icon">{["🌐", "🤖", "🛠️", "📄", "📊", "📈"][index % 6]}</div>
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          <span className="project-card__stars">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {project.stars}
          </span>
        </div>
      </div>

      {/* Name & description */}
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__desc">{project.description}</p>

      {/* Tech stack */}
      <div className="project-card__tech">
        {project.tech.map((t) => {
          const col = getTechColor(t);
          return (
            <span
              key={t}
              className="project-card__tech-tag"
              style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
            >
              {t}
            </span>
          );
        })}
      </div>

      {/* GitHub link */}
      <Button
        variant="ghost"
        className="project-card__github-btn w-full mt-2 flex items-center justify-center gap-2"
        onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
        id={`project-github-${project.id}`}
        aria-label={`View ${project.name} on GitHub`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        View on GitHub
      </Button>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [headerRef, headerVisible] = useScrollAnimation();

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="projects section" aria-label="Projects section">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`section__header fade-up ${headerVisible ? "fade-up--visible" : ""}`}>
          <span className="section__tag">Open Source</span>
          <h2 className="section__title">Our Projects</h2>
          <p className="section__subtitle">
            Real products, real impact — built by OSCode members and open to the world.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="projects__filters" role="tablist" aria-label="Project category filters">
          {filters.map((filter) => (
            <Button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              variant={activeFilter === filter ? "solid" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              id={`filter-${filter.toLowerCase()}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Project grid */}
        <div className="projects__grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
