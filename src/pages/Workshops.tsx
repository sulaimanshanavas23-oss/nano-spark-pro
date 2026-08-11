import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import {
  FiArrowRight,
  FiAward,
  FiBox,
  FiCalendar,
  FiCheck,
  FiCode,
  FiCpu,
  FiGrid,
  FiLayers,
  FiSun,
  FiMic,
  FiTerminal,
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

const JOURNEY = ['LEARN', 'SIMULATE', 'BUILD', 'DEBUG', 'INNOVATE']

const LEVELS = [
  {
    classes: 'CLASSES 6–8',
    name: 'SPARK DISCOVER',
    desc: 'A playful first step into circuits, sensors and robot basics.',
    path: [
      'Block Coding',
      'Basic Electronics',
      'Circuit Building',
      'Tinkercad Circuits',
      'Sensors',
      'Beginner Robotics',
      'Simple Automation',
    ],
    focus: 'Understand → Simulate → Build → Experiment',
  },
  {
    classes: 'CLASSES 8–10',
    name: 'SPARK CREATE',
    desc: 'Real microcontrollers, real code and robot builds from scratch.',
    path: [
      'Arduino',
      'C/C++ Basics',
      'Wokwi Simulation',
      'Sensors & Actuators',
      'Robotics',
      'Automation',
      'Tinkercad 3D Design',
      'Introduction to IoT',
    ],
    focus: 'Code → Simulate → Build → Debug → Solve',
  },
  {
    classes: 'CLASSES 10–12',
    name: 'SPARK INNOVATE',
    desc: 'IoT, AI and embedded systems — real products from real problems.',
    path: [
      'ESP32 / ESP8266',
      'Embedded Systems',
      'IoT',
      'Python',
      'AI & Computer Vision',
      'Advanced Robotics',
      'Tinkercad / CAD Concepts',
      'Wokwi Prototyping',
      'Advanced Project Development',
    ],
    focus: 'Identify Problem → Design → Simulate → Prototype → Test → Present',
  },
]

const CORE_TECHNOLOGIES = [
  'Electronics & Circuit Fundamentals',
  'Sensors & Actuators',
  'Arduino & Microcontrollers',
  'ESP32 / ESP8266',
  'Robotics & Automation',
  'Embedded Systems',
  'IoT & Smart Devices',
  'Wireless Communication',
  'AI & Computer Vision',
  'C/C++ Programming',
  'Python Programming',
  'Block-Based Programming',
  'Electronics Prototyping',
  'PCB Fundamentals',
  'Engineering Design',
  'Rapid Prototyping',
  'Debugging & System Design',
]

const TOOLS = [
  { icon: <FiGrid size={22} />, name: 'Scratch', desc: 'Beginner block-based programming' },
  { icon: <FiZap size={22} />, name: 'Tinkercad Circuits', desc: 'Beginner electronics & circuit simulation' },
  { icon: <FiCpu size={22} />, name: 'Wokwi', desc: 'Arduino, ESP32 & embedded-system simulation' },
  { icon: <FiBox size={22} />, name: 'Tinkercad 3D Design', desc: 'Basic CAD and prototyping' },
  { icon: <FiTerminal size={22} />, name: 'Arduino IDE', desc: 'Microcontroller programming' },
  { icon: <FiCode size={22} />, name: 'VS Code', desc: 'Advanced programming and development' },
  { icon: <FiLayers size={22} />, name: 'Python', desc: 'Advanced programming and AI projects' },
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
                    to="/book"
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

      {/* ============ TECHNOLOGY STACK — LEARNING TECHNOLOGY JOURNEY ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20 text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Technology Stack"
            title="A progressive Learning"
            highlight="Technology Journey"
            subtitle="Not a list of tools — a journey. Students move from beginner block coding and circuit simulation up to Arduino, robotics, IoT, AI, embedded systems and independent prototype development."
          />

          {/* LEARN → SIMULATE → BUILD → DEBUG → INNOVATE */}
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {JOURNEY.map((step, i) => (
                <span key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-full border-2 border-nsYellow bg-nsBlack px-4 py-1.5 font-heading text-sm font-extrabold text-nsYellow sm:text-base">
                    {step}
                  </span>
                  {i < JOURNEY.length - 1 && (
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-nsYellow"
                    >
                      <FiArrowRight size={18} />
                    </motion.span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Level-wise paths */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {LEVELS.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.12}>
                <div className="flex h-full flex-col rounded-2xl border border-nsWhite/10 bg-nsWhite/5 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-nsYellow px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-nsBlack">
                      {level.classes}
                    </span>
                    <FiCpu size={20} className="text-nsYellow" />
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold text-nsYellow">
                    {level.name}
                  </h3>
                  <p className="mt-1 text-sm text-nsWhite/60">{level.desc}</p>
                  <ul className="mt-5 flex-1 space-y-0">
                    {level.path.map((item, j) => (
                      <li key={item} className="flex items-center gap-2 py-1.5">
                        {j < level.path.length - 1 ? (
                          <span className="text-[10px] text-nsYellow">&#9654;</span>
                        ) : (
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-nsYellow text-[8px] font-extrabold text-nsBlack">
                            &#10003;
                          </span>
                        )}
                        <span className="text-sm font-bold text-nsWhite/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-xs font-bold tracking-wide text-nsYellow">
                    Focus: {level.focus}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CORE TECHNOLOGIES ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Core Technologies"
            title="The skills inside"
            highlight="every program"
            subtitle="Seventeen core technologies woven through the Nano Spark STEM ecosystem — each introduced at the right stage of the journey."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {CORE_TECHNOLOGIES.map((tech, i) => (
              <Reveal key={tech} delay={(i % 8) * 0.05}>
                <span className="inline-flex items-center gap-2 rounded-full border border-nsBlack/10 bg-nsGray-light px-4 py-2 text-sm font-bold text-nsBlack shadow-soft">
                  <FiZap size={13} className="text-nsYellow" />
                  {tech}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CODING & SIMULATION TOOLS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Coding & Simulation Tools"
            title="The toolbox students"
            highlight="learn with"
            subtitle="From Scratch for absolute beginners to Python and VS Code for advanced AI projects — every tool has a place in the journey."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.name} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 rounded-2xl border border-nsBlack/10 bg-nsWhite p-5 shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    {tool.icon}
                  </span>
                  <div>
                    <p className="font-heading text-lg font-extrabold text-nsBlack">{tool.name}</p>
                    <p className="text-xs text-nsBlack/60">{tool.desc}</p>
                  </div>
                </motion.div>
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
