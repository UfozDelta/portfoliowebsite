'use client'

import { useActionState } from 'react'
import { saveItem } from '@/app/admin/collection-actions'
import type { FormState } from '@/app/admin/actions'
import type { CollectionDef, Item } from '@/lib/collections'
import { button, input, label } from './styles'

export const ItemForm = ({ def, item, isNew }: { def: CollectionDef; item?: Item; isNew: boolean }) => {
  const [state, action, pending] = useActionState<FormState, FormData>(saveItem, {})

  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="collection" value={def.key} />
      <input type="hidden" name="isNew" value={isNew ? '1' : '0'} />
      {!def.editableId && <input type="hidden" name="id" value={item?.id ?? ''} />}

      {def.editableId && (
        <div>
          <label htmlFor="id" className={label}>address (the page URL, like /blog/this-part)</label>
          <input
            id="id"
            name="id"
            required
            maxLength={60}
            defaultValue={item?.id}
            readOnly={!isNew}
            spellCheck={false}
            autoCapitalize="none"
            className={`${input} ${isNew ? '' : 'text-muted-foreground'}`}
          />
        </div>
      )}

      {def.fields.map((f) => {
        const value = item?.[f.name]
        const common = { id: f.name, name: f.name, required: f.required, defaultValue: value === undefined ? undefined : String(value) }
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className={label}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea {...common} rows={f.max > 1000 ? 14 : 3} maxLength={f.max} className={`${input} leading-relaxed`} />
            ) : f.type === 'number' ? (
              <input {...common} type="number" inputMode="numeric" min={1900} max={2100} className={input} />
            ) : f.type === 'date' ? (
              <input {...common} type="date" className={input} />
            ) : (
              <input
                {...common}
                type={f.type === 'url' ? 'url' : 'text'}
                inputMode={f.type === 'url' ? 'url' : undefined}
                autoCapitalize={f.type === 'url' ? 'none' : undefined}
                maxLength={f.max}
                className={input}
              />
            )}
          </div>
        )
      })}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="visible" defaultChecked={item?.visible ?? true} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        Show on the site
      </label>

      {state.error && <p role="alert" className="text-sm text-destructive">{state.error}</p>}

      <button type="submit" disabled={pending} className={button}>
        {pending ? 'Saving...' : isNew ? `Add ${def.singular}` : 'Save changes'}
      </button>
    </form>
  )
}
