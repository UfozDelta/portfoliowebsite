'use client'

export const DataPattern = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-5"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="data-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <circle cx="0" cy="0" r="1" fill="currentColor" />
          <circle cx="100" cy="0" r="1" fill="currentColor" />
          <circle cx="0" cy="100" r="1" fill="currentColor" />
          <circle cx="100" cy="100" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#data-pattern)" />
    </svg>
  )
}
