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
  FiVolume2,
  FiVolumeX,
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
import PuzzleReveal from '../components/PuzzleReveal'
import { FOUNDER, SITE } from '../lib/site'

function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }, [])

  const playVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    
    if (isVisible) {
      if (!isMuted && hasInteracted) {
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
    }
  }, [isVisible, isMuted, hasInteracted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        if (videoRef.current) {
          if (visible) {
            playVideo()
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
      if (document.hidden) {
        pauseVideo()
      } else if (isVisible) {
        playVideo()
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
        videoRef.current.muted = false
        videoRef.current.volume = 0.3
        videoRef.current.play().catch(() => {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        })
      }
    }

    document.addEventListener('click', enableAudio, { once: true, passive: true })
    document.addEventListener('touchstart', enableAudio, { once: true, passive: true })
    document.addEventListener('keydown', enableAudio, { once: true })

    return () => {
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
      document.removeEventListener('keydown', enableAudio)
    }
  }, [hasInteracted, isVisible])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      const newMuted = !isMuted
      setIsMuted(newMuted)
      setHasInteracted(true)
      videoRef.current.muted = newMuted
      if (!newMuted && isVisible) {
        videoRef.current.volume = 0.3
        videoRef.current.play().catch(() => {})
      } else if (newMuted) {
        videoRef.current.pause()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] lg:aspect-[16/9] xl:aspect-[21/9] 2xl:aspect-[2/1] w-full min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[600px] rounded-2xl overflow-hidden border border-nsYellow/20 shadow-[0_0_100px_rgba(255,193,7,0.3)] lg:shadow-[0_0_150px_rgba(255,193,7,0.35)]"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        className="w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-nsBlack/80 backdrop-blur-sm text-nsWhite hover:bg-nsYellow hover:text-nsBlack transition-all duration-200 border border-nsWhite/20 hover:border-nsYellow/30 focus:outline-none focus:ring-2 focus:ring-nsYellow/50"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <FiVolumeX size={18} lg:size={20} />
          ) : (
            <FiVolume2 size={18} lg:size={20} />
          )}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nsBlack/80 via-nsBlack/20 to-transparent p-4 pointer-events-none lg:p-6">
        <div className="flex items-center justify-between text-nsWhite/70 text-sm lg:text-base">
          <span className="flex items-center gap-2">
            <FiPlay className="text-nsYellow" size={14} lg:size={16} />
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
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT: Content Stack */}
            <div className="lg:order-1 lg:col-span-4 z-10 space-y-8 pt-4 lg:pt-0">
              {/* Headline: Learn. Build. Test. Innovate. */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-heading font-extrabold text-4xl leading-[1.05] text-nsWhite sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                <LetterReveal
                  delay={0.3}
                  breakAfter={[1]}
                  texts={[
                    { text: 'Learn. ' },
                    { text: 'Build. ' },
                    { text: 'Test. ' },
                    { text: 'Innovate.', color: 'text-nsYellow' },
                  ]}
                />
              </motion.h1>

              {/* Description - HIDDEN on mobile, VISIBLE on desktop */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="hidden lg:block text-lg font-medium text-nsWhite/80 max-w-xl leading-relaxed"
              >
                Empowering students to build real-world technology through hands-on robotics, electronics, AI, embedded systems, and STEM learning.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-start gap-4"
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

              {/* Tech Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4 text-nsWhite/60 text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiCpu className="text-nsYellow" size={16} />
                  Embedded Systems
                </span>
                <span className="flex items-center gap-2">
                  <FiWifi className="text-nsYellow" size={16} />
                  IoT & AI
                </span>
                <span className="flex items-center gap-2">
                  <FiTool className="text-nsYellow" size={16} />
                  Robotics
                </span>
                <span className="flex items-center gap-2">
                  <FiBookOpen className="text-nsYellow" size={16} />
                  STEM Education
                </span>
              </motion.div>
            </div>

            {/* RIGHT: Video - MAIN HERO */}
            <div className="lg:order-2 lg:col-span-8 relative lg:sticky lg:top-16">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce lg:hidden"
        >
          <FiArrowRight className="text-nsYellow/70 text-2xl" />
        </motion.div>
      </section>

      {/* ============ 550+ STUDENTS TRAINED STRIP ============ */}
      <section className="bg-nsBlack py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 text-center sm:flex-row sm:gap-8 sm:px-8">
          <p className="font-heading text-3xl font-extrabold text-nsYellow sm:text-4xl">
            {SITE.studentsTrained}+
          </p>
          <p className="font-heading text-lg font-bold text-white">
            Students trained through Nano Spark workshops &amp; programs
          </p>
        </div>
      </section>

      {/* ============ VOICE OF STUDENTS & PARENTS ============ */}
      <section className="bg-nsYellow/15 py-10">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What Students & Parents Say"
            title="Feedback from our"
            highlight="workshops"
          />
          <div className="mt-8">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* ============ OUR CLIENTS ============ */}
      <section className="bg-nsWhite py-10">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Clients"
            title="Trusted by"
            highlight="schools & colleges"
          />
          <div className="mt-8">
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
