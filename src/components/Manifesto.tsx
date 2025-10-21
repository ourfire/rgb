'use client'

import { motion } from 'framer-motion'

export default function Manifesto() {
  return (
    <section 
      id="manifesto" 
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8 text-xl md:text-2xl text-gray-400 leading-relaxed"
        >
          <p>One NFT.</p>
          <p>One color.</p>
          <p>One XYZ coordinate.</p>
          <p className="text-white">A lottery to sell them all.</p>
        </motion.div>
      </div>
    </section>
  )
}