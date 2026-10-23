'use client'

import { useActionState } from 'react'
import { login, type FormState } from '@/app/admin/actions'
import { button, input, label } from './styles'

export const LoginForm = () => {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {})

  return (
    <form action={action} className="mt-8 max-w-sm space-y-4">
      <div>
        <label htmlFor="password" className={label}>
          password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className={input}
        />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={button}>
        {pending ? 'Checking...' : 'Sign in'}
      </button>
    </form>
  )
}
