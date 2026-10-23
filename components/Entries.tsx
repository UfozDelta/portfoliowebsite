import Link from 'next/link'
import { formatDate, type Item } from '@/lib/collections'

const linkClass =
  'underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

const s = (value: Item[string]) => (value === undefined ? '' : String(value))

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="border-t border-border">{children}</ul>
)

export const ExperienceList = ({ items }: { items: Item[] }) => (
  <List>
    {items.map((r) => (
      <li key={r.id} className="border-b border-border py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <span className="font-medium">
            {s(r.role)} <span className="font-normal text-muted-foreground">at {s(r.org)}</span>
          </span>
          {r.period && <span className="font-pixel text-xs text-muted-foreground">{s(r.period)}</span>}
        </div>
        {r.note && <p className="mt-1 text-sm text-muted-foreground">{s(r.note)}</p>}
      </li>
    ))}
  </List>
)

export const NonprofitList = ({ items }: { items: Item[] }) => (
  <List>
    {items.map((r) => (
      <li key={r.id} className="border-b border-border py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <span className="font-medium">
            {r.url ? (
              <a href={s(r.url)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {s(r.org)}
              </a>
            ) : (
              s(r.org)
            )}{' '}
            <span className="font-normal text-muted-foreground">{s(r.role)}</span>
          </span>
          <span className="font-pixel text-xs text-muted-foreground">{s(r.period)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{s(r.description)}</p>
      </li>
    ))}
  </List>
)

export const PublicationList = ({ items }: { items: Item[] }) => (
  <List>
    {items.map((p) => (
      <li key={p.id} className="border-b border-border py-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-medium">
            {p.url ? (
              <a href={s(p.url)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {s(p.title)}
              </a>
            ) : (
              s(p.title)
            )}
          </span>
          <span className="shrink-0 font-pixel text-xs text-muted-foreground">{s(p.year)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {[p.authors, p.venue].filter(Boolean).map(s).join(' / ')}
        </p>
        {p.summary && <p className="mt-1.5 text-sm leading-relaxed">{s(p.summary)}</p>}
      </li>
    ))}
  </List>
)

export const PostList = ({ items }: { items: Item[] }) => (
  <List>
    {items.map((p) => (
      <li key={p.id} className="border-b border-border">
        <Link
          href={`/blog/${p.id}`}
          className="group -mx-3 block px-3 py-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:bg-secondary"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-medium group-hover:text-primary">{s(p.title)}</span>
            <span className="shrink-0 font-pixel text-xs text-muted-foreground">{formatDate(s(p.date))}</span>
          </div>
          {p.summary && <p className="mt-1 text-sm text-muted-foreground">{s(p.summary)}</p>}
        </Link>
      </li>
    ))}
  </List>
)
