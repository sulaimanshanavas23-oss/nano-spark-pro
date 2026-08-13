import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiUsers,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'

// Each flashcard stays on screen for this long before the next one appears.
const FLASH_DURATION_MS = 5_000

interface TeamMember {
  name: string
  role: string
  roleShort: string
  dept: string
  email: string
  phone: string
  phoneDisplay: string
  linkedin: string
  photo: string
}

const TEAM: TeamMember[] = [
  {
    name: 'E. Dharshan',
    role: 'Chief Operating Officer (COO)',
    roleShort: 'COO',
    dept: 'ECE · 3rd Year',
    email: 'dharshane21@gmail.com',
    phone: 'tel:+919840363412',
    phoneDisplay: '+91 98403 63412',
    linkedin: 'https://www.linkedin.com/in/dharshan-e-694a82329',
    photo: '/images/dharshan-e.jpeg',
  },
  {
    name: 'A. Mohammed Thariq',
    role: 'Chief Marketing Officer (CMO)',
    roleShort: 'CMO',
    dept: 'ECE · 3rd Year',
    email: 'mohammedthariq26@gmail.com',
    phone: 'tel:+918015808897',
    phoneDisplay: '+91 80158 08897',
    linkedin: 'https://www.linkedin.com/in/mohammed-thariq-a-68100433b',
    photo: '/images/mohammed-thariq.jpeg',
  },
  {
    name: 'R. S. Tejasri',
    role: 'Chief Information Officer (CIO)',
    roleShort: 'CIO',
    dept: 'ECE · 3rd Year',
    email: 'tejasrirs2006@gmail.com',
    phone: 'tel:+917305395117',
    phoneDisplay: '+91 73053 95117',
    linkedin: 'https://www.linkedin.com/in/tejasri-r-s-a31a57329',
    photo: '/images/tejasri-rs.jpeg',
  },
]

function TeamFlashcard() {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0])
  const touchX = useRef<number | null>(null)
  const member = TEAM[index]

  const paginate = useCallback((dir: number) => {
    setPage(([i]) => [(i + dir + TEAM.length) % TEAM.length, dir])
  }, [])

  // Auto-advance: every 5 seconds a new flashcard appears on EVERY device.
  // Restarts whenever the user manually flips (index changes).
  useEffect(() => {
    const t = window.setInterval(() => {
      setPage(([i]) => [(i + 1) % TEAM.length, 1])
    }, FLASH_DURATION_MS)
    return () => window.clearInterval(t)
  }, [index])

  // Touch swipe support for mobiles/tablets.
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 48) paginate(dx > 0 ? -1 : 1)
    touchX.current = null
  }

  const cardVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 90 : -90,
      rotateY: dir > 0 ? 16 : -16,
      scale: 0.94,
    }),
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -90 : 90,
      rotateY: dir > 0 ? -16 : 16,
      scale: 0.94,
    }),
  }

  return (
    <div
      className="mx-auto w-full max-w-[24rem]"
      style={{ perspective: 1400 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.article
            key={index}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative overflow-hidden rounded-3xl border-4 border-nsYellow bg-nsWhite shadow-lift"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Photo — full portrait image, no zooming/cropping */}
            <div className="relative overflow-hidden">
              <img
                src={member.photo}
                alt={`${member.name} — ${member.role}`}
                className="aspect-[4/5] w-full object-cover object-top"
                draggable={false}
              />
              <span className="absolute left-4 top-4 rounded-full bg-nsYellow px-3.5 py-1.5 font-heading text-sm font-extrabold text-nsBlack shadow-soft">
                {member.roleShort}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/45 to-transparent px-5 pb-4 pt-14">
                <p className="font-heading text-2xl font-extrabold text-nsWhite">{member.name}</p>
                <p className="text-xs font-bold tracking-[0.16em] text-nsYellow">{member.dept}</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 p-5 sm:p-6">
              <h3 className="font-heading text-xl font-extrabold text-nsBlack">{member.role}</h3>
              <div className="grid gap-2.5 text-sm sm:grid-cols-2">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2.5 rounded-xl border border-nsBlack/10 bg-nsGray-light px-3 py-2.5 text-nsBlack/75 transition-colors hover:border-nsBlack"
                >
                  <FiMail className="shrink-0 text-nsYellow" size={16} />
                  <span className="truncate">{member.email}</span>
                </a>
                <a
                  href={member.phone}
                  className="flex items-center gap-2.5 rounded-xl border border-nsBlack/10 bg-nsGray-light px-3 py-2.5 text-nsBlack/75 transition-colors hover:border-nsBlack"
                >
                  <FiPhone className="shrink-0 text-nsYellow" size={16} />
                  <span>{member.phoneDisplay}</span>
                </a>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-yellow justify-center !px-2 !py-2.5 text-sm"
                >
                  <FiLinkedin size={16} /> LinkedIn
                </a>
                <a href={`mailto:${member.email}`} className="btn-outline justify-center !px-2 !py-2.5 text-sm">
                  <FiMail size={16} /> Email
                </a>
              </div>
            </div>

            {/* 5-second countdown bar */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-nsBlack/10">
              <div
                key={`progress-${index}`}
                className="h-full rounded-full bg-nsYellow"
                style={{ animation: `flash-progress ${FLASH_DURATION_MS}ms linear forwards` }}
              />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous team member"
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-nsBlack bg-nsWhite text-nsBlack shadow-soft transition-all hover:bg-nsBlack hover:text-nsYellow active:scale-95"
        >
          <FiChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2">
          {TEAM.map((m, i) => (
            <button
              key={m.name}
              type="button"
              aria-label={`Show ${m.name}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-7 bg-nsYellow' : 'w-2.5 bg-nsBlack/25 hover:bg-nsBlack/50'
              }`}
            />
          ))}
        </div>
        <span className="font-heading text-sm font-extrabold tracking-widest text-nsBlack/60">
          {String(index + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next team member"
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-nsBlack bg-nsWhite text-nsBlack shadow-soft transition-all hover:bg-nsBlack hover:text-nsYellow active:scale-95"
        >
          <FiChevronRight size={22} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-nsBlack/50">
        Swipe or use the buttons to flip
      </p>
    </div>
  )
}

export default function Team() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Our Team
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal
                texts={[{ text: 'The minds behind' }, { text: 'Nano Spark', color: 'text-nsYellow' }]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Young engineers and innovators leading Nano Spark's operations, marketing and
              technology — turning curiosity into real-world innovation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CORE TEAM — FLASHCARD CAROUSEL ============ */}
      <section className="relative overflow-hidden bg-nsWhite py-20">
        <CircuitBackground variant="light" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Core Team"
            title="Meet the team"
            highlight="one flashcard at a time"
            subtitle="A young leadership team that runs Nano Spark — from daily operations to community growth."
          />
          <div className="mt-14">
            <Reveal>
              <TeamFlashcard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsGray-light py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-nsBlack text-nsYellow">
            <FiUsers size={26} />
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-nsBlack">
            Lead, teach &amp; grow with Nano Spark
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Join the Ambassador Program and work alongside the founding team to spread hands-on
            STEM learning to schools across India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/ambassador" className="btn-dark">
              Become an Ambassador <FiArrowRight />
            </Link>
            <Link to="/about" className="btn-outline">
              Meet the Founder
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}