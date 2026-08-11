import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal
      className={`section-heading ${centered ? 'items-center text-center' : ''}`}
    >
      {eyebrow && (
        <span className="section-heading-bullet">
          <span className="text-nsYellow">&#9654;</span> {eyebrow}
        </span>
      )}
      <h2
        className={`section-heading-title ${
          dark ? 'text-nsWhite' : 'text-nsBlack'
        }`}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-nsYellow">{highlight}</span>
          </>
        )}
      </h2>
      <motion.span
        className={`section-heading-underline ${centered ? 'mx-auto' : ''}`}
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      {subtitle && (
        <p
          className={`mt-1 max-w-2xl text-base leading-relaxed ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-nsWhite/70' : 'text-nsBlack/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
