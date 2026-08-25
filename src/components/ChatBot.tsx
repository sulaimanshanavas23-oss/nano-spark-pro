import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiSend, FiX, FiRotateCcw, FiMessageSquare } from 'react-icons/fi'

const WHATSAPP_NUMBER = '918148774546'

type ChatRole = 'bot' | 'user'

interface ChatMessage {
  id: number
  from: ChatRole
  text: string
}

interface Step {
  key: string
  label: string
  question: string
  placeholder: string
  quickReplies?: string[]
}

const STEPS: Step[] = [
  {
    key: 'name',
    label: 'Name',
    question: 'Hi! I am the Nano Spark AI assistant. Let me collect a few details and send them straight to our team on WhatsApp. What is your full name?',
    placeholder: 'e.g. Aarav Kumar',
  },
  {
    key: 'category',
    label: 'School / College',
    question: 'Are you a school student or a college student?',
    placeholder: 'Type School or College',
    quickReplies: ['School Student', 'College Student'],
  },
  {
    key: 'classYear',
    label: 'Class / Year',
    question: 'Which class or year are you studying?',
    placeholder: 'e.g. 8th standard or 2nd year',
  },
  {
    key: 'city',
    label: 'City',
    question: 'Which city are you from?',
    placeholder: 'e.g. Chennai',
  },
  {
    key: 'email',
    label: 'Email',
    question: 'What is your email address?',
    placeholder: 'e.g. aarav@gmail.com',
  },
  {
    key: 'phone',
    label: 'Phone Number',
    question: 'What is your 10-digit mobile number?',
    placeholder: 'e.g. 9876543210',
  },
  {
    key: 'interest',
    label: 'Interest',
    question: 'Which Nano Spark kit or program are you interested in?',
    placeholder: 'e.g. Robotics, IoT, STEM Lab or Workshop',
  },
  {
    key: 'message',
    label: 'Message',
    question: 'Anything else you would like to share? Type your message, or type No.',
    placeholder: 'Type your message here…',
  },
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'bot', text: 'Hi! I am the Nano Spark AI assistant. I can help you pick the right STEM kit or program — your details go straight to our team on WhatsApp (+91 8148774546).' },
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const [details, setDetails] = useState<Record<string, string>>({})
  const idRef = useRef(2)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const step = STEPS[stepIndex]

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (!open || done || busy) return
    const t = setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, from: 'bot', text: step.question }])
      setBusy(true)
    }, 350)
    return () => clearTimeout(t)
  }, [open, done, busy, stepIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || !busy) return
    const t = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(t)
  }, [open, busy])

  useEffect(() => {
    if (stepIndex >= STEPS.length) {
      setDone(true)
      setBusy(false)
      setMessages((m) => [
        ...m,
        { id: idRef.current++, from: 'bot', text: 'Thank you! Here is the summary of your details. Tap the button below and our team will receive everything on WhatsApp right away.' },
      ])
    }
  }, [stepIndex])

  const submit = (value?: string) => {
    const v = (value ?? input).trim()
    if (!v || !busy || done) return

    let error: string | null = null
    if (step.key === 'name' && !/^[A-Za-z\s.'-]{2,50}$/.test(v)) {
      error = 'Please enter your name using letters only (for example: Aarav Kumar). Try again.'
    } else if (step.key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      error = 'That email address does not look right. Please re-enter it (for example: aarav@gmail.com).'
    } else if (step.key === 'phone') {
      const digits = v.replace(/\D/g, '')
      if (!/^[6-9]\d{9}$/.test(digits)) {
        error = 'Please enter a valid 10-digit mobile number starting with 6, 7, 8 or 9 (for example: 9876543210).'
      }
    } else if (step.key === 'classYear' && v.length < 2) {
      error = 'Please tell me your class or year (for example: 8th standard or 2nd year).'
    } else if (step.key === 'city' && v.length < 2) {
      error = 'Please enter the name of your city (for example: Chennai).'
    }

    if (error) {
      setMessages((m) => [...m, { id: idRef.current++, from: 'bot', text: error }])
      setInput('')
      inputRef.current?.focus()
      return
    }

    setMessages((m) => [...m, { id: idRef.current++, from: 'user', text: v }])
    setDetails((d) => ({ ...d, [step.key]: step.key === 'phone' ? v.replace(/\D/g, '') : v }))
    setInput('')
    setBusy(false)
    setStepIndex((i) => i + 1)
  }

  const whatsappLink = () => {
    const lines = STEPS.map((s) => `${s.label}: ${details[s.key] || '-'}`).join('\n')
    const text = `Nano Spark AI Assistant - New Enquiry\n\n${lines}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  const reset = () => {
    setMessages([{ id: 1, from: 'bot', text: 'Hi! I am the Nano Spark AI assistant. I can help you pick the right STEM kit or program — your details go straight to our team on WhatsApp (+91 8148774546).' }])
    idRef.current = 2
    setStepIndex(0)
    setBusy(false)
    setDone(false)
    setInput('')
    setDetails({})
  }

  return (
    <>
      {/* Mascot + Speech Bubble — below WhatsApp button */}
      {!open && (
        <motion.div
          className="fixed bottom-5 right-5 z-50 flex items-end gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* Speech bubble */}
          <motion.div
            className="relative mb-2 rounded-2xl rounded-br-sm bg-white px-4 py-2.5 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: 'spring', stiffness: 300 }}
          >
            <p className="whitespace-nowrap text-sm font-bold text-nsBlack">
              May I help you?
            </p>
            <span className="absolute -bottom-1.5 right-2 h-3 w-3 rotate-45 bg-white" />
          </motion.div>

          {/* Mascot button */}
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open AI assistant"
            title="Nano Spark AI Assistant"
            className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full border-3 border-nsYellow bg-white shadow-lift"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 260 }}
          >
            <img
              src="/images/mini cartton boy.jpg"
              alt="Nano Spark Assistant"
              className="h-full w-full object-cover"
              draggable={false}
            />
            <motion.span
              className="absolute -right-1 -top-1 text-xl"
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
            </motion.span>
          </motion.button>
        </motion.div>
      )}

      {/* FAB — close button when chat is open */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI assistant"
            title="Close AI assistant"
            className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nsBlack text-nsYellow shadow-lift"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="absolute inset-0 rounded-full border-2 border-nsYellow/60" />
            <FiX size={24} className="relative" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-48 right-3 z-50 flex h-[520px] max-h-[calc(100vh-13rem)] w-[min(94vw,340px)] flex-col overflow-hidden rounded-3xl border border-nsYellow/40 bg-nsBlack shadow-lift sm:right-5"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-nsWhite/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nsYellow text-nsBlack">
                  <FiCpu size={18} />
                </span>
                <div>
                  <p className="font-heading text-sm font-extrabold text-nsWhite">Nano Spark AI</p>
                  <p className="flex items-center gap-1 text-[10px] font-bold text-nsYellow">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online — replies on WhatsApp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-nsWhite hover:bg-white/20"
              >
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) =>
                m.from === 'bot' ? (
                  <div key={m.id} className="flex">
                    <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-[13px] leading-relaxed text-nsWhite">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-nsYellow px-3.5 py-2.5 text-[13px] leading-relaxed text-nsBlack">
                      {m.text}
                    </p>
                  </div>
                )
              )}

              {done && (
                <div className="mt-2 space-y-2 rounded-2xl border border-nsYellow/40 bg-white/5 p-3 text-[12px] text-nsWhite">
                  {STEPS.map((s) => (
                    <p key={s.key} className="flex justify-between gap-3">
                      <span className="text-nsWhite/50">{s.label}:</span>
                      <span className="break-all text-right font-semibold">{details[s.key] || '-'}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-nsWhite/10 bg-white/5 px-4 py-3">
              {done ? (
                <div className="flex flex-col gap-2">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-extrabold text-white"
                  >
                    <FiMessageSquare /> Send Details on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-nsWhite hover:bg-white/20"
                  >
                    <FiRotateCcw /> Start Over
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    disabled={!busy}
                    placeholder={busy ? step.placeholder : '…'}
                    maxLength={200}
                    className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-nsWhite placeholder:text-nsWhite/40 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => submit()}
                    aria-label="Send message"
                    disabled={!busy || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nsYellow text-nsBlack transition-transform hover:scale-105 disabled:opacity-40"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              )}

              {busy && step.quickReplies && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {step.quickReplies.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => submit(r)}
                      className="rounded-full border border-nsYellow/50 px-3 py-1.5 text-[11px] font-bold text-nsYellow hover:bg-nsYellow hover:text-nsBlack"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}