import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCamera,
  FiCheck,
  FiCpu,
  FiFileText,
  FiSun,
  FiMic,
  FiSettings,
  FiTool,
  FiUsers,
  FiWifi,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SITE } from '../lib/site'

const LAB_SERVICES = [
  'Lab equipment & kits',
  'Robotics & electronics setup',
  'Project resources',
  'Curriculum support',
  'Teacher training',
  'Student workshops',
  'Technical support',
]

const WORKSHOP_TOPICS = [
  { icon: <FiZap size={24} />, label: 'Electronics' },
  { icon: <FiCpu size={24} />, label: 'Arduino' },
  { icon: <FiSettings size={24} />, label: 'Robotics' },
  { icon: <FiWifi size={24} />, label: 'IoT' },
  { icon: <FiCpu size={24} />, label: 'Embedded Systems' },
  { icon: <FiSun size={24} />, label: 'AI' },
]

const INNOVATION_PROGRAMS = [
  { icon: <FiSun size={24} />, title: 'Innovation Challenges', desc: 'Themed challenges that push students to design creative solutions.' },
  { icon: <FiAward size={24} />, title: 'Project Competitions', desc: 'Friendly, high-energy competitions judged on build quality and ideas.' },
  { icon: <FiMic size={24} />, title: 'Hackathons', desc: 'Intense, time-boxed build sessions turning ideas into working demos.' },
  { icon: <FiTool size={24} />, title: 'Prototype Development', desc: 'Guided development of student prototypes with real components.' },
  { icon: <FiBookOpen size={24} />, title: 'Technology Exhibitions', desc: 'Showcase days where students present their inventions to parents and peers.' },
]

const FLOW = [
  { icon: <FiBookOpen size={22} />, label: 'School' },
  { icon: <FiTool size={22} />, label: 'Workshop' },
  { icon: <FiCamera size={22} />, label: 'Photos' },
  { icon: <FiFileText size={22} />, label: 'Feedback' },
  { icon: <FiAward size={22} />, label: 'Certificate' },
  { icon: <FiFileText size={22} />, label: 'Case Study' },
]

export default function Services() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Our Services
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              Services for schools &{' '}
              <span className="text-nsYellow">young innovators</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              From fully equipped STEM labs to one-off robotics workshops, Nano Spark supports
              schools and students end to end.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ SCHOOL STEM LABS ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="School STEM Labs"
              title="A learning space built"
              highlight="for hands-on tech"
              subtitle="We help schools set up practical technology learning spaces — equipment, kits, training and ongoing support, so the lab keeps working long after launch day."
            />
            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {LAB_SERVICES.map((svc) => (
                <li key={svc} className="flex items-center gap-2.5 text-sm font-semibold text-nsBlack/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-nsYellow text-nsBlack">
                    <FiCheck size={14} />
                  </span>
                  {svc}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact" className="btn-yellow">
                Set Up a STEM Lab <FiArrowRight />
              </Link>
            </div>
          </Reveal>

          {/* TODO: replace framed logo with stem-lab-isometric.png when supplied */}
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="circuit-bg-light relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center rounded-3xl border-4 border-nsYellow bg-nsGray-light shadow-lift"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-3"
              >
                <img
                  src={SITE.logo}
                  alt="Nano Spark STEM Lab"
                  className="h-28 w-28 object-contain"
                  draggable={false}
                />
                <span className="font-heading text-sm font-bold text-nsBlack/60">
                  The Nano Spark STEM Lab
                </span>
              </motion.div>
              <motion.span
                className="absolute -bottom-3 left-6 -rotate-2 rounded-full bg-nsYellow px-4 py-1.5 font-heading text-sm font-extrabold text-nsBlack shadow-soft"
                animate={{ rotate: [-2, -6, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Coding · Robotics · 3D · IoT
              </motion.span>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ============ ROBOTICS & TECH WORKSHOPS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Robotics & Technology Workshops"
            title="Students learn by actually"
            highlight="building and testing"
            subtitle="Interactive programs where students get their hands on real components and watch their projects come to life."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSHOP_TOPICS.map((topic, i) => (
              <Reveal key={topic.label} delay={(i % 3) * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex items-center gap-4 rounded-2xl border border-nsBlack/10 bg-nsWhite p-5 shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    {topic.icon}
                  </span>
                  <span className="font-heading text-lg font-extrabold text-nsBlack">{topic.label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Link to="/workshops" className="btn-dark">
                Explore Workshops <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STUDENT INNOVATION PROGRAMS ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Student Innovation Programs"
            title="Compete, create &"
            highlight="showcase"
            subtitle="Programs that turn classroom learning into competitions, challenges and exhibitions."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INNOVATION_PROGRAMS.map((prog, i) => (
              <Reveal key={prog.title} delay={(i % 3) * 0.1}>
                <Card icon={prog.icon} title={prog.title} description={prog.desc} />
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <Card className="flex h-full flex-col justify-center bg-nsYellow text-center">
                <div className="flex justify-center">
                  <FiUsers size={30} className="mb-2 text-nsBlack" />
                </div>
                <p className="font-heading font-extrabold text-nsBlack">Your school could be next</p>
                <Link to="/contact" className="btn-dark mx-auto mt-4 !px-4 !py-2 text-sm">
                  Partner With Us
                </Link>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ JOURNEY TIMELINE ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="The Nano Spark Journey"
            title="How a partnership"
            highlight="unfolds"
            subtitle="A clear, supported path from first conversation to measurable outcomes."
          />
          <div className="mt-12 flex flex-col items-stretch gap-3 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
            {FLOW.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.1} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center lg:gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-nsWhite/10 bg-nsWhite/5 px-5 py-4"
                >
                  <span className="text-nsYellow">{step.icon}</span>
                  <span className="font-heading font-bold text-nsWhite">{step.label}</span>
                  <span className="ml-auto font-heading text-xs font-extrabold text-nsYellow/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
                {i < FLOW.length - 1 && (
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="mx-auto mt-2 rotate-90 text-nsYellow lg:mt-0 lg:rotate-0"
                  >
                    <FiArrowRight size={20} />
                  </motion.span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
