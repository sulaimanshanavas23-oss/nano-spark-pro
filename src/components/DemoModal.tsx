import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiX, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINK } from '../lib/site'

interface DemoModalProps {
  open: boolean
  onClose: () => void
}

/**
 * Pop-up shown when the site opens: "Book a FREE Demo Session" —
 * choose Offline (contact page) or Online (WhatsApp). Skip via ✕.
 */
export default function DemoModal({ open, onClose }: DemoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-nsBlack/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="card"
            role="dialog"
            aria-modal="true"
            aria-label="Book a free demo session"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border-4 border-nsYellow bg-white p-7 shadow-lift sm:p-8"
            initial={{ scale: 0.82, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Skip"
              title="Skip"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-nsBlack text-nsWhite shadow-lift transition-colors hover:bg-nsYellow hover:text-nsBlack"
            >
              <FiX size={20} />
            </button>

            <span className="inline-flex items-center gap-2 rounded-full bg-nsYellow/20 px-3 py-1 text-[11px] font-extrabold tracking-widest text-nsBlack">
              <span className="h-2 w-2 animate-pulse rounded-full bg-nsYellow" /> FREE DEMO
            </span>

            <h2 className="mt-4 font-heading text-3xl font-extrabold text-nsBlack">
              Book a Free <span className="text-nsYellow">Demo Session</span>
            </h2>
            <p className="mt-2 text-nsBlack/70">
              Experience Nano Spark hands-on — STEM kits, robotics, IoT and more. Choose your mode:
            </p>

            <div className="mt-6 grid gap-3">
              <Link to="/contact" className="btn-yellow w-full !py-3.5">
                <FiMapPin /> Book Offline Demo
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-heading font-bold text-white shadow-soft transition-colors hover:bg-nsBlack hover:text-nsYellow"
              >
                <FaWhatsapp size={20} /> Book Online Demo
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 flex w-full items-center justify-center gap-1.5 text-sm font-bold text-nsBlack/50 transition-colors hover:text-nsBlack"
            >
              Explore the website first <FiArrowRight />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}