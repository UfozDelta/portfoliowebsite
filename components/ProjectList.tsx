import Link from 'next/link'
import type { Project } from '@/lib/projects'

export const ProjectList = ({ projects }: { projects: Project[] }) => (
  <ul className="border-t border-border">
    {projects.map((p) => (
      <li key={p.slug} className="border-b border-border">
        <Link
          href={`/work/${p.slug}`}
          className="group -mx-3 block px-3 py-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:bg-secondary"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-medium group-hover:text-primary">{p.title}</span>
            {p.year && (
              <span className="shrink-0 font-pixel text-xs text-muted-foreground">{p.year}</span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
        </Link>
      </li>
    ))}
  </ul>
)
