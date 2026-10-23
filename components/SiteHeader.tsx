import Link from "next/link";
import { PaletteButton } from "@/components/PaletteButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RESUME_URL } from "@/lib/projects";

const nav = [
  { href: "/whoami", label: "whoami" },
  { href: "/#projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/#contact", label: "contact" },
];

const navLink =
  "font-pixel text-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:text-foreground";

export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between gap-4 px-5">
      <Link
        href="/"
        aria-label="Home"
        className="font-pixel text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        maksym<span className="text-primary">.</span>
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-5 sm:flex">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className={navLink}>
            {n.label}
          </Link>
        ))}
        {RESUME_URL && (
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={navLink}>
            resume
          </a>
        )}
      </nav>

      <div className="flex gap-2">
        <ThemeToggle />
        <PaletteButton />
      </div>
    </div>
  </header>
);
