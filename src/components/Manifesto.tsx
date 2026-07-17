'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function Manifesto() {
  const { t } = useLanguage()
  const [line1, line2, line3, line4] = t.manifesto.lines

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
          className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
        >
          <p>{line1}</p>
          <p>{line2}</p>
          <p>{line3}</p>
          <p className="text-white">{line4}</p>
        </motion.div>
      </div>
    </section>
  )
}
