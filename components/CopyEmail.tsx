'use client'

import { useState } from 'react'

export const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="font-pixel text-xs text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:text-primary"
      aria-live="polite"
    >
      {copied ? 'copied' : 'copy email'}
    </button>
  )
}
