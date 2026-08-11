import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCpu,
  FiShield,
  FiSun,
  FiTarget,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { Reveal } from '../components/Reveal'
import { FOUNDER, SITE } from '../lib/site'

const WHAT_WE_DO = [
  { icon: <FiBookOpen size={24} />, title: 'STEM Kits', desc: 'Curated hands-on kits — electronics, Arduino, robotics, IoT and innovation bundles.' },
  { icon: <FiTool size={24} />, title: 'School STEM Labs', desc: 'Full lab setup with equipment, curriculum support and teacher training.' },
  { icon: <FiZap size={24} />, title: 'Workshops', desc: 'Interactive electronics, coding, robotics, IoT and AI sessions for students.' },
  { icon: <FiSun size={24} />, title: 'Innovation Programs', desc: 'Challenges, hackathons, competitions and technology exhibitions.' },
  { icon: <FiCpu size={24} />, title: 'Technology Solutions', desc: 'Custom robotics, IoT and embedded solutions for schools and campuses.' },
  { icon: <FiUsers size={24} />, title: 'Young Innovators', desc: 'A growing community where students build, share and showcase their projects.' },
]

const VALUES = [
  { icon: <FiTarget size={26} />, title: 'Our Mission', desc: 'Make practical technology education accessible to every student, school and aspiring innovator.' },
  { icon: <FiShield size={26} />, title: 'Our Promise', desc: 'Hands-on, project-first learning that takes students from first spark to working prototype.' },
  { icon: <FiAward size={26} />, title: 'Our Standard', desc: 'An MSME registered, StartupTN recognized startup — built for trustworthy partnerships.' },
]

export default function About() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> About Us
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              About <span className="text-nsYellow">Nano Spark</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              {SITE.name} — {SITE.tagline}. A technology and STEM innovation startup from Chennai,
              making hands-on tech education real for students and schools.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                MSME Registered
              </span>
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                StartupTN Recognized
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Born from a simple"
              highlight="belief"
              subtitle="Nano Spark is a technology and STEM innovation startup making practical technology education accessible to students, schools, and aspiring innovators. Led by founder S. Shanavas, we combine STEM, robotics, electronics, embedded systems, IoT and emerging tech for hands-on, project-based learning."
            />
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-nsYellow p-6 shadow-soft">
                  <p className="font-heading text-4xl font-extrabold text-nsBlack">
                    {SITE.studentsTrained}+
                  </p>
                  <p className="mt-1 text-sm font-semibold text-nsBlack/70">students trained</p>
                </div>
                <div className="rounded-2xl bg-nsBlack p-6 text-nsWhite shadow-soft">
                  <p className="font-heading text-4xl font-extrabold text-nsYellow">6</p>
                  <p className="mt-1 text-sm font-semibold text-nsWhite/70">focus areas &amp; counting</p>
                </div>
                <div className="rounded-2xl bg-nsGray-light p-6 shadow-soft">
                  <p className="font-heading text-4xl font-extrabold text-nsBlack">100%</p>
                  <p className="mt-1 text-sm font-semibold text-nsBlack/70">hands-on learning</p>
                </div>
                <div className="rounded-2xl bg-nsYellow/50 p-6 shadow-soft">
                  <p className="font-heading text-4xl font-extrabold text-nsBlack">A-Z</p>
                  <p className="mt-1 text-sm font-semibold text-nsBlack/70">concepts to working prototypes</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MISSION / VISION ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading eyebrow="Why We Exist" title="Mission, promise &" highlight="standard" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <Card icon={v.icon} title={v.title} description={v.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="What We Do"
            title="Everything a young innovator"
            highlight="needs"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.1}>
                <Card icon={item.icon} title={item.title} description={item.desc} className="border-nsWhite/10" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOUNDER SNIPPET ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-8 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-8 shadow-soft md:flex-row">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={SITE.founderPhoto}
                alt={FOUNDER.name}
                className="h-32 w-32 shrink-0 rounded-2xl border-4 border-nsYellow object-cover object-top"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                  Led by {FOUNDER.name}
                </h2>
                <p className="text-sm font-bold text-nsYellow">{FOUNDER.role}</p>
                <p className="mt-3 text-nsBlack/70">
                  An ECE student entrepreneur with a passion for robotics, electronics, embedded
                  systems, IoT and STEM education — building Nano Spark to turn student curiosity
                  into real-world innovation.
                </p>
                <Link to="/contact" className="btn-yellow mt-5">
                  Meet the Founder <FiArrowRight />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="bg-nsYellow/15 py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="Learn - Build - Experiment - Debug - Innovate - Solve"
          />
          <div className="mt-10 flex flex-col items-center gap-4">
            {FOUNDER.approach.map((step, i) => (
              <Reveal key={step} delay={i * 0.07}>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-nsBlack font-heading text-sm font-extrabold text-nsYellow">
                    {i + 1}
                  </span>
                  <span className="rounded-2xl bg-nsWhite px-6 py-3 font-heading text-xl font-extrabold text-nsBlack shadow-soft">
                    {step}
                  </span>
                  {i < FOUNDER.approach.length - 1 && (
                    <FiArrowRight className="rotate-90 text-nsYellow" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift"
        >
          <h2 className="font-heading text-3xl font-extrabold text-nsBlack">
            Learn more about our founder &amp; journey
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Read about S. Shanavas, his vision, and how the Nano Spark ecosystem is growing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-dark">
              About the Founder <FiArrowRight />
            </Link>
            <Link to="/products" className="btn-outline">
              Explore Our Kits
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}