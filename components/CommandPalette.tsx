'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EMAIL, links, RESUME_URL } from '@/lib/projects'
import { applyTheme, getTheme, nextTheme } from '@/lib/theme'

interface Entry {
  label: string
  hint: string
  run: () => void
  /** Keep the palette open after running, so the row can show feedback. */
  keepOpen?: boolean
}

interface PaletteProps {
  projects: { slug: string; title: string }[]
  posts: { id: string; title: string }[]
  /** Section anchors that currently have something to show. */
  sections: { label: string; hash: string }[]
}

export const CommandPalette = ({ projects, posts, sections }: PaletteProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const entries = useMemo<Entry[]>(() => {
    const go = (path: string) => () => router.push(path)
    return [
      { label: 'Home', hint: '/', run: go('/') },
      { label: 'Who am I', hint: '/whoami', run: go('/whoami') },
      { label: 'Projects', hint: '/#projects', run: go('/#projects') },
      ...sections.map((s) => ({ label: s.label, hint: `/#${s.hash}`, run: go(`/#${s.hash}`) })),
      { label: 'Contact', hint: '/#contact', run: go('/#contact') },
      ...(posts.length > 0 ? [{ label: 'All blog posts', hint: '/blog', run: go('/blog') }] : []),
      ...projects.map((p) => ({ label: p.title, hint: `/work/${p.slug}`, run: go(`/work/${p.slug}`) })),
      ...posts.map((p) => ({ label: p.title, hint: `/blog/${p.id}`, run: go(`/blog/${p.id}`) })),
      ...(RESUME_URL
        ? [{ label: 'Resume', hint: 'pdf', run: () => window.open(RESUME_URL, '_blank', 'noopener') }]
        : []),
      ...links.map((l) => ({
        label: l.label,
        hint: l.href.replace(/^mailto:/, ''),
        run: () => window.open(l.href, l.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener'),
      })),
      {
        label: 'Copy email',
        hint: EMAIL,
        keepOpen: true,
        run: () => {
          navigator.clipboard
            ?.writeText(EMAIL)
            .then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            })
            .catch(() => {})
        },
      },
      { label: 'Switch theme', hint: 'system / light / dark', keepOpen: true, run: () => applyTheme(nextTheme(getTheme())) },
    ]
  }, [router, projects, posts, sections])

  const results = entries.filter((e) => e.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]')
      if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [open])

  // Open: remember focus, lock page scroll, focus the input. Close: undo both.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setQuery('')
    setIndex(0)
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open])

  // Keep the highlighted row visible when arrowing past the edge of the list.
  useEffect(() => {
    if (!open) return
    const row = listRef.current?.children[index] as HTMLElement | undefined
    row?.scrollIntoView({ block: 'nearest' })
  }, [index, open])

  if (!open) return null

  const choose = (entry?: Entry) => {
    if (!entry) return
    if (!entry.keepOpen) setOpen(false)
    entry.run()
  }

  const activeId = results[index] ? `palette-opt-${index}` : undefined

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-md border border-foreground bg-background"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <span className="font-pixel text-sm text-primary" aria-hidden="true">/</span>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setIndex((i) => Math.min(i + 1, results.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setIndex((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter') {
                choose(results[index])
              } else if (e.key === 'Tab') {
                // The input is the only focusable control; keep focus inside the dialog.
                e.preventDefault()
              }
            }}
            placeholder="go to..."
            aria-label="Search pages and projects"
            className="h-11 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <ul ref={listRef} id="palette-list" className="max-h-[50vh] overflow-y-auto py-1" role="listbox">
          {results.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">Nothing matches &quot;{query}&quot;.</li>
          )}
          {results.map((r, i) => (
            <li
              key={r.label}
              id={`palette-opt-${i}`}
              role="option"
              aria-selected={i === index}
              onMouseMove={() => i !== index && setIndex(i)}
              onClick={() => choose(r)}
              className={`flex cursor-pointer items-baseline justify-between gap-4 px-3 py-2 text-sm ${
                i === index ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <span>{r.label}</span>
              <span
                className={`truncate font-pixel text-xs ${i === index ? '' : 'text-muted-foreground'}`}
                aria-live={r.label === 'Copy email' ? 'polite' : undefined}
              >
                {r.label === 'Copy email' && copied ? 'copied' : r.hint}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
