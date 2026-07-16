# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**RGB** (rgb.tax) is an on-chain artwork by BitSapiens: the full RGB color system tokenized. 16,777,216 colors — one color = one tokenId = one NFT, on **Base L2**. 100% on-chain metadata and SVG. CC0. RGB values double as XYZ coordinates (the color IS a point in the 256³ cube), positioning the collection as an open primitive for other builders (3D worlds, identities, games).

This repo is the **landing page + mint dApp** (Next.js). The **smart contracts live in a separate Foundry project** (not this repo): `RGBToken.sol` (the ERC721 primitive) and `RGBGenesisRaffle.sol` (Chainlink VRF raffle for the 8 genesis colors).

## Final Design Decisions (do NOT revert to older narratives)

- **Mint by choice**: users pick their exact color, first come first served. Four mint paths in the contract: `mint(tokenId)`, `mintBatch(ids[])`, `mintRange(from,to)` (skips taken/genesis, auto-refunds excess), `mintRandom(count)` (pseudo-random by design — choice mint makes secure randomness pointless). Max 5,000 per tx.
- **Price: 0.0003 ETH**, fixed constant, immutable. Forwarded to treasury (Safe multisig) on every mint.
- **No supply cap beyond the color space itself** (16,777,216).
- **8 Genesis colors** — black (0x000000), white (0xFFFFFF), and the 6 pure colors (0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF) — are **blocked from minting**. They are raffled at public mint milestones: every paid mint = one ticket in the active tranche; winners drawn via **Chainlink VRF v2.5**; draws are permissionless (`requestDraw()`).
- **There is NO daily lottery, NO ticket multipliers by rarity, NO 30% rewards pool.** That was the old narrative. Any copy mentioning it is a bug.
- **Rarity tiers** are a pure on-chain classification (contract `tierOf()`), matching `getRarity()` in `src/lib/utils.ts`: B/W (2, genesis), PURE (6, genesis), GRAYSCALE (254), HARMONY (~196k, two channels exactly equal), VIVID (~390k, a channel at exactly 0 or 255), SPECTRUM (everything else). If web copy and these numbers diverge, these numbers win.
- Tagline evolution: "One color. One coordinate. One primitive." / Manifesto closes with "One primitive to build them all."
- The official NFT image is the **plain color** (no text). The contract also exposes `svgOf(tokenId, labeled)` for a labeled version (hex + RGB + XYZ, auto black/white contrast by luminance).

## Web3 Integration (this repo)

- **Stack**: wagmi v2 + viem 2 + @tanstack/react-query. Connectors: `injected()` (MetaMask/Rabby) and `coinbaseWallet()` (Smart Wallet, passkey onboarding).
- Key files:
  - `src/lib/contract.ts` — minimal ABI, addresses, price, genesis set, tokenId↔RGB helpers, basescan URLs
  - `src/lib/wagmi.ts` — chain + connector config
  - `src/app/providers.tsx` — WagmiProvider + QueryClient wrapper (imported in layout)
  - `src/components/Mint.tsx` — mint UI: RGB sliders + hex input, live availability check (`ownerOf` revert = free), three mint modes (pick / random pack / range), tx states, Basescan links
- **Env vars** (Vercel): `NEXT_PUBLIC_CHAIN` = `baseSepolia` | `base`; `NEXT_PUBLIC_RGB_ADDRESS` = deployed RGBToken address. Testnet shows a yellow TESTNET banner automatically.
- tokenId math: `(r << 16) | (g << 8) | b`. The tokenId IS the color.

## Current Status & Roadmap

- ✅ Contracts written & tested (26/26 Foundry tests, incl. fuzz + full raffle flow) — separate repo/zip
- ✅ Web3 mint UI integrated on branch `web3-mint` (preview on Vercel)
- ✅ Narrative updated across Hero / Rarity / HowItWorks / FAQ / Manifesto
- ⏳ NEXT: deploy to **Base Sepolia** (Foundry script → VRF subscription → `mintGenesis`) → point preview env vars at it → end-to-end mint test → security review (Slither + external) → Safe multisig treasury → Base mainnet → merge `web3-mint` to `main` (Vercel auto-deploys rgb.tax)
- Deliberately deferred: mint gallery (ColorMinted events feed), genesis milestone countdown, IPFS mirror + ENS, builder docs page

## Development Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build — ALWAYS run before committing
npm run lint
```

## Tech Stack & Conventions

- Next.js 14 (App Router), TypeScript strict, Tailwind, Framer Motion, JetBrains Mono
- Path alias `@/*` → `./src/*`
- Dark theme: black bg, white text, `border-gray-800`; primary buttons white bg / secondary border-white; genesis accents use yellow (`text-yellow-500`)
- Framer Motion pattern: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}`
- Page sections in order: Navigation, Hero (RGB poster w/ interactive channel sweep), Mint, Manifesto, HowItWorks, Rarity, FAQ, Waitlist

## Working Agreements

- Work on feature branches (current: `web3-mint`), never push directly to `main` — merging to `main` deploys rgb.tax via Vercel
- `npm run build` must pass before any commit
- Keep dependencies minimal (supply-chain risk: this page will move money)
- Owner is not a professional developer: explain commands before running them, prefer small verifiable steps, ask before destructive operations
- Language: owner communicates in Spanish; code/comments in English
