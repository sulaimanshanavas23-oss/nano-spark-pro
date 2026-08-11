import { motion } from 'framer-motion'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Reveals a string one word at a time — each word flips up into place
 * as the element scrolls into view (works with the site's own fonts).
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.09,
}: WordRevealProps) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-0.5">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0, rotate: 5 }}
            whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: delay + i * stagger, ease: 'easeOut' }}
          >
            {word}
            {i < text.split(' ').length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
