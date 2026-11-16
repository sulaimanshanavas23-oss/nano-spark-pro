import { motion, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { FiArrowUpRight, FiCpu, FiMousePointer } from 'react-icons/fi'
import type { Tool } from '../lib/toolsData'
import { TOOLS_PLATFORMS } from '../lib/toolsData'
import { useTilt } from '../lib/useTilt'
import CircuitBackground from './CircuitBackground'
import ScrollReveal from './ScrollReveal'
import ToolDetailsModal from './ToolDetailsModal'
import ToolLogo from './ToolLogo'

function ToolStation({
  tool,
  index,
  onOpen,
}: {
  tool: Tool
  index: number
  onOpen: (tool: Tool) => void
}) {
  const tilt = useTilt(10)
  const reduce = useReducedMotion()

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(tool)
    }
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: (index % 5) * 0.08,
        ease: 'easeOut',
      }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Explore ${tool.name}`}
        onClick={() => onOpen(tool)}
        onKeyDown={handleKeyDown}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        whileHover={reduce ? undefined : { y: -8 }}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex h-full w-full cursor-pointer flex-col items-start gap-3 overflow-hidden rounded-2xl border border-nsWhite/10 bg-nsWhite/[0.045] p-4 text-left backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-nsYellow/60 hover:bg-nsWhite/[0.08] hover:shadow-[0_22px_60px_rgba(255,193,7,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nsYellow focus-visible:ring-offset-2 focus-visible:ring-offset-nsBlack"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-nsYellow/70 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-nsYellow/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex w-full items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nsWhite shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <ToolLogo logo={tool.logo} size={26} />
          </span>
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-nsWhite/15 text-nsWhite/45 transition-all duration-300 group-hover:border-nsYellow group-hover:bg-nsYellow group-hover:text-nsBlack">
            <FiArrowUpRight size={14} />
          </span>
        </div>

        <div className="relative">
          <p className="font-heading text-[15px] font-extrabold leading-tight text-nsWhite">
            {tool.name}
          </p>
          <p
            className="mt-1 text-[11px] font-bold uppercase leading-snug tracking-[0.1em]"
            style={{ color: tool.accent === '#111111' ? '#FFC107' : tool.accent }}
          >
            {tool.tagline}
          </p>
        </div>

        <p className="relative mt-auto line-clamp-2 text-xs leading-relaxed text-nsWhite/50 transition-colors duration-300 group-hover:text-nsWhite/80">
          {tool.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

function InteractiveShowcase() {
  const tilt = useTilt(7)
  const reduce = useReducedMotion()
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.glareX} ${tilt.glareY}, rgba(255,193,7,0.16), transparent 46%)`

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 64, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-1/2 h-44 w-4/5 -translate-x-1/2 rounded-[100%] bg-nsYellow/25 blur-3xl"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 1400 }}
        className="relative"
      >
        <motion.div
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
          whileHover={reduce ? undefined : { scale: 1.012 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative overflow-hidden rounded-3xl border border-nsWhite/15 bg-nsWhite/[0.04] p-1.5 shadow-[0_50px_140px_rgba(0,0,0,0.7)] sm:p-2"
        >
          <img
            src="/images/tools-platforms.png"
            alt="Nano Spark tools and platforms showroom — Arduino IDE, VS Code, Python, Tinkercad, Wokwi, Seeed Studio, Blynk, IoT Platform, Claude AI and GitHub"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-auto w-full select-none rounded-[1.15rem]"
          />

          <motion.div
            aria-hidden="true"
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 hover:opacity-100 sm:opacity-70"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 rounded-full border border-nsWhite/20 bg-nsBlack/55 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-nsWhite/80 backdrop-blur-md sm:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-nsYellow" />
            Live Showroom
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-nsWhite/40">
        <FiMousePointer size={13} className="text-nsYellow" />
        Move your cursor across the display to explore
      </div>
    </motion.div>
  )
}

export default function ToolsPlatformsSection() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  return (
    <section
      id="tools-platforms"
      className="relative overflow-hidden bg-nsBlack py-24 text-nsWhite md:py-32"
    >
      <CircuitBackground variant="dark" className="opacity-30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] max-w-[120vw] -translate-x-1/2 rounded-full bg-nsYellow/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nsBlack to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="section-heading-bullet justify-center text-nsYellow">
            <span className="text-nsYellow">&#9654;</span> Tools &amp; Platforms
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-nsWhite sm:text-5xl lg:text-6xl">
            TOOLS &amp; PLATFORMS{' '}
            <span className="bg-gold-gradient bg-clip-text text-transparent">YOU WILL USE</span>
          </h2>
          <motion.span
            aria-hidden="true"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-5 block h-1.5 rounded-full bg-gold-gradient"
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-nsWhite/65 sm:text-lg">
            Tools and platforms used will depend on your selected internship track.
          </p>
        </ScrollReveal>

        <InteractiveShowcase />

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-nsWhite/10 bg-nsWhite/[0.04] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-nsWhite/50">
            <FiCpu size={13} className="text-nsYellow" /> 10 interactive tool stations
          </span>
          <p className="text-sm text-nsWhite/40">Hover to lift a station · Click to explore it</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TOOLS_PLATFORMS.map((tool, index) => (
            <ToolStation
              key={tool.id}
              tool={tool}
              index={index}
              onOpen={setSelectedTool}
            />
          ))}
        </div>
      </div>

      <ToolDetailsModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </section>
  )
}
