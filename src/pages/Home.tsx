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
  FiPlay,
} from 'react-icons/fi'
import { useRef, useEffect, useState, useCallback } from 'react'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'

import TestimonialMarquee from '../components/TestimonialMarquee'
import ClientMarquee from '../components/ClientMarquee'
import { Reveal } from '../components/Reveal'
import { ConnectedSteps } from '../components/ConnectedSteps'
import { LetterReveal } from '../components/LetterReveal'
import { FOUNDER, SITE } from '../lib/site'

const JOURNEY = ['LEARN', 'SIMULATE', 'BUILD', 'DEBUG', 'INNOVATE']

const LEVELS = [
  {
    classes: 'CLASSES 6–8',
    name: 'SPARK DISCOVER',
    desc: 'A playful first step into circuits, sensors and robot basics.',
    path: [
      'Block Coding',
      'Basic Electronics',
      'Circuit Building',
      'Tinkercad Circuits',
      'Sensors',
      'Beginner Robotics',
      'Simple Automation',
    ],
    focus: 'Understand → Simulate → Build → Experiment',
  },
  {
    classes: 'CLASSES 8–10',
    name: 'SPARK CREATE',
    desc: 'Real microcontrollers, real code and robot builds from scratch.',
    path: [
      'Arduino',
      'C/C++ Basics',
      'Wokwi Simulation',
      'Sensors & Actuators',
      'Robotics',
      'Automation',
      'Tinkercad 3D Design',
      'Introduction to IoT',
    ],
    focus: 'Code → Simulate → Build → Debug → Solve',
  },
  {
    classes: 'CLASSES 10–12',
    name: 'SPARK INNOVATE',
    desc: 'IoT, AI and embedded systems — real products from real problems.',
    path: [
      'ESP32 / ESP8266',
      'Embedded Systems',
      'IoT',
      'Python',
      'AI & Computer Vision',
      'Advanced Robotics',
      'Tinkercad / CAD Concepts',
      'Wokwi Prototyping',
      'Advanced Project Development',
    ],
    focus: 'Identify Problem → Design → Simulate → Prototype → Test → Present',
  },
]

const CORE_TECHNOLOGIES = [
  'Electronics & Circuit Fundamentals',
  'Sensors & Actuators',
  'Arduino & Microcontrollers',
  'ESP32 / ESP8266',
  'Robotics & Automation',
  'Embedded Systems',
  'IoT & Smart Devices',
  'Wireless Communication',
  'AI & Computer Vision',
  'C/C++ Programming',
  'Python Programming',
  'Block-Based Programming',
  'Electronics Prototyping',
  'PCB Fundamentals',
  'Engineering Design',
  'Rapid Prototyping',
  'Debugging & System Design',
]

const TOOLS = [
  { icon: <FiGrid size={22} />, name: 'Scratch', desc: 'Beginner block-based programming' },
  { icon: <FiZap size={22} />, name: 'Tinkercad Circuits', desc: 'Beginner electronics & circuit simulation' },
  { icon: <FiCpu size={22} />, name: 'Wokwi', desc: 'Arduino, ESP32 & embedded-system simulation' },
  { icon: <FiBox size={22} />, name: 'Tinkercad 3D Design', desc: 'Basic CAD and prototyping' },
  { icon: <FiTerminal size={22} />, name: 'Arduino IDE', desc: 'Microcontroller programming' },
  { icon: <FiCode size={22} />, name: 'VS Code', desc: 'Advanced programming and development' },
  { icon: <FiLayers size={22} />, name: 'Python', desc: 'Advanced programming and AI projects' },
]

