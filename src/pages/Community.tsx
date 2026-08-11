import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowRight, FiAward, FiCpu, FiLayers, FiMic, FiUsers, FiZap } from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import SmartImage from '../components/SmartImage'
import TestimonialMarquee from '../components/TestimonialMarquee'
import { Reveal } from '../components/Reveal'
import { SITE } from '../lib/site'

const COMMUNITY_PERKS = [
  { icon: <FiMic size={24} />, title: 'Community Events', desc: 'Regular meetups, demo days and technology exhibitions for young builders.' },
  { icon: <FiZap size={24} />, title: 'Challenges & Hackathons', desc: 'Team-based build challenges where ideas become working prototypes.' },
  { icon: <FiAward size={24} />, title: 'Showcase Your Projects', desc: 'A platform for students to showcase work and get featured.' },
  { icon: <FiLayers size={24} />, title: 'Mentorship', desc: 'Guidance from the Nano Spark team throughout your learning journey.' },
  { icon: <FiUsers size={24} />, title: 'Ambassador Program', desc: 'Train as a student ambassador and run peer-led sessions.' },
  { icon: <FiCpu size={24} />, title: 'Resources & Kits', desc: 'Exclusive access to kits, manuals, guides and project ideas.' },
]

export default function Community() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Community
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              Join the Nano Spark <span className="text-nsYellow">Community</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              A growing family of young innovators, parents, teachers, schools and ambassadors —
              building, sharing and learning technology together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.communityWhatsApp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-heading font-bold text-white shadow-soft transition-colors hover:bg-nsYellow hover:text-nsBlack"
              >
                <FaWhatsapp size={20} /> Join the WhatsApp Community
              </a>
              <Link to="/contact" className="btn-outline !border-nsWhite/40 !text-nsWhite hover:!border-nsYellow hover:!bg-nsYellow hover:!text-nsBlack">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHATSAPP COMMUNITY BANNER ============ */}
      <section className="bg-nsWhite py-14">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#25D366] p-8 text-center text-white shadow-lift sm:p-10"
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#25D366] shadow-soft">
            <FaWhatsapp size={34} />
          </span>
          <h2 className="mt-5 font-heading text-3xl font-extrabold sm:text-4xl">
            Nano Spark Community
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-white/90">
            Join my WhatsApp community — get updates on workshops, events, project ideas, kit
            drops and connect with fellow young innovators.
          </p>
          <a
            href={SITE.communityWhatsApp}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-nsBlack px-8 py-3.5 font-heading text-lg font-extrabold text-nsYellow shadow-soft transition-colors hover:bg-nsYellow hover:text-nsBlack"
          >
            <FaWhatsapp size={22} /> Join Community
          </a>
          <p className="mt-4 text-xs font-bold text-white/70">
            Opens the official Nano Spark WhatsApp group
          </p>
        </motion.div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Community Benefits"
            title="What you get as a"
            highlight="member"
            subtitle="Whether you're a student, parent, teacher or school — there's a place for you at Nano Spark."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={(i % 3) * 0.1}>
                <Card icon={perk.icon} title={perk.title} description={perk.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AMBASSADOR PROGRAM ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Student Ambassadors"
              title="Lead the community as an"
              highlight="ambassador"
              subtitle="Ambassador-led sessions make peers feel comfortable exploring technology together. As an ambassador you'll run mini workshops, mentor beginners and represent Nano Spark at your school."
            />
            <ul className="mt-6 space-y-2.5">
              {['Run peer-led electronics & coding sessions', 'Mentor first-time builders', 'Earn ambassador certificates & recognition', 'Get featured in the Nano Spark community'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-nsBlack/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-nsYellow text-nsBlack">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact" className="btn-dark">
                Become an Ambassador <FiArrowRight />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {/* TODO: drop community/ambassador photos into public/images/community-1.jpg … community-4.jpg */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: '/images/community-1.jpg', label: 'Community Sessions' },
                { src: '/images/community-2.jpg', label: 'Young Innovators' },
                { src: '/images/community-3.jpg', label: 'Demo Days' },
                { src: '/images/community-4.jpg', label: 'Ambassadors' },
              ].map((g, i) => (
                <Reveal key={g.src} delay={i * 0.08}>
                  <motion.figure
                    whileHover={{ y: -5 }}
                    className="overflow-hidden rounded-2xl border border-nsBlack/10 bg-nsWhite shadow-soft"
                  >
                    <SmartImage src={g.src} alt={g.label} className="aspect-[4/3] w-full object-cover" />
                  </motion.figure>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ VOICES ============ */}
      <section className="bg-nsYellow/15 py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Community Voices"
            title="What our members"
            highlight="say"
          />
          <div className="mt-8">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-4xl rounded-3xl bg-nsBlack px-8 py-12 text-center text-nsWhite shadow-lift"
        >
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Be part of <span className="text-nsYellow">{SITE.studentsTrained}+ students</span> building the future
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsWhite/70">
            Join the WhatsApp community, attend events, or start a student club at your school.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.communityWhatsApp}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-yellow"
            >
              <FaWhatsapp size={18} /> Join Now
            </a>
            <Link to="/feedback" className="btn-outline !border-nsWhite/40 !text-nsWhite hover:!border-nsYellow hover:!bg-nsYellow hover:!text-nsBlack">
              Share Your Feedback
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}