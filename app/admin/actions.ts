"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth"
import { loadDoc, type SiteSettings } from "@/lib/data"
import type { Project } from "@/lib/projects"
import { hasDb, writeDoc } from "@/lib/store"
import { isHttpUrl, isSlug, splitTech } from "@/lib/validate"

export interface FormState {
  error?: string
  saved?: boolean
}

const NO_STORE = "Redis is not connected, so nothing can be saved."

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim()

/** Everything public reads from the store, so refresh all of it after a write. */
const refresh = () => revalidatePath("/", "layout")

export async function login(_prev: FormState, data: FormData): Promise<FormState> {
  if (!checkPassword(String(data.get("password") ?? ""))) {
    // Slows down guessing. Add a Vercel firewall rate limit on /admin/login for real protection.
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { error: "Wrong password." }
  }
  await startSession()
  redirect("/admin")
}

export async function logout() {
  await endSession()
  redirect("/admin/login")
}

export async function saveProject(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin()
  if (!hasDb) return { error: NO_STORE }

  const slug = text(data, "slug")
  const title = text(data, "title")
  const description = text(data, "description")
  const github = text(data, "github")
  const demo = text(data, "demo")
  const yearRaw = text(data, "year")
  const status = text(data, "status")
  const body = String(data.get("body") ?? "").replace(/\r\n/g, "\n").trim()
  const tech = splitTech(text(data, "tech"))
  const visible = data.get("visible") === "on"
  const isNew = data.get("isNew") === "1"

  if (!isSlug(slug)) return { error: "Slug can use lowercase letters, numbers and single hyphens (60 characters max)." }
  if (!title || title.length > 80) return { error: "Title is required and must be 80 characters or fewer." }
  if (!description || description.length > 300) return { error: "Description is required and must be 300 characters or fewer." }
  if (github && !isHttpUrl(github)) return { error: "Repo link must start with http:// or https://." }
  if (demo && !isHttpUrl(demo)) return { error: "Demo link must start with http:// or https://." }
  if (status && status !== "live" && status !== "archived") return { error: "Status must be live or archived." }
  if (tech.length > 12 || tech.some((t) => t.length > 30)) return { error: "Use at most 12 tech tags, each 30 characters or fewer." }
  if (body.length > 20000) return { error: "Write-up is limited to 20,000 characters." }
  const year = yearRaw ? Number(yearRaw) : undefined
  if (year !== undefined && (!Number.isInteger(year) || year < 1990 || year > 2100)) return { error: "Year must be a four-digit year." }

  const project: Project = {
    slug,
    title,
    description,
    tech,
    github: github || undefined,
    demo: demo || undefined,
    year,
    status: (status || undefined) as Project["status"],
    body,
    visible,
  }

  const doc = await loadDoc()
  const index = doc.projects.findIndex((p) => p.slug === slug)
  if (isNew && index >= 0) return { error: `A project with the slug "${slug}" already exists.` }
  if (index >= 0) doc.projects[index] = project
  else doc.projects.push(project)

  await writeDoc(doc)
  refresh()
  redirect("/admin")
}

export async function deleteProject(slug: string, _data?: FormData) {
  await requireAdmin()
  if (!hasDb) return
  const doc = await loadDoc()
  doc.projects = doc.projects.filter((p) => p.slug !== slug)
  await writeDoc(doc)
  refresh()
  redirect("/admin")
}

export async function setVisible(slug: string, visible: boolean, _data?: FormData) {
  await requireAdmin()
  if (!hasDb) return
  const doc = await loadDoc()
  const project = doc.projects.find((p) => p.slug === slug)
  if (!project) return
  project.visible = visible
  await writeDoc(doc)
  refresh()
}

export async function moveProject(slug: string, direction: "up" | "down", _data?: FormData) {
  await requireAdmin()
  if (!hasDb) return
  const doc = await loadDoc()
  const from = doc.projects.findIndex((p) => p.slug === slug)
  const to = direction === "up" ? from - 1 : from + 1
  if (from < 0 || to < 0 || to >= doc.projects.length) return
  ;[doc.projects[from], doc.projects[to]] = [doc.projects[to], doc.projects[from]]
  await writeDoc(doc)
  refresh()
}

export async function saveSettings(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin()
  if (!hasDb) return { error: NO_STORE }

  const next: SiteSettings = {
    tagline: text(data, "tagline"),
    bio: String(data.get("bio") ?? "").replace(/\r\n/g, "\n").trim(),
    story: String(data.get("story") ?? "").replace(/\r\n/g, "\n").trim(),
    now: text(data, "now"),
    availability: text(data, "availability"),
  }
  if (next.tagline.length > 120) return { error: "Tagline must be 120 characters or fewer." }
  if (next.bio.length > 4000) return { error: "Bio is limited to 4,000 characters." }
  if (next.story.length > 8000) return { error: "Story is limited to 8,000 characters." }
  if (next.now.length > 400 || next.availability.length > 400) return { error: "Now and availability are limited to 400 characters." }

  const doc = await loadDoc()
  // An empty field goes back to the default instead of showing a blank.
  doc.settings = Object.fromEntries(Object.entries(next).filter(([, value]) => value !== ""))
  await writeDoc(doc)
  refresh()
  return { saved: true }
}
