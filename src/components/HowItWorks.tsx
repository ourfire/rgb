'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Mint',
    description: '0.0001 ETH. Random color.',
  },
  {
    number: '02',
    title: 'Win',
    description: 'Daily lottery. Rare = more chances.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'RGB = XYZ. Composable primitives.',
  },
]

export default function HowItWorks() {
  return (
    <section 
      id="how" 
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
          How
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border border-gray-800 p-8 hover:bg-gray-900 transition-colors"
            >
              <div className="text-4xl font-bold mb-4 text-gray-500">
                {step.number}
              </div>
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
          className="mt-12 text-center"
        >
          <p className="text-gray-500">On-chain. Forever.</p>
        </motion.div>
      </div>
    </section>
  )
}