import type { Metadata } from "next";
import Link from "next/link";
import { EditLink } from "@/components/EditLink";
import { LocalTime } from "@/components/LocalTime";
import { getItems, getSettings } from "@/lib/data";
import { EMAIL, links } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Who am I",
  description: "Who Maksym Syagrovskyy is, what he studies, and what he builds.",
  alternates: { canonical: "/whoami" },
};

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function WhoAmI() {
  const [settings, facts] = await Promise.all([getSettings(), getItems("facts")]);
  const paragraphs = settings.story.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
      <p className="font-pixel text-sm text-muted-foreground">
        <span className="text-primary" aria-hidden="true">$ </span>whoami
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Maksym Syagrovskyy<span className="cursor" aria-hidden="true" />
      </h1>
      <p className="mt-2 font-pixel text-sm text-muted-foreground">
        {settings.tagline.toLowerCase()} <LocalTime />
      </p>

      {facts.length > 0 && (
        <dl className="mt-10 border-t border-border text-sm">
          {facts.map((f) => (
            <div key={f.id} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="font-pixel text-xs text-muted-foreground">{String(f.label)}</dt>
              <dd>{String(f.value)}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 max-w-prose space-y-4 text-lg leading-relaxed">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      {settings.now && (
        <p className="mt-8 max-w-prose text-sm text-muted-foreground">
          <span className="font-pixel text-foreground">now</span>
          &nbsp; {settings.now}
        </p>
      )}

      <section className="mt-16 border-t border-border pt-6" aria-labelledby="next-h">
        <h2 id="next-h" className="mb-3 font-pixel text-sm text-muted-foreground">
          next
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/#projects" className={linkClass}>
              See the projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className={linkClass}>
              Read the blog
            </Link>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              Email me
            </a>
          </li>
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
      <EditLink href="/admin" label="edit whoami" />
    </main>
  );
}
