import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiLayers,
  FiSun,
  FiMonitor,
  FiSearch,
  FiSettings,
  FiSliders,
  FiTool,
  FiWifi,
  FiX,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import SmartImage from '../components/SmartImage'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'

type KitLevel = 'Beginner' | 'Intermediate' | 'Advanced'

interface KitDef {
  title: string
  desc: string
  level: KitLevel
  age: 'school' | 'college'
  grades?: string[]
  collegeYears?: string[]
  icon: JSX.Element
}

const KIT_CATALOG: KitDef[] = [
  { title: 'Beginner Electronics Kit', desc: 'LEDs, switches, buzzers and basic circuits — safe first steps into electronics.', level: 'Beginner', age: 'school', grades: ['6', '7', '8'], icon: <FiZap size={16} /> },
  { title: 'Circuit Explorer Kit', desc: 'Breadboards, resistors and batteries — build your first working circuits.', level: 'Beginner', age: 'school', grades: ['6', '7', '8', '9'], icon: <FiZap size={16} /> },
  { title: 'Magnetism & Motors Kit', desc: 'Motors, gears and mechanics for early robotics interest.', level: 'Beginner', age: 'school', grades: ['6', '7', '8'], icon: <FiTool size={16} /> },
  { title: 'Coding Starter Kit', desc: 'Block-based coding with LEDs and sensors — code meets hardware.', level: 'Beginner', age: 'school', grades: ['7', '8', '9'], icon: <FiMonitor size={16} /> },
  { title: 'Arduino Starter Kit', desc: 'Microcontroller basics — blink LEDs, read sensors, write your first sketches.', level: 'Intermediate', age: 'school', grades: ['8', '9', '10'], icon: <FiCpu size={16} /> },
  { title: 'Sensors Lab Kit', desc: 'Ultrasonic, IR, temperature and light sensors with Arduino.', level: 'Intermediate', age: 'school', grades: ['9', '10'], icon: <FiSettings size={16} /> },
  { title: 'Robotics Kit — Line Follower', desc: 'Build a robot that follows a black line using sensors and motors.', level: 'Intermediate', age: 'school', grades: ['9', '10', '11', '12'], icon: <FiTool size={16} /> },
  { title: 'Robotics Kit — Obstacle Avoider', desc: 'Obstacle detection and avoidance using ultrasonic sensors.', level: 'Intermediate', age: 'school', grades: ['9', '10', '11', '12'], icon: <FiTool size={16} /> },
  { title: 'IoT Kit — ESP32', desc: 'ESP32, sensors and cloud dashboards — build real connected devices.', level: 'Advanced', age: 'school', grades: ['10', '11', '12'], icon: <FiWifi size={16} /> },
  { title: 'Smart Home Kit', desc: 'Automate lights, fans and security with relays and sensors.', level: 'Advanced', age: 'school', grades: ['10', '11', '12'], icon: <FiSun size={16} /> },
  { title: 'Advanced Innovation Kit', desc: 'Multi-sensor, multi-part builds for projects and competitions.', level: 'Advanced', age: 'school', grades: ['11', '12'], icon: <FiLayers size={16} /> },
  { title: 'College Robotics & Automation Kit', desc: 'Robotic arms, automation and motor control for engineering projects.', level: 'Advanced', age: 'college', collegeYears: ['1', '2', '3', '4'], icon: <FiTool size={16} /> },
  { title: 'College IoT & Embedded Kit', desc: 'Firmware, microcontrollers and cloud integration for final-year projects.', level: 'Advanced', age: 'college', collegeYears: ['2', '3', '4'], icon: <FiWifi size={16} /> },
  { title: 'College Prototype Development Kit', desc: 'Full project development — design, build, test and present prototypes.', level: 'Advanced', age: 'college', collegeYears: ['3', '4'], icon: <FiCpu size={16} /> },
]

const LEVELS: KitLevel[] = ['Beginner', 'Intermediate', 'Advanced']
const GRADES = ['6', '7', '8', '9', '10', '11', '12']
const COLLEGE_YEARS = ['1', '2', '3', '4']

