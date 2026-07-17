'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function FAQ() {
  const { t } = useLanguage()

  return (
    <section
      id="faq"
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-3xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          {t.faq.title}
        </motion.h2>

        <div className="space-y-6">
          {t.faq.items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-4 sm:p-6 hover:bg-gray-900 transition-colors"
            >
              <div className="font-bold mb-2">{faq.question}</div>
              <div className="text-gray-400">{faq.answer}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
