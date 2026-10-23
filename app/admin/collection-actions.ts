"use server"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { FormState } from "@/app/admin/actions"
import { requireAdmin } from "@/lib/auth"
import { getDef, type CollectionKey, type Item } from "@/lib/collections"
import { getAllItems, loadDoc } from "@/lib/data"
import { hasDb, writeDoc } from "@/lib/store"
import { isHttpUrl, isSlug } from "@/lib/validate"

const NO_STORE = "Redis is not connected, so nothing can be saved."

/** Everything public reads from the store, so refresh all of it after a write. */
const refresh = () => revalidatePath("/", "layout")

async function save(key: CollectionKey, items: Item[]) {
  const doc = await loadDoc()
  doc.collections = { ...doc.collections, [key]: items }
  await writeDoc(doc)
  refresh()
}

export async function saveItem(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin()
  if (!hasDb) return { error: NO_STORE }

  const def = getDef(String(data.get("collection") ?? ""))
  if (!def) return { error: "Unknown section." }

  const isNew = data.get("isNew") === "1"
  const item: Item = { id: String(data.get("id") ?? "").trim(), visible: data.get("visible") === "on" }

  for (const field of def.fields) {
    const raw = String(data.get(field.name) ?? "").replace(/\r\n/g, "\n").trim()
    if (field.required && !raw) return { error: `${field.label} is required.` }
    if (!raw) continue

    if (field.type === "number") {
      const n = Number(raw)
      if (!Number.isInteger(n) || n < 1900 || n > 2100) return { error: `${field.label} must be a four-digit year.` }
      item[field.name] = n
      continue
    }
    if (raw.length > (field.type === "date" ? 10 : field.max)) return { error: `${field.label} is too long (${field.max} characters max).` }
    if (field.type === "url" && !isHttpUrl(raw)) return { error: `${field.label} must start with http:// or https://.` }
    if (field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return { error: `${field.label} must look like 2026-10-23.` }
    item[field.name] = raw
  }

  if (def.editableId) {
    if (!isSlug(item.id)) return { error: "Address can use lowercase letters, numbers and single hyphens (60 characters max)." }
  } else if (isNew) {
    item.id = randomUUID().slice(0, 8)
  }

  const items = [...(await getAllItems(def.key))]
  const index = items.findIndex((i) => i.id === item.id)
  if (isNew && index >= 0) return { error: `An entry with the address "${item.id}" already exists.` }
  if (index >= 0) items[index] = item
  else items.push(item)

  await save(def.key, items)
  redirect("/admin")
}

export async function deleteItem(key: string, id: string, _data?: FormData) {
  await requireAdmin()
  const def = getDef(key)
  if (!hasDb || !def) return
  await save(def.key, (await getAllItems(def.key)).filter((i) => i.id !== id))
  redirect("/admin")
}

export async function setItemVisible(key: string, id: string, visible: boolean, _data?: FormData) {
  await requireAdmin()
  const def = getDef(key)
  if (!hasDb || !def) return
  const items = [...(await getAllItems(def.key))]
  const item = items.find((i) => i.id === id)
  if (!item) return
  item.visible = visible
  await save(def.key, items)
}

export async function moveItem(key: string, id: string, direction: "up" | "down", _data?: FormData) {
  await requireAdmin()
  const def = getDef(key)
  if (!hasDb || !def) return
  const items = [...(await getAllItems(def.key))]
  const from = items.findIndex((i) => i.id === id)
  const to = direction === "up" ? from - 1 : from + 1
  if (from < 0 || to < 0 || to >= items.length) return
  ;[items[from], items[to]] = [items[to], items[from]]
  await save(def.key, items)
}
