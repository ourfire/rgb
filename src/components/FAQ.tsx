'use client'

import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'Can I choose my color?',
    answer: 'No. Random only.',
  },
  {
    question: 'What do I get?',
    answer: 'One unique color. RGB values. XYZ coordinates.',
  },
  {
    question: 'Where is metadata?',
    answer: '100% on-chain.',
  },
  {
    question: 'What is the lottery?',
    answer: 'Daily draw. Rare colors = more tickets. 30% of revenue to winners.',
  },
  {
    question: 'What can I build?',
    answer: '3D worlds, domains, identities, art. RGB = XYZ.',
  },
]

export default function FAQ() {
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
          FAQ
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-6 hover:bg-gray-900 transition-colors"
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