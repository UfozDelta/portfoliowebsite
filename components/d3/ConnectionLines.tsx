'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export const ConnectionLines = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const svg = d3.select(svgRef.current)
    if (!svg.node()) return

    const width = window.innerWidth
    const line = svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', 0)
      .attr('stroke', 'hsl(214, 100%, 50%)')
      .attr('stroke-width', 1)
      .attr('opacity', 0.2)
      .attr('stroke-dasharray', width)
      .attr('stroke-dashoffset', width)

    // Animate line drawing
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          line
            .transition()
            .duration(1500)
            .ease(d3.easeCubicInOut)
            .attr('stroke-dashoffset', 0)
          observer.disconnect()
        }
      })
    })

    const element = svgRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return <svg ref={svgRef} className="w-full h-[1px]" aria-hidden="true" />
}
