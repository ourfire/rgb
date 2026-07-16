'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// The artwork explaining itself: three channels, three letters, 0-255.
// Hover / touch each letter to sweep its channel value.
const CHANNELS = [
  { letter: 'R', color: (v: number) => `rgb(${v}, 0, 0)`, pure: '#FF0000' },
  { letter: 'G', color: (v: number) => `rgb(0, ${v}, 0)`, pure: '#00FF00' },
  { letter: 'B', color: (v: number) => `rgb(0, 0, ${v})`, pure: '#0000FF' },
]

function Channel({
  letter,
  color,
  pure,
  delay,
}: {
  letter: string
  color: (v: number) => string
  pure: string
  delay: number
}) {
  const [value, setValue] = useState<number | null>(null)

  const handleMove = (clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const t = 1 - (clientY - rect.top) / rect.height // bottom=0, top=255
    setValue(Math.round(Math.min(1, Math.max(0, t)) * 255))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="relative flex-1 flex items-center justify-center select-none cursor-crosshair"
      onMouseMove={(e) => handleMove(e.clientY, e.currentTarget)}
      onMouseLeave={() => setValue(null)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY, e.currentTarget)}
      onTouchEnd={() => setValue(null)}
    >
      {/* Vertical 0-255 / live value */}
      <span
        className="absolute font-bold whitespace-nowrap text-[22vw] sm:text-[8rem] md:text-[11rem] leading-none tracking-tight"
        style={{
          color: value === null ? pure : color(Math.max(value, 40)),
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        {value === null ? '0-255' : String(value).padStart(3, '0')}
      </span>

      {/* Translucent letter on top */}
      <span
        className="relative font-black text-[38vw] sm:text-[14rem] md:text-[19rem] leading-none text-white mix-blend-overlay opacity-70"
        style={value !== null ? { color: color(value), mixBlendMode: 'normal', opacity: 0.85 } : undefined}
      >
        {letter}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 px-4">
      {/* The RGB poster */}
      <div className="flex w-full max-w-6xl mx-auto h-[52vh] sm:h-[56vh]">
        {CHANNELS.map((c, i) => (
          <Channel key={c.letter} {...c} delay={i * 0.15} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 text-gray-500 space-y-2"
        >
          <div className="text-xl md:text-2xl text-gray-400">16,777,216 colors</div>
          <p>One color. One coordinate. One primitive.</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={() => scrollToSection('mint')}
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Mint
          </button>
          <button
            onClick={() => scrollToSection('waitlist')}
            className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors"
          >
            Waitlist
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 gap-8 max-w-md mx-auto pt-8 border-t border-gray-800 pb-8"
        >
          <div>
            <div className="text-2xl font-bold">0.0003Ξ</div>
            <div className="text-sm text-gray-500">Price</div>
          </div>
          <div>
            <div className="text-2xl font-bold">TBA</div>
            <div className="text-sm text-gray-500">Launch</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
