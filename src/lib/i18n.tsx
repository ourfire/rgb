'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'

const en = {
  nav: {
    home: 'Home',
    mint: 'Mint',
    about: 'About',
    how: 'How It Works',
    genesis: 'Genesis',
    joinWaitlist: 'Join Waitlist',
  },
  hero: {
    colors: '16,777,216 colors',
    tagline: 'One color. One coordinate. One primitive.',
    mint: 'Mint',
    waitlist: 'Waitlist',
    price: 'Price',
    launch: 'Launch',
    launchValue: 'TBA',
  },
  manifesto: {
    lines: ['One NFT.', 'One color.', 'One XYZ coordinate.', 'One primitive to build them all.'],
  },
  how: {
    title: 'How',
    steps: [
      { number: '01', title: 'Mint', description: '0.0003 ETH. Pick your exact color — or mint random packs.' },
      { number: '02', title: 'Win', description: 'Every mint is a genesis raffle ticket. 8 mythic colors, drawn at milestones.' },
      { number: '03', title: 'Build', description: 'RGB = XYZ. Composable primitives.' },
    ],
    footer: 'On-chain. Forever.',
  },
  rarity: {
    title: 'The Genesis 8',
    subtitle: "Black, white, and the 6 pure colors. Can't be minted — only won.",
    inRaffle: '🔒 In raffle',
    steps: [
      { number: '01', title: "Can't be bought", description: 'The 8 mythic colors are locked from minting.' },
      { number: '02', title: 'Every mint = 1 ticket', description: 'Minting any color enters you in the active round.' },
      { number: '03', title: 'Drawn at milestones', description: 'Chainlink VRF picks winners — verifiable, ungameable.' },
    ],
    closing: '8 draws. Ever.',
    footnote: 'Every color also carries an on-chain rarity tier — a free primitive for builders.',
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'Can I choose my color?',
        answer:
          'Yes. Pick any free color, first come first served. Random packs and range sweeps are also available. Only the 8 genesis colors (black, white, and the 6 pure colors) cannot be chosen — they are raffled among minters at public milestones.',
      },
      { question: 'What do I get?', answer: 'One unique color. RGB values. XYZ coordinates.' },
      { question: 'Where is metadata?', answer: '100% on-chain.' },
      {
        question: 'What is the genesis raffle?',
        answer:
          "The 8 mythic colors cannot be minted. At public mint milestones, one is raffled among that round's minters via Chainlink VRF. Every paid mint = one ticket.",
      },
      { question: 'What can I build?', answer: '3D worlds, domains, identities, art. RGB = XYZ.' },
    ],
  },
  mint: {
    title: 'Mint',
    subtitle: (price: string) => `Pick your exact color. First come, first served. ${price} each.`,
    testnet: 'TESTNET — Base Sepolia',
    tokenId: 'Token ID',
    xyz: 'XYZ',
    rarity: 'Rarity',
    genesisWarning: '★ GENESIS — this color cannot be minted. It can only be won in the raffle.',
    checking: 'Checking availability…',
    available: '✓ Available',
    takenPrefix: '✗ Taken — owned by',
    modeThisColor: 'This color',
    modeRandomPack: 'Random pack',
    modeRange: 'Range',
    count: 'Count',
    invalidRange: 'Invalid range',
    rangeTooLarge: (n: string) => `${n} colors — max 5,000 per tx`,
    rangeOk: (n: string) => `${n} colors · taken ones are skipped, excess ETH refunded`,
    connectWallet: 'Connect Wallet',
    confirmInWallet: 'Confirm in wallet…',
    minting: 'Minting…',
    mintThisColor: (hex: string, price: string) => `Mint ${hex} — ${price}`,
    mintRandom: (n: number) => `Mint ${n} random`,
    mintRange: 'Mint range',
    disconnect: 'disconnect',
    minted: '✓ Minted!',
    viewOnBasescan: 'View on Basescan',
  },
  waitlist: {
    title: 'Waitlist',
    subtitle: 'Be the first to know when the mint goes live.',
    thankYou: "Thank you for joining! We'll notify you when the mint is ready.",
    submitAnother: 'Submit another',
    emailPlaceholder: 'Email Address*',
    walletPlaceholder: 'Wallet Address (Optional)',
    submit: 'Submit',
    submitting: 'Submitting...',
    errors: {
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      walletInvalid: 'Please enter a valid Ethereum address',
      walletLength: 'Ethereum address must be 42 characters',
      generic: 'Something went wrong. Please try again.',
    },
    twitter: 'Twitter',
    discord: 'Discord',
    github: 'GitHub',
  },
}

