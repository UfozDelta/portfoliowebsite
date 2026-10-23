import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemForm } from "@/components/admin/ItemForm";
import { requireAdmin } from "@/lib/auth";
import { getDef } from "@/lib/collections";
import { getAllItems } from "@/lib/data";
import { hasDb } from "@/lib/store";

export default async function EditItemPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  await requireAdmin();
  const { collection, id } = await params;
  const def = getDef(collection);
  if (!def) notFound();

  const isNew = id === "new";
  const item = isNew ? undefined : (await getAllItems(def.key)).find((i) => i.id === id);
  if (!isNew && !item) notFound();

  return (
    <>
      <Link
        href="/admin"
        className="font-pixel text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt; back to admin
      </Link>
      <p className="mt-8 font-pixel text-sm text-muted-foreground">~/{def.label}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {isNew ? `New ${def.singular}` : String(item?.[def.titleField] ?? def.singular)}
      </h1>
      {!hasDb && (
        <p role="alert" className="mt-6 border border-destructive p-4 text-sm">
          Redis is not connected, so this can&apos;t be saved.
        </p>
      )}
      <ItemForm def={def} item={item} isNew={isNew} />
    </>
  );
}
