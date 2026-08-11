import { motion } from 'framer-motion'
import { FiArrowRight, FiMail, FiPhone, FiDownload, FiUsers } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import FAQAccordion, { FAQItem } from '../components/FAQAccordion'
import { Reveal } from '../components/Reveal'
import { SITE, WHATSAPP_LINK } from '../lib/site'

const FAQS: FAQItem[] = [
  {
    q: 'What age groups do you support?',
    a: 'Our programs are designed mainly for school students — from about ages 8 up to high school and early college. Kits and workshops are offered in beginner, intermediate and advanced levels so each age group gets the right challenge.',
  },
  {
    q: 'Do you provide kits for individuals or only schools?',
    a: 'Both. We supply kits to schools and institutions as part of STEM labs and workshops, and we can also support individual/homeschool learners and aspiring innovators. Reach out and we will recommend the right kit for your situation.',
  },
  {
    q: 'How do I get technical support after a workshop?',
    a: 'Every workshop or kit purchase includes a support window. You can reach us by email (nanospark46@gmail.com), phone (+91 8148774546) or WhatsApp, and a member of our team will guide you through troubleshooting, wiring and code issues.',
  },
  {
    q: 'Do I need any prior electronics or coding experience?',
    a: 'No. All our sessions are designed to be beginner-friendly. We start from the very basics and gradually build up, so students of all experience levels can follow along and complete their projects.',
  },
  {
    q: 'Can Nano Spark run a STEM lab or workshop at our school?',
    a: 'Yes — setting up practical technology learning spaces is one of our core services. We provide equipment, curriculum support, teacher training and ongoing technical support for schools across the Chennai region.',
  },
  {
    q: 'What topics do the workshops cover?',
    a: 'Electronics, Arduino, robotics, IoT, embedded systems and introductory AI / agentic AI. Every session includes theory, live demos and a hands-on build that students get to keep working on.',
  },
]

const RESOURCES = [
  { name: 'Curriculum Overview (PDF)', meta: 'Coming soon' },
  { name: 'STEM Kit Manuals', meta: 'Coming soon' },
  { name: 'Workshop Brochure', meta: 'Coming soon' },
  { name: 'Teacher Starter Guide', meta: 'Coming soon' },
]

export default function Support() {
  return (
    <Page>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-nsBlack text-nsWhite">
        <CircuitBackground variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="section-heading-bullet justify-center">
              <span className="text-nsYellow">&#9654;</span> Support
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
              We've got your <span className="text-nsYellow">back</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsWhite/70">
              Answers to common questions, direct technical support, and mentorship throughout your
              learning and project journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <SectionHeading eyebrow="Frequently Asked Questions" title="Answers you need" />
          <div className="mt-12">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* ============ SUPPORT CONTACT ============ */}
      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Technical Support"
            title="Talk to a real"
            highlight="human"
            subtitle="Questions about kits, code, wiring or projects? We reply quickly."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal>
              <motion.a
                href={`mailto:${SITE.email}`}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsWhite p-8 text-center shadow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack"><FiMail size={26} /></span>
                <span className="font-heading text-lg font-extrabold text-nsBlack">Email</span>
                <span className="text-sm text-nsBlack/70 break-all">{SITE.email}</span>
              </motion.a>
            </Reveal>
            <Reveal delay={0.1}>
              <motion.a
                href={SITE.socials[5].href}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsWhite p-8 text-center shadow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-nsYellow text-nsBlack"><FiPhone size={26} /></span>
                <span className="font-heading text-lg font-extrabold text-nsBlack">Phone</span>
                <span className="text-sm text-nsBlack/70">{SITE.phoneDisplay}</span>
              </motion.a>
            </Reveal>
            <Reveal delay={0.2}>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ y: -6 }}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsWhite p-8 text-center shadow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#25D366] text-nsWhite"><FaWhatsapp size={26} /></span>
                <span className="font-heading text-lg font-extrabold text-nsBlack">WhatsApp</span>
                <span className="text-sm text-nsBlack/70">Message us anytime</span>
              </motion.a>
            </Reveal>
          </div>

          {/* Mentorship note */}
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-nsBlack px-8 py-8 text-center text-nsWhite shadow-lift sm:flex-row sm:text-left">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack"><FiUsers size={26} /></span>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-extrabold text-nsYellow">Mentorship throughout your journey</h3>
                <p className="mt-1 text-sm text-nsWhite/70">
                  Guidance doesn't end when the workshop does. We support you through the entire
                  learning and project journey — from first component to final demo.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ RESOURCES ============ */}
      <section className="bg-nsWhite py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Downloads"
            title="Resources &"
            highlight="manuals"
            subtitle="Curriculum PDFs, kit manuals and guides. Files will appear here once ready."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {RESOURCES.map((res, i) => (
              <Reveal key={res.name} delay={(i % 2) * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-nsBlack/10 bg-nsGray-light px-6 py-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-nsYellow text-nsBlack"><FiDownload size={20} /></span>
                    <div>
                      <p className="font-heading font-bold text-nsBlack">{res.name}</p>
                      <p className="text-xs text-nsBlack/50">{res.meta}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-nsBlack/15 px-3 py-1 text-xs font-bold text-nsBlack/60">
                    Soon
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <a href={`mailto:${SITE.email}`} className="btn-yellow">
                Request a Resource <FiArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
