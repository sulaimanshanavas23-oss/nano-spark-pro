import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiCpu,
  FiLayers,
  FiMail,
  FiMic,
  FiSend,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { WHATSAPP_LINK, SITE } from '../lib/site'

const INTERNSHIPS = [
  {
    icon: <FiBookOpen size={24} />,
    title: 'STEM Education Intern',
    role: 'Teach & mentor',
    what: 'Help prepare kits, run hands-on sessions and support students during workshops and labs.',
    fit: 'Loves teaching, electronics or robotics and enjoys working with school students.',
  },
  {
    icon: <FiCpu size={24} />,
    title: 'Tech & Projects Intern',
    role: 'Build & experiment',
    what: 'Work with Arduino, ESP32, sensors and IoT — prototyping demos and projects for programs.',
    fit: 'Comfortable with circuits and coding; keen to build real working prototypes.',
  },
  {
    icon: <FiLayers size={24} />,
    title: 'Content & Design Intern',
    role: 'Create & share',
    what: 'Make learning content, worksheets, posters, reels and posts that explain tech simply.',
    fit: 'Good with Canva/design tools or writing and excited about educational content.',
  },
  {
    icon: <FiUsers size={24} />,
    title: 'Community & Marketing Intern',
    role: 'Connect & promote',
    what: 'Grow the Nano Spark community — coordinate events, schools and ambassador activities.',
    fit: 'Outgoing, organised, active on social media and comfortable talking to people.',
  },
]

const WHY_JOIN = [
  'Work on real STEM, robotics and IoT projects — not just theory',
  'Mentor young students and see them build their first projects',
  'Gain startup experience alongside a young founder',
  'Flexible, student-friendly schedules',
  'Letter of experience / internship certificate',
  'Grow into the Nano Spark Ambassador Program or a paid role',
]

export default function Careers() {
  const subject = encodeURIComponent('Nano Spark Internship / Career Enquiry')
  const body = encodeURIComponent(
    "Hi Nano Spark,\n\nI'm interested in joining the team. Here's a bit about me:\n\nName:\nEducation / College:\nWhich role are you applying for:\nWhy I want to join:"
  )

  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Careers at Nano Spark
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal texts={[{ text: 'Build, teach & grow with us' }]} />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Join the Nano Spark ecosystem as an intern, ambassador or collaborator — and help
              turn student curiosity into real-world innovation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#internships" className="btn-yellow">
                View Internships <FiArrowRight />
              </a>
              <a href="#ambassadors" className="btn-outline !border-nsWhite/40 !text-nsWhite hover:!border-nsYellow hover:!text-nsYellow">
                Ambassador Program
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ INTERNSHIPS ============ */}
      <section id="internships" className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Internships"
            title="Learn by"
            highlight="working with us"
            subtitle="Open to students, fresh graduates and curious builders. You'll work on real programs, projects and events — not photocopying."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INTERNSHIPS.map((role, i) => (
              <Reveal key={role.title} delay={(i % 4) * 0.1}>
                <Card icon={role.icon} title={role.title} description={role.what} className="h-full">
                  <p className="mt-4 rounded-lg bg-nsBlack px-3 py-2 text-center text-xs font-bold tracking-[0.14em] text-nsYellow">
                    {role.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-nsBlack/60">
                    <strong className="text-nsBlack">Great for:</strong> {role.fit}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${SITE.email}?subject=${subject}&body=${body}`}
                className="btn-dark"
              >
                Apply for an Internship <FiSend />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-outline">
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ AMBASSADOR PROGRAM ============ */}
      <section id="ambassadors" className="relative overflow-hidden bg-nsBlack py-20 text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Nano Spark Ambassador Program"
            title="Become an"
            highlight="ambassador"
            subtitle="Represent Nano Spark in your school or college — lead peer sessions, spread hands-on tech learning and grow our community."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FiMic size={24} />, title: 'Run Sessions', desc: 'Lead peer workshops and demo days with Nano Spark kits and support.' },
              { icon: <FiAward size={24} />, title: 'Earn Rewards', desc: 'Certificates, mentorship and opportunities to grow with the startup.' },
              { icon: <FiZap size={24} />, title: 'Build Credibility', desc: 'Get real teaching, event and project experience for your portfolio.' },
              { icon: <FiUsers size={24} />, title: 'Grow Together', desc: 'Join a network of student innovators, schools and mentors.' },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <Card icon={b.icon} title={b.title} description={b.desc} className="border-nsWhite/10" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link to="/community" className="btn-yellow">
                See the Ambassador Program <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY JOIN ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              align="left"
              eyebrow="Why Join Us"
              title="A place where you"
              highlight="actually learn"
              subtitle="Whether you're a student or a fresh graduate, Nano Spark offers real work, real projects and real impact."
            />
            <Reveal delay={0.15}>
              <ul className="space-y-3">
                {WHY_JOIN.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl bg-nsWhite px-4 py-3 shadow-soft">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-nsYellow text-nsBlack">
                      <FiCheck size={15} />
                    </span>
                    <span className="text-sm font-semibold text-nsBlack/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HOW TO APPLY ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-3xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift"
        >
          <FiMail size={30} className="mx-auto text-nsBlack" />
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-nsBlack">How to apply</h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Send us an email telling us who you are, which role interests you, and why you want to
            join. Or ping us on WhatsApp — we usually reply the same day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${SITE.email}?subject=${subject}&body=${body}`}
              className="btn-dark"
            >
              Email Your Application <FiSend />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}