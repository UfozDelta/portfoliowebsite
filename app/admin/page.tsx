import Link from "next/link";
import { deleteProject, logout, moveProject, setVisible } from "@/app/admin/actions";
import { danger, ghost } from "@/components/admin/styles";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { deleteItem, moveItem, setItemVisible } from "@/app/admin/collection-actions";
import { requireAdmin } from "@/lib/auth";
import { collections } from "@/lib/collections";
import { getAllItems, getAllProjects, getSettings } from "@/lib/data";
import { hasDb } from "@/lib/store";

const heading = "mb-3 font-pixel text-sm text-muted-foreground";

export default async function AdminPage() {
  await requireAdmin();
  const [projects, settings, ...lists] = await Promise.all([
    getAllProjects(),
    getSettings(),
    ...collections.map((c) => getAllItems(c.key)),
  ]);

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-pixel text-sm text-muted-foreground">~/admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Edit your site</h1>
        </div>
        <form action={logout}>
          <button type="submit" className={ghost}>
            sign out
          </button>
        </form>
      </div>

      {!hasDb && (
        <p role="alert" className="mt-8 border border-destructive p-4 text-sm">
          Redis is not connected, so changes can&apos;t be saved. The site is showing the built-in content. Connect
          Upstash Redis to this project in Vercel (Storage tab) and redeploy.
        </p>
      )}

      <section className="mt-12" aria-labelledby="projects-h">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="projects-h" className={heading}>
            ~/projects ({projects.length})
          </h2>
          <Link href="/admin/projects/new" className={ghost}>
            new project
          </Link>
        </div>

        <ul className="border-t border-border">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-border py-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className={p.visible ? "font-medium" : "font-medium text-muted-foreground line-through"}>
                  {p.title}
                </span>
                <span className="shrink-0 font-pixel text-xs text-muted-foreground">
                  {p.visible ? "shown" : "hidden"}
                  {p.body ? " / write-up" : ""}
                </span>
              </div>
              {hasDb && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <form action={moveProject.bind(null, p.slug, "up")}>
                    <button type="submit" disabled={i === 0} className={ghost} aria-label={`Move ${p.title} up`}>
                      up
                    </button>
                  </form>
                  <form action={moveProject.bind(null, p.slug, "down")}>
                    <button type="submit" disabled={i === projects.length - 1} className={ghost} aria-label={`Move ${p.title} down`}>
                      down
                    </button>
                  </form>
                  <form action={setVisible.bind(null, p.slug, !p.visible)}>
                    <button type="submit" className={ghost}>
                      {p.visible ? "hide" : "show"}
                    </button>
                  </form>
                  <Link href={`/admin/projects/${p.slug}`} className={ghost}>
                    edit
                  </Link>
                  <details className="[&_summary]:list-none">
                    <summary className={`${ghost} cursor-pointer`}>delete</summary>
                    <form action={deleteProject.bind(null, p.slug)} className="mt-2 flex items-center gap-3 text-sm">
                      <span>Delete {p.title} for good?</span>
                      <button type="submit" className={danger}>
                        yes, delete
                      </button>
                    </form>
                  </details>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {collections.map((def, c) => {
        const items = lists[c];
        const manual = def.sort !== "date";
        return (
          <section key={def.key} className="mt-16" aria-labelledby={`${def.key}-h`}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`${def.key}-h`} className={heading}>
                ~/{def.label} ({items.length})
              </h2>
              <Link href={`/admin/c/${def.key}/new`} className={ghost}>
                new {def.singular}
              </Link>
            </div>
            <ul className="border-t border-border">
              {items.map((item, i) => (
                <li key={item.id} className="border-b border-border py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className={item.visible ? "font-medium" : "font-medium text-muted-foreground line-through"}>
                      {String(item[def.titleField] ?? item.id)}
                    </span>
                    <span className="shrink-0 font-pixel text-xs text-muted-foreground">
                      {def.subtitleField ? String(item[def.subtitleField] ?? "") : ""} {item.visible ? "" : "/ hidden"}
                    </span>
                  </div>
                  {hasDb && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {manual && (
                        <>
                          <form action={moveItem.bind(null, def.key, item.id, "up")}>
                            <button type="submit" disabled={i === 0} className={ghost} aria-label={`Move ${String(item[def.titleField])} up`}>
                              up
                            </button>
                          </form>
                          <form action={moveItem.bind(null, def.key, item.id, "down")}>
                            <button type="submit" disabled={i === items.length - 1} className={ghost} aria-label={`Move ${String(item[def.titleField])} down`}>
                              down
                            </button>
                          </form>
                        </>
                      )}
                      <form action={setItemVisible.bind(null, def.key, item.id, !item.visible)}>
                        <button type="submit" className={ghost}>
                          {item.visible ? "hide" : "show"}
                        </button>
                      </form>
                      <Link href={`/admin/c/${def.key}/${item.id}`} className={ghost}>
                        edit
                      </Link>
                      <details className="[&_summary]:list-none">
                        <summary className={`${ghost} cursor-pointer`}>delete</summary>
                        <form action={deleteItem.bind(null, def.key, item.id)} className="mt-2 flex items-center gap-3 text-sm">
                          <span>Delete this {def.singular} for good?</span>
                          <button type="submit" className={danger}>
                            yes, delete
                          </button>
                        </form>
                      </details>
                    </div>
                  )}
                </li>
              ))}
              {items.length === 0 && <li className="border-b border-border py-3 text-sm text-muted-foreground">Nothing here yet.</li>}
            </ul>
          </section>
        );
      })}

      <section className="mt-16" aria-labelledby="text-h">
        <h2 id="text-h" className={heading}>
          ~/text
        </h2>
        <SettingsForm settings={settings} />
      </section>
    </>
  );
}
