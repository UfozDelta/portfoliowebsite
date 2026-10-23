import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/data";

type Params = Promise<{ slug: string }>;

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const paragraphs = project.body.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
      <Link
        href="/#projects"
        className="font-pixel text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt; back to projects
      </Link>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
      {(project.year || project.status) && (
        <p className="mt-2 font-pixel text-xs text-muted-foreground">
          {[project.year, project.status].filter(Boolean).join(" / ")}
        </p>
      )}
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t} className="border border-border px-2 py-0.5 font-pixel text-xs">
            {t.toLowerCase()}
          </li>
        ))}
      </ul>

      {(project.github || project.demo) && (
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              View source on GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Open the live demo
            </a>
          )}
        </p>
      )}

      <section className="mt-16 border-t border-border pt-6">
        <h2 className="font-pixel text-sm text-muted-foreground">write-up</h2>
        {paragraphs.length > 0 ? (
          <div className="mt-4 max-w-prose space-y-4 leading-relaxed">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-muted-foreground">
            The write-up for {project.title} isn&apos;t published yet.
          </p>
        )}
      </section>

      <nav aria-label="More projects" className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="block font-pixel text-xs text-muted-foreground">previous</span>
            <span className="block truncate group-hover:text-primary">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className="group min-w-0 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="block font-pixel text-xs text-muted-foreground">next</span>
            <span className="block truncate group-hover:text-primary">{next.title}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
