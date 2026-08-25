import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINK } from '../lib/site'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Nano Spark on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-[7.5rem] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ delay: 0.4 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]" />
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]/60"
        animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <FaWhatsapp size={24} className="relative" />
    </motion.a>
  )
}
