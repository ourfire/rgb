'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'preview', name: 'Preview' },
  { id: 'manifesto', name: 'About' },
  { id: 'how', name: 'How It Works' },
  { id: 'rarity', name: 'Rarity' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-0.5 text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <span style={{ color: '#FF0000' }}>R</span>
            <span style={{ color: '#00FF00' }}>G</span>
            <span style={{ color: '#0000FF' }}>B</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToWaitlist}
            className="px-4 py-2 bg-white text-black text-sm hover:bg-gray-200 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  )
}