function TechStackJourney() {
  return (
    <section className="relative overflow-hidden bg-nsBlack py-20 text-nsWhite">
      <CircuitBackground variant="dark" className="opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Technology Stack"
          title="A progressive Learning"
          highlight="Technology Journey"
          subtitle="Not a list of tools — a journey. Students move from beginner block coding and circuit simulation up to Arduino, robotics, IoT, AI, embedded systems and independent prototype development."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {JOURNEY.map((step, i) => (
            <span key={step} className="flex items-center gap-2 sm:gap-3">
              <span className="rounded-full border-2 border-nsYellow bg-nsBlack px-4 py-1.5 font-heading text-sm font-extrabold text-nsYellow sm:text-base">
                {step}
              </span>
              {i < JOURNEY.length - 1 && (
                <span className="text-nsYellow">
                  <FiArrowRight size={18} />
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {LEVELS.map((level, i) => (
            <div className="flex h-full flex-col rounded-2xl border border-nsWhite/10 bg-nsWhite/5 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-nsYellow px-3 py-1 text-[10px] font-extrapolated tracking-[0.18em] text-nsBlack">
                  {level.classes}
                </span>
                <FiCpu size={20} className="text-nsYellow" />
              </div>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-nsYellow">
                {level.name}
              </h3>
              <p className="mt-1 text-sm text-nsWhite/60">{level.desc}</p>
              <ul className="mt-5 flex-1 space-y-0">
                {level.path.map((item, j) => (
                  <li key={item} className="flex items-center gap-2 py-1.5">
                    {j < level.path.length - 1 ? (
                      <span className="text-[10px] text-nsYellow">&#9654;</span>
                    ) : (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-nsYellow text-[8px] font-extrapolated text-nsBlack">
                        &#10003;
                      </span>
                    )}
                    <span className="text-sm font-bold text-nsWhite/85">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-xs font-bold tracking-wide text-nsYellow">
                Focus: {level.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoreTechnologies() {
  return (
    <section className="bg-nsWhite py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Core Technologies"
          title="The skills inside"
          highlight="every program"
          subtitle="Seventeen core technologies woven through the Nano Spark STEM ecosystem — each introduced at the right stage of the journey."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {CORE_TECHNOLOGIES.map((tech, i) => (
            <span key={tech} className="inline-flex items-center gap-2 rounded-full border border-nsBlack/10 bg-nsGray-light px-4 py-2 text-sm font-bold text-nsBlack shadow-soft">
              <FiZap size={13} className="text-nsYellow" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CodingSimulationTools() {
  return (
    <section className="bg-nsGray-light py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Coding & Simulation Tools"
          title="The toolbox students"
          highlight="learn with"
          subtitle="From Scratch for absolute beginners to Python and VS Code for advanced AI projects — every tool has a place in the journey."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <div key={tool.name} className="flex items-center gap-4 rounded-2xl border border-nsBlack/10 bg-nsWhite p-5 shadow-soft" whileHover={{ y: -5 }}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                {tool.icon}
              </span>
              <div>
                <p className="font-heading text-lg font-extrapolated text-nsBlack">{tool.name}</p>
                <p className="text-xs text-nsBlack/60">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoHero() {
  // Keep inline video for desktop as fallback/placeholder
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause()
  }, [])

  const playVideo = useCallback((forceUnmuted = false) => {
    const video = videoRef.current
    if (!video || !isVisible) return

    if (hasInteracted || forceUnmuted) {
      video.muted = false
      video.volume = 0.3
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
    } else {
      video.muted = true
      video.play().catch(() => {})
    }
  }, [isVisible, hasInteracted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        if (videoRef.current) {
          if (visible) {
            playVideo(true)
          } else {
            pauseVideo()
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [playVideo, pauseVideo])

  useEffect(() => {
    const handleVisibilityChange = () => {
      const nowVisible = !document.hidden
      if (nowVisible && isVisible) {
        playVideo(true)
      } else if (!nowVisible) {
        pauseVideo()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isVisible, playVideo, pauseVideo])

  useEffect(() => {
    const video = videoRef.current
    if (video && isVisible) {
      video.muted = true
      video.play().catch(() => {})
    }
  }, [isVisible])

  useEffect(() => {
    const enableAudio = () => {
      if (!hasInteracted && videoRef.current && isVisible) {
        setHasInteracted(true)
        videoRef.current!.muted = false
        videoRef.current!.volume = 0.3
        videoRef.current!.play().catch(() => {
          videoRef.current!.muted = true
          videoRef.current!.play().catch(() => {})
        })
      }
    }

    document.addEventListener('click', enableAudio, { passive: true })
    document.addEventListener('touchstart', enableAudio, { passive: true })
    document.addEventListener('keydown', enableAudio)

    return () => {
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
      document.removeEventListener('keydown', enableAudio)
    }
  }, [hasInteracted, isVisible])

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return
      const currentScrollY = window.scrollY || window.pageYOffset
      const isScrollingUp = currentScrollY < lastScrollY

      if (isVisible) {
        if (isScrollingUp) {
          playVideo(true)
        } else {
          pauseVideo()
        }
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, hasInteracted, lastScrollY, pauseVideo, playVideo])

  // Auto-play with sound on initial load for mobile
  useEffect(() => {
    const video = videoRef.current
    if (video && isVisible) {
      video.muted = false
      video.volume = 0.3
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
    }
  }, [isVisible])

return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-nsYellow/20 shadow-[0_0_100px_rgba(255,193,7,0.3)] lg:shadow-[0_0_150px_rgba(255,193,7,0.35)] lg:aspect-[16/9] xl:aspect-[21/9] 2xl:aspect-[2/1] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[550px]"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        className="w-full h-auto object-contain"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nsBlack/80 via-nsBlack/20 to-transparent p-4 pointer-events-none lg:p-6">
        <div className="flex items-center justify-between text-nsWhite/70 text-sm lg:text-base">
          <span className="flex items-center gap-2">
            <FiPlay className="text-nsYellow" size={16} />
            Live student project
          </span>
          <span className="hidden lg:inline-flex items-center gap-2 text-nsWhite/50">
            <span className="h-4 w-px bg-nsWhite/20" />
            Voice-controlled car
          </span>
        </div>
      </div>
    </div>
  )
}

const FOCUS_AREAS = [
  { icon: <FiBookOpen size={26} />, title: 'STEM & Electronics Education', desc: 'Hands-on learning programs that make electronics and science fun, practical and accessible.' },
  { icon: <FiTool size={26} />, title: 'Robotics & Automation', desc: 'Design, build and program robots — from line followers to fully automated systems.' },
  { icon: <FiCpu size={26} />, title: 'Embedded Systems', desc: 'Microcontrollers, sensors and firmware — the brains behind every smart device.' },
  { icon: <FiWifi size={26} />, title: 'IoT & Smart Technology', desc: 'Connect devices to the internet and build smart, sensor-driven solutions.' },
  { icon: <FiZap size={26} />, title: 'AI & Emerging Technologies', desc: 'Introductions to AI, agentic AI, automation and the technologies of tomorrow.' },
  { icon: <FiSun size={26} />, title: 'Innovation & Project Development', desc: 'Turn ideas into working prototypes through guided project development.' },
]

const ECOSYSTEM = ['STEM Kits', 'Workshops', 'Projects', 'Innovation', 'Prototypes']

export default function Home() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack min-h-screen">
        <CircuitBackground variant="dark" className="absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-14 items-start">
            {/* LEFT: Content Stack */}
            <div className="lg:order-1 lg:col-span-4 z-10 space-y-8 pt-4 lg:pt-0">
              {/* Headline: LEARN - BUILD - TEST - INNOVATE */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-heading font-extrabold text-3xl leading-[1.05] text-nsWhite sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                <LetterReveal
                  delay={0.3}
                  breakAfter={[1, 3, 5]}
                  texts={[
                    { text: 'LEARN' },
                    { text: ' - ', color: 'text-nsYellow/50' },
                    { text: 'BUILD' },
                    { text: ' - ', color: 'text-nsYellow/50' },
                    { text: 'TEST' },
                    { text: ' - ', color: 'text-nsYellow/50' },
                    { text: 'INNOVATE', color: 'text-nsYellow' },
                  ]}
                />
              </motion.h1>

              {/* Description - visible on all screen sizes */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-sm font-medium text-nsWhite/80 max-w-xl leading-relaxed mt-4"
              >
                Empowering students to build real-world technology through hands-on robotics, electronics, AI, embedded systems, and STEM learning.
              </motion.p>

              {/* Mobile Video - shows after description on mobile, hidden on desktop */}
              <div className="lg:hidden mt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative"
                >
                  <VideoHero />
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-start gap-4 mt-6"
              >
                <Link
                  to="/products"
                  className="btn-yellow group w-full sm:w-auto text-base px-6 py-3"
                  style={{ backgroundColor: '#FFC107', color: '#111' }}
                >
                  Explore Nano Spark
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline w-full sm:w-auto border-nsWhite/30 text-nsWhite hover:bg-nsYellow hover:text-nsBlack hover:border-nsYellow text-base px-6 py-3"
                >
                  Build With Us
                  <FiPlay className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </motion.div>

              {/* Tech Tags - 6 tags on mobile, below buttons, fill space */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="lg:hidden flex flex-wrap justify-center gap-3 text-nsWhite/70 text-xs mt-6 w-full"
              >
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiCpu className="text-nsYellow" size={12} />
                  Embedded
                </span>
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiWifi className="text-nsYellow" size={12} />
                  IoT & AI
                </span>
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiTool className="text-nsYellow" size={12} />
                  Robotics
                </span>
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiBookOpen className="text-nsYellow" size={12} />
                  STEM
                </span>
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiZap className="text-nsYellow" size={12} />
                  AI
                </span>
                <span className="flex-1 min-w-[120px] max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-nsWhite/10 border border-nsWhite/20">
                  <FiSun className="text-nsYellow" size={12} />
                  Prototyping
                </span>
              </motion.div>
            </div>

            {/* RIGHT: Video - MAIN HERO (Desktop only) */}
            <div className="hidden lg:block lg:order-2 lg:col-span-8 relative lg:sticky lg:top-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative"
              >
                <VideoHero />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

  {/* ============ TECHNOLOGY JOURNEY ============ */}
  <TechStackJourney />

  {/* ============ CORE TECHNOLOGIES ============ */}
  <CoreTechnologies />

  {/* ============ CODING & SIMULATION TOOLS ============ */}
  <CodingSimulationTools />

{/* ============ 550+ STUDENTS TRAINED STRIP ============ */}
      <section className="bg-nsBlack py-2">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 text-center sm:flex-row sm:gap-6 sm:px-8">
          <p className="font-heading text-3xl font-extrabold text-nsYellow sm:text-4xl">
            {SITE.studentsTrained}+
          </p>
          <p className="font-heading text-lg font-bold text-white">
            Students trained through Nano Spark workshops & programs
          </p>
        </div>
      </section>

      {/* ============ VOICE OF STUDENTS & PARENTS ============ */}
      <section className="bg-nsYellow/15 py-6">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What Students & Parents Say"
            title="Feedback from our"
            highlight="workshops"
          />
          <div className="mt-4">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* ============ OUR CLIENTS ============ */}
      <section className="bg-nsWhite py-6">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Clients"
            title="Trusted by"
            highlight="schools & colleges"
          />
          <div className="mt-4">
            <ClientMarquee />
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
