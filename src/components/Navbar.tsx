import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { NAV_LINKS, SITE } from '../lib/site'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex items-center whitespace-nowrap px-2.5 py-1.5 font-heading text-[14px] font-extrabold tracking-tight transition-colors sm:text-[15px] xl:text-[16px] 2xl:text-[17px] ${
    isActive ? 'text-nsBlack' : 'text-nsBlack/65 hover:text-nsBlack'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-nsWhite/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-soft' : 'shadow-[0_1px_0_0_rgba(17,17,17,0.06)]'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8 lg:py-5 xl:px-10">
          {/* Logo — top left: Nano Spark logo image + wordmark (no box) */}
          <Link
            to="/"
            aria-label={`${SITE.name} — home`}
            className="flex shrink-0 items-center gap-3 pl-1 leading-tight"
          >
            <motion.img
              src={SITE.logo}
              alt={SITE.name}
              draggable={false}
              whileHover={{ scale: 1.06, rotate: -2 }}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <span className="flex flex-col">
              <motion.span
                whileHover={{ scale: 1.03 }}
                className="font-heading text-3xl font-extrabold text-nsBlack sm:text-[2rem]"
              >
                Nano Spark<span className="text-nsYellow">.</span>
              </motion.span>
              <span className="mt-0.5 hidden text-[10px] font-bold tracking-[0.22em] text-nsBlack/60 xl:block">
                TECHNOLOGY · INNOVATIONS · SOLUTIONS
              </span>
            </span>
          </Link>

          {/* Desktop centered links — never clips the first (Home) tab:
          centered when there is room, scrolls from the left when narrow */}
          <div className="hidden min-w-0 flex-1 xl:block">
            <div
              className="mx-auto flex w-max max-w-full items-center gap-1 overflow-x-auto px-1"
              style={{ scrollbarWidth: 'none' }}
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-2.5 right-2.5 h-1 rounded-full bg-nsYellow"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile hamburger with toggle animation */}
          <motion.button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-nsBlack/15 bg-nsWhite text-nsBlack shadow-soft xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex"
              >
                {open ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-nsBlack/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute inset-y-0 right-0 flex w-[78%] max-w-sm flex-col bg-nsWhite shadow-lift"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between border-b border-nsBlack/10 px-6 py-4">
                <span className="font-heading text-xl font-extrabold text-nsBlack">
                  {SITE.name}
                  <span className="text-nsYellow">.</span>
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-nsBlack text-nsWhite"
                >
                  <FiX size={18} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 font-heading font-bold ${
                          isActive ? 'bg-nsYellow text-nsBlack' : 'text-nsBlack hover:bg-nsGray-light'
                        }`
                      }
                    >
                      {link.label}
                      <span className="text-xs text-nsYellow">&#9654;</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
