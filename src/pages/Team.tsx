import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiArrowLeft,
  FiLinkedin,
  FiUsers,
  FiTarget,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'

interface TeamMember {
  name: string
  role: string
  roleShort: string
  headline: string
  photo: string
  linkedin: string
  email: string
  phone: string
  phoneDisplay: string
  summary: string
  focus: string[]
  responsibilities: string[]
  education: string
  skills: string[]
}

const TEAM: TeamMember[] = [
  {
    name: 'Dharshan E.',
    role: 'Chief Operating Officer (COO)',
    roleShort: 'COO',
    headline: 'Operations · Business Execution · Partnerships · Growth',
    photo: '/images/dharshan-e.jpeg',
    linkedin: 'https://www.linkedin.com/in/dharshan-e-694a82329/',
    email: 'dharshane21@gmail.com',
    phone: 'tel:+919840363412',
    phoneDisplay: '+91 98403 63412',
    summary:
      'Driving Nano Spark\'s day-to-day operations, business execution and strategic partnerships. Dharshan oversees workflow coordination, team alignment and growth initiatives to ensure the company delivers on its mission of making STEM education practical and accessible.',
    focus: ['Operations', 'Business Execution', 'Partnerships', 'Team Coordination', 'Growth Strategy'],
    responsibilities: [
      'Overseeing daily operations and workflow coordination',
      'Building and managing strategic school and institutional partnerships',
      'Ensuring cross-functional team alignment and execution',
      'Driving business growth and operational efficiency',
      'Managing logistics for workshops, lab setups and kit deliveries',
    ],
    education: 'Electronics & Communication Engineering',
    skills: ['Operations Management', 'Business Development', 'Partnership Building', 'Team Leadership', 'Strategic Planning', 'Process Optimization'],
  },
  {
    name: 'Mohammed Thariq A.',
    role: 'Chief Marketing Officer (CMO)',
    roleShort: 'CMO',
    headline: 'Marketing · Branding · Digital Presence · Customer Acquisition',
    photo: '/images/mohammed-thariq.jpeg',
    linkedin: 'https://www.linkedin.com/in/mohammed-thariq-a-68100433b/',
    email: 'mohammedthariq26@gmail.com',
    phone: 'tel:+918015808897',
    phoneDisplay: '+91 80158 08897',
    summary:
      'Leading Nano Spark\'s marketing strategy, brand identity and digital presence. Mohammed Thariq drives customer acquisition, community engagement and content creation to build Nano Spark\'s visibility across schools, colleges and the wider STEM education ecosystem.',
    focus: ['Marketing Strategy', 'Branding', 'Digital Presence', 'Customer Acquisition', 'Community Building'],
    responsibilities: [
      'Developing and executing marketing strategies for school outreach',
      'Building Nano Spark\'s brand identity and visual presence',
      'Managing social media, content and digital marketing channels',
      'Driving customer acquisition and school partnership pipelines',
      'Creating campaigns that highlight student projects and workshop impact',
    ],
    education: 'Electronics & Communication Engineering',
    skills: ['Digital Marketing', 'Brand Strategy', 'Social Media Management', 'Content Creation', 'Market Research', 'Community Engagement'],
  },
  {
    name: 'Tejasri R. S.',
    role: 'Chief Innovation Officer (CIO)',
    roleShort: 'CIO',
    headline: 'Innovation · Technology Strategy · Product Development · Research',
    photo: '/images/tejasri-rs.jpeg',
    linkedin: 'https://www.linkedin.com/in/tejasri-r-s-a31a57329/',
    email: 'tejasrirs2006@gmail.com',
    phone: 'tel:+917305395117',
    phoneDisplay: '+91 73053 95117',
    summary:
      'Leading Nano Spark\'s innovation pipeline, technology strategy and product development. Tejasri drives research into emerging technologies, oversees curriculum design for workshops and ensures the company stays at the forefront of STEM education tools and methods.',
    focus: ['Innovation', 'Technology Strategy', 'Product Development', 'Research', 'Curriculum Design'],
    responsibilities: [
      'Driving technology strategy and innovation initiatives',
      'Overseeing product development for STEM kits and lab solutions',
      'Researching emerging technologies like IoT, AI and embedded systems',
      'Designing curriculum and project-based learning content',
      'Ensuring quality and relevance of workshop technology and tools',
    ],
    education: 'Electronics & Communication Engineering',
    skills: ['Technology Strategy', 'Product Development', 'IoT & Embedded Systems', 'Python Programming', 'AI & Computer Vision', 'Curriculum Design'],
  },
]

const CARD_INTERVAL = 4000

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -400 : 400, opacity: 0, scale: 0.9 }),
}

function TeamCarousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const member = TEAM[index]

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1)
    setIndex((next + TEAM.length) % TEAM.length)
  }, [index])

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, CARD_INTERVAL)
    return () => clearInterval(t)
  }, [next, paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Flash card container */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-nsBlack/10 bg-nsWhite shadow-soft">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={member.name}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col lg:flex-row"
          >
            {/* Photo */}
            <div className="relative lg:w-[340px] shrink-0">
              <div className="relative overflow-hidden">
                <img
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  className="aspect-[3/4] w-full object-cover object-top lg:aspect-[4/5]"
                  draggable={false}
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="absolute left-4 top-4 rounded-full bg-nsYellow px-4 py-1.5 font-heading text-base font-extrabold text-nsBlack shadow-soft"
                >
                  {member.roleShort}
                </motion.span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/40 to-transparent px-6 pb-5 pt-14">
                  <p className="font-heading text-2xl font-extrabold text-nsWhite sm:text-3xl">{member.name}</p>
                  <p className="mt-1 text-base font-semibold text-nsYellow">{member.role}</p>
                </div>
              </div>

              {/* ===== MOBILE ONLY: Arrows + Focus + Social below image ===== */}
              <div className="lg:hidden space-y-5 p-6">
                {/* Left/Right arrows */}
                <div className="flex items-center justify-center gap-4">
                  <button type="button" onClick={prev} aria-label="Previous profile"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-nsBlack text-nsYellow shadow-soft active:scale-95 transition-transform">
                    <FiArrowLeft size={20} />
                  </button>
                  <span className="text-xs font-bold text-nsBlack/40">{index + 1} / {TEAM.length}</span>
                  <button type="button" onClick={next} aria-label="Next profile"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-nsBlack text-nsYellow shadow-soft active:scale-95 transition-transform">
                    <FiArrowRight size={20} />
                  </button>
                </div>

                {/* Focus Areas */}
                <div>
                  <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold text-nsBlack">
                    <FiTarget size={14} className="text-nsYellow" /> Focus Areas
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {member.focus.map((f, fi) => (
                      <motion.span
                        key={f}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + fi * 0.06, type: 'spring', stiffness: 200 }}
                        className="rounded-full border border-nsBlack/10 bg-nsGray-light px-3 py-1 text-xs font-bold text-nsBlack"
                      >
                        {f}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn & Gmail tabs */}
                <div className="flex gap-3">
                  <a href={member.linkedin} target="_blank" rel="noreferrer noopener"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#0A66C2] bg-[#0A66C2] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#004182]">
                    <FiLinkedin size={16} /> LinkedIn
                  </a>
                  <a href={`mailto:${member.email}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-nsBlack bg-white px-4 py-2.5 text-sm font-bold text-nsBlack transition-all hover:bg-nsBlack hover:text-nsYellow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Gmail
                  </a>
                </div>

                {/* Summary */}
                <p className="text-sm leading-relaxed text-nsBlack/70">{member.summary}</p>
              </div>
            </div>

            {/* Details — desktop only */}
            <div className="hidden lg:flex flex-1 flex-col p-6 sm:p-7 lg:p-10">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-semibold uppercase tracking-wider text-nsYellow"
              >
                {member.headline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-5 text-base leading-relaxed text-nsBlack/75"
              >
                {member.summary}
              </motion.p>

              {/* Focus Areas */}
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-heading text-base font-extrabold text-nsBlack">
                  <FiTarget size={16} className="text-nsYellow" /> Focus Areas
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.focus.map((f, fi) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + fi * 0.06, type: 'spring', stiffness: 200 }}
                      className="rounded-full border border-nsBlack/10 bg-nsGray-light px-4 py-1.5 text-sm font-bold text-nsBlack"
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-xl border-2 border-[#0A66C2] bg-[#0A66C2] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#004182]"
                >
                  <FiLinkedin size={16} /> LinkedIn
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 rounded-xl border-2 border-nsBlack bg-white px-4 py-2.5 text-sm font-bold text-nsBlack transition-all hover:bg-nsBlack hover:text-nsYellow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Gmail
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left arrow — desktop only */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous profile"
          className="hidden lg:flex absolute left-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-nsBlack/70 text-nsWhite backdrop-blur transition-all hover:bg-nsYellow hover:text-nsBlack"
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Right arrow — desktop only */}
        <button
          type="button"
          onClick={next}
          aria-label="Next profile"
          className="hidden lg:flex absolute right-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-nsBlack/70 text-nsWhite backdrop-blur transition-all hover:bg-nsYellow hover:text-nsBlack"
        >
          <FiArrowRight size={20} />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {TEAM.map((m, i) => (
          <button
            key={m.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`View ${m.name}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-nsYellow' : 'w-2.5 bg-nsBlack/20 hover:bg-nsBlack/40'
            }`}
          />
        ))}
        <span className="ml-3 text-xs font-bold text-nsBlack/40">
          {index + 1} / {TEAM.length}
        </span>
      </div>
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
              <span className="text-nsYellow">&#9654;</span> Meet The Team
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal
                texts={[
                  { text: 'Building the future of' },
                  { text: ' STEM Education', color: 'text-nsYellow' },
                ]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Meet the team working to make technology learning more practical, accessible and
              innovation-driven.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TEAM PROFILES — Flash Card Carousel ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <TeamCarousel />

          {/* Leadership Statement */}
          <Reveal delay={0.3}>
            <div className="mt-16 rounded-2xl border-2 border-nsYellow/30 bg-nsWhite p-8 text-center shadow-soft">
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-nsBlack/75">
                Together, our team combines{' '}
                <span className="font-extrabold text-nsBlack">operations</span>,{' '}
                <span className="font-extrabold text-nsBlack">marketing</span> and{' '}
                <span className="font-extrabold text-nsBlack">innovation</span> to build Nano Spark
                into a practical STEM learning ecosystem for the next generation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-nsBlack text-nsYellow">
            <FiUsers size={26} />
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-nsBlack">
            <LetterReveal
              texts={[{ text: 'Lead, teach & grow with Nano Spark' }]}
              stagger={0.03}
            />
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
