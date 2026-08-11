import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

export interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border bg-nsWhite transition-colors ${
              open ? 'border-nsYellow shadow-soft' : 'border-nsBlack/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3 font-heading text-base font-bold text-nsBlack sm:text-lg">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nsYellow text-sm text-nsBlack">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 rounded-full bg-nsBlack p-1 text-nsWhite"
              >
                <FiChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p className="border-t border-nsBlack/10 px-5 py-4 pl-16 text-sm leading-relaxed text-nsBlack/75">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
