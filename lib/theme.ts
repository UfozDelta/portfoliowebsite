export type Theme = 'system' | 'light' | 'dark'

const KEY = 'theme'

export function getTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
  try {
    if (theme === 'system') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, theme)
  } catch {}
  window.dispatchEvent(new Event('themechange'))
}

export function nextTheme(theme: Theme): Theme {
  return theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
}

/** Runs before first paint so a saved choice never flashes the wrong theme. */
export const themeInitScript = `try{var t=localStorage.getItem('${KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`