const KIT_CATEGORIES = [
  { icon: <FiZap size={24} />, title: 'Beginner Electronics Kits', desc: 'First steps into circuits, LEDs, switches and sensors — safe and exciting for new learners.' },
  { icon: <FiCpu size={24} />, title: 'Arduino Starter Kits', desc: 'Microcontroller basics, blinking lights to full programs, wiring and firmware from scratch.' },
  { icon: <FiTool size={24} />, title: 'Robotics Kits', desc: 'Chassis, motors, drivers and controllers to build robots that move, sense and avoid.' },
  { icon: <FiWifi size={24} />, title: 'IoT Kits', desc: 'ESP32 + sensors + cloud — build devices that connect, report and act on real data.' },
  { icon: <FiSun size={24} />, title: 'Advanced Innovation Kits', desc: 'Multi-sensor, multi-part builds for ambitious projects, competitions and prototypes.' },
]

const PROJECTS = [
  'Line Following Robots',
  'Obstacle Avoidance Robots',
  'Smart Home Systems',
  'Security Systems',
  'IoT Monitoring Systems',
  'Sensor-Based Projects',
]

const TECH_SOLUTIONS = [
  { icon: <FiSettings size={24} />, title: 'Robotics & Automation', desc: 'Automated systems, robotic arms and line/sensor-driven machines for labs and campuses.' },
  { icon: <FiWifi size={24} />, title: 'IoT Systems', desc: 'End-to-end IoT: hardware, connectivity, dashboards and analytics for smart monitoring.' },
  { icon: <FiCpu size={24} />, title: 'Embedded Technology', desc: 'Firmware and hardware design for microcontrollers and real-time embedded products.' },
  { icon: <FiMonitor size={24} />, title: 'Smart Campus Solutions', desc: 'Smart classrooms, attendance, environmental monitoring and security for schools.' },
  { icon: <FiLayers size={24} />, title: 'Prototype Development', desc: 'We help turn student and campus ideas into tested, working prototype systems.' },
]

