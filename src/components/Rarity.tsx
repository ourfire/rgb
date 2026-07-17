'use client'

import { motion } from 'framer-motion'
import { getContrastColor } from '@/lib/utils'

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

const steps = [
  {
    number: '01',
    title: "Can't be bought",
    description: 'The 8 mythic colors are locked from minting.',
  },
  {
    number: '02',
    title: 'Every mint = 1 ticket',
    description: 'Minting any color enters you in the active round.',
  },
  {
    number: '03',
    title: 'Drawn at milestones',
    description: 'Chainlink VRF picks winners — verifiable, ungameable.',
  },
]

export default function Rarity() {
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
          The Genesis 8
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-center mb-12"
        >
          Black, white, and the 6 pure colors. Can&apos;t be minted — only won.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
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
                className="text-lg font-bold"
                style={{ color: getContrastColor(color.r, color.g, color.b) }}
              >
                {color.hex}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: getContrastColor(color.r, color.g, color.b) }}
              >
                🔒 In raffle
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-8 hover:bg-gray-900 transition-colors"
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
          <p className="text-2xl font-bold mb-6">8 draws. Ever.</p>
          <p className="text-sm text-gray-600">
            Every color also carries an on-chain rarity tier — a free primitive for builders.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
