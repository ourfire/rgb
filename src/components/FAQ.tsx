'use client'

import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'Can I choose my color?',
    answer: 'No. Colors are randomly assigned. That\'s the game.',
  },
  {
    question: 'What if I get a common color?',
    answer: 'You still participate in the daily lottery with 1x tickets. You can still win. The odds are just lower.',
  },
  {
    question: 'Where is the metadata stored?',
    answer: '100% on-chain. The smart contract generates SVG and JSON. No IPFS. No external dependencies.',
  },
  {
    question: 'What is composability?',
    answer: 'Your RGB values (R, G, B) can be used by other apps: as XYZ coordinates in 3D metaverses, color codes in domain systems, visual identity in social networks, or seeds for generative art. Developers build on top of these primitives.',
  },
  {
    question: 'Is this a Ponzi?',
    answer: 'No. It\'s a transparent lottery. Rare holders don\'t recruit new holders. Revenue comes from mints, royalties, and ecosystem fees. It\'s all on-chain and auditable.',
  },
  {
    question: 'What happens after sellout?',
    answer: 'Royalties from secondary sales (5%) + fees from app integrations fund the daily lottery perpetually.',
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