import React from 'react'
import { ProjectItem } from './ProjectItem'

/**
 * Project data with tech stack and size variants
 * Size determines grid placement in bento layout
 */
const projects = [
  {
    title: "FundingFlow",
    description: "ML-powered cross-exchange funding rate arbitrage system with delta-neutral portfolios",
    link: "https://github.com/UfozDelta/fundingflow",
    tech: ["Python", "scikit-learn", "XGBoost", "PostgreSQL", "asyncio", "WebSockets"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "EdiGen",
    description: 'Program that creates short-form content from long-form videos using machine learning',
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["Python", "TensorFlow", "FFmpeg", "OpenAI"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "ArbRight",
    description: "A Python tool used to find real-time arbitrage opportunities between different sports books",
    link: "https://github.com/UfozDelta/ArbRight",
    tech: ["Python", "Websockets", "APIs", "Supabase"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "UofT Credit Explorer",
    description: "A tool that visualizes UofT course prerequisites as an interactive dependency graph",
    link: "https://github.com/UfozDelta/uoft-explore",
    tech: ["Next.js", "D3.js", "Python", "Web Scraping", "ChromaDB"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "Moventra",
    description: "Habit tracking app with streak tracking, calendar visualization, and routine management",
    link: "https://github.com/UfozDelta/Moventra",
    tech: ["React Native", "Next.js", "Supabase", "Prisma", "TypeScript"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "RBC Credit Statement Reader",
    description: "Tool for analyzing RBC credit card statements and visualize them in an informative way",
    link: "https://github.com/UfozDelta/rbc-pdf-reader",
    tech: ["Next.js", "GraphQL", "Python", "OCR"],
    size: "medium" as const  // 3 cols, 2 rows
  },
  {
    title: "SwiftrTTC",
    description: "Real-time TTC bus tracking and transit news",
    link: "https://github.com/UfozDelta/SwiftrTTC",
    tech: ["React Native", "Nextjs", "Python"],
    size: "medium" as const  // 3 cols, 1 row
  },
  {
    title: "Trading Dashboard",
    description: "Dashboard for view of market",
    link: "https://github.com/UfozDelta/WindowsTalk",
    tech: ["Express.js", "Redis", "Nextjs", "Node"],
    size: "small" as const  // 3 cols, 1 row
  },
  {
    title: "Velox",
    description: "Streamlined trade execution CLI for efficient market operations",
    link: "https://github.com/UfozDelta/Velox",
    tech: ["Python", "WebSocket", "APIs"],
    size: "small" as const  // 3 cols, 2 rows
  },
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
          gap-3
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