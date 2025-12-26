import React from 'react'
import { ExternalLink } from 'lucide-react'

interface ProjectItemProps {
  title: string
  description: string
  link: string
  tech: string[]  // Technology stack tags
  size?: "large" | "medium" | "small"  // For bento grid sizing
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  link,
  tech,
  size = "medium"
}) => {
  /**
   * Grid span classes based on size variant
   * Large: 6 cols x 2 rows (featured)
   * Medium: 4 cols x 2 rows (standard)
   * Small: 3 cols x 1 row (compact)
   */
  const sizeClasses = {
    large: "col-span-12 md:col-span-6 row-span-2",
    medium: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    small: "col-span-12 md:col-span-6 lg:col-span-3 row-span-1"
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${sizeClasses[size]}
        group
        relative
        border-2 border-foreground
        bg-background
        p-6
        transition-colors duration-150
        hover:bg-primary hover:text-primary-foreground
        hover:border-primary
        flex flex-col justify-between
        cursor-pointer
      `}
    >
      {/* Header: Title + External Link Icon */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h3>
        <ExternalLink
          className="
            w-5 h-5 flex-shrink-0
            text-muted-foreground
            group-hover:text-primary-foreground
            transition-colors
          "
        />
      </div>

      {/* Description */}
      <p className="
        text-base text-muted-foreground
        group-hover:text-primary-foreground
        mb-6
        leading-relaxed
      ">
        {description}
      </p>

      {/* Tech Stack - Monospace Font */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((item, index) => (
          <span
            key={index}
            className="
              font-mono text-sm
              text-foreground
              group-hover:text-primary-foreground
              transition-colors
            "
          >
            {item}
            {/* Add separator between tags (but not after last one) */}
            {index < tech.length - 1 && " · "}
          </span>
        ))}
      </div>
    </a>
  )
}

