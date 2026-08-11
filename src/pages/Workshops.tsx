import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCheck,
  FiCpu,
  FiSun,
  FiMic,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import SmartImage from '../components/SmartImage'
import TestimonialMarquee from '../components/TestimonialMarquee'
import { Reveal } from '../components/Reveal'
import { WHATSAPP_LINK } from '../lib/site'

const FORMATS = [
  {
    icon: <FiUsers size={24} />,
    title: 'School Workshops',
    desc: 'On-campus, curriculum-aligned sessions delivered to your students in your own lab or classroom.',
    details: {
      duration: 'Half-day to multi-day',
      topics: 'Electronics · Coding demos · AI / agentic AI intro',
      build: 'Guided hands-on build challenge with real components',
      takeHome: 'Take-home project to continue after the session',
    },
  },
  {
    icon: <FiZap size={24} />,
    title: 'Hackathons',
    desc: 'High-energy, time-boxed build events where teams race to working prototypes.',
    details: {
      duration: '1–2 day intensive events',
      topics: 'Rapid prototyping · Team coding · Idea pitching',
      build: 'Time-boxed project build challenge',
      takeHome: 'Prototype demo + pitching feedback',
    },
  },
  {
    icon: <FiMic size={24} />,
    title: 'Ambassador-Led Sessions',
    desc: 'Student ambassador-run sessions that make peers feel comfortable exploring tech together.',
    details: {
      duration: 'Flexible, session-based',
      topics: 'Peer-led electronics & coding',
      build: 'Small-team guided builds',
      takeHome: 'Project worksheet + parts list',
    },
  },
]

// TODO: Fill the rest with REAL, verified numbers from Nano Spark before launch.
// Do not publish unverified stats. "Students Trained" (550) has been confirmed.
const STATS: { label: string; value: number | null; suffix: string }[] = [
  { label: 'Students Trained', value: 550, suffix: '+' },
  { label: 'Workshops Conducted', value: null, suffix: '+' },
  { label: 'School Partnerships', value: null, suffix: '+' },
  { label: 'Projects Built', value: null, suffix: '+' },
]

function StatBlock({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView && stat.value != null) {
      const controls = animate(0, stat.value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(Math.round(v)),
      })
      return () => controls.stop()
    }
  }, [inView, stat.value])

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={ref}
        whileHover={{ y: -6 }}
        className="rounded-2xl bg-nsWhite p-6 text-center shadow-soft"
      >
        <p className="font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
          {stat.value != null ? display + stat.suffix : '—'}
        </p>
        <p className="mt-2 text-sm font-bold text-nsBlack/60">{stat.label}</p>
      </motion.div>
    </Reveal>
  )
}

export default function Workshops() {
  const gallery = [
    'workshop-1.jpg',
    'workshop-2.jpg',
    'workshop-3.jpg',
    'lab-1.jpg',
    'lab-2.jpg',
    'stem-lab.jpg',
  ]
  const galleryLabels = [
    'Students Building & Testing',
    'Hands-on Robotics Session',
    'Workshop Moments',
    'STEM Lab Sessions',
    'Electronics Workbench',
    'The Nano Spark STEM Lab',
  ]

  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Workshops
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              Hands-on workshops your
              <br className="hidden sm:block" /> students will{' '}
              <span className="text-nsYellow">love</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Electronics, coding, robotics, IoT and AI — delivered as interactive sessions where
              every student builds something real.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FORMATS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Workshop Formats"
            title="Pick the format that"
            highlight="fits your school"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FORMATS.map((format, i) => (
              <Reveal key={format.title} delay={i * 0.1}>
                <Card icon={format.icon} title={format.title} description={format.desc}>
                  <div className="mt-4 space-y-2 text-sm text-nsBlack/75">
                    <p className="flex gap-2"><FiCalendar className="mt-0.5 shrink-0 text-nsYellow" /><span><strong className="text-nsBlack">Duration:</strong> {format.details.duration}</span></p>
                    <p className="flex gap-2"><FiCpu className="mt-0.5 shrink-0 text-nsYellow" /><span><strong className="text-nsBlack">Topics:</strong> {format.details.topics}</span></p>
                    <p className="flex gap-2"><FiTool className="mt-0.5 shrink-0 text-nsYellow" /><span><strong className="text-nsBlack">Build challenge:</strong> {format.details.build}</span></p>
                    <p className="flex gap-2"><FiAward className="mt-0.5 shrink-0 text-nsYellow" /><span><strong className="text-nsBlack">Take-home:</strong> {format.details.takeHome}</span></p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-nsBlack px-4 py-3 font-heading font-extrabold text-nsYellow transition-colors hover:bg-nsYellow hover:text-nsBlack"
                  >
                    Book Now <FiArrowRight />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORKSHOP DAY ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Inside a Workshop"
              title="A full day of"
              highlight="building & testing"
            />
            <ul className="mt-8 space-y-3">
              {[
                'Warm-up: get students excited with live tech demos',
                'Concept: simple theory for electronics, coding and sensors',
                'Build: hands-on build challenge with real kits and tools',
                'Test: running, debugging and improving their project',
                'Showcase: students demo their working projects',
                'Take-home project + certificate of participation',
              ].map((step) => (
                <li key={step} className="flex gap-3 rounded-xl bg-nsGray-light px-4 py-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-nsYellow text-nsBlack">
                    <FiCheck size={14} />
                  </span>
                  <span className="text-sm font-semibold text-nsBlack/80">{step}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="circuit-bg-light relative mx-auto max-w-md rounded-3xl bg-gold-gradient p-8 shadow-lift"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nsBlack text-nsYellow"><FiSun size={24} /></span>
                  <div>
                    <p className="font-heading font-bold text-nsBlack">Learn by doing</p>
                    <p className="text-xs text-nsBlack/70">No passive lectures here</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-nsBlack/80">
                  Every session ends with a working project students can demonstrate, debug and
                  take pride in — the Nano Spark way.
                </p>
                <Link to="/contact" className="btn-dark !py-2.5 text-sm">
                  Book a Workshop <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Programs in Pictures"
            title="Moments from Nano"
            highlight="Spark programs"
            subtitle="A glimpse of our kits, labs and adventures. Drop real workshop photos into public/images/ to showcase them here."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.1}>
                <motion.figure
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                >
                  <SmartImage
                    src={`/images/${src}`}
                    alt={galleryLabels[i]}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/80 to-transparent px-4 pb-3 pt-10 text-xs font-bold text-nsWhite">
                    {galleryLabels[i]}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FLOATING FEEDBACK ============ */}
      <section className="bg-nsYellow/15 py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Feedback"
            title="What students & parents"
            highlight="are saying"
            subtitle="Real words from workshop participants — gaining valuable experience, from knowing nothing about electronics to building their own projects."
          />
          <div className="mt-8">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* ============ IMPACT STATS ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Our Impact"
            title="550+ students"
            highlight="and counting"
            subtitle="We only publish real, verified impact data. Counters for the remaining numbers will start ticking as soon as they are confirmed."
          />
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl rounded-3xl bg-nsBlack px-8 py-12 text-center text-nsWhite shadow-lift"
        >
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Ready to <span className="text-nsYellow">book a workshop?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsWhite/70">
            Tell us about your school and we'll design the perfect hands-on session.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-yellow">
              Contact Us <FiArrowRight />
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener" className="btn-outline !border-nsWhite/40 !text-nsWhite hover:!border-nsYellow hover:!bg-nsYellow hover:!text-nsBlack">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}
