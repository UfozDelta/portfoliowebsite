import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-16 sm:pt-24">
      <p className="font-pixel text-sm text-muted-foreground">error 404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Nothing at this address.</h1>
      <p className="mt-4 text-muted-foreground">The page moved or never existed.</p>
      <Link
        href="/"
        className="mt-8 inline-block underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Back to projects
      </Link>
    </main>
  );
}
