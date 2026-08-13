import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../lib/site'
import { playThunder } from '../lib/sound'

/**
 * Full-screen loading animation shown when the site first opens: spinning
 * gold circles around the Nano Spark logo, then a yellow thunder strike
 * hits the logo (with thunder sound) before the site fades in.
 * Adjust LOADER_DURATION_MS to change how long it stays on screen.
 */
export const LOADER_DURATION_MS = 3800

/** When the thunder strike animation begins (ms after mount). */
const STRIKE_AT_MS = 1700

export default function Preloader() {
  const [struck, setStruck] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStruck(true), STRIKE_AT_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!struck) return
    playThunder()
  }, [struck])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-nsBlack"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Full-screen yellow flash + giant bolt on strike */}
      {struck && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-nsYellow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0, 0.45, 0] }}
            transition={{ duration: 0.85, times: [0, 0.12, 0.3, 0.45, 1] }}
          />
          <motion.svg
            viewBox="0 0 24 34"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[170px] w-[120px] text-nsYellow drop-shadow-[0_0_30px_rgba(255,193,7,0.95)]"
            style={{ x: '-50%', y: '-50%', rotate: -8 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.15, 1, 0], scale: [0.5, 1.1, 1.02, 1.12, 1.2] }}
            transition={{ duration: 0.85, times: [0, 0.1, 0.28, 0.42, 1] }}
          >
            <path
              d="M12 0 L3 15 L9 14.4 L6.2 34 L21 12.5 L14.4 13.2 L18.6 0 Z"
              fill="currentColor"
            />
          </motion.svg>
        </>
      )}

      <motion.div
        className="relative flex h-36 w-36 items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={
          struck
            ? { scale: 1, x: [0, -12, 14, -9, 7, 0], transition: { x: { duration: 0.5, ease: 'easeOut' } } }
            : { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
        }
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-nsYellow"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={struck ? { scale: 1.05, opacity: 0 } : { scale: [0.55, 1.7], opacity: [0.7, 0] }}
            transition={
              struck
                ? { duration: 0.3 }
                : { duration: 1.7, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }
            }
          />
        ))}
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-nsYellow bg-white shadow-glow"
          initial={{ scale: 0.85 }}
          animate={struck ? { scale: [1, 1.12, 0.96, 1.06, 1] } : { scale: 1 }}
          transition={struck ? { duration: 0.5, ease: 'easeOut' } : {}}
        >
          <img
            src={SITE.logo}
            alt={SITE.name}
            className="h-16 w-16 object-contain"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-heading text-3xl font-extrabold text-white"
      >
        {SITE.name}
        <span className="text-nsYellow">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-xs font-bold tracking-[0.32em] text-nsYellow"
      >
        {SITE.tagline}
      </motion.p>

      <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="h-full rounded-full bg-gold-gradient"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: (LOADER_DURATION_MS - 400) / 1000, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}