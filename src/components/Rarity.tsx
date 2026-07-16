'use client'

import { motion } from 'framer-motion'

const rarityTiers = [
  {
    name: 'B/W',
    count: '2',
    badge: '★ GENESIS',
    description: 'Black & White',
    share: '0.000012%',
  },
  {
    name: 'PURE',
    count: '6',
    badge: '★ GENESIS',
    description: 'Primary & Secondary',
    share: '0.000036%',
  },
  {
    name: 'GRAYSCALE',
    count: '254',
    badge: 'mintable',
    description: 'Perfect Grayscale',
    share: '0.0015%',
  },
  {
    name: 'HARMONY',
    count: '~196k',
    badge: 'mintable',
    description: 'Two Channels Equal',
    share: '1.2%',
  },
  {
    name: 'VIVID',
    count: '~390k',
    badge: 'mintable',
    description: 'A Channel at 0 or 255',
    share: '2.3%',
  },
  {
    name: 'SPECTRUM',
    count: '~16.2M',
    badge: 'mintable',
    description: 'Everything Else',
    share: '96.5%',
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
          Rarity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-center mb-12"
        >
          Computed on-chain from pure math. Anyone can build on it.
        </motion.p>

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
                <div
                  className={`text-sm font-bold ${
                    tier.badge.includes('GENESIS') ? 'text-yellow-500' : 'text-gray-600'
                  }`}
                >
                  {tier.badge}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>{tier.description}</div>
                <div>{tier.share}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="border border-yellow-900 p-8"
        >
          <div className="text-xl font-bold mb-4 text-yellow-500">★ The Genesis Raffle</div>
          <p className="text-gray-400 mb-4">
            The 8 mythic colors — black, white, and the 6 pure colors — cannot be bought.
            They are raffled at public mint milestones: every paid mint is one ticket in
            the active round.
          </p>
          <p className="text-gray-400">
            Winners are drawn with Chainlink VRF. Verifiable, permissionless, impossible to game.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
