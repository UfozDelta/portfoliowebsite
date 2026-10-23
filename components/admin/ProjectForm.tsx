'use client'

import { useActionState } from 'react'
import { saveProject, type FormState } from '@/app/admin/actions'
import type { Project } from '@/lib/projects'
import { button, input, label } from './styles'

export const ProjectForm = ({ project, isNew }: { project?: Project; isNew: boolean }) => {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject, {})

  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="isNew" value={isNew ? '1' : '0'} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={label}>title</label>
          <input id="title" name="title" required maxLength={80} defaultValue={project?.title} className={input} />
        </div>
        <div>
          <label htmlFor="slug" className={label}>slug (the page address)</label>
          <input
            id="slug"
            name="slug"
            required
            maxLength={60}
            defaultValue={project?.slug}
            readOnly={!isNew}
            spellCheck={false}
            autoCapitalize="none"
            className={`${input} ${isNew ? '' : 'text-muted-foreground'}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={label}>one-line description</label>
        <input id="description" name="description" required maxLength={300} defaultValue={project?.description} className={input} />
      </div>

      <div>
        <label htmlFor="tech" className={label}>tech, separated by commas</label>
        <input id="tech" name="tech" defaultValue={project?.tech.join(', ')} placeholder="Python, Next.js, PostgreSQL" className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="github" className={label}>repo link (optional)</label>
          <input id="github" name="github" type="url" inputMode="url" autoCapitalize="none" defaultValue={project?.github} className={input} />
        </div>
        <div>
          <label htmlFor="demo" className={label}>live demo link (optional)</label>
          <input id="demo" name="demo" type="url" inputMode="url" autoCapitalize="none" defaultValue={project?.demo} className={input} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="year" className={label}>year (optional)</label>
          <input id="year" name="year" type="number" inputMode="numeric" min={1990} max={2100} defaultValue={project?.year} className={input} />
        </div>
        <div>
          <label htmlFor="status" className={label}>status (optional)</label>
          <select id="status" name="status" defaultValue={project?.status ?? ''} className={input}>
            <option value="">none</option>
            <option value="live">live</option>
            <option value="archived">archived</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="body" className={label}>write-up (plain text, blank line between paragraphs)</label>
        <textarea id="body" name="body" rows={12} maxLength={20000} defaultValue={project?.body} className={`${input} leading-relaxed`} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="visible" defaultChecked={project?.visible ?? true} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        Show on the site
      </label>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className={button}>
        {pending ? 'Saving...' : isNew ? 'Create project' : 'Save changes'}
      </button>
    </form>
  )
}
