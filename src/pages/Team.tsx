import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiChevronDown,
  FiLinkedin,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiTarget,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
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

function ProfileCard({ member, index }: { member: TeamMember; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
      layout
      className="overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
    >
      <div className="flex flex-col lg:flex-row">
        {/* LEFT: Photo + Basic Info */}
        <div className="relative lg:w-[340px] shrink-0">
          <div className="relative overflow-hidden">
            <img
              src={member.photo}
              alt={`${member.name} — ${member.role}`}
              className="aspect-[3/4] w-full object-cover object-top lg:aspect-[4/5]"
              draggable={false}
            />
            <span className="absolute left-4 top-4 rounded-full bg-nsYellow px-4 py-1.5 font-heading text-base font-extrabold text-nsBlack shadow-soft">
              {member.roleShort}
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/40 to-transparent px-6 pb-5 pt-14">
              <p className="font-heading text-2xl font-extrabold text-nsWhite sm:text-3xl">
                {member.name}
              </p>
              <p className="mt-1 text-base font-semibold text-nsYellow">{member.role}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-10">
          {/* Headline */}
          <p className="text-sm font-semibold uppercase tracking-wider text-nsYellow">
            {member.headline}
          </p>

          {/* Summary */}
          <p className="mt-5 text-base leading-relaxed text-nsBlack/75">
            {member.summary}
          </p>

          {/* Focus Areas */}
          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-heading text-base font-extrabold text-nsBlack">
              <FiTarget size={16} className="text-nsYellow" /> Focus Areas
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-nsBlack/10 bg-nsGray-light px-4 py-1.5 text-sm font-bold text-nsBlack"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable Section */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-6 flex items-center gap-2 self-start rounded-xl border-2 border-nsBlack bg-nsBlack px-5 py-2.5 font-heading text-sm font-extrabold text-nsYellow transition-all hover:bg-nsYellow hover:text-nsBlack"
          >
              {expanded ? 'Hide Profile' : 'View Full Profile'}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FiChevronDown size={16} />
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-5 border-t border-nsBlack/10 pt-5">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold text-nsBlack">
                        <FiBriefcase size={14} className="text-nsYellow" /> Responsibilities at Nano Spark
                      </h4>
                      <ul className="mt-2.5 space-y-2">
                        {member.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-sm text-nsBlack/75">
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-nsYellow text-[9px] font-extrabold text-nsBlack">
                              &#10003;
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold text-nsBlack">
                        <FiStar size={14} className="text-nsYellow" /> Key Skills
                      </h4>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {member.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-nsBlack bg-nsBlack px-3 py-1 text-xs font-bold text-nsYellow"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold text-nsBlack">
                        <FiUsers size={14} className="text-nsYellow" /> Education
                      </h4>
                      <p className="mt-2 text-sm text-nsBlack/75">{member.education}</p>
                    </div>

                    {/* Contact Links */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-yellow !px-4 !py-2 text-sm"
                      >
                        <FiLinkedin size={16} /> LinkedIn
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="btn-outline !px-4 !py-2 text-sm"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Reveal>
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

      {/* ============ TEAM PROFILES ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="space-y-10">
            {TEAM.map((member, i) => (
              <ProfileCard key={member.name} member={member} index={i} />
            ))}
          </div>

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
