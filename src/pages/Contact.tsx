import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import {
  FiAward,
  FiCheck,
  FiChevronDown,
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
import { FaWhatsapp } from 'react-icons/fa'
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

    // Send straight to the Nano Spark Gmail account via the user's mail client,
    // and open WhatsApp with the same message for a quick reply.
    const subject = encodeURIComponent(`New message from ${payload.name} — Nano Spark website`)
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nSchool / Organization: ${payload.org || 'Not provided'}\n\nMessage:\n${payload.message}\n\n— Sent via the Nano Spark website contact form`,
    )
    const whatsappText = encodeURIComponent(
      `Hi Nano Spark, this is ${payload.name} (${payload.email})${payload.org ? ` from ${payload.org}` : ''}. ${payload.message}`,
    )

    // TODO: also POST to Formspree / Google Apps Script / backend here when ready so
    // messages arrive even if the visitor has no mail client configured.
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    window.open(`https://wa.me/918148774546?text=${whatsappText}`, '_blank')

    setTimeout(() => setStatus('sent'), 700)
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
              Questions, partnerships, STEM labs or workshops — your message goes straight to our
              Gmail and WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FOUNDER (LEFT) + MESSAGE FORM (RIGHT) ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-2">
          {/* ===== LEFT: About the Founder ===== */}
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="shrink-0 overflow-hidden rounded-2xl border-4 border-nsYellow bg-white shadow-lift"
                  >
                    <img
                      src={SITE.founderPhoto}
                      alt={SITE.founder.name}
                      className="h-36 w-36 object-cover object-top sm:h-44 sm:w-44"
                    />
                  </motion.div>
                  <div>
                    <p className="text-xs font-extrabold tracking-[0.25em] text-nsYellow">
                      {FOUNDER.heading}
                    </p>
                    <h2 className="mt-1 font-heading text-3xl font-extrabold text-nsBlack">
                      {FOUNDER.name}
                    </h2>
                    <p className="mt-0.5 text-sm font-bold text-nsBlack/60">{FOUNDER.role}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-nsBlack/60">
                      <FiMapPin /> {FOUNDER.location}, India
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-nsGray-light px-3 py-1 text-[11px] font-bold text-nsBlack/70">
                      <FiShield className="text-nsYellow" /> MSME Registered · StartupTN Recognized
                    </span>
                  </div>
                </div>

                {/* Contacts — labeled Gmail / Contact / WhatsApp */}
                <div className="mt-6 space-y-3 border-t border-nsBlack/10 pt-5 text-sm">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack">
                      <FiMail />
                    </span>
                    <span>
                      <span className="block text-[11px] font-extrabold tracking-widest text-nsBlack/45">
                        GMAIL
                      </span>
                      <span className="break-all font-semibold">{SITE.email}</span>
                    </span>
                  </a>
                  <a
                    href={SITE.socials[5].href}
                    className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack">
                      <FiPhone />
                    </span>
                    <span>
                      <span className="block text-[11px] font-extrabold tracking-widest text-nsBlack/45">
                        CONTACT
                      </span>
                      <span className="font-semibold">{SITE.phoneDisplay}</span>
                    </span>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 text-nsBlack/75 hover:text-nsBlack"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white">
                      <FaWhatsapp size={18} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-extrabold tracking-widest text-nsBlack/45">
                        WHATSAPP
                      </span>
                      <span className="font-semibold">Message us — quick reply</span>
                    </span>
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
            </Reveal>

            {/* About the Founder story */}
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <div className="space-y-4">
                  {FOUNDER.intro.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-nsBlack/80">
                      {para}
                    </p>
                  ))}
                </div>

                {/* His Approach */}
                <div className="mt-7 rounded-2xl bg-nsGray-light p-6">
                  <h3 className="font-heading text-lg font-extrabold text-nsBlack">His Approach</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {FOUNDER.approach.map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <span className="rounded-xl bg-nsYellow px-3 py-2 font-heading text-sm font-extrabold text-nsBlack">
                          {step}
                        </span>
                        {i < FOUNDER.approach.length - 1 && (
                          <FiChevronDown className="rotate-[-90deg] text-nsYellow" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-nsBlack/70">{FOUNDER.approachNote}</p>
                </div>

                {/* Vision */}
                <div className="mt-6 relative overflow-hidden rounded-2xl bg-gold-gradient px-6 py-7 shadow-soft">
                  <span className="absolute -top-2 left-4 font-heading text-7xl text-nsBlack/15">“</span>
                  <p className="relative mt-4 font-heading text-lg font-extrabold leading-relaxed text-nsBlack">
                    {FOUNDER.visionQuote}
                  </p>
                  <p className="mt-3 text-right text-xs font-extrabold tracking-[0.2em] text-nsBlack/60">
                    {FOUNDER.visionHeading}
                  </p>
                </div>

                {/* Bigger vision */}
                <div className="mt-7">
                  <h3 className="font-heading text-lg font-extrabold text-nsBlack">
                    {FOUNDER.biggerVisionHeading}
                  </h3>
                  <div className="mt-4 flex flex-col gap-2">
                    {FOUNDER.biggerVision.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nsBlack font-heading text-xs font-extrabold text-nsYellow">
                          {i + 1}
                        </span>
                        <span className="font-heading text-sm font-extrabold text-nsBlack">{step}</span>
                        {i < FOUNDER.biggerVision.length - 1 && (
                          <FiChevronDown className="ml-auto text-nsYellow" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-nsBlack/10 pt-4 text-right">
                    <span className="font-heading text-base font-extrabold text-nsBlack">
                      S. Shanavas
                    </span>
                    <span className="mx-2 text-nsYellow">•</span>
                    <span className="text-sm text-nsBlack/60">Founder & CEO, Nano Spark</span>
                    <span className="mt-1 block text-[11px] font-extrabold tracking-[0.22em] text-nsYellow">
                      {SITE.tagline}
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===== RIGHT: Message form ===== */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <h2 className="font-heading text-2xl font-extrabold text-nsBlack">Send a message</h2>
                <p className="mt-1 text-sm text-nsBlack/60">
                  Your filled message goes straight to our{' '}
                  <a href={`mailto:${SITE.email}`} className="font-bold text-nsBlack underline">
                    Gmail ({SITE.email})
                  </a>{' '}
                  and opens WhatsApp automatically.
                </p>

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
                    {status === 'sending'
                      ? 'Opening Gmail & WhatsApp…'
                      : status === 'sent'
                        ? 'Message Ready!'
                        : 'Send Message'}
                    {status === 'sent' ? <FiCheck /> : <FiSend />}
                  </motion.button>

                  {status === 'sent' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-sm font-semibold text-nsBlack"
                    >
                      Your message has been opened in Gmail and WhatsApp, {form.name.split(' ')[0]}.
                      Hit send there and we'll reply within a day!
                    </motion.p>
                  )}
                </form>
              </div>

              {/* Location */}
              <div className="circuit-bg-light relative mt-6 overflow-hidden rounded-3xl bg-nsBlack p-8 text-nsWhite shadow-lift">
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
                <p className="text-sm font-bold text-nsBlack/60">{SITE.msme.number}</p>
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
                <p className="text-sm font-bold text-nsBlack/60">StartupTN Registration — (to be updated)</p>
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