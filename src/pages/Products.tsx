import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiLayers,
  FiSun,
  FiMonitor,
  FiSettings,
  FiTool,
  FiWifi,
  FiZap,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SITE } from '../lib/site'

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
              Nano Spark <span className="text-nsYellow">STEM Kits</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Hands-on kits and technology solutions that take young innovators from their first
              component to complete working projects.
            </p>
          </Reveal>
        </div>
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

          {/* TODO: replace framed logo with stem-kit-product.png when supplied */}
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative mx-auto max-w-md"
            >
              <div className="circuit-bg-light absolute -inset-4 rounded-3xl bg-nsYellow/10" />
              <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border-4 border-nsBlack bg-white shadow-lift">
                <img
                  src={SITE.logo}
                  alt="Nano Spark STEM Kit"
                  className="h-3/5 w-3/5 object-contain"
                  draggable={false}
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
