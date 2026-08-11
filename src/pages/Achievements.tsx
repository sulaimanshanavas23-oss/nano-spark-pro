import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiAward, FiFlag, FiShield, FiStar } from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { SITE } from '../lib/site'

// TODO: Fill remaining stats with REAL, verified numbers once confirmed.
// Only "Students Trained" (550) is verified so far.
const STATS: { label: string; value: number | null; suffix: string }[] = [
  { label: 'Students Trained', value: 550, suffix: '+' },
  { label: 'Workshops Conducted', value: null, suffix: '+' },
  { label: 'School Partnerships', value: null, suffix: '+' },
  { label: 'Projects Built', value: null, suffix: '+' },
]

const MILESTONES: { year: string; title: string; note: string }[] = [
  { year: 'FOUNDED', title: 'Nano Spark is born', note: 'Founded by S. Shanavas in Chennai with a vision for hands-on STEM education.' },
  { year: 'MILESTONE 01', title: 'First workshops', note: 'Early workshops that validated our learn-by-building approach. (Details to be added)' },
  { year: 'MILESTONE 02', title: 'Recognition', note: 'MSME registration and StartupTN recognition. (Certificates to be added)' },
  { year: 'TODAY', title: 'Growing everyday', note: `${SITE.studentsTrained}+ students trained and a growing community of young innovators.` },
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

export default function Achievements() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Achievements
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal
                texts={[
                  { text: 'Milestones worth' },
                  { text: 'celebrating', color: 'text-nsYellow' },
                ]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Every student, every workshop, every prototype is a step forward. Here are the
              verified numbers and recognitions behind Nano Spark.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Verified Impact"
            title="Our numbers in"
            highlight="real time"
            subtitle="We only publish real, verified data. Remaining counters will tick up as numbers are confirmed."
          />
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECOGNITIONS ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Recognitions"
            title="Registered &"
            highlight="recognized"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    <FiShield size={26} />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-nsBlack">MSME Registered</h3>
                    <p className="text-sm font-semibold text-nsYellow">Udyam registered enterprise</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-nsBlack/70">
                  Nano Spark is registered as a Micro, Small &amp; Medium Enterprise with the
                  Government of India's Udyam portal.
                </p>
                <p className="text-sm font-bold text-nsBlack/60">{SITE.msme.number}</p>
                {/* TODO: drop MSME certificate as public/images/msme-certificate.jpg */}
                <SmartImage
                  src="/images/msme-certificate.jpg"
                  alt="MSME (Udyam) Registration Certificate"
                  className="aspect-[4/3] w-full rounded-2xl border-2 border-nsBlack/10 object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsBlack text-nsYellow">
                    <FiAward size={26} />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-nsBlack">StartupTN Recognized</h3>
                    <p className="text-sm font-semibold text-nsYellow">Recognized technology startup</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-nsBlack/70">
                  Nano Spark is recognized by StartupTN — the Government of Tamil Nadu's startup
                  initiative for education technology and STEM solutions.
                </p>
                <p className="text-sm font-bold text-nsBlack/60">StartupTN Registration — (to be updated)</p>
                {/* TODO: drop StartupTN letter as public/images/startup-tn.jpg */}
                <SmartImage
                  src="/images/startup-tn.jpg"
                  alt="StartupTN Recognition"
                  className="aspect-[4/3] w-full rounded-2xl border-2 border-nsBlack/10 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MILESTONE TIMELINE ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-50" />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Our Journey"
            title="Milestone by"
            highlight="milestone"
            subtitle="The Nano Spark story so far. More chapters are being written every day."
          />
          <div className="mt-12 space-y-6">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="flex flex-col gap-4 rounded-3xl border border-nsWhite/10 bg-nsWhite/5 p-6 sm:flex-row sm:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nsYellow font-heading text-xs font-extrabold text-nsBlack">
                    <FiFlag size={22} />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] font-extrabold tracking-[0.25em] text-nsYellow">{m.year}</p>
                    <h3 className="mt-0.5 font-heading text-xl font-extrabold text-nsWhite">{m.title}</h3>
                    <p className="mt-1 text-sm text-nsWhite/65">{m.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Showcase"
            title="Moments &"
            highlight="wins"
            subtitle="Drop achievement photos into public/images/achievements-1.jpg … achievements-3.jpg"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { src: '/images/achievements-1.jpg', label: 'Workshop Milestones' },
              { src: '/images/achievements-2.jpg', label: 'Ceremonies & Awards' },
              { src: '/images/achievements-3.jpg', label: 'Student Wins' },
            ].map((g, i) => (
              <Reveal key={g.src} delay={i * 0.1}>
                <motion.figure
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                >
                  <SmartImage src={g.src} alt={g.label} className="aspect-[4/3] w-full object-cover" />
                </motion.figure>
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
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-nsBlack text-nsYellow">
            <FiStar size={26} />
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-nsBlack">
            Your school could be our next milestone
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Partner with Nano Spark and add your students to the story.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-dark">
              Partner With Us <FiArrowRight />
            </Link>
            <Link to="/community" className="btn-outline">
              Join the Community
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}