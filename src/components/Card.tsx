import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  icon?: ReactNode
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

export default function Card({
  icon,
  title,
  description,
  children,
  className = '',
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      className={`group rounded-2xl border border-nsBlack/10 bg-nsWhite p-6 shadow-soft transition-shadow hover:shadow-lift ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack shadow-soft transition-transform group-hover:scale-110">
          {icon}
        </div>
      )}
      {title && <h3 className="mb-2 font-heading text-xl font-extrabold text-nsBlack">{title}</h3>}
      {description && (
        <p className="text-sm leading-relaxed text-nsBlack/70">{description}</p>
      )}
      {children}
    </motion.div>
  )
}
