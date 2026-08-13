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
import { WordReveal } from '../components/WordReveal'
import { LetterReveal } from '../components/LetterReveal'
import { ConnectedSteps } from '../components/ConnectedSteps'
import TechStackMarquee from '../components/TechStackMarquee'
import { WHATSAPP_LINK, FOUNDER, SITE } from '../lib/site'

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
              <LetterReveal
                texts={[{ text: 'About' }, { text: 'Nano Spark', color: 'text-nsYellow' }]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              {SITE.name} — {SITE.tagline}. A technology and STEM innovation startup from Chennai,
              making hands-on tech education real for students and schools.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                MSME Registered
              </span>
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                StartupTN Recognized
              </span>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#founder" className="btn-yellow">
                Meet the Founder <FiArrowRight />
              </a>
              <a href="#vision" className="btn-outline !border-nsWhite/40 !text-nsWhite hover:!border-nsYellow hover:!text-nsYellow">
                Founder's Vision
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MEET THE FOUNDER (top) ============ */}
      <section id="founder" className="relative overflow-hidden bg-nsWhite py-20">
        <CircuitBackground variant="light" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> {FOUNDER.heading}
            </span>
            <h2 className="mt-3 text-center font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              <WordReveal text="MEET THE FOUNDER" />
            </h2>
          </Reveal>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-5">
            {/* Founder image — LEFT side */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="relative">
                <div className="circuit-bg-light absolute -inset-4 rounded-3xl bg-nsYellow/10" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-3xl border-4 border-nsYellow bg-nsGray-light shadow-lift"
                >
                  <img
                    src={SITE.founderPhoto}
                    alt={FOUNDER.name}
                    className="aspect-[4/5] w-full object-cover object-top"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/50 to-transparent px-5 pb-5 pt-16 text-center">
                    <p className="font-heading text-2xl font-extrabold text-nsYellow">{FOUNDER.name}</p>
                    <p className="text-xs font-bold tracking-[0.18em] text-nsWhite/80">{FOUNDER.role}</p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-6 grid gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-yellow w-full justify-center"
                >
                  Talk to the Founder <FiArrowRight />
                </a>
                <Link to="/book" className="btn-outline w-full justify-center">
                  Book a Session
                </Link>
              </div>
            </Reveal>

            {/* Founder details — RIGHT side */}
            <div className="lg:col-span-3">
              <Reveal delay={0.15}>
                <h3 className="font-heading text-3xl font-extrabold text-nsBlack sm:text-4xl">
                  {FOUNDER.name}
                </h3>
                <p className="mt-1 font-heading text-sm font-bold tracking-[0.14em] text-nsYellow">
                  {FOUNDER.role}
                </p>
              </Reveal>
              <div className="mt-5 space-y-4">
                {FOUNDER.intro.map((para, i) => (
                  <Reveal key={i} delay={0.2 + i * 0.08}>
                    <p className="leading-relaxed text-nsBlack/75">{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div className="mt-8 rounded-2xl border border-nsBlack/10 bg-nsGray-light p-6">
                  <p className="font-heading font-extrabold text-nsBlack">His Approach</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 font-heading font-extrabold text-nsBlack">
                    {FOUNDER.approach.map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ type: 'spring', stiffness: 280, damping: 17, delay: i * 0.1 }}
                          className="rounded-lg bg-nsYellow px-3 py-1.5 text-sm"
                        >
                          {step}
                        </motion.span>
                        {i < FOUNDER.approach.length - 1 && (
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-nsYellow"
                          >
                            <FiArrowRight size={16} />
                          </motion.span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="mt-6 text-sm leading-relaxed text-nsBlack/65">{FOUNDER.approachNote}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER'S VISION ============ */}
      <section id="vision" className="relative overflow-hidden bg-nsBlack py-20 text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> {FOUNDER.visionHeading}
            </span>
            <blockquote className="mx-auto mt-6 max-w-3xl font-heading text-2xl font-extrabold leading-relaxed text-nsWhite [text-wrap:balance] sm:text-3xl">
              {FOUNDER.visionQuote}
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <img
                src={SITE.founderPhoto}
                alt={FOUNDER.name}
                className="h-14 w-14 rounded-full border-2 border-nsYellow object-cover object-top"
                draggable={false}
              />
              <div className="text-left">
                <p className="font-heading font-extrabold text-nsYellow">{FOUNDER.name}</p>
                <p className="text-xs font-bold tracking-[0.16em] text-nsWhite/70">{FOUNDER.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BUILDING TOWARDS A BIGGER VISION ============ */}
      <section className="bg-nsYellow/15 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="The Road Ahead"
            title={FOUNDER.biggerVisionHeading}
            subtitle="Shanavas aims to grow Nano Spark beyond STEM kits into a broader STEM and innovation ecosystem — every stage connecting to the next."
          />
          <div className="mt-14">
            <ConnectedSteps steps={FOUNDER.biggerVision} vertical />
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <p className="font-heading text-xl font-extrabold text-nsBlack">
                S. Shanavas · Founder &amp; CEO, Nano Spark
              </p>
              <p className="mt-1 font-heading text-sm font-bold tracking-[0.2em] text-nsBlack/60">
                {SITE.tagline}
              </p>
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

      {/* ============ MISSION / VALUES ============ */}
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
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link to="/contact" className="btn-yellow">
                Partner with Nano Spark <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TECH STACKS WE USE ============ */}
      <section className="bg-nsGray-light py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Technology Stacks"
            title="The tech we"
            highlight="work with"
            subtitle="Every stack Nano Spark uses to build kits, labs and student projects — floating through like the feedback wall."
          />
          <div className="mt-8">
            <TechStackMarquee />
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
            Bring Nano Spark to your school
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Set up a STEM lab, run robotics workshops, or join the Nano Spark Ambassador Program.
            Let's build something brilliant together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-dark">
              Contact Us <FiArrowRight />
            </Link>
            <Link to="/careers" className="btn-outline">
              Explore Careers
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}