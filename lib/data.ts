import { cache } from "react"
import { availability, bio, story, tagline } from "@/lib/content"
import { arrange, collections, type CollectionKey, type Item } from "@/lib/collections"
import { defaultProjects, type Project } from "@/lib/projects"
import { readDoc } from "@/lib/store"

export interface SiteSettings {
  tagline: string
  /** Paragraphs separated by a blank line. */
  bio: string
  /** The longer text on the whoami page. */
  story: string
  now: string
  availability: string
}

/** What is stored in Redis. Projects are kept in display order. */
export interface SiteDoc {
  projects: Project[]
  settings: Partial<SiteSettings>
  /** Experience, non-profit work, publications and blog posts. Missing keys use the defaults. */
  collections: Partial<Record<CollectionKey, Item[]>>
}

export const defaultSettings: SiteSettings = {
  tagline,
  bio: bio.join("\n\n"),
  story,
  now: "Building a sports betting arbitrage engine that reads live odds across sportsbooks and acts on gaps as they open.",
  availability,
}

/**
 * Nothing is stored until the first save, so a fresh site shows (and edits) the built-in content.
 * Wrapped in cache() so the layout, page and metadata share one Redis read per request.
 */
export const loadDoc = cache(async (): Promise<SiteDoc> => {
  try {
    const doc = await readDoc<Partial<SiteDoc>>()
    return {
      projects: doc?.projects ?? defaultProjects,
      settings: doc?.settings ?? {},
      collections: doc?.collections ?? {},
    }
  } catch {
    return { projects: defaultProjects, settings: {}, collections: {} }
  }
})

/** Every project, including hidden ones. Admin only. */
export async function getAllProjects(): Promise<Project[]> {
  return (await loadDoc()).projects
}

/** Projects shown on the public site. */
export async function getProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.visible)
}

export async function getSettings(): Promise<SiteSettings> {
  const { settings } = await loadDoc()
  return { ...defaultSettings, ...settings }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug)
}

/** Every item in a collection, including hidden ones, in stored order. Admin only. */
export async function getAllItems(key: CollectionKey): Promise<Item[]> {
  const { collections: stored } = await loadDoc()
  return stored[key] ?? collections.find((c) => c.key === key)?.defaults ?? []
}

/** Visible items, arranged the way the public site shows them. */
export async function getItems(key: CollectionKey): Promise<Item[]> {
  const def = collections.find((c) => c.key === key)
  const items = (await getAllItems(key)).filter((i) => i.visible)
  return def ? arrange(def, items) : items
}
