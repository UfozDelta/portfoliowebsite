import React from 'react'
import { DataPattern } from './d3/DataPattern'
import { ScrollReveal } from './d3/ScrollReveal'

export const About = () => {

  const focusAreas = [
    "Machine Learning & AI Applications",
    "Backend Development & System Design",
    "Quantitative Finance & Trading Systems",
    "Data Visualization & Analytics"
  ]

  return (
    <section className="relative py-16 md:py-24 px-4">
      <DataPattern />

      <div className="relative z-10 container mx-auto max-w-4xl">

        <div className="mb-12">
          {/* Section number */}
          <p className="
            font-mono text-sm md:text-base
            mb-4
          ">
            <span className="text-dashed-box">01 / BACKGROUND</span>
          </p>

          <h2 className="
            text-4xl md:text-5xl lg:text-6xl
            font-bold
            text-foreground
            tracking-tight mb-4
          ">
            ABOUT
          </h2>

          {/* Blue accent line - visual consistency with Projects section */}
          <div className="w-16 border-t-4 border-primary" />
        </div>

        {/* Content with Scroll Reveal Animation */}
        <ScrollReveal direction="up" delay={100}>
          <div className="space-y-8">
            {/* Large intro paragraph for emphasis */}
            <p className="text-lg md:text-xl leading-relaxed">
              Third-year Mathematics, Statistics & Computer Science student at the University of Toronto.
            </p>

            {/* Body text */}
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              I develop practical solutions at the intersection of mathematics, statistics, and code from
              implementing machine learning algorithms to building robust backend systems
              and creating data visualization tools. This portfolio showcases projects
              spanning ML, quantitative finance, and full-stack development.
              I am currently developing a sports betting arbitrage system that identifies and executes risk-free betting opportunities across multiple sportsbooks using real-time odds analysis and automated trade execution.
            </p>

            {/* Focus Areas List with Outlined Boxes */}
            <div className="pt-4">
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                Focus Areas
              </h3>

              <div className="flex flex-wrap gap-3">
                {focusAreas.map((area, index) => (
                  <span
                    key={index}
                    className="
                      text-outline-box
                      font-mono text-sm md:text-base
                      text-foreground
                    "
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

