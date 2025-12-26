'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const element = ref.current
    if (!element) return

    // Initial state based on direction
    const transforms = {
      up: { x: 0, y: 40 },
      down: { x: 0, y: -40 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
    }

    const { x, y } = transforms[direction]

    // Set initial state
    d3.select(element)
      .style('opacity', '0')
      .style('transform', `translate(${x}px, ${y}px)`)

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view, animate in
            setTimeout(() => {
              d3.select(element)
                .transition()
                .duration(800)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .style('transform', 'translate(0, 0)')
            }, delay)

            // Disconnect observer after animation
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px', // Start slightly before entering viewport
      }
    )

    observer.observe(element)

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [direction, delay])

  return <div ref={ref}>{children}</div>
}
