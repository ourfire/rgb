# RGB - An Artwork as a NFT Evolutive Lottery

16,777,216 colors. All on-chain. All unique.

## About

RGB is a lottery in its mechanics, an artwork in its concept, and the complete RGB spectrum tokenized on-chain for builders to create on top of.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: JetBrains Mono

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
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Preview.tsx     # Color preview tool
│   │   ├── Manifesto.tsx   # Project manifesto
│   │   ├── HowItWorks.tsx  # How it works section
│   │   ├── Rarity.tsx      # Rarity tiers
│   │   ├── FAQ.tsx         # FAQ section
│   │   └── Waitlist.tsx    # Waitlist form
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/                 # Static assets
└── package.json
```

## Features

- ✅ Fully responsive design
- ✅ Interactive color preview tool
- ✅ Download color images
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

Currently no environment variables are required for the static site.

When implementing the waitlist API, you'll need:
- `WAITLIST_API_URL` - Your waitlist backend endpoint

## Roadmap

- [ ] Connect waitlist to backend
- [ ] Add social media links
- [ ] Implement analytics
- [ ] Add more interactive elements
- [ ] Connect to smart contracts (Phase 2)

## License

All rights reserved © 2025 BitSapiens

## Links

- Website: [rgb.bitsapiens.art](https://rgb.bitsapiens.art)
- Twitter: TBA
- Discord: TBA