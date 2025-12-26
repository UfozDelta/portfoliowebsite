'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
    const pathname = usePathname()

    const navItems = [
        { href: '/#About', label: 'About', hash: '#About' },
        { href: '/#Projects', label: 'Projects', hash: '#Projects' },
        { href: '/#Contact', label: 'Contact', hash: '#Contact' },
    ]

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string | null) => {
        if (hash && pathname === '/') {
            e.preventDefault()
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className="
          sticky top-0 z-50
          w-full
          border-b-2 border-foreground
          bg-background
        ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                      href="/"
                      className="
                        font-bold text-xl md:text-2xl
                        font-mono
                        transition-colors duration-150
                        hover:text-primary
                      "
                    >
                        MS
                    </Link>

                    {/* Navigation Links */}
                    <nav>
                        <ul className="flex items-center gap-1 md:gap-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.hash)}
                                        className="
                                          px-4 py-2
                                          text-base
                                          font-medium
                                          transition-colors duration-150
                                          hover:text-primary
                                          focus-visible:outline-none
                                          focus-visible:ring-2
                                          focus-visible:ring-primary
                                        "
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

