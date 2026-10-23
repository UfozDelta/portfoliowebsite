import type { Metadata } from "next";
import Link from "next/link";
import { PostList } from "@/components/Entries";
import { getItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on the systems I build: how they work, what broke, and what the numbers said.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getItems("posts");

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
      <Link
        href="/"
        className="font-pixel text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt; home
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
      <div className="mt-8">
        {posts.length > 0 ? (
          <PostList items={posts} />
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </main>
  );
}
