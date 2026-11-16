import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowUpRight, FiCheck, FiX } from 'react-icons/fi'
import type { Tool } from '../lib/toolsData'
import ToolLogo from './ToolLogo'

interface ToolDetailsModalProps {
  tool: Tool | null
  onClose: () => void
}

export default function ToolDetailsModal({ tool, onClose }: ToolDetailsModalProps) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!tool) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
      window.clearTimeout(focusTimer)
    }
  }, [tool, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {tool && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-nsBlack/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tool-details-title"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-nsWhite/10 bg-nsWhite shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-3xl"
          >
            <div className="relative overflow-hidden bg-nsBlack px-6 pb-7 pt-6 text-nsWhite sm:px-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-nsYellow/20 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-nsWhite shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                    <ToolLogo logo={tool.logo} size={30} />
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-nsYellow">
                      {tool.tagline}
                    </p>
                    <h3
                      id="tool-details-title"
                      className="mt-1 font-heading text-2xl font-extrabold leading-tight sm:text-3xl"
                    >
                      {tool.name}
                    </h3>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close tool details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-nsWhite/20 text-nsWhite/80 transition-colors hover:border-nsYellow hover:bg-nsYellow hover:text-nsBlack"
                >
                  <FiX size={20} />
                </button>
              </div>
              <span
                className={`relative mt-5 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] ${
                  tool.level === 'Advanced'
                    ? 'border-nsYellow bg-nsYellow text-nsBlack'
                    : 'border-nsWhite/25 bg-nsWhite/10 text-nsWhite'
                }`}
              >
                {tool.level}
              </span>
            </div>

            <div className="space-y-6 px-6 py-7 sm:px-8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-nsBlack/45">
                  What students learn
                </p>
                <p className="mt-2 text-sm leading-relaxed text-nsBlack/80">
                  {tool.whatStudentsLearn}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-nsBlack/45">
                  Practical applications
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {tool.practicalApplications.map((application) => (
                    <li key={application} className="flex items-start gap-2 text-sm text-nsBlack/80">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-nsYellow text-nsBlack">
                        <FiCheck size={11} strokeWidth={3} />
                      </span>
                      {application}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-nsBlack/45">
                  Skills gained
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-xs font-bold text-nsBlack"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-nsBlack/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-yellow w-full text-sm sm:w-auto"
                >
                  Visit official website
                  <FiArrowUpRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-bold text-nsBlack/50 transition-colors hover:text-nsBlack"
                >
                  Close panel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
