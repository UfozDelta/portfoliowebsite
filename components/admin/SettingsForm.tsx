'use client'

import { useActionState } from 'react'
import { saveSettings, type FormState } from '@/app/admin/actions'
import type { SiteSettings } from '@/lib/data'
import { button, input, label } from './styles'

export const SettingsForm = ({ settings }: { settings: SiteSettings }) => {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {})

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="tagline" className={label}>tagline</label>
        <input id="tagline" name="tagline" maxLength={120} defaultValue={settings.tagline} className={input} />
      </div>
      <div>
        <label htmlFor="bio" className={label}>bio (blank line between paragraphs)</label>
        <textarea id="bio" name="bio" rows={8} maxLength={4000} defaultValue={settings.bio} className={`${input} leading-relaxed`} />
      </div>
      <div>
        <label htmlFor="story" className={label}>whoami story (longer, blank line between paragraphs)</label>
        <textarea id="story" name="story" rows={10} maxLength={8000} defaultValue={settings.story} className={`${input} leading-relaxed`} />
      </div>
      <div>
        <label htmlFor="now" className={label}>now (what you are working on)</label>
        <textarea id="now" name="now" rows={2} maxLength={400} defaultValue={settings.now} className={input} />
      </div>
      <div>
        <label htmlFor="availability" className={label}>availability (contact section)</label>
        <textarea id="availability" name="availability" rows={2} maxLength={400} defaultValue={settings.availability} className={input} />
      </div>
      <p className="text-xs text-muted-foreground">Leave a field empty to go back to its default.</p>
      {state.error && <p role="alert" className="text-sm text-destructive">{state.error}</p>}
      {state.saved && <p role="status" className="text-sm text-primary">Saved.</p>}
      <button type="submit" disabled={pending} className={button}>
        {pending ? 'Saving...' : 'Save text'}
      </button>
    </form>
  )
}
