# RGB - One Color. One Coordinate. One Primitive.

16,777,216 colors. One color = one tokenId = one NFT, on-chain, on Base L2.

## About

RGB tokenizes the full RGB color system: every one of the 16,777,216 colors is mintable by choice, first come first served. RGB values double as XYZ coordinates — the color IS a point in the 256³ cube — positioning the collection as an open, CC0 primitive for other builders (3D worlds, identities, games).

8 genesis colors (black, white, and the 6 pure colors) can't be minted directly — they're raffled among minters at public mint milestones via Chainlink VRF.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: JetBrains Mono
- **Web3**: wagmi v2 + viem 2 + @tanstack/react-query (Base L2)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rgb-landing
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
rgb-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Navigation.tsx  # Top navigation
│   │   ├── Hero.tsx        # Hero section (interactive RGB poster)
│   │   ├── Mint.tsx        # Mint dApp (pick / random pack / range)
│   │   ├── Manifesto.tsx   # Project manifesto
│   │   ├── HowItWorks.tsx  # How it works section
│   │   ├── Rarity.tsx      # Rarity tiers + genesis raffle
│   │   ├── FAQ.tsx         # FAQ section
│   │   └── Waitlist.tsx    # Waitlist form
│   └── lib/
│       ├── contract.ts     # ABI, addresses, price, tokenId↔RGB helpers
│       ├── wagmi.ts        # Chain + connector config
│       └── utils.ts        # Utility functions (rarity classification, etc.)
├── public/                 # Static assets
└── package.json
```

## Features

- ✅ Fully responsive design
- ✅ Interactive RGB poster (live channel sweep on hover)
- ✅ Wallet connect (MetaMask/Rabby + Coinbase Smart Wallet)
- ✅ Mint dApp: pick exact color, random pack, or range mint
- ✅ Live on-chain availability check
- ✅ Smooth scroll navigation
- ✅ Animated sections
- ✅ Waitlist form
- ✅ 100% on-chain metadata explanation

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

- `NEXT_PUBLIC_CHAIN` - `baseSepolia` (testnet) or `base` (mainnet)
- `NEXT_PUBLIC_RGB_ADDRESS` - deployed RGBToken contract address

When implementing the waitlist API, you'll also need:
- `WAITLIST_API_URL` - Your waitlist backend endpoint

## Roadmap

- [x] Web3 mint UI (wagmi + Base) on branch `web3-mint`
- [x] Narrative updated across Hero / Rarity / HowItWorks / FAQ / Manifesto
- [ ] Deploy contracts to Base Sepolia + point preview env vars at it
- [ ] End-to-end mint test + security review (Slither + external)
- [ ] Safe multisig treasury
- [ ] Base mainnet deploy, merge `web3-mint` to `main`
- [ ] Mint gallery, genesis milestone countdown, IPFS mirror + ENS, builder docs

## License

CC0 — no rights reserved.

## Links

- Website: [rgb.tax](https://rgb.tax)
- By: [BitSapiens](https://bitsapiens.art)
- Twitter: TBA
- Discord: TBA