/**
 * Editable lists shown on the site: experience, non-profit work, publications and blog posts.
 * Each one is described once here, and the admin forms, validation and storage are generated from it.
 *
 * The default entries below are PLACEHOLDERS so the layout has something to show.
 * Replace or delete them in /admin (or here) before launch.
 */

export type CollectionKey = "facts" | "experience" | "nonprofit" | "publications" | "posts"

export interface Item {
  /** Stable key. For blog posts this is also the URL slug. */
  id: string
  visible: boolean
  [field: string]: string | number | boolean | undefined
}

export interface FieldDef {
  name: string
  label: string
  type: "text" | "textarea" | "url" | "number" | "date"
  required?: boolean
  max: number
  hint?: string
}

export interface CollectionDef {
  key: CollectionKey
  /** Section heading, shown as ~/label */
  label: string
  singular: string
  /** Field shown as the row title in the admin. */
  titleField: string
  /** Field shown under the title in the admin. */
  subtitleField?: string
  fields: FieldDef[]
  /** "date" sorts newest first and hides the manual up/down controls. */
  sort?: "date"
  /** Posts let you choose the id, because it becomes the page address. */
  editableId?: boolean
  defaults: Item[]
}

export const collections: CollectionDef[] = [
  {
    key: "facts",
    label: "whoami facts",
    singular: "fact",
    titleField: "label",
    subtitleField: "value",
    fields: [
      { name: "label", label: "label (for example location)", type: "text", required: true, max: 40 },
      { name: "value", label: "value", type: "text", required: true, max: 200 },
    ],
    defaults: [
      { id: "location", visible: true, label: "location", value: "Toronto, Canada" },
      { id: "studying", visible: true, label: "studying", value: "Mathematics, Statistics and Computer Science, year 3" },
      { id: "school", visible: true, label: "school", value: "University of Toronto" },
      { id: "interests", visible: true, label: "interested in", value: "quant finance, machine learning, transit data" },
      { id: "tools", visible: true, label: "daily tools", value: "Python, TypeScript, PostgreSQL" },
      { id: "elsewhere", visible: true, label: "outside of code", value: "Poker, chess, Erdős problems, puzzles" },
    ],
  },
  {
    key: "experience",
    label: "experience",
    singular: "role",
    titleField: "role",
    subtitleField: "org",
    fields: [
      { name: "role", label: "role", type: "text", required: true, max: 80 },
      { name: "org", label: "organization", type: "text", required: true, max: 80 },
      { name: "period", label: "period, optional (for example Jun to Aug 2025)", type: "text", max: 40 },
      { name: "note", label: "what you did", type: "textarea", max: 300 },
    ],
    // Newest first. The 2025 roles overlap, so they are ordered by end date, then start date.
    defaults: [
      {
        id: "realty-investment-group",
        visible: true,
        role: "Full-stack developer",
        org: "Realty Investment Group",
        period: "Jan to Aug 2026",
        note: "Worked with a team of five on AI integrations and voice agents for real estate software, connected to the MLS.",
      },
      {
        id: "foundify",
        visible: true,
        role: "Co-founder",
        org: "Foundify",
        period: "Jun to Aug 2025",
        note: "Worked on grant aggregation and grant writing.",
      },
      {
        id: "pestwise",
        visible: true,
        role: "Software engineer",
        org: "Pestwise",
        period: "May to Aug 2025",
        note: "Built the vendor invoice pipeline, with automatic record creation in their CRM.",
      },
      {
        id: "circles-advertising",
        visible: true,
        role: "Software engineer",
        org: "Circles Advertising Ltd",
        note: "Built software for marketing work.",
      },
    ],
  },
  {
    key: "nonprofit",
    label: "non-profit",
    singular: "non-profit role",
    titleField: "org",
    subtitleField: "role",
    fields: [
      { name: "org", label: "organization", type: "text", required: true, max: 80 },
      { name: "role", label: "your role", type: "text", required: true, max: 80 },
      { name: "period", label: "period", type: "text", required: true, max: 40 },
      { name: "description", label: "what you did", type: "textarea", required: true, max: 400 },
      { name: "url", label: "organization link (optional)", type: "url", max: 300 },
    ],
    defaults: [
      {
        id: "uya-etobicoke",
        visible: true,
        org: "Ukrainian Youth Association, Etobicoke branch",
        role: "Treasurer",
        period: "Sep 2026 to now",
        description: "Handled all finances and accounting for the branch, including its CRA trust.",
        url: "https://cym.org/etobicoke",
      },
    ],
  },
  {
    key: "publications",
    label: "publications",
    singular: "publication",
    titleField: "title",
    subtitleField: "venue",
    fields: [
      { name: "title", label: "title", type: "text", required: true, max: 200 },
      { name: "authors", label: "authors (optional)", type: "text", max: 200 },
      { name: "venue", label: "venue or journal", type: "text", required: true, max: 120 },
      { name: "year", label: "year", type: "number", required: true, max: 4 },
      { name: "url", label: "link (optional)", type: "url", max: 300 },
      { name: "summary", label: "one-line summary (optional)", type: "textarea", max: 400 },
    ],
    // Empty on purpose: the section stays hidden until you add a publication in /admin.
    defaults: [],
  },
  {
    key: "posts",
    label: "blog",
    singular: "post",
    titleField: "title",
    subtitleField: "date",
    sort: "date",
    editableId: true,
    fields: [
      { name: "title", label: "title", type: "text", required: true, max: 120 },
      { name: "date", label: "date", type: "date", required: true, max: 10 },
      { name: "summary", label: "one-line summary", type: "textarea", max: 300 },
      { name: "body", label: "post (plain text, blank line between paragraphs)", type: "textarea", max: 30000 },
    ],
    defaults: [
      {
        id: "hello-world",
        visible: true,
        title: "Hello, world",
        date: "2026-10-01",
        summary: "Why this site exists and what I plan to write about.",
        body: "This is a placeholder post. Delete it or edit it from the admin.\n\nI plan to write about the things I build: how the systems work, what broke, and what the numbers said.",
      },
    ],
  },
]

export const getDef = (key: string) => collections.find((c) => c.key === key)

/** Sorted the way the public site shows them. */
export function arrange(def: CollectionDef, items: Item[]) {
  if (def.sort !== "date") return items
  return [...items].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")))
}

export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
}
