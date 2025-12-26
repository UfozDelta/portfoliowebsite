import React from "react"
import { Github, Linkedin, Mail } from 'lucide-react'
import { ConnectionLines } from './d3/ConnectionLines'
import { ScrollReveal } from './d3/ScrollReveal'

export const Contact: React.FC = () => {
  const contactLinks = [
    {
      href: "https://www.linkedin.com/in/maksymsyagrovskyy",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:maksymsyagrovskyy@gmail.com",
      icon: Mail,
      label: "Email",
    },
    {
      href: "https://github.com/UfozDelta",
      icon: Github,
      label: "GitHub",
    },
  ]

  return (
    <footer id="Contact" className="py-16 md:py-24 px-4 border-t-2 border-foreground">
      <ConnectionLines />

      <div className="container mx-auto max-w-4xl">

        <div className="mb-12">
          {/* Section number */}
          <p className="
            font-mono text-sm md:text-base
            mb-4
          ">
            <span className="text-dashed-box">03 / CONNECT</span>
          </p>

          {/* Section title */}
          <h2 className="
            text-4xl md:text-5xl lg:text-6xl
            font-bold
            text-foreground
            tracking-tight mb-4
          ">
            CONTACT
          </h2>

          {/* Blue accent line */}
          <div className="w-16 border-t-4 border-primary" />
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {contactLinks.map((link, index) => (
            <ScrollReveal
              key={link.label}
              direction="up"
              delay={index * 100}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-3
                  px-6 py-4
                  border-2 border-foreground
                  bg-background
                  text-foreground
                  font-medium
                  transition-colors duration-150
                  hover:bg-primary
                  hover:text-primary-foreground
                  hover:border-primary
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                "
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Maksym Syagrovskyy
        </p>
      </div>
    </footer>
  )
}

