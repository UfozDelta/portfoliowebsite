import { Redis } from "@upstash/redis"

/**
 * Vercel's Upstash integration names its variables after the prefix chosen when connecting
 * (STORAGE_*, KV_*), while the Upstash console uses UPSTASH_REDIS_*. Accept any of them.
 */
const env = process.env
const url =
  env.STORAGE_REST_API_URL ?? env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL
const token =
  env.STORAGE_REST_API_TOKEN ?? env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN

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
