import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiBookOpen,
  FiCpu,
  FiTool,
  FiWifi,
  FiZap,
  FiSun,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import SmartImage from '../components/SmartImage'
import TestimonialMarquee from '../components/TestimonialMarquee'
import { Reveal } from '../components/Reveal'
import { ConnectedSteps } from '../components/ConnectedSteps'
import { FOUNDER, SITE } from '../lib/site'

const FOCUS_AREAS = [
  { icon: <FiBookOpen size={26} />, title: 'STEM & Electronics Education', desc: 'Hands-on learning programs that make electronics and science fun, practical and accessible.' },
  { icon: <FiTool size={26} />, title: 'Robotics & Automation', desc: 'Design, build and program robots — from line followers to fully automated systems.' },
  { icon: <FiCpu size={26} />, title: 'Embedded Systems', desc: 'Microcontrollers, sensors and firmware — the brains behind every smart device.' },
  { icon: <FiWifi size={26} />, title: 'IoT & Smart Technology', desc: 'Connect devices to the internet and build smart, sensor-driven solutions.' },
  { icon: <FiZap size={26} />, title: 'AI & Emerging Technologies', desc: 'Introductions to AI, agentic AI, automation and the technologies of tomorrow.' },
  { icon: <FiSun size={26} />, title: 'Innovation & Project Development', desc: 'Turn ideas into working prototypes through guided project development.' },
]

const ECOSYSTEM = ['STEM Kits', 'Workshops', 'Projects', 'Innovation', 'Prototypes']

const HERO_TITLE = [
  { w: 'Turning', c: 'text-nsBlack' },
  { w: 'Curiosity', c: 'text-nsBlack' },
  { w: 'Into', c: 'text-nsBlack' },
  { w: 'Innovation', c: 'text-nsYellow' },
]

export default function Home() {
  let letterCount = 0
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:py-24">
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

            {/* Headline: site font (Baloo 2), revealing LETTER BY LETTER */}
            <h1 className="mt-5 font-heading font-extrabold text-5xl leading-[1.08] text-nsBlack sm:text-6xl lg:text-7xl">
              {HERO_TITLE.map((word, wi) => (
                <span key={word.w}>
                  <span className={`mr-3 inline-block ${word.c}`}>
                    {word.w.split('').map((ch, ci) => {
                      const delay = 0.2 + letterCount * 0.035
                      letterCount++
                      return (
                        <motion.span
                          key={ci}
                          className="inline-block"
                          initial={{ opacity: 0, y: '0.85em', rotateX: -75 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ duration: 0.42, delay, ease: 'easeOut' }}
                        >
                          {ch}
                        </motion.span>
                      )
                    })}
                  </span>
                  {wi === 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 text-lg font-semibold tracking-[0.14em] text-nsBlack/70"
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

          {/* Hero visual — TODO: drop real photo as public/images/hero.jpg */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md"
            >
              <div className="circuit-bg-light absolute -inset-6 rounded-3xl bg-nsYellow/10" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border-4 border-nsYellow bg-white shadow-lift"
              >
                <SmartImage
                  src="/images/hero.jpg"
                  alt="Nano Spark students building a project"
                  className="h-full w-full object-cover"
                  fallback={
                    <img
                      src={SITE.logo}
                      alt={SITE.name}
                      className="h-4/5 w-4/5 object-contain object-center"
                      draggable={false}
                    />
                  }
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ 550+ STUDENTS TRAINED STRIP ============ */}
      <section className="bg-nsBlack py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 text-center sm:flex-row sm:gap-8 sm:px-8">
          <p className="font-heading text-3xl font-extrabold text-nsYellow sm:text-4xl">
            {SITE.studentsTrained}+
          </p>
          <p className="font-heading text-lg font-bold text-white">
            Students trained through Nano Spark workshops &amp; programs
          </p>
        </div>
      </section>

      {/* ============ VOICE OF STUDENTS & PARENTS ============ */}
      <section className="bg-nsYellow/15 py-10">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What Students & Parents Say"
            title="Feedback from our"
            highlight="workshops"
          />
          <div className="mt-8">
            <TestimonialMarquee />
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

      {/* ============ FOUNDER APPROACH / HOW WE WORK ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="Learn - Build - Experiment - Debug - Innovate - Solve"
            subtitle="The Nano Spark learning journey, inspired by our founder's approach — every young innovator follows the same path: understand it, make it, improve it, and use it to solve real problems. The line connects one step at a time as you scroll."
          />
          <div className="mt-14">
            <ConnectedSteps steps={FOUNDER.approach} />
          </div>
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
            subtitle="Six areas of focus spanning everything a young builder needs to go from first spark to finished prototype."
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
                    className="mx-auto mt-2 rotate-90 text-nsYellow lg:mt-0 lg:rotate-0"
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
