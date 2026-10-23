import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const COOKIE = "admin_session"
const WEEK = 60 * 60 * 24 * 7

/** Admin is off until ADMIN_PASSWORD is set. */
export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD)

/** SESSION_SECRET is optional; without it the signing key is derived from the password. */
function signingKey() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return null
  return process.env.SESSION_SECRET ?? createHash("sha256").update(`session:${password}`).digest("hex")
}

const sign = (expires: number) => createHmac("sha256", signingKey() as string).update(String(expires)).digest("hex")

/** Compares digests so the check takes the same time wherever the strings differ. */
export function checkPassword(input: string) {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const a = createHash("sha256").update(input).digest()
  const b = createHash("sha256").update(password).digest()
  return timingSafeEqual(a, b)
}

export async function startSession() {
  const expires = Math.floor(Date.now() / 1000) + WEEK
  ;(await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: WEEK,
  })
}

export async function endSession() {
  ;(await cookies()).delete(COOKIE)
}

export async function isAdmin() {
  // Read cookies first so every caller is rendered per request, never prerendered.
  const jar = await cookies()
  if (!signingKey()) return false
  const value = jar.get(COOKIE)?.value
  if (!value) return false
  const [rawExpires, signature = ""] = value.split(".")
  const expires = Number(rawExpires)
  if (!expires || expires < Date.now() / 1000) return false
  const expected = Buffer.from(sign(expires))
  const given = Buffer.from(signature)
  return given.length === expected.length && timingSafeEqual(given, expected)
}

/** Call at the top of every admin page and every server action. The UI alone is not a check. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login")
}
