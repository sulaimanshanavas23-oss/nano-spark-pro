import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiCode,
  FiMonitor,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import { Reveal } from './Reveal'

const TAB_ICONS = {
  monitor: FiMonitor,
  users: FiUsers,
  trending: FiTrendingUp,
  code: FiCode,
} as const

type TabIcon = keyof typeof TAB_ICONS

const TABS: {
  id: string
  label: string
  icon: TabIcon
  title: string
  description: string
  points: string[]
  stat: string
  statLabel: string
}[] = [
  {
    id: 'self-paced',
    label: 'Self-Paced',
    icon: 'monitor',
    title: 'Learn at your own pace',
    description:
      'Short, guided lessons with videos, simulations and hands-on tasks so every learner can move forward without waiting for the class.',
    points: [
      'Step-by-step lessons from basics to advanced builds',
      'Simulations before touching real hardware',
      'Revisit any topic anytime, on any device',
    ],
    stat: '24/7',
    statLabel: 'Access to lessons',
  },
  {
    id: 'mentorship',
    label: 'Live Mentorship',
    icon: 'users',
    title: 'Experts beside every learner',
    description:
      'Live sessions and doubt-clearing with mentors who have built real robots, IoT products and embedded systems.',
    points: [
      'Scheduled live classes and doubt sessions',
      'Personal feedback on every project',
      'Guidance for competitions and hackathons',
    ],
    stat: '1:1',
    statLabel: 'Mentor guidance',
  },
  {
    id: 'progress',
    label: 'Progress Tracking',
    icon: 'trending',
    title: 'See progress, step by step',
    description:
      'Levels, skill badges and a clear progress dashboard show learners, parents and schools exactly how far they have come.',
    points: [
      'Skill levels from Discover to Innovate',
      'Certificates for completed milestones',
      'Clear reports for parents and schools',
    ],
    stat: '100%',
    statLabel: 'Visible progress',
  },
  {
    id: 'playground',
    label: 'Project Playground',
    icon: 'code',
    title: 'Build, test and innovate',
    description:
      'A project playground where learners code, simulate and assemble real kits — turning every concept into a working prototype.',
    points: [
      'Arduino, ESP32 and IoT project tracks',
      'Simulate circuits before building',
      'Ship real working projects with kit support',
    ],
    stat: '50+',
    statLabel: 'Guided projects',
  },
]

export default function ELearningSection() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <section id="e-learning" className="relative overflow-hidden bg-nsWhite py-20">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-nsYellow/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-nsYellow/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Progressive E-Learning Technology"
          title="LEARN SMARTER,"
          highlight="STEP BY STEP"
          subtitle="A blended learning platform that grows with every student — self-paced lessons, live mentorship, real-time progress and a hands-on project playground."
        />

        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="E-learning features"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:justify-center sm:overflow-visible"
          >
            {TABS.map((item, i) => {
              const Icon = TAB_ICONS[item.icon]
              const selected = i === active
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 font-heading text-sm font-bold transition-colors ${
                    selected
                      ? 'border-nsBlack bg-nsBlack text-nsYellow'
                      : 'border-nsBlack/10 bg-nsGray-light text-nsBlack/70 hover:border-nsYellow hover:text-nsBlack'
                  }`}
                >
                  <Icon size={16} className={selected ? 'text-nsYellow' : 'text-nsBlack/60'} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-6 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-center lg:text-left"
                >
                  <span className="section-heading-bullet justify-center lg:justify-start">
                    <span className="text-nsYellow">&#9654;</span> {tab.label}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-extrabold text-nsBlack sm:text-3xl">
                    {tab.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-nsBlack/70 lg:mx-0">{tab.description}</p>
                  <ul className="mt-6 grid gap-3 text-left">
                    {tab.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-2xl bg-nsWhite px-4 py-3 shadow-soft"
                      >
                        <FiCheckCircle className="mt-0.5 shrink-0 text-nsYellow" size={18} />
                        <span className="text-sm font-semibold text-nsBlack">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-2xl bg-nsBlack p-6 text-nsWhite shadow-lift"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-nsYellow/20 blur-2xl" />
                  <div className="relative">
                    <p className="font-heading text-5xl font-extrabold text-nsYellow">{tab.stat}</p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-nsWhite/70">
                      {tab.statLabel}
                    </p>
                    <div className="mt-6 space-y-2">
                      {TABS.map((item, i) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                            i === active
                              ? 'bg-nsYellow text-nsBlack'
                              : 'bg-nsWhite/10 text-nsWhite/60'
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                              i === active ? 'bg-nsBlack text-nsYellow' : 'bg-nsWhite/15 text-nsWhite'
                            }`}
                          >
                            {i + 1}
                          </span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-nsBlack/10 pt-6 lg:justify-between">
            <p className="text-sm font-semibold text-nsBlack/60">
              One platform, every stage — from first circuit to finished product.
            </p>
            <Link to="/workshops" className="btn-yellow group">
              EXPLORE THE PROGRAM
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
