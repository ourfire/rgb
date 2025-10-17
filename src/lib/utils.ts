import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export interface RGBColor {
  r: number
  g: number
  b: number
}

export function generateRandomColor(): RGBColor {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function getContrastColor(r: number, g: number, b: number): string {
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance > 128 ? '#000000' : '#FFFFFF'
}

export type RarityTier = 'B/W' | 'PURE COLORS' | 'GRAYSCALE' | 'HARMONY' | 'VIVID' | 'SPECTRUM'

export function getRarity(r: number, g: number, b: number): RarityTier {
  // B/W (Black & White)
  if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)) {
    return 'B/W'
  }
  
  // PURE COLORS (Primary & Secondary)
  if (
    (r === 255 && g === 0 && b === 0) ||
    (r === 0 && g === 255 && b === 0) ||
    (r === 0 && g === 0 && b === 255) ||
    (r === 255 && g === 255 && b === 0) ||
    (r === 255 && g === 0 && b === 255) ||
    (r === 0 && g === 255 && b === 255)
  ) {
    return 'PURE COLORS'
  }
  
  // GRAYSCALE (Perfect grayscale)
  if (r === g && g === b) {
    return 'GRAYSCALE'
  }
  
  // HARMONY (Two channels equal)
  if (r === g || g === b || r === b) {
    return 'HARMONY'
  }
  
  // VIVID (Extreme values)
  if (r < 20 || r > 235 || g < 20 || g > 235 || b < 20 || b > 235) {
    return 'VIVID'
  }
  
  // SPECTRUM (Everything else)
  return 'SPECTRUM'
}

export function downloadColorImage(
  color: RGBColor,
  showText: boolean,
  textSize: 'small' | 'normal' | 'large',
  textPosition: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
) {
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 1000
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return
  
  // Fill background
  ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
  ctx.fillRect(0, 0, 1000, 1000)
  
  // Add text if visible
  if (showText) {
    const fontSize = textSize === 'small' ? 32 : textSize === 'large' ? 84 : 62
    ctx.font = `bold ${fontSize}px monospace`
    ctx.fillStyle = getContrastColor(color.r, color.g, color.b)
    ctx.textBaseline = 'middle'
    
    let x = 500
    let y = 500
    ctx.textAlign = 'center'
    
    if (textPosition === 'top-left') {
      x = 100
      y = 100
      ctx.textAlign = 'left'
    } else if (textPosition === 'top-right') {
      x = 900
      y = 100
      ctx.textAlign = 'right'
    } else if (textPosition === 'bottom-left') {
      x = 100
      y = 900
      ctx.textAlign = 'left'
    } else if (textPosition === 'bottom-right') {
      x = 900
      y = 900
      ctx.textAlign = 'right'
    }
    
    ctx.fillText(`(${color.r}, ${color.g}, ${color.b})`, x, y)
  }
  
  // Download
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RGB-${color.r}-${color.g}-${color.b}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  })
}