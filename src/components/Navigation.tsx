'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const sections = [
    { id: 'hero', name: t.nav.home },
    { id: 'mint', name: t.nav.mint },
    { id: 'manifesto', name: t.nav.about },
    { id: 'how', name: t.nav.how },
    { id: 'rarity', name: t.nav.genesis },
  ]

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
    setMobileOpen(false)
  }

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || mobileOpen ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
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

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="text-xs text-gray-400 hover:text-white border border-gray-800 px-2 py-1.5 transition-colors"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>

            {/* CTA Button */}
            <button
              onClick={scrollToWaitlist}
              className="hidden sm:block px-4 py-2 bg-white text-black text-sm hover:bg-gray-200 transition-colors"
            >
              {t.nav.joinWaitlist}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 items-center"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-5 bg-white transition-transform ${mobileOpen ? 'translate-y-[3px] rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-5 bg-white transition-transform ${mobileOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col border-t border-gray-800 py-4 gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-left text-sm text-gray-400 hover:text-white transition-colors"
              >
                {section.name}
              </button>
            ))}
            <button
              onClick={scrollToWaitlist}
              className="sm:hidden px-4 py-3 bg-white text-black text-sm hover:bg-gray-200 transition-colors"
            >
              {t.nav.joinWaitlist}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
