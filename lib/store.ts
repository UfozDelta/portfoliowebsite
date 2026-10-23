import { Redis } from "@upstash/redis"

/**
 * Vercel's Upstash integration names its variables after the prefix chosen when connecting
 * (it produced STORAGE_KV_REST_API_URL here; older setups use KV_* or STORAGE_*), while the
 * Upstash console uses UPSTASH_REDIS_REST_*. Accept any of them. The read-only token is never
 * used, because the admin has to write.
 */
const env = process.env
const pick = (names: string[]) => names.map((n) => env[n]).find((v) => v && v.length > 0)

const url = pick([
  "STORAGE_KV_REST_API_URL",
  "STORAGE_REST_API_URL",
  "KV_REST_API_URL",
  "UPSTASH_REDIS_REST_URL",
])
const token = pick([
  "STORAGE_KV_REST_API_TOKEN",
  "STORAGE_REST_API_TOKEN",
  "KV_REST_API_TOKEN",
  "UPSTASH_REDIS_REST_TOKEN",
])

/** The site works without a store (it falls back to the built-in content); the admin needs one. */
export const hasDb = Boolean(url && token)

const redis = hasDb ? new Redis({ url: url as string, token: token as string }) : null

/** Everything editable lives in one JSON document under one key. */
const KEY = "portfolio:site"

export async function readDoc<T>(): Promise<T | null> {
  if (!redis) return null
  return (await redis.get<T>(KEY)) ?? null
}

export async function writeDoc(doc: unknown) {
  if (!redis) throw new Error("Redis is not configured")
  await redis.set(KEY, doc)
}
