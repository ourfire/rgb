import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RGB - An Artwork as a NFT Evolutive Lottery',
  description: '16,777,216 colors. All on-chain. All unique.',
  keywords: ['NFT', 'RGB', 'lottery', 'on-chain', 'ethereum', 'art', 'colors'],
  authors: [{ name: 'BitSapiens' }],
  openGraph: {
    title: 'RGB - An Artwork as a NFT Evolutive Lottery',
    description: '16,777,216 colors. All on-chain. All unique.',
    url: 'https://rgb.bitsapiens.art',
    siteName: 'RGB',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RGB - An Artwork as a NFT Evolutive Lottery',
    description: '16,777,216 colors. All on-chain. All unique.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}