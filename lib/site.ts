/**
 * Set NEXT_PUBLIC_SITE_URL in production (for example https://maksym.dev) so canonical URLs,
 * the sitemap and social previews point at the live domain.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const SITE_NAME = "Maksym Syagrovskyy"
