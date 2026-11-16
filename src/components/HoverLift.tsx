import { motion } from 'framer-motion'

interface HoverLiftProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function HoverLift({
  children,
  className,
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      className={['rounded-xl', 'border', 'border-nsBlack/10', 'bg-nsWhite', 'p-5', 'shadow-soft', 'transition-transform', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </motion.div>
  )
}