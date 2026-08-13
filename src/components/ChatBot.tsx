import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiSend, FiX, FiRotateCcw, FiMessageSquare } from 'react-icons/fi'
import { playClick } from '../lib/sound'

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
    key: 'interest',
    label: 'Interest',
    question: 'Which Nano Spark kit or program are you interested in?',
    placeholder: 'e.g. Robotics, IoT, STEM Lab or Workshop',
  },
  {
    key: 'phone',
    label: 'Phone Number',
    question: 'What is the best phone number to reach you?',
    placeholder: 'e.g. 9876543210',
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
    setMessages((m) => [...m, { id: idRef.current++, from: 'user', text: v }])
    setDetails((d) => ({ ...d, [step.key]: v }))
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
    playClick()
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
      {/* FAB — sits just above the WhatsApp button */}
      <motion.button
        type="button"
        onClick={() => {
          playClick()
          setOpen((v) => !v)
        }}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        title="Nano Spark AI Assistant"
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-nsBlack text-nsYellow shadow-lift"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ delay: 0.7 }}
      >
        <span className="absolute inset-0 rounded-full border-2 border-nsYellow/60" />
        {open ? <FiX size={26} className="relative" /> : <FiCpu size={26} className="relative" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-40 right-3 z-50 flex h-[520px] max-h-[70vh] w-[min(94vw,340px)] flex-col overflow-hidden rounded-3xl border border-nsYellow/40 bg-nsBlack shadow-lift sm:right-5"
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
                  <div key={m.id} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nsYellow text-[10px] text-nsBlack">
                      <FiCpu size={12} />
                    </span>
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