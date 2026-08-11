import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiSun,
  FiMonitor,
  FiTool,
  FiWifi,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SITE } from '../lib/site'

const FOCUS_AREAS = [
  { icon: <FiBookOpen size={26} />, title: 'STEM & Electronics Education', desc: 'Hands-on learning programs that make electronics and science fun, practical and accessible.' },
  { icon: <FiTool size={26} />, title: 'Robotics & Automation', desc: 'Design, build and program robots — from line followers to fully automated systems.' },
  { icon: <FiCpu size={26} />, title: 'Embedded Systems', desc: 'Microcontrollers, sensors and firmware — the brains behind every smart device.' },
  { icon: <FiWifi size={26} />, title: 'IoT & Smart Technology', desc: 'Connect devices to the internet and build smart, sensor-driven solutions.' },
  { icon: <FiZap size={26} />, title: 'AI & Emerging Technologies', desc: 'Introductions to AI, agentic AI, automation and the technologies of tomorrow.' },
  { icon: <FiSun size={26} />, title: 'Innovation & Project Development', desc: 'Turn ideas into working prototypes through guided project development.' },
]

const BELIEFS = [
  { icon: <FiCode size={26} />, label: 'Learn' },
  { icon: <FiTool size={26} />, label: 'Build' },
  { icon: <FiSun size={26} />, label: 'Innovate' },
  { icon: <FiZap size={26} />, label: 'Solve' },
]

const ECOSYSTEM = ['STEM Kits', 'Workshops', 'Projects', 'Innovation', 'Prototypes']

const VISUAL_CHIPS = [
  { icon: <FiCpu size={16} />, label: 'ESP32 & Sensors' },
  { icon: <FiWifi size={16} />, label: 'IoT Cloud' },
  { icon: <FiZap size={16} />, label: 'Arduino' },
  { icon: <FiMonitor size={16} />, label: 'Coding' },
]

export default function Home() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          {/* Hero text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-nsBlack/15 bg-nsWhite px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-nsBlack"
            >
              <span className="h-2 w-2 rounded-full bg-nsYellow" />
              {SITE.tagline}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] text-nsBlack sm:text-5xl lg:text-6xl"
            >
              Turning Curiosity
              <br />
              Into <span className="text-nsYellow">Innovation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 text-lg font-semibold tracking-[0.15em] text-nsBlack/70"
            >
              STEM EDUCATION &middot; ROBOTICS &middot; IOT &middot; EMBEDDED SYSTEMS
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/products" className="btn-yellow">
                Explore Programs <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Hero visual — TODO: replace framed logo with the real hero photo (hero-kids-circuit.jpg) when supplied */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md"
            >
              <div className="circuit-bg-light absolute -inset-6 rounded-3xl bg-nsYellow/10" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex aspect-square items-center justify-center rounded-3xl border-4 border-nsYellow bg-white shadow-lift"
              >
                <img
                  src={SITE.logo}
                  alt={SITE.name}
                  className="h-4/5 w-4/5 object-contain"
                  draggable={false}
                />
              </motion.div>

              {/* Badge overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -bottom-4 -left-4 rounded-2xl bg-nsBlack px-5 py-3 shadow-lift"
              >
                <p className="font-heading text-sm font-bold leading-tight text-nsYellow">
                  Perfect for
                  <br />
                  Young Innovators!
                </p>
              </motion.div>

              {/* Floating chips */}
              <div className="absolute -right-3 top-6 hidden flex-col gap-2 sm:flex">
                {VISUAL_CHIPS.map((chip, i) => (
                  <motion.span
                    key={chip.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center gap-2 rounded-xl border border-nsBlack/10 bg-white px-3 py-2 text-xs font-bold text-nsBlack shadow-soft"
                  >
                    <span className="text-nsYellow">{chip.icon}</span> {chip.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ WHO WE ARE ============ */}
      <section className="relative bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <SectionHeading
                align="left"
                eyebrow="Who We Are"
                title="A startup making"
                highlight="technology education"
                subtitle="Nano Spark is a technology and STEM innovation startup making practical technology education accessible to students, schools, and aspiring innovators. We combine STEM, robotics, electronics, embedded systems, IoT and emerging tech for hands-on, project-based learning."
              />
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-nsYellow p-6 shadow-soft">
                    <p className="font-heading text-3xl font-extrabold text-nsBlack">100%</p>
                    <p className="mt-1 text-sm font-semibold text-nsBlack/70">Hands-on, project-first learning</p>
                  </div>
                  <div className="rounded-2xl bg-nsBlack p-6 text-nsWhite shadow-soft">
                    <p className="font-heading text-3xl font-extrabold text-nsYellow">A-Z</p>
                    <p className="mt-1 text-sm font-semibold text-nsWhite/70">From learning to working prototypes</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT WE BELIEVE ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What We Believe"
            title="Learn - Build - Innovate - Solve"
            subtitle="Every young innovator follows the same journey we believe in — understand it, make it, improve it, and use it to solve real problems."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {BELIEFS.map((belief, i) => (
              <Reveal key={belief.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsGray-light p-6 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-nsYellow text-nsBlack shadow-soft">
                    {belief.icon}
                  </span>
                  <span className="font-heading text-lg font-extrabold text-nsBlack">
                    {belief.label}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2 font-heading font-bold text-nsBlack">
              <span>Learn</span>
              <FiArrowRight className="text-nsYellow" />
              <span>Build</span>
              <FiArrowRight className="text-nsYellow" />
              <span>Innovate</span>
              <FiArrowRight className="text-nsYellow" />
              <span>Solve</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOCUS AREAS ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Our Focus Areas"
            title="Where we"
            highlight="innovate"
            subtitle="Seven areas of focus spanning everything a young builder needs to go from first spark to finished prototype."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={(i % 3) * 0.1}>
                <Card
                  icon={area.icon}
                  title={area.title}
                  description={area.desc}
                  className="border-nsWhite/10"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ECOSYSTEM STRIP ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Ecosystem"
            title="From kit to finished prototype"
            subtitle="A complete journey — every tool, step and stage Nano Spark supports."
          />
          <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between">
            {ECOSYSTEM.map((step, i) => (
              <Reveal key={step} delay={i * 0.12} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center lg:gap-3">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-nsWhite px-5 py-5 shadow-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nsYellow font-heading font-extrabold text-nsBlack">
                    {i + 1}
                  </span>
                  <span className="font-heading text-lg font-extrabold text-nsBlack">{step}</span>
                </motion.div>
                {i < ECOSYSTEM.length - 1 && (
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="mx-auto mt-2 text-nsYellow rotate-90 lg:mt-0 lg:rotate-0"
                  >
                    <FiArrowRight size={22} />
                  </motion.span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISION ============ */}
      <section className="relative overflow-hidden bg-nsYellow py-20">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Reveal>
            <p className="font-heading text-2xl font-extrabold leading-snug text-nsBlack sm:text-3xl">
              Our vision is a generation that doesn't just consume technology —{' '}
              <span className="underline decoration-nsBlack/30">they build it</span>.
            </p>
            <p className="mt-6 font-heading text-xl font-bold text-nsBlack/70">
              Nano Spark — Turning curiosity into innovation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-5xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift sm:px-14"
        >
          <h2 className="font-heading text-3xl font-extrabold text-nsBlack sm:text-4xl">
            Bring Nano Spark to your school
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-nsBlack/75">
            Set up a STEM lab, run robotics workshops, or launch an innovation program for your
            students. Let's build something brilliant together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-dark">
              Contact Us <FiArrowRight />
            </Link>
            <Link to="/workshops" className="btn-outline">
              See Workshops
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}
