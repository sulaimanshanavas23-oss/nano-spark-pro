import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import {
  FiAward,
  FiCheck,
  FiChevronRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShield,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiFacebook,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import { Reveal } from '../components/Reveal'
import { SITE, WHATSAPP_LINK, FOUNDER } from '../lib/site'
import { sanitizeText, validateEmail, validateRequired } from '../lib/validate'

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  youtube: FiYoutube,
  facebook: FiFacebook,
}

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-3 text-sm text-nsBlack placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = validateRequired(form.name, 'Name', 100)
    const email = validateEmail(form.email)
    const message = validateRequired(form.message, 'Message', 2000)

    if (!name.valid) return setError(name.message ?? 'Please enter your name.')
    if (!email.valid) return setError(email.message ?? 'Please enter a valid email.')
    if (!message.valid) return setError(message.message ?? 'Please enter a message.')
    setError('')

    const payload = {
      name: sanitizeText(form.name, 100),
      email: sanitizeText(form.email, 200),
      org: sanitizeText(form.org, 150),
      message: sanitizeText(form.message, 2000),
    }

    setStatus('sending')

    // TODO: connect form endpoint — post to Formspree, Google Apps Script,
    // or your own backend here. Example:
    //   await fetch('https://formspree.io/f/yourFormId', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   })
    console.log('TODO: send contact form to endpoint', payload)
    setTimeout(() => setStatus('sent'), 800)
  }

  const fields: { key: 'name' | 'email' | 'org'; label: string; type: string; required?: boolean }[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'org', label: 'School / Organization', type: 'text' },
  ]

  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Contact
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              Let's build the <span className="text-nsYellow">future</span> together
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Questions, partnerships, STEM labs or workshops — send us a message and we'll get
              back to you quickly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FORM + DETAILS ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-extrabold text-nsBlack">Send a message</h2>
              <p className="mt-1 text-sm text-nsBlack/60">We usually reply within a day.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="mb-1.5 block text-sm font-bold text-nsBlack">
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type={field.type}
                      required={field.required}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.label}
                      className={inputClass}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you'd like to explore…"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-yellow w-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent!' : 'Submit Message'}
                  {status === 'sent' ? <FiCheck /> : <FiSend />}
                </motion.button>

                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-sm font-semibold text-nsBlack"
                  >
                    Thanks {form.name.split(' ')[0] || 'for reaching out'}! We'll be in touch soon.
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.15}>
            <div className="space-y-6">
              {/* Founder card */}
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="shrink-0 overflow-hidden rounded-2xl border-4 border-nsYellow bg-white shadow-lift"
                  >
                    <img
                      src={SITE.founderPhoto}
                      alt={SITE.founder.name}
                      className="h-28 w-28 object-cover object-top sm:h-32 sm:w-32"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-heading text-2xl font-extrabold text-nsBlack">
                      {SITE.founder.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-bold text-nsYellow">
                      {SITE.founder.role}, Nano Spark
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-nsBlack/60">
                      <FiMapPin /> {SITE.founder.location}, India
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-nsGray-light px-3 py-1 text-[11px] font-bold text-nsBlack/70">
                      <FiShield className="text-nsYellow" /> MSME Registered · StartupTN Recognized
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack"><FiMail /></span>
                    {SITE.email}
                  </a>
                  <a href={SITE.socials[5].href} className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack"><FiPhone /></span>
                    {SITE.phoneDisplay}
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener" className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366] text-white"><FiSend /></span>
                    WhatsApp us
                  </a>
                </div>

                <div className="mt-6 border-t border-nsBlack/10 pt-5">
                  <p className="mb-3 text-xs font-bold tracking-widest text-nsBlack/50">FIND US</p>
                  <div className="flex gap-2.5">
                    {SITE.socials
                      .filter((s) => SOCIAL_ICONS[s.icon])
                      .map((social) => {
                        const Icon = SOCIAL_ICONS[social.icon]
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={social.label}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-nsBlack/15 text-nsBlack/70 transition-all hover:border-nsYellow hover:bg-nsYellow hover:text-nsBlack"
                          >
                            <Icon size={18} />
                          </a>
                        )
                      })}
                  </div>
                </div>
              </div>

              {/* Location / map card */}
              <div className="circuit-bg-light relative overflow-hidden rounded-3xl bg-nsBlack p-8 text-nsWhite shadow-lift">
                <CircuitBackground variant="dark" className="opacity-50" />
                <div className="relative">
                  <h3 className="font-heading text-xl font-extrabold text-nsYellow">Location</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-nsWhite/80">
                    <FiMapPin /> Chennai, Tamil Nadu, India
                  </p>
                  <p className="mt-2 text-sm text-nsWhite/60">
                    Serving schools and innovators across the Chennai region — and beyond, online.
                  </p>
                  {/* TODO: embed a Google Maps iframe here when ready */}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT THE FOUNDER ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20 text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading dark eyebrow={FOUNDER.heading} title="Meet S. Shanavas" highlight="Founder & CEO" />

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[300px_1fr]">
            {/* Founder photo */}
            <Reveal>
              <div className="relative mx-auto max-w-[300px]">
                <div className="circuit-bg-dark absolute -inset-4 rounded-3xl bg-nsYellow/10" />
                <div className="relative overflow-hidden rounded-3xl border-4 border-nsYellow shadow-lift">
                  <img
                    src={SITE.founderPhoto}
                    alt="S. Shanavas — Founder & CEO, Nano Spark"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-5 inset-x-4 rounded-2xl bg-nsYellow px-4 py-3 text-center shadow-lift"
                >
                  <p className="font-heading text-lg font-extrabold text-nsBlack">{FOUNDER.name}</p>
                  <p className="text-xs font-bold text-nsBlack/70">{FOUNDER.role}</p>
                </motion.div>
              </div>
            </Reveal>

            {/* Founder story */}
            <div className="pt-6 lg:pt-0">
              <p className="font-heading text-lg font-bold text-nsYellow">{FOUNDER.role}</p>
              <p className="mt-1 text-sm text-nsWhite/60">
                {FOUNDER.location} · {SITE.tagline}
              </p>
              <div className="mt-6 space-y-4">
                {FOUNDER.intro.map((para, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="text-base leading-relaxed text-nsWhite/85">{para}</p>
                  </Reveal>
                ))}
              </div>

              {/* Approach */}
              <div className="mt-8 rounded-3xl border border-nsWhite/10 bg-nsWhite/5 p-6">
                <h3 className="font-heading text-lg font-extrabold text-nsYellow">His Approach</h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {FOUNDER.approach.map((step, i) => (
                    <Reveal key={step} delay={i * 0.05}>
                      <span className="flex items-center gap-2">
                        <span className="rounded-xl bg-nsYellow px-3 py-2 font-heading text-sm font-extrabold text-nsBlack">
                          {step}
                        </span>
                        {i < FOUNDER.approach.length - 1 && <FiChevronRight className="text-nsYellow/60" />}
                      </span>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-nsWhite/70">{FOUNDER.approachNote}</p>
              </div>
            </div>
          </div>

          {/* Vision quote */}
          <Reveal delay={0.1}>
            <div className="relative mt-12 overflow-hidden rounded-3xl bg-gold-gradient px-8 py-10 text-center shadow-lift sm:px-14">
              <span className="font-heading text-6xl text-nsBlack/20">“</span>
              <p className="font-heading text-xl font-extrabold leading-relaxed text-nsBlack sm:text-2xl">
                {FOUNDER.visionQuote}
              </p>
              <p className="mt-4 text-sm font-bold tracking-[0.2em] text-nsBlack/70">
                {FOUNDER.visionHeading}
              </p>
            </div>
          </Reveal>

          {/* Bigger vision */}
          <Reveal delay={0.1}>
            <div className="mt-12">
              <h3 className="text-center font-heading text-2xl font-extrabold text-nsYellow">
                {FOUNDER.biggerVisionHeading}
              </h3>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
                {FOUNDER.biggerVision.map((step, i) => (
                  <Reveal key={step} delay={i * 0.06} className="flex flex-1 lg:flex-row lg:items-center lg:gap-3">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="flex flex-1 items-center justify-center rounded-2xl border border-nsWhite/10 bg-nsWhite/5 px-4 py-4 text-center font-heading text-sm font-extrabold text-nsWhite"
                    >
                      {step}
                    </motion.div>
                    {i < FOUNDER.biggerVision.length - 1 && (
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="mx-auto mt-2 text-nsYellow lg:mt-0 lg:rotate-90"
                      >
                        <FiChevronRight size={20} />
                      </motion.span>
                    )}
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 text-center">
                <span className="font-heading text-lg font-extrabold text-nsWhite">{FOUNDER.name}</span>
                <span className="mx-2 text-nsYellow">•</span>
                <span className="text-sm text-nsWhite/70">{FOUNDER.role}</span>
                <span className="mt-1 block text-xs font-bold tracking-[0.2em] text-nsYellow/80">
                  {SITE.tagline}
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MSME / STARTUPTN ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Registered & Recognized"
            title="An MSME registered,"
            highlight="StartupTN recognized startup"
            subtitle="Nano Spark is a formally recognized technology startup — built on a registered foundation for trustworthy partnerships with schools and institutions."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    <FiShield size={26} />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-nsBlack">MSME Registered</h3>
                    <p className="text-sm font-semibold text-nsYellow">Udyam registered enterprise</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-nsBlack/70">
                  Nano Spark is registered as a Micro, Small &amp; Medium Enterprise with the
                  Government of India's Udyam portal — reflecting our commitment to legitimate,
                  accountable business practice.
                </p>
                <p className="text-sm font-bold text-nsBlack/60">
                  {SITE.msme.number}
                </p>
                {/* TODO: drop MSME certificate image as public/images/msme-certificate.jpg */}
                <SmartImage
                  src="/images/msme-certificate.jpg"
                  alt="MSME (Udyam) Registration Certificate"
                  className="aspect-[4/3] w-full rounded-2xl border-2 border-nsBlack/10 object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-nsBlack/10 bg-nsGray-light p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsBlack text-nsYellow">
                    <FiAward size={26} />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-nsBlack">StartupTN Recognized</h3>
                    <p className="text-sm font-semibold text-nsYellow">Recognized technology startup</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-nsBlack/70">
                  Nano Spark is recognized by StartupTN (the Government of Tamil Nadu's startup
                  initiative) — part of Tamil Nadu's thriving innovation ecosystem for education
                  technology and STEM solutions.
                </p>
                <p className="text-sm font-bold text-nsBlack/60">
                  StartupTN Registration — (to be updated)
                </p>
                {/* TODO: drop StartupTN recognition letter/image as public/images/startup-tn.jpg */}
                <SmartImage
                  src="/images/startup-tn.jpg"
                  alt="StartupTN Recognition"
                  className="aspect-[4/3] w-full rounded-2xl border-2 border-nsBlack/10 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  )
}
