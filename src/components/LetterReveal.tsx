import { motion } from 'framer-motion'

interface LetterGroup {
  text: string
  color?: string
}

interface LetterRevealProps {
  texts: LetterGroup[]
  className?: string
  delay?: number
  stagger?: number
  breakAfter?: number[]
}

/**
 * Reveals the given words LETTER BY LETTER — each character flips up into
 * place as the heading scrolls into view (or on page open for heroes).
 */
export function LetterReveal({
  texts,
  className,
  delay = 0,
  stagger = 0.03,
  breakAfter = [],
}: LetterRevealProps) {
  let letterCount = 0
  const groups = texts.flatMap((t) =>
    t.text.split(' ').map((w) => ({ text: w, color: t.color })),
  )

  return (
    <span className={className}>
      {groups.map((word, wi) => (
        <span key={`${word.text}-${wi}`}>
          <span className={`inline-block ${word.color ?? ''}`}>
            {word.text.split('').map((ch, ci) => {
              const d = delay + letterCount * stagger
              letterCount++
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={{ opacity: 0, y: '0.9em', rotateX: -75 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ duration: 0.4, delay: d, ease: 'easeOut' }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
          {wi < groups.length - 1 && <span className="inline-block">&nbsp;</span>}
          {breakAfter.includes(wi) && <br className="hidden sm:block" />}
        </span>
      ))}
    </span>
  )
}