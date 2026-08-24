import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../lib/site'

interface PuzzleRevealProps {
  src: string
  alt: string
  rows?: number
  cols?: number
  className?: string
}

const TILE_BASE_DELAY = 0.3
const TILE_STAGGER = 0.045
const ROWS = 4
const COLS = 4
const TILES = ROWS * COLS
const ASSEMBLE_DURATION = TILE_BASE_DELAY + TILES * TILE_STAGGER + 0.6

function deterministicRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export default function PuzzleReveal({ src, alt, rows = ROWS, cols = COLS, className = '' }: PuzzleRevealProps) {
  const [failed, setFailed] = useState(false)
  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onerror = () => setFailed(true)
    img.src = src
    const t = setTimeout(() => setAssembled(true), ASSEMBLE_DURATION * 1000)
    return () => { clearTimeout(t) }
  }, [src])

  if (failed) {
    return (
      <div className={`circuit-bg-light flex h-full w-full items-center justify-center rounded-3xl border-2 border-dashed border-nsYellow/60 bg-nsGray-light ${className}`} style={{ aspectRatio: '4/3' }}>
        <img src={SITE.logo} alt={SITE.name} className="h-4/5 w-4/5 object-contain object-center" draggable={false} />
      </div>
    )
  }

  const tiles = Array.from({ length: rows * cols }).map((_, i) => {
    const r = Math.floor(i / cols)
    const c = i % cols
    const randX = deterministicRandom(i)
    const randY = deterministicRandom(i + 50)
    const randR = deterministicRandom(i + 90)
    const offsetX = (randX - 0.5) * 280
    const offsetY = (randY - 0.5) * 220
    const rotate = (randR - 0.5) * 70
    const delay = TILE_BASE_DELAY + i * TILE_STAGGER
    const bgPosX = cols > 1 ? `${(c / (cols - 1)) * 100}%` : '50%'
    const bgPosY = rows > 1 ? `${(r / (rows - 1)) * 100}%` : '50%'

    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: offsetX, y: offsetY, rotate, scale: 0.75 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${bgPosX} ${bgPosY}`,
        }}
        className="relative"
      >
        <div className="absolute inset-0 border border-nsBlack/5" />
      </motion.div>
    )
  })

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`} style={{ aspectRatio: '4/3' }}>
      <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {tiles}
      </div>

      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: assembled ? 1 : 0 }}
        transition={{ duration: 0.5, delay: ASSEMBLE_DURATION - 0.2, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {assembled && (
        <motion.div
          initial={{ x: '-110%' }}
          animate={{ x: '110%' }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.1 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)' }}
        />
      )}
    </div>
  )
}