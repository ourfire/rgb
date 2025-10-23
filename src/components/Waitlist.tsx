'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [wallet, setWallet] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Email validation
    if (!email) {
      setError('Email address is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Wallet validation (optional)
    if (wallet && !wallet.startsWith('0x')) {
      setError('Please enter a valid Ethereum address')
      return
    }

    if (wallet && wallet.length !== 42) {
      setError('Ethereum address must be 42 characters')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement actual API call when ready
      // For now, just simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Submission:', { email, wallet: wallet || 'Not provided' })
      setIsSubmitted(true)
      setEmail('')
      setWallet('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="waitlist" 
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-2xl w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Waitlist
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-12"
        >
          Be the first to know when the mint goes live.
        </motion.p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-gray-800 p-8"
          >
            <div className="text-2xl mb-4">✓</div>
            <p className="text-gray-400">
              Thank you for joining! We'll notify you when the mint is ready.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-sm text-gray-500 hover:text-white transition-colors"
            >
              Submit another
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email Address*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 bg-black border border-gray-800 focus:border-white outline-none transition-colors"
            />

            <input
              type="text"
              placeholder="Wallet Address (Optional)"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full px-6 py-4 bg-black border border-gray-800 focus:border-white outline-none transition-colors"
            />

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </motion.form>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-12 border-t border-gray-800"
        >
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <a href="https://x.com/rgbtax" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="https://github.com/bitsapiens" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}