const es: typeof en = {
  nav: {
    home: 'Inicio',
    mint: 'Mint',
    about: 'Acerca',
    how: 'Cómo Funciona',
    genesis: 'Genesis',
    joinWaitlist: 'Unirse',
  },
  hero: {
    colors: '16.777.216 colores',
    tagline: 'Un color. Una coordenada. Un primitivo.',
    mint: 'Mint',
    waitlist: 'Waitlist',
    price: 'Precio',
    launch: 'Lanzamiento',
    launchValue: 'A confirmar',
  },
  manifesto: {
    lines: ['Un NFT.', 'Un color.', 'Una coordenada XYZ.', 'Un primitivo para construirlos todos.'],
  },
  how: {
    title: 'Cómo',
    steps: [
      { number: '01', title: 'Mint', description: '0.0003 ETH. Elige tu color exacto — o mintea packs aleatorios.' },
      { number: '02', title: 'Gana', description: 'Cada mint es un ticket para el genesis raffle. 8 colores míticos, sorteados en hitos.' },
      { number: '03', title: 'Construye', description: 'RGB = XYZ. Primitivos componibles.' },
    ],
    footer: 'On-chain. Para siempre.',
  },
  rarity: {
    title: 'The Genesis 8',
    subtitle: 'Negro, blanco y los 6 colores puros. No se pueden mintear — solo ganar.',
    inRaffle: '🔒 En sorteo',
    steps: [
      { number: '01', title: 'No se compran', description: 'Los 8 colores míticos están bloqueados para el mint.' },
      { number: '02', title: 'Cada mint = 1 ticket', description: 'Mintear cualquier color te entra en la ronda activa.' },
      { number: '03', title: 'Sorteo en hitos', description: 'Chainlink VRF elige a los ganadores — verificable, imposible de manipular.' },
    ],
    closing: '8 sorteos. Para siempre.',
    footnote: 'Cada color también tiene una categoría de rareza on-chain — un primitivo gratuito para builders.',
  },
  faq: {
    title: 'Preguntas Frecuentes',
    items: [
      {
        question: '¿Puedo elegir mi color?',
        answer:
          'Sí. Elige cualquier color libre, por orden de llegada. También hay packs aleatorios y rangos. Solo los 8 colores genesis (negro, blanco y los 6 colores puros) no se pueden elegir — se sortean entre quienes mintearon en cada hito público.',
      },
      { question: '¿Qué recibo?', answer: 'Un color único. Valores RGB. Coordenadas XYZ.' },
      { question: '¿Dónde está la metadata?', answer: '100% on-chain.' },
      {
        question: '¿Qué es el genesis raffle?',
        answer:
          'Los 8 colores míticos no se pueden mintear. En cada hito público de mint, uno se sortea entre quienes mintearon en esa ronda, vía Chainlink VRF. Cada mint pago = un ticket.',
      },
      { question: '¿Qué puedo construir?', answer: 'Mundos 3D, dominios, identidades, arte. RGB = XYZ.' },
    ],
  },
  mint: {
    title: 'Mint',
    subtitle: (price: string) => `Elige tu color exacto. Por orden de llegada. ${price} cada uno.`,
    testnet: 'TESTNET — Base Sepolia',
    tokenId: 'Token ID',
    xyz: 'XYZ',
    rarity: 'Rareza',
    genesisWarning: '★ GENESIS — este color no se puede mintear. Solo se puede ganar en el sorteo.',
    checking: 'Verificando disponibilidad…',
    available: '✓ Disponible',
    takenPrefix: '✗ Tomado — propiedad de',
    modeThisColor: 'Este color',
    modeRandomPack: 'Pack aleatorio',
    modeRange: 'Rango',
    count: 'Cantidad',
    invalidRange: 'Rango inválido',
    rangeTooLarge: (n: string) => `${n} colores — máximo 5.000 por transacción`,
    rangeOk: (n: string) => `${n} colores · los tomados se omiten, el excedente se reembolsa`,
    connectWallet: 'Conectar Wallet',
    confirmInWallet: 'Confirmá en tu wallet…',
    minting: 'Minteando…',
    mintThisColor: (hex: string, price: string) => `Mintear ${hex} — ${price}`,
    mintRandom: (n: number) => `Mintear ${n} al azar`,
    mintRange: 'Mintear rango',
    disconnect: 'desconectar',
    minted: '✓ ¡Minteado!',
    viewOnBasescan: 'Ver en Basescan',
  },
  waitlist: {
    title: 'Lista de Espera',
    subtitle: 'Sé el primero en enterarte cuando el mint esté disponible.',
    thankYou: 'Gracias por sumarte. Te avisaremos cuando el mint esté listo.',
    submitAnother: 'Enviar otro',
    emailPlaceholder: 'Correo electrónico*',
    walletPlaceholder: 'Dirección de Wallet (opcional)',
    submit: 'Enviar',
    submitting: 'Enviando...',
    errors: {
      emailRequired: 'El correo electrónico es obligatorio',
      emailInvalid: 'Ingresá un correo electrónico válido',
      walletInvalid: 'Ingresá una dirección de Ethereum válida',
      walletLength: 'La dirección de Ethereum debe tener 42 caracteres',
      generic: 'Algo salió mal. Intentá de nuevo.',
    },
    twitter: 'Twitter',
    discord: 'Discord',
    github: 'GitHub',
  },
}

const dictionaries = { en, es }
export type Dict = typeof en

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict } | null>(null)

const STORAGE_KEY = 'rgb-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    window.localStorage.setItem(STORAGE_KEY, l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
