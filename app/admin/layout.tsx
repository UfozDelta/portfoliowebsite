import type { Metadata } from "next";

/** Admin pages depend on the login cookie, so they are never prerendered. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:pt-20">{children}</main>;
}
