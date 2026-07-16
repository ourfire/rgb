import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RGB - One Color. One Coordinate. One Primitive.',
  description: '16,777,216 colors. One color = one tokenId = one NFT, 100% on-chain, on Base.',
  keywords: ['NFT', 'RGB', 'genesis raffle', 'on-chain', 'base', 'ethereum', 'art', 'colors'],
  authors: [{ name: 'BitSapiens' }],
  openGraph: {
    title: 'RGB - One Color. One Coordinate. One Primitive.',
    description: '16,777,216 colors. One color = one tokenId = one NFT, 100% on-chain, on Base.',
    url: 'https://rgb.tax',
    siteName: 'RGB',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RGB - One Color. One Coordinate. One Primitive.',
    description: '16,777,216 colors. One color = one tokenId = one NFT, 100% on-chain, on Base.',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}