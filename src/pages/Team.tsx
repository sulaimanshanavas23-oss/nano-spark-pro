import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiLinkedin, FiMail, FiPhone, FiUsers } from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'

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

      {/* ============ CORE TEAM ============ */}
      <section className="relative overflow-hidden bg-nsWhite py-20">
        <CircuitBackground variant="light" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Core Team"
            title="Meet the team"
            highlight="behind the spark"
            subtitle="A young leadership team that runs Nano Spark — from daily operations to community growth."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.12}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      className="aspect-[4/5] w-full object-cover object-top"
                      draggable={false}
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-nsYellow px-3 py-1 font-heading text-xs font-extrabold text-nsBlack shadow-soft">
                      {member.roleShort}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/40 to-transparent px-5 pb-4 pt-14">
                      <p className="font-heading text-xl font-extrabold text-nsWhite">{member.name}</p>
                      <p className="text-[11px] font-bold tracking-[0.16em] text-nsYellow">{member.dept}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <h3 className="font-heading text-lg font-extrabold text-nsBlack">{member.role}</h3>
                    <div className="grid gap-2 text-sm">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2.5 truncate text-nsBlack/70 transition-colors hover:text-nsBlack"
                      >
                        <FiMail className="shrink-0 text-nsYellow" size={16} />
                        <span className="truncate">{member.email}</span>
                      </a>
                      <a
                        href={member.phone}
                        className="flex items-center gap-2.5 text-nsBlack/70 transition-colors hover:text-nsBlack"
                      >
                        <FiPhone className="shrink-0 text-nsYellow" size={16} />
                        <span>{member.phoneDisplay}</span>
                      </a>
                    </div>
                    <div className="mt-auto flex gap-2.5">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-yellow flex-1 justify-center !px-2 !py-2.5 text-sm"
                      >
                        <FiLinkedin size={16} /> LinkedIn
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="btn-outline flex-1 justify-center !px-2 !py-2.5 text-sm"
                      >
                        <FiMail size={16} /> Email
                      </a>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
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