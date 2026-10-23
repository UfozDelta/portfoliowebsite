import Link from "next/link";
import { isAdmin } from "@/lib/auth";

/** A small floating shortcut to the matching admin form. Only rendered for a signed-in admin. */
export async function EditLink({ href, label = "edit this page" }: { href: string; label?: string }) {
  if (!(await isAdmin())) return null;

  return (
    <Link
      href={href}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 border border-foreground bg-background px-3 py-1.5 font-pixel text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:bg-primary [@media(hover:hover)]:hover:text-primary-foreground"
    >
      {label}
    </Link>
  );
}
