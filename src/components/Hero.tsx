'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="max-w-4xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 flex items-center justify-center gap-1">
            <span style={{ color: '#FF0000' }}>R</span>
            <span style={{ color: '#00FF00' }}>G</span>
            <span style={{ color: '#0000FF' }}>B</span>
          </div>
          <div className="text-xl md:text-2xl text-gray-400 mb-2">
            A Lottery to Tokenize the RGB Spectrum
          </div>
          <div className="text-sm md:text-base text-gray-500">
            The largest public domain mint in history
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-gray-400 max-w-2xl mx-auto"
        >
          <p className="text-lg">16,777,216 colors. All on-chain. All unique. All fair.</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={() => scrollToSection('preview')}
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Preview Colors
          </button>
          <button
            onClick={() => scrollToSection('waitlist')}
            className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors"
          >
            Join Waitlist
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-gray-800"
        >
          <div>
            <div className="text-2xl font-bold">16.7M</div>
            <div className="text-sm text-gray-500">Total Colors</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0.0001Ξ</div>
            <div className="text-sm text-gray-500">Mint Price</div>
          </div>
          <div>
            <div className="text-2xl font-bold">TBA</div>
            <div className="text-sm text-gray-500">Launch Date</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}