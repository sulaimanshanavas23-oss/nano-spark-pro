import { FormEvent, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiStar } from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-3 text-sm text-nsBlack placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

const CONFETTI_COLORS = ['#FFC107', '#F7B500', '#FFD54F', '#111111', '#FFFFFF']

function Confetti({ count = 42 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        width: 6 + Math.random() * 7,
        height: 10 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-20px] block rounded-[2px]"
          style={{
            left: `${p.x}%`,
            width: p.width,
            height: p.height,
            background: p.color,
          }}
          initial={{ y: -40, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotate + 360, opacity: [1, 1, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

// Sample testimonials — TODO: replace with real verified quotes from Nano Spark
const TESTIMONIALS = [
  {
    name: 'Sample — School Teacher',
    org: 'Chennai, TN',
    quote:
      'Replace this with a real quote from a teacher about how the STEM program helped their students. (Sample content)',
    rating: 5,
  },
  {
    name: 'Sample — Student Innovator',
    org: 'Chennai, TN',
    quote:
      'Replace this with a real student quote about building their first robot or IoT project. (Sample content)',
    rating: 5,
  },
  {
    name: 'Sample — Parent',
    org: 'Chennai, TN',
    quote:
      'Replace this with a real parent quote about confidence and interest in technology. (Sample content)',
    rating: 4,
  },
]

function StarsInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || value)
        return (
          <motion.button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            whileHover={{ scale: 1.25, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            className={`text-3xl transition-colors sm:text-4xl ${
              active ? 'text-nsYellow' : 'text-nsBlack/15 hover:text-nsYellow/60'
            }`}
          >
            {active ? <FiStar fill="currentColor" /> : <FiStar />}
          </motion.button>
        )
      })}
    </div>
  )
}

export default function Feedback() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState({ name: '', org: '', workshop: '', comments: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (rating === 0) return
    setStatus('sending')

    // TODO: connect form endpoint — post to Formspree, Google Apps Script,
    // or your own backend here. Log for now.
    console.log('TODO: send feedback to endpoint', { ...form, rating })
    setTimeout(() => setStatus('sent'), 700)
  }

  const reset = () => {
    setStatus('idle')
    setRating(0)
    setForm({ name: '', org: '', workshop: '', comments: '' })
  }

  return (
    <Page>
      {status === 'sent' && <Confetti />}

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Feedback
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              Tell us how it went
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Your feedback helps us make every workshop, kit and program better for the next
              young innovator.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-2xl px-6 sm:px-8">
          {status === 'sent' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="rounded-3xl border border-nsYellow bg-nsWhite p-10 text-center shadow-lift"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-nsYellow text-nsBlack"
              >
                <FiCheck size={40} />
              </motion.span>
              <h2 className="mt-6 font-heading text-3xl font-extrabold text-nsBlack">
                Thank you! <span className="text-nsYellow">\o/</span>
              </h2>
              <p className="mt-3 text-nsBlack/70">
                Your feedback means the world to us at Nano Spark. We'll keep building better
                experiences for young innovators.
              </p>
              <button type="button" onClick={reset} className="btn-dark mx-auto mt-8">
                Submit Another
              </button>
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                Rate your experience
              </h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-nsBlack">
                    <FiStar className="text-nsYellow" /> Your rating
                  </label>
                  <StarsInput value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm font-semibold text-nsBlack/60"
                    >
                      You rated {rating} of 5 {rating === 5 ? '— brilliant!' : rating >= 4 ? '— great!' : ''}
                    </motion.p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className="mb-1.5 block text-sm font-bold text-nsBlack">Name</label>
                    <input id="f-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="f-org" className="mb-1.5 block text-sm font-bold text-nsBlack">School / Organization</label>
                    <input id="f-org" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Your school or org" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="f-workshop" className="mb-1.5 block text-sm font-bold text-nsBlack">Workshop Attended</label>
                  <input id="f-workshop" value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })} placeholder="e.g. Robotics Workshop, STEM Lab Program" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="f-comments" className="mb-1.5 block text-sm font-bold text-nsBlack">Comments</label>
                  <textarea id="f-comments" required rows={4} value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} placeholder="What did you enjoy? What could we improve?" className={inputClass} />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === 'sending'}
                  className="btn-yellow w-full"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit Feedback'}
                </motion.button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What People Say"
            title="Voices from our"
            highlight="community"
            subtitle="These are sample testimonials. We'll replace them with real quotes from Nano Spark families and schools."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <motion.blockquote
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col rounded-3xl border border-nsBlack/10 bg-nsGray-light p-6 shadow-soft"
                >
                  <div className="flex gap-1 text-nsYellow">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FiStar key={s} fill={s < t.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 italic leading-relaxed text-nsBlack/75">"{t.quote}"</p>
                  <footer className="mt-5 border-t border-nsBlack/10 pt-4">
                    <p className="font-heading font-extrabold text-nsBlack">{t.name}</p>
                    <p className="text-sm text-nsBlack/50">{t.org}</p>
                  </footer>
                </motion.blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
