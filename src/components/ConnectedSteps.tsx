import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

interface ConnectedStepsProps {
  steps: string[]
  dark?: boolean
  vertical?: boolean
}

/**
 * Step list whose connecting line draws itself ONE step at a time as the
 * user scrolls through the section, while the numbered nodes pop in
 * sequentially. Horizontal line on desktop, vertical line on mobile.
 */
export function ConnectedSteps({ steps, dark = false, vertical = false }: ConnectedStepsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'end 0.62'],
  })

  const track = dark ? 'bg-nsWhite/15' : 'bg-nsBlack/10'
  const fill = 'bg-nsYellow'
  const node = dark
    ? 'border-nsYellow bg-nsBlack text-nsYellow'
    : 'border-nsYellow bg-nsBlack text-nsYellow'
  const card = dark
    ? 'border-nsWhite/10 bg-nsWhite/5 text-nsWhite'
    : 'border-nsBlack/10 bg-nsGray-light text-nsBlack'

  return (
    <div ref={ref} className="relative">
      {/* Vertical track + fill (mobile) */}
      <div
        className={`absolute bottom-5 left-7 top-5 w-1 -translate-x-1/2 rounded-full ${track} ${vertical ? '' : 'lg:hidden'}`}
      />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className={`absolute bottom-5 left-7 top-5 w-1 origin-top -translate-x-1/2 rounded-full ${fill} ${vertical ? '' : 'lg:hidden'}`}
      />

      {/* Horizontal track + fill (desktop) */}
      {!vertical && (
        <>
          <div className={`absolute left-0 right-0 top-7 hidden h-1 rounded-full ${track} lg:block`} />
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`absolute left-0 right-0 top-7 hidden h-1 origin-left rounded-full ${fill} lg:block`}
          />
        </>
      )}

      <div
        className={`flex flex-col gap-6 ${vertical ? '' : 'lg:grid lg:grid-cols-6 lg:gap-4'}`}
      >
        {steps.map((step, i) => (
          <div
            key={step}
            className={`relative flex items-center gap-5 ${vertical ? '' : 'lg:block'}`}
          >
            {/* Node */}
            <motion.span
              initial={{ scale: 0, rotate: -100 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 17,
                delay: i * 0.08,
              }}
              className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 shadow-soft ${node} ${vertical ? '' : 'lg:mx-auto'}`}
            >
              <span className="font-heading text-lg font-extrabold">{i + 1}</span>
            </motion.span>

            {/* Step card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              className={`flex flex-1 items-center justify-center rounded-2xl border px-5 py-4 text-center shadow-soft ${card} ${vertical ? '' : 'lg:mt-5 lg:min-h-[96px]'}`}
            >
              <span className="font-heading text-base font-extrabold sm:text-lg">{step}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
