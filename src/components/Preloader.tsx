import { motion } from 'framer-motion'
import { SITE } from '../lib/site'

/**
 * Full-screen loading animation shown when the site first opens: Nano Spark
 * logo at the centre with the tagline, concentric gold circles radiating
 * outward, and a progress bar.
 * Adjust LOADER_DURATION_MS to change how long it stays on screen.
 */
export const LOADER_DURATION_MS = 3000

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-nsBlack"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="relative flex h-36 w-36 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-nsYellow"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: [0.55, 1.7], opacity: [0.7, 0] }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
              delay: i * 0.45,
              ease: 'easeOut',
            }}
          />
        ))}
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-nsYellow bg-white shadow-glow"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img src={SITE.logo} alt={SITE.name} className="h-16 w-16 object-contain" draggable={false} />
        </motion.div>
      </div>

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