export default function Products() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [age, setAge] = useState<'school' | 'college' | null>(null)
  const [grade, setGrade] = useState<string | null>(null)
  const [collegeYear, setCollegeYear] = useState<string | null>(null)
  const [level, setLevel] = useState<KitLevel | null>(null)

  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    return KIT_CATALOG.filter((k) => {
      if (q && !(k.title.toLowerCase().includes(q) || k.desc.toLowerCase().includes(q))) return false
      if (age && k.age !== age) return false
      if (grade && !(k.age === 'school' && k.grades?.includes(grade))) return false
      if (collegeYear && !(k.age === 'college' && k.collegeYears?.includes(collegeYear))) return false
      if (level && k.level !== level) return false
      return true
    })
  }, [search, age, grade, collegeYear, level])

  const clearFilters = () => {
    setSearch('')
    setAge(null)
    setGrade(null)
    setCollegeYear(null)
    setLevel(null)
  }

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
      active ? 'bg-nsYellow text-nsBlack' : 'bg-white/10 text-nsWhite/80 hover:bg-white/20'
    }`

  const hasFilters = Boolean(search || age || grade || collegeYear || level)

  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Products
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              <LetterReveal
                texts={[{ text: 'Nano Spark' }, { text: 'STEM Kits', color: 'text-nsYellow' }]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Hands-on kits and technology solutions that take young innovators from their first
              component to complete working projects.
            </p>
          </Reveal>

          {/* Product image strip right at the top of the page — drop photos into
              public/images/product-1.jpg … product-6.jpg */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { src: '/images/product-1.jpg', label: 'STEM Kit' },
              { src: '/images/product-2.jpg', label: 'Robotics Kit' },
              { src: '/images/product-3.jpg', label: 'IoT Kit' },
              { src: '/images/product-4.jpg', label: 'Arduino Kit' },
              { src: '/images/product-5.jpg', label: 'Electronics Kit' },
              { src: '/images/product-6.jpg', label: 'Innovation Kit' },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06}>
                <motion.figure
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                >
                  <SmartImage
                    src={p.src}
                    alt={p.label}
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/85 to-transparent px-3 pb-2.5 pt-8 text-xs font-bold text-nsWhite">
                    {p.label}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Search / filter button — top right of the page */}
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          title="Search & filter kits"
          aria-label="Search and filter kits"
          aria-expanded={filterOpen}
          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-nsBlack text-nsYellow shadow-lift transition-transform hover:scale-110 sm:right-8 sm:top-8"
        >
          <FiSearch size={22} />
        </button>

        {/* Filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-nsBlack/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                role="dialog"
                aria-label="Find your kit"
                className="fixed right-3 top-20 z-[60] flex max-h-[80vh] w-[min(94vw,420px)] flex-col overflow-hidden rounded-3xl border border-nsYellow/40 bg-nsBlack shadow-lift sm:right-6"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between border-b border-nsWhite/10 px-5 py-4">
                  <p className="flex items-center gap-2 font-heading text-sm font-extrabold text-nsWhite">
                    <FiSliders className="text-nsYellow" /> Find Your Kit
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    aria-label="Close filters"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-nsWhite hover:bg-white/20"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="space-y-5 overflow-y-auto px-5 py-4">
                  {/* Kit name search */}
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-nsYellow">
                      SEARCH KIT NAME
                    </label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
                      <FiSearch className="shrink-0 text-nsYellow" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="e.g. Robotics, Arduino, IoT…"
                        maxLength={60}
                        className="w-full bg-transparent text-sm text-nsWhite placeholder:text-nsWhite/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Age category */}
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-nsYellow">
                      AGE CATEGORY
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAge(age === 'school' ? null : 'school')
                          setGrade(null)
                        }}
                        className={chip(age === 'school')}
                      >
                        School (Grade 6–12)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAge(age === 'college' ? null : 'college')
                          setCollegeYear(null)
                        }}
                        className={chip(age === 'college')}
                      >
                        College (1st–4th Year)
                      </button>
                    </div>
                  </div>

                  {/* Grades */}
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-nsYellow">
                      GRADE / CLASS
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GRADES.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGrade(grade === g ? null : g)
                            setAge('school')
                            setCollegeYear(null)
                          }}
                          className={chip(grade === g)}
                        >
                          Grade {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* College years */}
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-nsYellow">
                      COLLEGE YEAR
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLLEGE_YEARS.map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => {
                            setCollegeYear(collegeYear === y ? null : y)
                            setAge('college')
                            setGrade(null)
                          }}
                          className={chip(collegeYear === y)}
                        >
                          {['1st', '2nd', '3rd', '4th'][Number(y) - 1]} Year
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-nsYellow">
                      SKILL LEVEL
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLevel(level === l ? null : l)}
                          className={chip(level === l)}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-nsWhite/60">
                      {results.length} kit{results.length === 1 ? '' : 's'} found
                    </p>
                    {hasFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-[11px] font-extrabold text-nsYellow hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Results */}
                  <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                    {results.length === 0 ? (
                      <p className="rounded-xl bg-white/5 px-4 py-6 text-center text-xs text-nsWhite/60">
                        No kits match your filters — try clearing a few options.
                      </p>
                    ) : (
                      results.map((k) => (
                        <div
                          key={k.title}
                          className="flex items-start gap-3 rounded-xl border border-nsWhite/10 bg-white/5 p-3"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nsYellow text-nsBlack">
                            {k.icon}
                          </span>
                          <div>
                            <p className="font-heading text-sm font-bold text-nsWhite">{k.title}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-nsWhite/60">{k.desc}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-nsYellow">
                              {k.level}
                              {k.age === 'school' && k.grades
                                ? ` · Grade ${k.grades.join(', ')}`
                                : ` · College ${k.collegeYears?.join('-')} Year`}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* ============ PRODUCT SHOWCASE ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="The Kit"
              title="Everything a young innovator"
              highlight="needs to build"
              subtitle="Each Nano Spark STEM Kit is curated for real, hands-on learning — components, controllers, sensors and a guided project path included."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {KIT_CATEGORIES.map((cat) => (
                <li key={cat.title} className="flex items-center gap-3 rounded-xl bg-nsWhite px-4 py-3 shadow-soft">
                  <span className="text-nsYellow"><FiCheck /></span>
                  <span className="text-sm font-semibold text-nsBlack">{cat.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact" className="btn-yellow">
                Enquire About Kits <FiArrowRight />
              </Link>
            </div>
          </Reveal>

          {/* TODO: drop the young-innovators photo as public/images/hero.jpg
              (same image as the homepage hero — one file, two places) */}
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative mx-auto max-w-md"
            >
              <div className="circuit-bg-light absolute -inset-4 rounded-3xl bg-nsYellow/10" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-nsBlack bg-white shadow-lift">
                <SmartImage
                  src="/images/hero.jpg"
                  alt="Nano Spark young innovators build"
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.span
                className="absolute -right-3 -top-3 rounded-full bg-nsYellow px-4 py-2 font-heading text-sm font-extrabold text-nsBlack shadow-soft"
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                New!
              </motion.span>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ============ STEM LAB KITS BANNER ============ */}
      {/* TODO: drop the STEM lab kits image as public/images/stem-lab-kit.jpg */}
      <section className="bg-nsYellow/15 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="circuit-bg-light relative mx-auto max-w-md overflow-hidden rounded-3xl border-4 border-nsBlack bg-white shadow-lift">
              <SmartImage
                src="/images/stem-lab-kit.jpg"
                alt="Nano Spark STEM Lab Kits"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading
              align="left"
              eyebrow="STEM Lab Kits"
              title="Kits built for"
              highlight="complete STEM labs"
              subtitle="Lab-grade kit bundles — electronics, robotics, Arduino, IoT and innovation kits with project resources and teacher support, ready for your school's practical learning space."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-yellow">
                Get Lab Kits <FiArrowRight />
              </Link>
              <Link to="/services" className="btn-outline">
                See STEM Lab Setup
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ KIT CATEGORIES ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Kit Categories"
            title="Choose your"
            highlight="starting point"
            subtitle="Five kit paths that progress from first circuit to advanced multi-part innovation builds."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {KIT_CATEGORIES.map((kit, i) => (
              <Reveal key={kit.title} delay={(i % 3) * 0.1}>
                <Card icon={kit.icon} title={kit.title} description={kit.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT STUDENTS BUILD ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            dark
            eyebrow="What Students Build"
            title="Real projects, real"
            highlight="confidence"
            subtitle="Every kit ends in a working project students are proud to demonstrate."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <Reveal key={project} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 rounded-2xl border border-nsWhite/10 bg-nsWhite/5 px-5 py-4 text-nsWhite"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nsYellow text-nsBlack">
                    <FiCheck />
                  </span>
                  <span className="font-heading font-bold">{project}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KITS & LABS GALLERY ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Kits & labs"
            highlight="in action"
            subtitle="Real builds, real labs. Drop your product and lab photos into public/images/ to showcase them here."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { src: '/images/lab-1.jpg', label: 'STEM Lab Station' },
              { src: '/images/product-2.jpg', label: 'STEM Kits on Display' },
              { src: '/images/lab-2.jpg', label: 'Robotics Build Session' },
              { src: '/images/product-3.jpg', label: 'Mini Projects' },
              { src: '/images/lab-3.jpg', label: 'IoT & Sensor Lab' },
              { src: '/images/workshop-1.jpg', label: 'Students in Action' },
            ].map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) * 0.08}>
                <motion.figure
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                >
                  <SmartImage
                    src={item.src}
                    alt={item.label}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallback={
                      <div className="circuit-bg-light flex h-full aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-nsYellow/60 bg-nsGray-light p-6">
                        <div className="text-center">
                          <span className="font-heading text-sm font-bold text-nsBlack/50">{item.label}</span>
                          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-nsYellow/70" />
                          <span className="mt-1 block text-[10px] font-semibold text-nsBlack/40">drop photo here</span>
                        </div>
                      </div>
                    }
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/80 to-transparent px-4 pb-3 pt-10 text-xs font-bold text-nsWhite">
                    {item.label}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY SOLUTIONS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Technology Solutions"
            title="Solutions for schools,"
            highlight="campuses & teams"
            subtitle="Beyond kits — full technology solutions Nano Spark designs and delivers."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_SOLUTIONS.map((sol, i) => (
              <Reveal key={sol.title} delay={(i % 3) * 0.1}>
                <Card icon={sol.icon} title={sol.title} description={sol.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
