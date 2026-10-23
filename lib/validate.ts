const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isSlug(value: string) {
  return value.length > 0 && value.length <= 60 && SLUG.test(value)
}

/** Only http(s) links. Blocks javascript: and data: URLs from reaching an href. */
export function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export function splitTech(value: string) {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}
