'use client'

export const PaletteButton = () => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new Event('open-palette'))}
    aria-label="Open command palette"
    aria-keyshortcuts="/"
    className="shrink-0 border border-border px-2.5 py-1 font-pixel text-xs text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:border-foreground [@media(hover:hover)]:hover:text-foreground"
  >
    {/* Keyboard hint only where a keyboard is likely; touch screens get a plain label. */}
    <span className="[@media(hover:hover)]:hidden">menu</span>
    <span className="hidden [@media(hover:hover)]:inline">press /</span>
  </button>
)
