import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { FiArrowUpRight, FiLayers, FiMousePointer } from 'react-icons/fi'
import type { Tool, ToolLevel } from '../lib/toolsData'
import { TOOLBOX_TOOLS } from '../lib/toolsData'
import { useTilt } from '../lib/useTilt'
import ScrollReveal from './ScrollReveal'
import ToolDetailsModal from './ToolDetailsModal'
import ToolLogo from './ToolLogo'

const LEVEL_STYLES: Record<ToolLevel, string> = {
  Beginner: 'border-nsYellow/60 bg-nsYellow/20 text-nsBlack',
  Intermediate: 'border-nsBlack/15 bg-nsBlack/[0.06] text-nsBlack',
  Advanced: 'border-nsBlack bg-nsBlack text-nsYellow',
}

function ToolboxCard({
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
      initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 44, scale: 0.92 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.09,
        ease: 'easeOut',
      }}
      style={{ perspective: 1000 }}
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
        whileHover={reduce ? undefined : { y: -10 }}
        whileTap={{ scale: 0.985 }}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-nsBlack/10 bg-nsWhite p-6 text-left shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-nsYellow/80 hover:shadow-[0_28px_70px_rgba(255,193,7,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nsYellow focus-visible:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-nsYellow/70 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-nsYellow/0 via-transparent to-nsYellow/0 opacity-0 transition-opacity duration-300 group-hover:from-nsYellow/10 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -bottom-5 h-10 rounded-full bg-nsYellow/0 blur-2xl transition-colors duration-300 group-hover:bg-nsYellow/50"
        />

        <div className="relative flex items-start justify-between gap-3">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-nsYellow/30 bg-nsYellow/10 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-nsYellow group-hover:bg-nsYellow/20"
          >
            <ToolLogo logo={tool.logo} size={30} />
          </span>
          <span
            className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${LEVEL_STYLES[tool.level]}`}
          >
            {tool.level}
          </span>
        </div>

        <h3 className="relative mt-5 font-heading text-xl font-extrabold leading-tight text-nsBlack">
          {tool.name}
        </h3>
        <p className="relative mt-1 text-[11px] font-bold uppercase leading-snug tracking-[0.1em] text-nsBlack/45">
          {tool.tagline}
        </p>

        <p className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-nsBlack/55 transition-colors duration-300 group-hover:text-nsBlack/80">
          {tool.description}
        </p>

        <span className="relative mt-5 flex items-center gap-2 border-t border-nsBlack/10 pt-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-nsBlack/40 transition-colors duration-300 group-hover:text-nsBlack">
          Explore tool
          <FiArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nsYellow-dark"
          />
        </span>
      </motion.div>
    </motion.div>
  )
}

function ToolboxShowcase() {
  const tilt = useTilt(5)
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 56, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="relative mt-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 h-36 w-3/4 -translate-x-1/2 rounded-[100%] bg-nsYellow/40 blur-3xl"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 1500 }}
        className="relative"
      >
        <motion.div
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
          whileHover={reduce ? undefined : { scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative overflow-hidden rounded-3xl border border-nsYellow/40 bg-nsWhite p-1.5 shadow-[0_40px_100px_rgba(17,17,17,0.2)] sm:p-2"
        >
          <img
            src="/images/tools-box.jpeg"
            alt="The Nano Spark toolbox showroom — Scratch, Tinkercad Circuits, Wokwi, Tinkercad 3D Design, Arduino IDE, VS Code and Python"
            width={1600}
            height={711}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-auto w-full select-none rounded-[1.15rem]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-nsBlack/20 via-transparent to-transparent"
          />
        </motion.div>
      </motion.div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-nsBlack/40">
        <FiMousePointer size={13} className="text-nsYellow-dark" />
        Tilt the showcase · Click any tool to discover more
      </div>
    </motion.div>
  )
}

export default function ToolboxSection() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  return (
    <section id="toolbox" className="relative overflow-hidden bg-nsGray-light py-24 md:py-32">
      <div aria-hidden="true" className="circuit-bg-light pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[70%] max-w-[900px] -translate-x-1/2 rounded-full bg-nsYellow/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="section-heading-bullet justify-center">
            <span className="text-nsYellow">&#9654;</span> The Learning Toolkit
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-nsBlack sm:text-5xl">
            THE TOOLBOX STUDENTS{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">LEARN WITH</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-nsYellow/60 sm:h-4"
              />
            </span>
          </h2>
          <motion.span
            aria-hidden="true"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-5 block h-1.5 rounded-full bg-gold-gradient"
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-nsBlack/60 sm:text-lg">
            From Scratch for absolute beginners to Python and VS Code for advanced AI projects — every
            tool has a place in the journey.
          </p>
        </ScrollReveal>

        <ToolboxShowcase />

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-nsBlack/10 bg-nsWhite px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-nsBlack/50">
            <FiLayers size={13} className="text-nsYellow-dark" /> 7 tools · beginner to advanced
          </span>
          <p className="text-sm text-nsBlack/45">Every card is fully interactive — click anywhere on it</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLBOX_TOOLS.map((tool, index) => (
            <ToolboxCard
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
