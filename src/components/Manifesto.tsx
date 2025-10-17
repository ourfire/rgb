'use client'

import { motion } from 'framer-motion'

export default function Manifesto() {
  return (
    <section 
      id="manifesto" 
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-12"
        >
          Why a Lottery?
        </motion.h2>

        <div className="space-y-12">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-lg text-gray-300 leading-relaxed"
          >
            <p>The RGB spectrum is public domain. No one can own "red."</p>
            <p>
              But we can create a fair mechanism to distribute ownership of specific instances.
            </p>
            <p className="text-white">
              A lottery is the only honest way to do this at scale.
            </p>
          </motion.div>

          {/* 01 - Fair Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4 text-white">
              01 — Fair Distribution
            </div>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>No whitelist. No insiders. No pre-mine.</p>
              <p>Pure randomness. Pure fairness.</p>
              <p>
                Everyone pays the same price. Everyone gets a random color. 
                Rare colors get more tickets in the daily lottery, but even common colors can win.
              </p>
              <p className="text-white">
                30% of all revenue goes to the lottery pool. Forever.
              </p>
            </div>
          </motion.div>

          {/* 02 - Historic Scale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4 text-white">
              02 — Historic Scale
            </div>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                16,777,216 mints would be the largest tokenization of a public good in history.
              </p>
              <p>Bigger than any PFP project. Bigger than any generative art collection.</p>
              <p className="text-white">
                The complete digital color space, on-chain forever.
              </p>
            </div>
          </motion.div>

          {/* 03 - Composable Primitives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4 text-white">
              03 — Composable Primitives
            </div>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>Three numbers. 0 to 255 each. 16,777,216 combinations.</p>
              <p>Ready for builders to build on top of:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ XYZ coordinates in 3D metaverses</li>
                <li>→ Color codes in domain name systems</li>
                <li>→ Visual identity in social networks</li>
                <li>→ Procedural seeds for generative art</li>
                <li>→ Palette systems for design tools</li>
              </ul>
              <p className="text-white">
                We provide the spectrum. Builders create the worlds.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}