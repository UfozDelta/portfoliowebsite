import React from 'react'
import { ProjectItem } from './ProjectItem'

/**
 * Project data with tech stack and size variants
 * Size determines grid placement in bento layout
 */
const projects = [
  {
    title: "EdiGen",
    description: 'Program that creates short-form content from long-form videos using machine learning',
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["Python", "TensorFlow", "FFmpeg", "OpenAI"],
    size: "large" as const  // Featured project
  },
  {
    title: "Trading Terminal",
    description: "Streamlined trade execution platform for efficient market operations",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["React", "WebSocket", "Node.js", "PostgreSQL"],
    size: "medium" as const
  },
  {
    title: "Expense Tracker",
    description: "A comprehensive tool for managing personal and business expenses",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["TypeScript", "React", "Firebase"],
    size: "small" as const
  },
  {
    title: "Trading Dashboard",
    description: "Comprehensive data aggregation tool for optimal decision-making in dynamic markets",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["D3.js", "Python", "REST API", "Redis"],
    size: "medium" as const
  },
  {
    title: "UofT Credit Explorer",
    description: "Tool for optimizing course selection based on interests and graduation timeline",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["Next.js", "GraphQL", "Vercel"],
    size: "small" as const
  },
  {
    title: "TTC Bus Tracker",
    description: "Real-time TTC bus tracking and transit news for efficient commuting",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["React Native", "API", "Maps"],
    size: "small" as const
  }
]

export const Projects = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      {/* Container with max-width for content */}
      <div className="container mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          {/* Section number */}
          <p className="font-mono text-sm md:text-base mb-4">
            <span className="text-dashed-box">02 / PORTFOLIO</span>
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            SELECTED WORK
          </h2>
          {/* Blue accent line */}
          <div className="w-16 border-t-4 border-primary" />
        </div>

        {/* Bento Box Grid Layout */}
        <div className="
          grid
          grid-cols-12
          gap-4
          auto-rows-[200px]
        ">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              tech={project.tech}
              size={project.size}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

