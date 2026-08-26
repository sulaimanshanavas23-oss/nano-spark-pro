import { motion } from 'framer-motion'
import {
  FiAward,
  FiArrowRight,
  FiCheck,
  FiMic,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { FOUNDER, SITE, WHATSAPP_LINK } from '../lib/site'

const PERKS = [
  { icon: <FiMic size={22} />, title: 'Run Sessions', desc: 'Lead peer workshops and demo days at your school.' },
  { icon: <FiAward size={22} />, title: 'Earn Recognition', desc: 'Certificates, mentorship and early access to programs.' },
  { icon: <FiZap size={22} />, title: 'Build Real Skills', desc: 'Teaching, event and project experience for your portfolio.' },
  { icon: <FiUsers size={22} />, title: 'Grow the Community', desc: 'Connect with young innovators, schools and mentors.' },
]

export default function Ambassador() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Ambassador Program
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal
                texts={[
                  { text: 'Become a Nano Spark' },
                  { text: 'Ambassador', color: 'text-nsYellow' },
                ]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              For students who love technology and want to share it — run peer sessions, mentor
              beginners and grow with the Nano Spark community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ MEET THE FOUNDER ============ */}
      <section className="relative overflow-hidden bg-nsGray-light py-20">
        <CircuitBackground variant="light" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> MEET THE FOUNDER
            </span>
            <h2 className="mt-3 text-center font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              <LetterReveal
                texts={[{ text: 'Meet the' }, { text: 'Founder', color: 'text-nsYellow' }]}
              />
            </h2>
          </Reveal>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-5">
            {/* Founder image — LEFT side */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="relative">
                <div className="circuit-bg-light absolute -inset-4 rounded-3xl bg-nsYellow/10" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-3xl border-4 border-nsYellow bg-nsGray-light shadow-lift"
                >
                  <img
                    src={SITE.founderPhoto}
                    alt={FOUNDER.name}
                    className="aspect-[4/5] w-full object-cover object-top"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nsBlack/90 via-nsBlack/50 to-transparent px-5 pb-5 pt-16 text-center">
                    <p className="font-heading text-2xl font-extrabold text-nsYellow">{FOUNDER.name}</p>
                    <p className="text-xs font-bold tracking-[0.18em] text-nsWhite/80">{FOUNDER.role}</p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-6 grid gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-yellow w-full justify-center"
                >
                  Talk to the Founder <FiArrowRight />
                </a>
                <Link to="/book" className="btn-outline w-full justify-center">
                  Book a Session
                </Link>
              </div>
            </Reveal>

            {/* Founder details — RIGHT side */}
            <div className="lg:col-span-3">
              <Reveal delay={0.15}>
                <h3 className="font-heading text-3xl font-extrabold text-nsBlack sm:text-4xl">
                  {FOUNDER.name}
                </h3>
                <p className="mt-1 font-heading text-sm font-bold tracking-[0.14em] text-nsYellow">
                  {FOUNDER.role}
                </p>
              </Reveal>
              <div className="mt-5 space-y-4">
                {FOUNDER.intro.slice(0, 2).map((para, i) => (
                  <Reveal key={i} delay={0.2 + i * 0.08}>
                    <p className="leading-relaxed text-nsBlack/75">{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div className="mt-8 rounded-2xl border border-nsBlack/10 bg-nsWhite p-6">
                  <p className="font-heading font-extrabold text-nsBlack">His Focus</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 font-heading font-extrabold text-nsBlack">
                    {FOUNDER.approach.map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ type: 'spring', stiffness: 280, damping: 17, delay: i * 0.1 }}
                          className="rounded-lg bg-nsYellow px-3 py-1.5 text-sm"
                        >
                          {step}
                        </motion.span>
                        {i < FOUNDER.approach.length - 1 && (
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-nsYellow"
                          >
                            <FiArrowRight size={16} />
                          </motion.span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="mt-6 text-sm leading-relaxed text-nsBlack/65">
                  As the founder of Nano Spark, Shanavas personally mentors ambassadors, trains them
                  with the kits and programs, and supports them as they run sessions in their
                  schools — guiding every ambassador on their journey from curious student to
                  young leader.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY APPLY ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Why Become an Ambassador"
            title="Lead, teach &"
            highlight="grow"
            subtitle="No experience needed — just curiosity and a willingness to learn. We train you, provide the kits, and support you in your school."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-nsBlack/10 bg-nsGray-light p-6 text-center shadow-soft">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    {perk.icon}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-extrabold text-nsBlack">{perk.title}</h3>
                  <p className="mt-1.5 text-sm text-nsBlack/65">{perk.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLY CTA ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <Reveal>
                <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                  <h2 className="font-heading text-2xl font-extrabold text-nsBlack">Who can apply?</h2>
                  <ul className="mt-5 space-y-3">
                    {[
                      'Students in classes 6–12 or college',
                      'Loves technology, robotics, coding or science',
                      'Able to host small sessions at school',
                      'No prior experience required — we train you',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-nsYellow text-nsBlack">
                          <FiCheck size={14} />
                        </span>
                        <span className="pt-0.5 text-sm font-semibold text-nsBlack/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-nsBlack p-8 text-nsWhite shadow-soft">
                  <h3 className="font-heading text-xl font-extrabold text-nsYellow">
                    Quick question?
                  </h3>
                  <p className="mt-2 text-sm text-nsWhite/70">
                    Message us directly on WhatsApp — we reply fast.
                  </p>
                  <a
                    href={`https://wa.me/918148774546?text=${encodeURIComponent('Hi Nano Spark! I have a question about the Ambassador Program.')}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-heading font-bold text-white transition-colors hover:bg-nsYellow hover:text-nsBlack"
                  >
                    <FaWhatsapp size={18} /> Ask on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft text-center">
                <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                  Ready to Become an Ambassador?
                </h2>
                <p className="mt-2 text-sm text-nsBlack/60">
                  Fill out the application form — it only takes a minute. Your application goes straight to our Gmail and WhatsApp.
                </p>
                <Link to="/ambassador/apply" className="btn-yellow mt-6 inline-flex">
                  Apply Now <FiArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-nsWhite py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-3xl rounded-3xl bg-gold-gradient px-8 py-12 text-center shadow-lift"
        >
          <h2 className="font-heading text-3xl font-extrabold text-nsBlack">
            Not ready to apply yet?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-nsBlack/75">
            Explore the community and get a feel for what ambassadors do before you decide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/community" className="btn-dark">
              Visit the Community
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