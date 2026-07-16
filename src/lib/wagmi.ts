'use client'

import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'
import { IS_TESTNET } from './contract'

export const activeChain = IS_TESTNET ? baseSepolia : base

export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors: [
    // MetaMask, Rabby, and any browser wallet
    injected(),
    // Coinbase Smart Wallet: passkey onboarding, no extension required.
    // Ideal for non-crypto-native users.
    coinbaseWallet({ appName: 'RGB', preference: 'all' }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})
