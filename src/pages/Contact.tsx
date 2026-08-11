import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import {
  FiCheck,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiFacebook,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import { Reveal } from '../components/Reveal'
import { SITE, WHATSAPP_LINK } from '../lib/site'

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
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // TODO: connect form endpoint — post to Formspree, Google Apps Script,
    // or your own backend here. Example:
    //   await fetch('https://formspree.io/f/yourFormId', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   })
    console.log('TODO: send contact form to endpoint', form)
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
                <div className="flex items-center gap-5">
                  <motion.img
                    src={SITE.founderPhoto}
                    alt={SITE.founder.name}
                    whileHover={{ scale: 1.05 }}
                    className="h-20 w-20 rounded-2xl border-2 border-nsYellow object-cover"
                  />
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-nsBlack">
                      {SITE.founder.name}
                    </h3>
                    <p className="text-sm font-semibold text-nsYellow">
                      {SITE.founder.role}, Nano Spark
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-nsBlack/60">
                      <FiMapPin /> {SITE.founder.location}, India
                    </p>
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
    </Page>
  )
}
