'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  generateRandomColor, 
  rgbToHex, 
  getContrastColor, 
  getRarity, 
  downloadColorImage,
  type RGBColor 
} from '@/lib/utils'

type TextSize = 'small' | 'normal' | 'large'
type TextPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export default function Preview() {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 255, b: 0 })
  const [showText, setShowText] = useState(true)
  const [textSize, setTextSize] = useState<TextSize>('normal')
  const [textPosition, setTextPosition] = useState<TextPosition>('center')

  // Generate random color on mount
  useEffect(() => {
    setColor(generateRandomColor())
  }, [])
  const getTextSizeClass = () => {
    if (textSize === 'small') return 'text-xl'        // ~20px
    if (textSize === 'large') return 'text-4xl'       // ~36px
    return 'text-2xl'                                  // ~24px (normal, más pequeño)
  }
  const getTextPositionClass = () => {
    if (textPosition === 'top-left') return 'top-4 left-4'
    if (textPosition === 'top-right') return 'top-4 right-4'
    if (textPosition === 'bottom-left') return 'bottom-4 left-4'
    if (textPosition === 'bottom-right') return 'bottom-4 right-4'
    return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }

  const handleDownload = () => {
    downloadColorImage(color, showText, textSize, textPosition)
  }

  return (
    <section 
      id="preview" 
      className="min-h-screen flex items-center justify-center px-4 py-20 border-t border-gray-800"
    >
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            See what you might get. Colors are assigned randomly.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Color Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="aspect-square mb-4 relative overflow-hidden"
              style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
            >
              {showText && (
                <span
                  className={`font-bold drop-shadow-lg absolute ${getTextSizeClass()} ${getTextPositionClass()}`}
                  style={{ color: getContrastColor(color.r, color.g, color.b) }}
                >
                  ({color.r}, {color.g}, {color.b})
                </span>
              )}
            </div>

            {/* Color Info */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="border border-gray-800 p-3">
                <div className="text-gray-500 mb-1">RGB</div>
                <div className="text-xs">({color.r}, {color.g}, {color.b})</div>
              </div>
              <div className="border border-gray-800 p-3">
                <div className="text-gray-500 mb-1">Hex</div>
                <div>{rgbToHex(color.r, color.g, color.b)}</div>
              </div>
              <div className="border border-gray-800 p-3">
                <div className="text-gray-500 mb-1">Rarity</div>
                <div className="text-xs">{getRarity(color.r, color.g, color.b)}</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <div className="text-sm text-gray-500 mb-2">Display Options</div>
              <div className="space-y-2">
                <button
                  onClick={() => setShowText(!showText)}
                  className={`w-full text-left px-4 py-3 border transition ${
                    showText ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {showText ? '✓ ' : ''}Show RGB Values
                </button>

                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'normal', 'large'] as TextSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setTextSize(size)}
                      className={`px-3 py-3 border transition text-xs capitalize ${
                        textSize === size ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTextPosition('top-left')}
                    className={`px-2 py-3 border transition text-xs ${
                      textPosition === 'top-left' ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Top L
                  </button>
                  <button
                    onClick={() => setTextPosition('center')}
                    className={`px-2 py-3 border transition text-xs ${
                      textPosition === 'center' ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Center
                  </button>
                  <button
                    onClick={() => setTextPosition('top-right')}
                    className={`px-2 py-3 border transition text-xs ${
                      textPosition === 'top-right' ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Top R
                  </button>
                  <button
                    onClick={() => setTextPosition('bottom-left')}
                    className={`px-2 py-3 border transition text-xs ${
                      textPosition === 'bottom-left' ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Bot L
                  </button>
                  <div></div>
                  <button
                    onClick={() => setTextPosition('bottom-right')}
                    className={`px-2 py-3 border transition text-xs ${
                      textPosition === 'bottom-right' ? 'border-white bg-gray-900' : 'border-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Bot R
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setColor(generateRandomColor())}
              className="w-full px-6 py-4 bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Generate Random Color
            </button>

            <button
              onClick={handleDownload}
              className="w-full px-6 py-4 border border-white hover:bg-white hover:text-black transition-colors"
            >
              Download Image
            </button>

            <div className="text-sm text-gray-500 border border-gray-800 p-4">
              <p className="mb-2">Each value ranges from 0 to 255.</p>
              <p>Note: Actual mints are random. You cannot choose your color.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}