import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Preview from '@/components/Preview'
import Manifesto from '@/components/Manifesto'
import HowItWorks from '@/components/HowItWorks'
import Rarity from '@/components/Rarity'
import FAQ from '@/components/FAQ'
import Waitlist from '@/components/Waitlist'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Preview />
      <Manifesto />
      <HowItWorks />
      <Rarity />
      <FAQ />
      <Waitlist />
      
      {/* Footer */}
      <footer className="border-t border-gray-800 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>RGB © 2025. All rights reserved. Built on Ethereum.</p>
          <p className="mt-2">by <a href="https://bitsapiens.art" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">BitSapiens</a></p>
        </div>
      </footer>
    </main>
  )
}