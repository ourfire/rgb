import { type Address } from 'viem'

// ---------------------------------------------------------------------------
// Chain / contract configuration
// ---------------------------------------------------------------------------
// NEXT_PUBLIC_CHAIN: 'base' | 'baseSepolia'  (defaults to baseSepolia)
// NEXT_PUBLIC_RGB_ADDRESS: deployed RGBToken address for that chain
// ---------------------------------------------------------------------------

export const IS_TESTNET = process.env.NEXT_PUBLIC_CHAIN !== 'base'

export const RGB_ADDRESS = (process.env.NEXT_PUBLIC_RGB_ADDRESS ??
  '0x0000000000000000000000000000000000000000') as Address

export const MINT_PRICE_WEI = 300_000_000_000_000n // 0.0003 ETH
export const MINT_PRICE_LABEL = '0.0003Ξ'
export const MAX_SUPPLY = 16_777_216
export const MAX_PER_TX = 5000

/** The 8 genesis colors — cannot be minted, only won in the raffle. */
export const GENESIS_IDS = new Set<number>([
  0x000000, 0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
])

export const isGenesis = (id: number) => GENESIS_IDS.has(id)

/** RGB channels -> tokenId. The tokenId IS the color. */
export const rgbToTokenId = (r: number, g: number, b: number) =>
  (r << 16) | (g << 8) | b

export const tokenIdToRgb = (id: number) => ({
  r: (id >> 16) & 0xff,
  g: (id >> 8) & 0xff,
  b: id & 0xff,
})

export const basescanUrl = (path: string) =>
  IS_TESTNET
    ? `https://sepolia.basescan.org/${path}`
    : `https://basescan.org/${path}`

// ---------------------------------------------------------------------------
// Minimal ABI — only what the frontend needs
// ---------------------------------------------------------------------------

export const RGB_ABI = [
  {
    type: 'function',
    name: 'ownerOf',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    type: 'function',
    name: 'totalMinted',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'payable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'mintRandom',
    stateMutability: 'payable',
    inputs: [{ name: 'count', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'mintRange',
    stateMutability: 'payable',
    inputs: [
      { name: 'fromId', type: 'uint256' },
      { name: 'toId', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    type: 'event',
    name: 'ColorMinted',
    inputs: [
      { name: 'minter', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'mintIndex', type: 'uint256', indexed: false },
    ],
  },
] as const
