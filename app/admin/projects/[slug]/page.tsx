import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/auth";
import { getAllProjects } from "@/lib/data";
import { hasDb } from "@/lib/store";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const isNew = slug === "new";
  const project = isNew ? undefined : (await getAllProjects()).find((p) => p.slug === slug);
  if (!isNew && !project) notFound();

  return (
    <>
      <Link
        href="/admin"
        className="font-pixel text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt; back to admin
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">{isNew ? "New project" : project?.title}</h1>
      {!hasDb && (
        <p role="alert" className="mt-6 border border-destructive p-4 text-sm">
          Redis is not connected, so this can&apos;t be saved.
        </p>
      )}
      <ProjectForm project={project} isNew={isNew} />
    </>
  );
}
