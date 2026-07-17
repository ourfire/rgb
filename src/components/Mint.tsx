'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import {
  RGB_ABI,
  RGB_ADDRESS,
  MINT_PRICE_WEI,
  MINT_PRICE_LABEL,
  IS_TESTNET,
  isGenesis,
  rgbToTokenId,
  basescanUrl,
} from '@/lib/contract'
import { rgbToHex, getContrastColor, getRarity, type RGBColor } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'

type Mode = 'pick' | 'random' | 'range'

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}

export default function Mint() {
  const { t } = useLanguage()
  const [color, setColor] = useState<RGBColor>({ r: 192, g: 255, b: 238 })
  const [mode, setMode] = useState<Mode>('pick')
  const [randomCount, setRandomCount] = useState(10)
  const [rangeFrom, setRangeFrom] = useState('#100000')
  const [rangeTo, setRangeTo] = useState('#1003E7')
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)

  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: connecting } = useConnect()
  const { disconnect } = useDisconnect()

  const tokenId = rgbToTokenId(color.r, color.g, color.b)
  const debouncedId = useDebounced(tokenId, 400)
  const genesis = isGenesis(tokenId)

  // Availability: ownerOf reverts for unminted tokens => error means FREE.
  const {
    data: owner,
    isError: isFree,
    isLoading: checking,
  } = useReadContract({
    address: RGB_ADDRESS,
    abi: RGB_ABI,
    functionName: 'ownerOf',
    args: [BigInt(debouncedId)],
    query: { enabled: !genesis, retry: false },
  })

  const { writeContract, data: txHash, isPending: signing, error: writeError, reset } =
    useWriteContract()
  const { isLoading: confirming, isSuccess: confirmed } =
    useWaitForTransactionReceipt({ hash: txHash })

  const hex = rgbToHex(color.r, color.g, color.b)

  const parseHex = (s: string): number | null => {
    const m = s.trim().replace(/^#/, '')
    if (!/^[0-9a-fA-F]{6}$/.test(m)) return null
    return parseInt(m, 16)
  }

  const rangeSpan = useMemo(() => {
    const f = parseHex(rangeFrom)
    const t = parseHex(rangeTo)
    if (f === null || t === null || f > t) return null
    return t - f + 1
  }, [rangeFrom, rangeTo])

  const doMint = () => {
    reset()
    if (mode === 'pick') {
      writeContract({
        address: RGB_ADDRESS,
        abi: RGB_ABI,
        functionName: 'mint',
        args: [BigInt(tokenId)],
        value: MINT_PRICE_WEI,
      })
    } else if (mode === 'random') {
      writeContract({
        address: RGB_ADDRESS,
        abi: RGB_ABI,
        functionName: 'mintRandom',
        args: [BigInt(randomCount)],
        value: MINT_PRICE_WEI * BigInt(randomCount),
      })
    } else if (mode === 'range' && rangeSpan) {
      const f = parseHex(rangeFrom)!
      const t = parseHex(rangeTo)!
      writeContract({
        address: RGB_ADDRESS,
        abi: RGB_ABI,
        functionName: 'mintRange',
        args: [BigInt(f), BigInt(t)],
        value: MINT_PRICE_WEI * BigInt(rangeSpan), // excess auto-refunded on-chain
      })
    }
  }

  const busy = signing || confirming

  useEffect(() => {
    if (isConnected) setWalletMenuOpen(false)
  }, [isConnected])

  return (
    <section id="mint" className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t.mint.title}
          </motion.h2>
          <p className="text-gray-400">{t.mint.subtitle(MINT_PRICE_LABEL)}</p>
          {IS_TESTNET && (
            <div className="mt-4 inline-block border border-yellow-600 text-yellow-500 text-xs px-3 py-1">
              {t.mint.testnet}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Color display + availability */}
          <div>
            <div
              className="aspect-square mb-4 relative flex items-center justify-center"
              style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
            >
              <span
                className="text-3xl font-bold"
                style={{ color: getContrastColor(color.r, color.g, color.b) }}
              >
                {hex}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm mb-4">
              <div className="border border-gray-800 p-2 sm:p-3">
                <div className="text-gray-500 mb-1 text-xs sm:text-sm">{t.mint.tokenId}</div>
                <div className="text-xs">{tokenId.toLocaleString()}</div>
              </div>
              <div className="border border-gray-800 p-2 sm:p-3">
                <div className="text-gray-500 mb-1 text-xs sm:text-sm">{t.mint.xyz}</div>
                <div className="text-xs">({color.r}, {color.g}, {color.b})</div>
              </div>
              <div className="border border-gray-800 p-2 sm:p-3">
                <div className="text-gray-500 mb-1 text-xs sm:text-sm">{t.mint.rarity}</div>
                <div className="text-xs">{getRarity(color.r, color.g, color.b)}</div>
              </div>
            </div>

            {/* Live availability */}
            <div className="border border-gray-800 p-4 text-sm">
              {genesis ? (
                <span className="text-yellow-500">{t.mint.genesisWarning}</span>
              ) : checking ? (
                <span className="text-gray-500">{t.mint.checking}</span>
              ) : isFree ? (
                <span className="text-green-400">{t.mint.available}</span>
              ) : owner ? (
                <span className="text-gray-400">
                  {t.mint.takenPrefix}{' '}
                  <a
                    href={basescanUrl(`address/${owner}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    {String(owner).slice(0, 6)}…{String(owner).slice(-4)}
                  </a>
                </span>
              ) : null}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* RGB sliders */}
            <div className="space-y-3">
              {(['r', 'g', 'b'] as const).map((ch) => (
                <div key={ch} className="flex items-center gap-3">
                  <span className="w-4 uppercase text-gray-500">{ch}</span>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={color[ch]}
                    onChange={(e) => setColor({ ...color, [ch]: Number(e.target.value) })}
                    className="flex-1 accent-white"
                  />
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={color[ch]}
                    onChange={(e) =>
                      setColor({
                        ...color,
                        [ch]: Math.min(255, Math.max(0, Number(e.target.value) || 0)),
                      })
                    }
                    className="w-16 bg-black border border-gray-800 px-2 py-1 text-sm"
                  />
                </div>
              ))}
              <input
                type="text"
                value={hex}
                onChange={(e) => {
                  const id = parseHex(e.target.value)
                  if (id !== null) {
                    setColor({ r: (id >> 16) & 255, g: (id >> 8) & 255, b: id & 255 })
                  }
                }}
                className="w-full bg-black border border-gray-800 px-3 py-2 text-sm"
                placeholder="#C0FFEE"
              />
            </div>

            {/* Mode tabs */}
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ['pick', t.mint.modeThisColor],
                  ['random', t.mint.modeRandomPack],
                  ['range', t.mint.modeRange],
                ] as [Mode, string][]
              ).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-2 sm:px-3 py-3 border text-xs transition ${
                    mode === m ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === 'random' && (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-gray-500">{t.mint.count}</span>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={randomCount}
                  onChange={(e) =>
                    setRandomCount(Math.min(5000, Math.max(1, Number(e.target.value) || 1)))
                  }
                  className="w-24 bg-black border border-gray-800 px-2 py-1"
                />
                <span className="text-gray-500">
                  = {(Number(MINT_PRICE_WEI) / 1e18 * randomCount).toFixed(4)} ETH
                </span>
              </div>
            )}

            {mode === 'range' && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={rangeFrom}
                    onChange={(e) => setRangeFrom(e.target.value)}
                    className="flex-1 min-w-0 bg-black border border-gray-800 px-2 py-1"
                    placeholder="#100000"
                  />
                  <span className="text-gray-500">→</span>
                  <input
                    type="text"
                    value={rangeTo}
                    onChange={(e) => setRangeTo(e.target.value)}
                    className="flex-1 min-w-0 bg-black border border-gray-800 px-2 py-1"
                    placeholder="#1003E7"
                  />
                </div>
                <p className="text-gray-500">
                  {rangeSpan === null
                    ? t.mint.invalidRange
                    : rangeSpan > 5000
                      ? t.mint.rangeTooLarge(rangeSpan.toLocaleString())
                      : t.mint.rangeOk(rangeSpan.toLocaleString())}
                </p>
              </div>
            )}

            {/* Wallet / Mint */}
            {!isConnected ? (
              <button
                onClick={() => setWalletMenuOpen(true)}
                className="w-full px-6 py-4 bg-white text-black hover:bg-gray-200 transition-colors"
              >
                {t.mint.connectWallet}
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={doMint}
                  disabled={
                    busy ||
                    (mode === 'pick' && (genesis || !isFree)) ||
                    (mode === 'range' && (rangeSpan === null || rangeSpan > 5000))
                  }
                  className="w-full px-6 py-4 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {signing
                    ? t.mint.confirmInWallet
                    : confirming
                      ? t.mint.minting
                      : mode === 'pick'
                        ? t.mint.mintThisColor(hex, MINT_PRICE_LABEL)
                        : mode === 'random'
                          ? t.mint.mintRandom(randomCount)
                          : t.mint.mintRange}
                </button>
                <button
                  onClick={() => disconnect()}
                  className="w-full text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {address?.slice(0, 6)}…{address?.slice(-4)} — {t.mint.disconnect}
                </button>
              </div>
            )}

            {confirmed && txHash && (
              <div className="border border-green-800 text-green-400 p-4 text-sm">
                {t.mint.minted}{' '}
                <a
                  href={basescanUrl(`tx/${txHash}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {t.mint.viewOnBasescan}
                </a>
              </div>
            )}
            {writeError && (
              <div className="border border-red-900 text-red-400 p-4 text-xs break-all">
                {writeError.message.split('\n')[0]}
              </div>
            )}
          </div>
        </div>
      </div>

      {walletMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setWalletMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm border border-gray-800 bg-black p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">{t.mint.connectWallet}</span>
              <button
                onClick={() => setWalletMenuOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {connectors.map((c) => (
                <button
                  key={c.uid}
                  onClick={() => connect({ connector: c })}
                  disabled={connecting}
                  className="w-full px-4 py-3 border border-gray-800 hover:bg-gray-900 transition-colors disabled:opacity-50 text-left"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
