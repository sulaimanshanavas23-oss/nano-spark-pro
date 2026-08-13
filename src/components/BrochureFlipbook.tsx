import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BROCHURE_PAGES } from '../lib/brochure'

/**
 * Flippable brochure: the 4 brochure pages are shown as two 2-page spreads
 * with a 3D page-turn animation. Flip with the buttons or by swiping.
 */

const FLIP_VARIANTS = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? -70 : 70,
    opacity: 0,
    x: dir > 0 ? -50 : 50,
    scale: 0.92,
  }),
  center: { rotateY: 0, opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? 70 : -70,
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    scale: 0.92,
  }),
}

export default function BrochureFlipbook() {
  const spreads = Math.ceil(BROCHURE_PAGES.length / 2)
  const [[spread, direction], setSpread] = useState<[number, number]>([0, 0])
  const touchX = useRef<number | null>(null)

  const paginate = useCallback(
    (dir: number) => {
      setSpread(([s]) => [Math.min(spreads - 1, Math.max(0, s + dir)), dir])
    },
    [spreads],
  )

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 48) paginate(dx > 0 ? -1 : 1)
    touchX.current = null
  }

  const left = BROCHURE_PAGES[spread * 2]
  const right = BROCHURE_PAGES[spread * 2 + 1]

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Book frame */}
      <div
        className="relative rounded-3xl bg-nsBlack px-4 py-6 shadow-lift sm:px-8 sm:py-8"
        style={{ perspective: 1600 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={spread}
            custom={direction}
            variants={FLIP_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="mx-auto flex max-w-xl items-stretch overflow-hidden rounded-l-xl rounded-r-xl border-y-4 border-nsYellow/40 bg-white shadow-soft"
          >
            <div className="relative w-1/2">
              <img
                src={left}
                alt="Nano Spark brochure — page 1"
                className="aspect-[3/4] w-full bg-nsWhite object-contain"
                draggable={false}
              />
              <span className="absolute bottom-1.5 right-2 rounded-full bg-nsBlack/70 px-2 py-0.5 text-[10px] font-bold text-nsYellow">
                {spread * 2 + 1}
              </span>
            </div>
            <div className="relative w-px bg-nsBlack/15" />
            <div className="relative w-1/2">
              <img
                src={right}
                alt="Nano Spark brochure — page 2"
                className="aspect-[3/4] w-full bg-nsWhite object-contain"
                draggable={false}
              />
              <span className="absolute bottom-1.5 left-2 rounded-full bg-nsBlack/70 px-2 py-0.5 text-[10px] font-bold text-nsYellow">
                {spread * 2 + 2}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => paginate(-1)}
          disabled={spread === 0}
          aria-label="Previous brochure page"
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-nsBlack bg-nsWhite text-nsBlack shadow-soft transition-all hover:bg-nsBlack hover:text-nsYellow active:scale-95 disabled:cursor-not-allowed disabled:border-nsBlack/20 disabled:text-nsBlack/30 disabled:hover:bg-nsWhite disabled:hover:text-nsBlack/30"
        >
          <FiChevronLeft size={22} />
        </button>
        <span className="font-heading text-sm font-extrabold tracking-widest text-nsBlack/60">
          {String(spread + 1).padStart(2, '0')} / {String(spreads).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => paginate(1)}
          disabled={spread === spreads - 1}
          aria-label="Next brochure page"
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-nsBlack bg-nsWhite text-nsBlack shadow-soft transition-all hover:bg-nsBlack hover:text-nsYellow active:scale-95 disabled:cursor-not-allowed disabled:border-nsBlack/20 disabled:text-nsBlack/30 disabled:hover:bg-nsWhite disabled:hover:text-nsBlack/30"
        >
          <FiChevronRight size={22} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-nsBlack/50">
        Turn the pages with the buttons or swipe · download it below as a PDF
      </p>
    </div>
  )
}