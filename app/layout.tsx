import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { CommandPalette } from "@/components/CommandPalette";
import { SiteHeader } from "@/components/SiteHeader";
import { getItems, getProjects } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { links } from "@/lib/projects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maksym Syagrovskyy - Math, Stats & CS Student",
    template: "%s - Maksym Syagrovskyy",
  },
  description: "Mathematics, Statistics & Computer Science student at University of Toronto building data-driven systems and ML applications. Portfolio showcasing projects in machine learning, backend development, and quantitative finance.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Student",
  alumniOf: "University of Toronto",
  sameAs: links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [projects, experience, nonprofit, publications, posts] = await Promise.all([
    getProjects(),
    getItems("experience"),
    getItems("nonprofit"),
    getItems("publications"),
    getItems("posts"),
  ]);
  const sections = [
    experience.length > 0 && { label: "Experience", hash: "experience" },
    nonprofit.length > 0 && { label: "Non-profit work", hash: "nonprofit" },
    publications.length > 0 && { label: "Publications", hash: "publications" },
    posts.length > 0 && { label: "Blog", hash: "blog" },
  ].filter((s): s is { label: string; hash: string } => Boolean(s));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      >
        <div className="dot-grid" aria-hidden="true" />
        <SiteHeader />
        <CommandPalette
          projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
          posts={posts.map((p) => ({ id: p.id, title: String(p.title) }))}
          sections={sections}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
