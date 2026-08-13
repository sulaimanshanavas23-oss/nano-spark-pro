import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaRocket } from 'react-icons/fa'
import { CLIENT_LOGO, CLIENT_NAMES } from '../lib/site'

/**
 * Single client card that flies left across the screen (faster than the
 * feedback marquee), together with a mini rocket tagged "On Boarding".
 */
export default function ClientMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [range, setRange] = useState<{ start: number; end: number } | null>(null)

  useEffect(() => {
    const measure = () => {
      const cw = containerRef.current?.offsetWidth ?? 0
      const w = cardRef.current?.offsetWidth ?? 0
      setRange({ start: cw + 24, end: -w - 24 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const name = CLIENT_NAMES[0]

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-nsWhite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-nsWhite to-transparent" />

      <div ref={containerRef} className="relative h-28 w-full">
        {range && (
          <motion.div
            ref={cardRef}
            initial={{ x: range.start }}
            animate={{ x: [range.start, range.end] }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
            className="absolute top-0 flex items-center gap-3 rounded-2xl border border-nsBlack/10 bg-white px-5 py-3 shadow-soft"
            style={{ marginTop: 12 }}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-nsGray-light">
              <img
                src={CLIENT_LOGO}
                alt={`${name} logo`}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-xl font-extrabold leading-tight text-nsBlack">{name}</p>
              <p className="text-[10px] font-bold tracking-[0.16em] text-nsYellow">CLIENT</p>
            </div>
          </motion.div>
        )}

        {range && (
          <motion.span
            initial={{ x: range.start - 120 }}
            animate={{ x: [range.start - 120, -180] }}
            transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
            className="absolute top-0 flex items-center gap-1.5 rounded-full bg-nsBlack px-3.5 py-1.5 font-heading text-xs font-extrabold tracking-[0.14em] text-nsYellow shadow-soft"
            style={{ marginTop: 74, rotate: -8 }}
          >
            <FaRocket size={13} className="text-nsYellow" /> ON BOARDING
          </motion.span>
        )}
      </div>
    </div>
  )
}