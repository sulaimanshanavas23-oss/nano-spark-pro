import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import { Reveal } from '../components/Reveal'
import { SITE } from '../lib/site'
import { sanitizeText, validateEmail, validateRequired } from '../lib/validate'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/nanospark46@gmail.com'

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-3 text-sm text-nsBlack placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

export default function AmbassadorApply() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    ageClass: '',
    school: '',
    email: '',
    phone: '',
    city: '',
    why: '',
    experience: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const name = validateRequired(form.name, 'Your name', 100)
    const email = validateEmail(form.email)
    const phone = validateRequired(form.phone, 'Phone number', 20)
    const why = validateRequired(form.why, 'Why do you want to join', 2000)

    if (!name.valid) return setError(name.message ?? 'Please enter your name.')
    if (!email.valid) return setError(email.message ?? 'Please enter a valid email.')
    if (!phone.valid) return setError(phone.message ?? 'Please enter a phone number.')
    if (!why.valid) return setError(why.message ?? 'Please tell us why you want to be an ambassador.')
    setError('')

    const payload = {
      name: sanitizeText(form.name, 100),
      ageClass: sanitizeText(form.ageClass, 50),
      school: sanitizeText(form.school, 150),
      email: sanitizeText(form.email, 200),
      phone: sanitizeText(form.phone, 20),
      city: sanitizeText(form.city, 60),
      why: sanitizeText(form.why, 2000),
      experience: sanitizeText(form.experience, 1500),
    }

    setStatus('sending')

    let emailed = false
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `AMBASSADOR APPLICATION — ${payload.name}`,
          _template: 'table',
          _honey: '',
          Name: payload.name,
          'Age / Class': payload.ageClass || 'Not provided',
          'School / College': payload.school || 'Not provided',
          Email: payload.email,
          Phone: payload.phone,
          City: payload.city || 'Not provided',
          'Why join?': payload.why,
          Experience: payload.experience || 'None',
        }),
      })
      const data = await res.json()
      emailed = data?.success === 'true'
    } catch {
      emailed = false
    }

    if (!emailed) {
      const subject = encodeURIComponent(`Ambassador application — ${payload.name}`)
      const body = encodeURIComponent(
        `AMBASSADOR APPLICATION\n\nName: ${payload.name}\nAge / Class: ${payload.ageClass || 'Not provided'}\nSchool / College: ${payload.school || 'Not provided'}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nCity: ${payload.city || 'Not provided'}\n\nWhy I want to join:\n${payload.why}\n\nExperience:\n${payload.experience || 'None'}\n\n— Sent via the Nano Spark website ambassador form`,
      )
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${subject}&body=${body}`,
        '_blank',
      )
    }

    const whatsappText = encodeURIComponent(
      `Hi Nano Spark! I'd like to join the Ambassador Program.\n\nName: ${payload.name}${payload.ageClass ? `\nClass: ${payload.ageClass}` : ''}${payload.school ? `\nSchool: ${payload.school}` : ''}\nPhone: ${payload.phone}\n\n${payload.why}`,
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
            <Link
              to="/ambassador"
              className="mx-auto mb-6 inline-flex items-center gap-2 text-sm font-semibold text-nsWhite/60 transition-colors hover:text-nsYellow"
            >
              <FiArrowLeft /> Back to Ambassador Program
            </Link>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Apply Now
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              Become a Nano Spark{' '}
              <span className="text-nsYellow">Ambassador</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Fill out the form below — your application is sent straight to our Gmail and WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ APPLICATION FORM ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-5">
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
            <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                Ambassador Application
              </h2>
              <p className="mt-1 text-sm text-nsBlack/60">
                Your application is sent straight to Nano Spark's Gmail ({SITE.email}) and opens
                WhatsApp automatically.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="amb-name" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Your name
                    </label>
                    <input
                      id="amb-name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aisha Begum"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="amb-age" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Class / Course
                    </label>
                    <input
                      id="amb-age"
                      type="text"
                      maxLength={50}
                      value={form.ageClass}
                      onChange={(e) => setForm({ ...form, ageClass: e.target.value })}
                      placeholder="e.g. Class 9 / B.E. ECE"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="amb-school" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    School / College
                  </label>
                  <input
                    id="amb-school"
                    type="text"
                    maxLength={150}
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    placeholder="e.g. Green Valley Matriculation School"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="amb-email" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Email
                    </label>
                    <input
                      id="amb-email"
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
                    <label htmlFor="amb-phone" className="mb-1.5 block text-sm font-bold text-nsBlack">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="amb-phone"
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

                <div>
                  <label htmlFor="amb-city" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    Your city
                  </label>
                  <input
                    id="amb-city"
                    type="text"
                    maxLength={60}
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Chennai"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="amb-why" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    Why do you want to be an ambassador?
                  </label>
                  <textarea
                    id="amb-why"
                    required
                    maxLength={2000}
                    rows={4}
                    value={form.why}
                    onChange={(e) => setForm({ ...form, why: e.target.value })}
                    placeholder="e.g. I love robotics and I want to help my classmates build their first projects…"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="amb-exp" className="mb-1.5 block text-sm font-bold text-nsBlack">
                    Any tech experience? <span className="font-normal text-nsBlack/45">(optional)</span>
                  </label>
                  <textarea
                    id="amb-exp"
                    maxLength={1500}
                    rows={2}
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. Built a small Arduino project / participated in a hackathon"
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
                    ? 'Sending your application…'
                    : status === 'sent'
                      ? 'Application Sent!'
                      : 'Apply to Become an Ambassador'}
                  {status === 'sent' ? <FiCheck /> : <FiSend />}
                </motion.button>

                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-nsYellow/15 px-4 py-3 text-center text-sm font-semibold text-nsBlack"
                  >
                    Your application has been sent to Nano Spark, {form.name.split(' ')[0]}. We'll
                    get back to you soon — WhatsApp has also opened with the same details!
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>
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
