import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiSend,
  FiZap,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { SITE, WHATSAPP_LINK } from '../lib/site'
import { sanitizeText, validateEmail, validateRequired } from '../lib/validate'

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-3 text-sm text-nsBlack placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

// Sends booking requests straight to nanospark46@gmail.com via FormSubmit
// (no account needed — the owner confirms the first submission by email once).
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/nanospark46@gmail.com'

const FORMATS = [
  'School Workshop',
  'Free Demo Session',
  'Hackathon',
  'Ambassador-Led Session',
  'STEM Lab Setup',
  'Other',
]

export default function BookSession() {
  const [params] = useSearchParams()
  const initialMode = params.get('mode') === 'online' ? 'Online' : 'Offline'

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    format: FORMATS[1],
    mode: initialMode,
    date: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const name = validateRequired(form.name, 'Name', 100)
    const email = validateEmail(form.email)
    const phone = validateRequired(form.phone, 'Phone number', 20)
    const message = validateRequired(form.message, 'Message', 2000)

    if (!name.valid) return setError(name.message ?? 'Please enter your name.')
    if (!email.valid) return setError(email.message ?? 'Please enter a valid email.')
    if (!phone.valid) return setError(phone.message ?? 'Please enter a phone number.')
    if (!message.valid) return setError(message.message ?? 'Please tell us a little about your session.')
    setError('')

    const payload = {
      name: sanitizeText(form.name, 100),
      email: sanitizeText(form.email, 200),
      phone: sanitizeText(form.phone, 20),
      school: sanitizeText(form.school, 150),
      format: sanitizeText(form.format, 60),
      mode: sanitizeText(form.mode, 10),
      date: sanitizeText(form.date, 30),
      message: sanitizeText(form.message, 2000),
    }

    setStatus('sending')

    // 1) Send the booking straight to nanospark46@gmail.com (FormSubmit → direct email)
    let emailed = false
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `SESSION BOOKING — ${payload.name} (${payload.format})`,
          _template: 'table',
          _honey: '',
          Name: payload.name,
          Email: payload.email,
          Phone: payload.phone,
          'School / Organization': payload.school || 'Not provided',
          Format: payload.format,
          Mode: payload.mode,
          'Preferred date': payload.date || 'Flexible',
          'About the session': payload.message,
        }),
      })
      const data = await res.json()
      emailed = data?.success === 'true'
    } catch {
      emailed = false
    }

    // 2) Fallback if the email service couldn't be reached: open Gmail's
    // compose window (web) with the same booking request — never Outlook.
    if (!emailed) {
      const subject = encodeURIComponent(`Session booking request — ${payload.name} (${payload.format})`)
      const body = encodeURIComponent(
        `BOOK A SESSION REQUEST\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nSchool / Organization: ${payload.school || 'Not provided'}\nFormat: ${payload.format}\nMode: ${payload.mode}\nPreferred date: ${payload.date || 'Flexible'}\n\nDetails:\n${payload.message}\n\n— Sent via the Nano Spark website booking page`,
      )
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${subject}&body=${body}`,
        '_blank',
      )
    }

    // 3) Open WhatsApp with the same message for a quick reply.
    const whatsappText = encodeURIComponent(
      `Hi Nano Spark! I'd like to book a session.\n\nName: ${payload.name}\nPhone: ${payload.phone}${payload.school ? `\nSchool: ${payload.school}` : ''}\nFormat: ${payload.format} (${payload.mode})\nPreferred date: ${payload.date || 'Flexible'}\n\n${payload.message}`,
    )
    window.open(`https://wa.me/918148774546?text=${whatsappText}`, '_blank')

    setStatus('sent')
  }

  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Book a Session
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              <LetterReveal
                texts={[
                  { text: "Let's bring the" },
                  { text: 'spark', color: 'text-nsYellow' },
                  { text: 'to you' },
                ]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Tell us what you'd like — a demo, a workshop, a hackathon or a STEM lab — and we'll
              get back to you within a day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ BOOKING FORM ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-5">
          {/* ===== LEFT: what happens next ===== */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <h2 className="font-heading text-2xl font-extrabold text-nsBlack">What happens next?</h2>
                <ul className="mt-5 space-y-4">
                  {[
                    'Fill in the form — takes under a minute',
                    'We receive your request on Gmail + WhatsApp',
                    'We call or message you to plan the session',
                    'You get a confirmed date and format',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nsYellow font-heading text-sm font-extrabold text-nsBlack">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-sm font-semibold text-nsBlack/75">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
                <h3 className="font-heading text-xl font-extrabold text-nsBlack">Prefer to skip the form?</h3>
                <div className="mt-5 space-y-3 text-sm">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 font-heading font-bold text-white transition-colors hover:bg-nsBlack hover:text-nsYellow"
                  >
                    <FaWhatsapp size={20} /> WhatsApp us directly
                  </a>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex items-center gap-3 rounded-xl border border-nsBlack/15 px-4 py-3 font-heading font-bold text-nsBlack transition-colors hover:bg-nsYellow"
                  >
                    <FiPhone /> Call {SITE.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 rounded-xl border border-nsBlack/15 px-4 py-3 font-heading font-bold text-nsBlack transition-colors hover:bg-nsYellow"
                  >
                    <FiMail /> {SITE.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===== RIGHT: booking form ===== */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-extrabold text-nsBlack">Book your session</h2>
              <p className="mt-1 text-sm text-nsBlack/60">
                Your booking request is sent straight to our Gmail ({SITE.email}) and opens WhatsApp
                automatically for a quick reply.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="book-name" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Your name
                    </label>
                    <input
                      id="book-name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ravi Kumar"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="book-phone" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="book-phone"
                      type="tel"
                      required
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="book-email" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Email
                    </label>
                    <input
                      id="book-email"
                      type="email"
                      required
                      maxLength={200}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="book-school" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      School / Organization <span className="font-normal text-nsBlack/45">(optional)</span>
                    </label>
                    <input
                      id="book-school"
                      type="text"
                      maxLength={150}
                      value={form.school}
                      onChange={(e) => setForm({ ...form, school: e.target.value })}
                      placeholder="e.g. Green Valley School"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="book-format" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      What would you like?
                    </label>
                    <div className="relative">
                      <select
                        id="book-format"
                        value={form.format}
                        onChange={(e) => setForm({ ...form, format: e.target.value })}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        {FORMATS.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-nsBlack/50" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="book-date" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Preferred date <span className="font-normal text-nsBlack/45">(optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="book-date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className={`${inputClass} appearance-none pr-10`}
                      />
                      <FiCalendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-nsBlack/50" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 block text-sm font-bold text-nsBlack">Mode</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Offline', 'Online'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setForm({ ...form, mode })}
                        className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-heading font-extrabold transition-colors ${
                          form.mode === mode
                            ? 'border-nsYellow bg-nsYellow text-nsBlack'
                            : 'border-nsBlack/15 text-nsBlack/60 hover:border-nsBlack/40'
                        }`}
                      >
                        {mode === 'Online' ? <FiZap /> : <FiCheck />}
                        {mode === 'Online' ? 'Online (Video)' : 'Offline (In Person)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="book-message" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    About your session
                  </label>
                  <textarea
                    id="book-message"
                    required
                    maxLength={2000}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="e.g. We're a school with 40 students in classes 6–8 and would love a half-day robotics workshop."
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
                    ? 'Sending your request…'
                    : status === 'sent'
                      ? 'Booking Request Sent!'
                      : 'Request My Session'}
                  {status === 'sent' ? <FiCheck /> : <FiSend />}
                </motion.button>

                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-sm font-semibold text-nsBlack"
                  >
                    Your booking request has been sent to Nano Spark, {form.name.split(' ')[0]}.
                    We'll confirm your session soon — WhatsApp has also opened with the same
                    details for a faster reply!
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FORMATS STRIP ============ */}
      <section className="relative overflow-hidden bg-nsBlack py-20">
        <CircuitBackground variant="dark" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-8">
          <SectionHeading
            dark
            eyebrow="Formats"
            title="Pick the format that"
            highlight="fits your school"
            subtitle="Half-day workshops, multi-day programs, hackathons, demo sessions or a full STEM lab — we'll design it around your students."
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {FORMATS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-4 py-2 text-sm font-bold text-nsYellow"
                >
                  {f}
                </span>
              ))}
            </div>
            <Link to="/workshops" className="btn-yellow mx-auto mt-10">
              See Workshop Details <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}