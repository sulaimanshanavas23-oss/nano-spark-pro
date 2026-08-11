import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../lib/site'

/**
 * Logo badge pinned to the top-right corner of the viewport.
 * Persists across all pages. Clicking it navigates to Home (/).
 * Subtle pulse/glow to draw attention without being distracting.
 */
export default function LogoBadge() {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      aria-label={`${SITE.name} - go to home`}
      onClick={() => navigate('/')}
      className="fixed top-3 right-3 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-nsBlack bg-nsWhite shadow-soft"
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.94 }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1, scale: [1, 1.04, 1] }}
      transition={{
        duration: 0.6,
        scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-2xl border-2 border-nsYellow"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <img
        src={SITE.logo}
        alt={SITE.name}
        className="h-9 w-9 object-contain"
        draggable={false}
      />
    </motion.button>
  )
}
