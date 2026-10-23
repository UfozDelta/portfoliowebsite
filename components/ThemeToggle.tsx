'use client'

import { useEffect, useState } from 'react'
import { applyTheme, getTheme, nextTheme, type Theme } from '@/lib/theme'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const sync = () => setTheme(getTheme())
    sync()
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  return (
    <button
      type="button"
      onClick={() => applyTheme(nextTheme(theme))}
      aria-label={`Theme: ${theme}. Switch theme`}
      className="shrink-0 border border-border px-2.5 py-1 font-pixel text-xs text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:border-foreground [@media(hover:hover)]:hover:text-foreground"
    >
      {theme}
    </button>
  )
}
