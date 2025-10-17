'use client'

import { motion } from 'framer-motion'

const rarityTiers = [
  {
    name: 'B/W',
    count: '2',
    multiplier: '1000x',
    description: 'Black & White',
    probability: '0.000012%',
  },
  {
    name: 'PURE COLORS',
    count: '6',
    multiplier: '100x',
    description: 'Primary & Secondary',
    probability: '0.000036%',
  },
  {
    name: 'GRAYSCALE',
    count: '256',
    multiplier: '10x',
    description: 'Perfect Grayscale',
    probability: '0.0015%',
  },
  {
    name: 'HARMONY',
    count: '~838k',
    multiplier: '2x',
    description: 'Two Channels Equal',
    probability: '5%',
  },
  {
    name: 'VIVID',
    count: '~3.3M',
    multiplier: '1.5x',
    description: 'Extreme Values',
    probability: '20%',
  },
  {
    name: 'SPECTRUM',
    count: '~12.5M',
    multiplier: '1x',
    description: 'Everything Else',
    probability: '75%',
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
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          Rarity & Rewards
        </motion.h2>

        <div className="space-y-4 mb-12">
          {rarityTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-6 hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold">{tier.name}</div>
                  <div className="text-sm text-gray-500">{tier.count} colors</div>
                </div>
                <div className="text-sm font-bold">{tier.multiplier} tickets</div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>{tier.description}</div>
                <div>{tier.probability}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="border border-gray-800 p-8"
        >
          <div className="text-xl font-bold mb-4">Daily Lottery</div>
          <p className="text-gray-400 mb-4">
            30% of all mints go to a daily rewards pool. 10 winners are drawn every 24 hours. 
            Your chances are proportional to your color's rarity.
          </p>
          <p className="text-gray-400">
            More tickets = better odds. But everyone can win.
          </p>
        </motion.div>
      </div>
    </section>
  )
}