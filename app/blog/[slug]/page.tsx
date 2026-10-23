import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditLink } from "@/components/EditLink";
import { formatDate } from "@/lib/collections";
import { getItems } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getItems("posts")).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getItems("posts")).find((p) => p.id === slug);
  if (!post) return {};
  return {
    title: String(post.title),
    description: post.summary ? String(post.summary) : undefined,
    alternates: { canonical: `/blog/${post.id}` },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const posts = await getItems("posts");
  const index = posts.findIndex((p) => p.id === slug);
  if (index < 0) notFound();

  const post = posts[index];
  // Posts are newest first, so the next index is the older post.
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const paragraphs = String(post.body ?? "").split(/\n{2,}/).filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
      <Link
        href="/blog"
        className="font-pixel text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt; all posts
      </Link>

      <article>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">{String(post.title)}</h1>
        <p className="mt-2 font-pixel text-xs text-muted-foreground">
          <time dateTime={String(post.date)}>{formatDate(String(post.date))}</time>
        </p>
        <div className="mt-8 max-w-prose space-y-4 text-lg leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="whitespace-pre-line">
                {p}
              </p>
            ))
          ) : (
            <p className="text-muted-foreground">This post has no text yet.</p>
          )}
        </div>
      </article>

      <nav aria-label="More posts" className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
        {newer ? (
          <Link href={`/blog/${newer.id}`} className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="block font-pixel text-xs text-muted-foreground">newer</span>
            <span className="block truncate group-hover:text-primary">{String(newer.title)}</span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link href={`/blog/${older.id}`} className="group min-w-0 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="block font-pixel text-xs text-muted-foreground">older</span>
            <span className="block truncate group-hover:text-primary">{String(older.title)}</span>
          </Link>
        )}
      </nav>
      <EditLink href={`/admin/c/posts/${post.id}`} label="edit post" />
    </main>
  );
}
