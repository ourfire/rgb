'use client'

import { motion } from 'framer-motion'
import { getContrastColor } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'

const GENESIS_COLORS = [
  { hex: '#000000', r: 0, g: 0, b: 0 },
  { hex: '#FFFFFF', r: 255, g: 255, b: 255 },
  { hex: '#FF0000', r: 255, g: 0, b: 0 },
  { hex: '#00FF00', r: 0, g: 255, b: 0 },
  { hex: '#0000FF', r: 0, g: 0, b: 255 },
  { hex: '#FFFF00', r: 255, g: 255, b: 0 },
  { hex: '#FF00FF', r: 255, g: 0, b: 255 },
  { hex: '#00FFFF', r: 0, g: 255, b: 255 },
]

export default function Rarity() {
  const { t } = useLanguage()

  return (
    <section
      id="rarity"
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
        >
          {t.rarity.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-center mb-12 px-2"
        >
          {t.rarity.subtitle}
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {GENESIS_COLORS.map((color, index) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`aspect-square flex flex-col items-center justify-center gap-2 ${
                color.hex === '#000000' ? 'border border-gray-800' : ''
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <div
                className="text-sm sm:text-lg font-bold"
                style={{ color: getContrastColor(color.r, color.g, color.b) }}
              >
                {color.hex}
              </div>
              <div
                className="text-[10px] sm:text-xs opacity-70 text-center px-1"
                style={{ color: getContrastColor(color.r, color.g, color.b) }}
              >
                {t.rarity.inRaffle}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {t.rarity.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-6 sm:p-8 hover:bg-gray-900 transition-colors"
            >
              <div className="text-4xl font-bold mb-4 text-gray-500">{step.number}</div>
              <div className="text-xl font-bold mb-4">{step.title}</div>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl font-bold mb-6">{t.rarity.closing}</p>
          <p className="text-sm text-gray-600 px-2">{t.rarity.footnote}</p>
        </motion.div>
      </div>
    </section>
  )
}
