'use client'

import { useEffect, useState } from 'react'

const format = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(new Date())

export const LocalTime = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return <span>toronto {time || '--:--'}</span>
}
