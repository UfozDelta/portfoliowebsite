import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { ExperienceList, NonprofitList, PostList, PublicationList } from "@/components/Entries";
import { LocalTime } from "@/components/LocalTime";
import { ProjectList } from "@/components/ProjectList";
import { getItems, getProjects, getSettings } from "@/lib/data";
import { EMAIL, links, RESUME_URL } from "@/lib/projects";

const heading = "mb-3 font-pixel text-sm text-muted-foreground";
const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const LATEST_POSTS = 3;

export default async function Home() {
  const [projects, settings, facts, experience, nonprofit, publications, posts] = await Promise.all([
    getProjects(),
    getSettings(),
    getItems("facts"),
    getItems("experience"),
    getItems("nonprofit"),
    getItems("publications"),
    getItems("posts"),
  ]);
  const paragraphs = settings.bio.split(/\n{2,}/).filter(Boolean);
  // One line of the first three whoami facts, so the key details show without a click.
  const summary = facts.slice(0, 3).map((f) => String(f.value).toLowerCase());

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
      <section aria-labelledby="top">
        <h1 id="top" className="scroll-mt-20 text-3xl font-semibold tracking-tight sm:text-4xl">
          Maksym Syagrovskyy<span className="cursor" aria-hidden="true" />
        </h1>
        <p className="mt-2 font-pixel text-sm text-muted-foreground">
          {settings.tagline.toLowerCase()} <LocalTime />
        </p>
        {summary.length > 0 && (
          <p className="mt-1 font-pixel text-xs leading-relaxed text-muted-foreground">
            {summary.join(" / ")}
          </p>
        )}

        <div className="mt-8 max-w-prose space-y-4 text-lg leading-relaxed">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <p className="mt-4">
          <Link href="/whoami" className={linkClass}>
            More about me
          </Link>
        </p>

        {settings.now && (
          <p className="mt-6 max-w-prose text-sm text-muted-foreground">
            <span className="font-pixel text-foreground">now</span>
            &nbsp; {settings.now}
          </p>
        )}
      </section>

      <section id="projects" className="mt-20 scroll-mt-20" aria-labelledby="work">
        <h2 id="work" className={heading}>
          ~/projects ({projects.length})
        </h2>
        <ProjectList projects={projects} />
      </section>

      {experience.length > 0 && (
        <section id="experience" className="mt-20 scroll-mt-20" aria-labelledby="exp-h">
          <h2 id="exp-h" className={heading}>
            ~/experience
          </h2>
          <ExperienceList items={experience} />
        </section>
      )}

      {nonprofit.length > 0 && (
        <section id="nonprofit" className="mt-20 scroll-mt-20" aria-labelledby="np-h">
          <h2 id="np-h" className={heading}>
            ~/non-profit
          </h2>
          <NonprofitList items={nonprofit} />
        </section>
      )}

      {publications.length > 0 && (
        <section id="publications" className="mt-20 scroll-mt-20" aria-labelledby="pub-h">
          <h2 id="pub-h" className={heading}>
            ~/publications
          </h2>
          <PublicationList items={publications} />
        </section>
      )}

      {posts.length > 0 && (
        <section id="blog" className="mt-20 scroll-mt-20" aria-labelledby="blog-h">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="blog-h" className={heading}>
              ~/blog
            </h2>
            {posts.length > LATEST_POSTS && (
              <Link href="/blog" className={`${linkClass} font-pixel text-xs`}>
                all {posts.length} posts
              </Link>
            )}
          </div>
          <PostList items={posts.slice(0, LATEST_POSTS)} />
        </section>
      )}

      <section id="contact" className="mt-20 scroll-mt-20" aria-labelledby="contact-h">
        <h2 id="contact-h" className={heading}>
          ~/contact
        </h2>
        <p className="max-w-prose text-lg leading-relaxed">{settings.availability}</p>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <a href={`mailto:${EMAIL}`} className={linkClass}>
            {EMAIL}
          </a>
          <CopyEmail email={EMAIL} />
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {RESUME_URL && (
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume
              </a>
            </li>
          )}
          {links
            .filter((l) => l.label !== "Email")
            .map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
        </ul>
      </section>

      <footer className="mt-24 flex items-baseline justify-between gap-4 border-t border-border pt-6 font-pixel text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} maksym syagrovskyy. have a nice day.</span>
        <a href="#top" className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          back to top
        </a>
      </footer>
    </main>
  );
}
