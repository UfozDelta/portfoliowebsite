const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** 16px text keeps iOS Safari from zooming the page when a field is focused. */
export const input = `w-full border border-input bg-background px-3 py-2 text-base ${focus}`

export const label = "mb-1 block font-pixel text-xs text-muted-foreground"

export const button = `border border-foreground bg-foreground px-4 py-2 text-sm text-background transition-colors ${focus} [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:bg-primary [@media(hover:hover)]:hover:text-primary-foreground disabled:opacity-50`

export const ghost = `border border-border px-2.5 py-1 font-pixel text-xs text-muted-foreground transition-colors ${focus} [@media(hover:hover)]:hover:border-foreground [@media(hover:hover)]:hover:text-foreground disabled:opacity-40`

export const danger = `border border-destructive px-2.5 py-1 font-pixel text-xs text-destructive ${focus}`
