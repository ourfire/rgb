# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RGB is an NFT lottery/artwork project that tokenizes all 16,777,216 RGB colors on-chain. The landing page showcases the concept with an interactive color preview tool, rarity system, and waitlist functionality.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom RGB color configuration
- **Animations**: Framer Motion
- **Font**: JetBrains Mono (monospace)

## Architecture

### Page Structure

The application is a single-page layout (`src/app/page.tsx`) with sequential sections:
1. Navigation (sticky header with smooth scroll links)
2. Hero
3. Preview (interactive color tool)
4. Manifesto
5. How It Works
6. Rarity
7. FAQ
8. Waitlist

All components are client-side rendered where interactivity is needed (Preview, Waitlist).

### Path Aliases

The project uses `@/*` to alias `./src/*` - always use this for imports:
```typescript
import { generateRandomColor } from '@/lib/utils'
import Navigation from '@/components/Navigation'
```

### Color System

The core color utilities (`src/lib/utils.ts`) provide:
- `RGBColor` type: `{ r: number, g: number, b: number }`
- `generateRandomColor()`: Generates random RGB values (0-255)
- `rgbToHex()`: Converts RGB to hex format
- `getContrastColor()`: Returns black or white for text contrast
- `getRarity()`: Classifies colors into 6 rarity tiers based on specific RGB patterns

**Rarity Tiers** (in order of rarity):
1. **B/W**: Pure black (0,0,0) or white (255,255,255)
2. **PURE COLORS**: Primary/secondary colors (pure red, green, blue, cyan, magenta, yellow)
3. **GRAYSCALE**: All three channels equal
4. **HARMONY**: Two channels equal
5. **VIVID**: At least one channel <20 or >235
6. **SPECTRUM**: Everything else

### Preview Component

The Preview section (`src/components/Preview.tsx`) is the most complex component:
- Generates random colors on mount
- Allows text overlay customization (size: small/normal/large, position: 5 positions)
- Downloads 1000x1000px PNG images with Canvas API
- Uses Framer Motion for scroll-triggered animations

### Styling Conventions

- Uses dark theme (black background, white text)
- Custom Tailwind colors: `rgb-red`, `rgb-green`, `rgb-blue` (all #FF0000, #00FF00, #0000FF)
- Custom animations: `fade-in`, `slide-up`
- Consistent border color: `border-gray-800`
- Button patterns: white bg for primary actions, border-white for secondary

### Framer Motion Patterns

All sections use consistent animation pattern:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

## Key Implementation Details

### Image Download Functionality

The `downloadColorImage()` function in `src/lib/utils.ts` creates a canvas element, renders the color with optional text overlay, and triggers a download. Text sizing and positioning are converted from UI values to canvas coordinates.

### TypeScript Configuration

- Strict mode is enabled
- Module resolution uses "bundler" (Next.js 14 default)
- Path mapping configured for `@/*` alias

## Future Integration Points

Based on README roadmap:
- Waitlist form (`src/components/Waitlist.tsx`) currently client-side only - will need backend integration via `WAITLIST_API_URL` env variable
- Smart contract integration planned for Phase 2
- Analytics integration planned
- Social media links to be added

## Deployment

Designed for Vercel deployment (auto-detected as Next.js project). No environment variables currently required for static site functionality.
