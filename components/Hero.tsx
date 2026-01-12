'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import { GridOverlay } from '@/components/GridOverlay'

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex flex-col justify-start items-center px-4 pt-1 md:pt-1 overflow-hidden">
      <GridOverlay />

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          text-layer-back
          pointer-events-none
          select-none
        "
        aria-hidden="true"
      >
        <p className="
          text-[12rem] md:text-[20rem] lg:text-[28rem]
          font-black
          opacity-0
          leading-none

        ">
         DEVELOPER
        </p>
      </div>

      <div className="relative z-10 max-w-5xl w-full space-y-8 md:space-y-12 text-layer-front">

        <div className="space-y-4">
          <h1 className="
            text-5xl md:text-7xl lg:text-8xl
            font-black
            text-foreground
            tracking-tight leading-none
          ">
            MAKSYM
            <br />
            SYAGROVSKYY
          </h1>

          <div className="w-24 md:w-32 border-t-4 border-primary" />
        </div>

        <div className="space-y-2 font-mono text-base md:text-lg">
          <p className="text-foreground">
            <span className="text-dashed-box">Math, Stats & CS Student</span>
          </p>
          <p className="text-muted-foreground">
            Building <span className="text-dashed-box text-foreground">(Data-Driven)</span> Systems & <span className="text-outline-box text-foreground">ML Applications</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={scrollToProjects}
            className="
              shadow-brutalist-offset
              border-2 border-foreground
              bg-primary text-primary-foreground
              px-8 py-6 text-base
              transition-colors duration-150
              hover:bg-accent hover:border-accent
            "
          >
            View Work
          </Button>

          <Button
            variant="outline"
            asChild
            className="
              shadow-brutalist-offset
              border-2 border-foreground
              px-8 py-6 text-base
              transition-colors duration-150
              hover:bg-primary hover:text-primary-foreground
              hover:border-primary
            "
          >
            <Link href="/#Contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToProjects}
        className="
          absolute bottom-8
          text-muted-foreground
          transition-colors duration-150
          hover:text-primary
        "
        aria-label="Scroll to projects"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
