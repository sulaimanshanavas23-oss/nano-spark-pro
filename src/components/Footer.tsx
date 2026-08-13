import { Link } from 'react-router-dom'
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiFacebook,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { NAV_LINKS, SITE } from '../lib/site'

const ICONS: Record<string, IconType> = {
  email: FiMail,
  phone: FiPhone,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  youtube: FiYoutube,
  facebook: FiFacebook,
}

const PROGRAM_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'STEM Kits', to: '/products' },
  { label: 'School STEM Labs', to: '/services' },
  { label: 'Robotics Workshops', to: '/workshops' },
  { label: 'Book a Session', to: '/book' },
  { label: 'Community', to: '/community' },
  { label: 'Ambassador Program', to: '/ambassador' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Careers & Internships', to: '/careers' },
  { label: 'Feedback', to: '/feedback' },
  { label: 'Support & FAQ', to: '/support' },
]

export default function Footer() {
  return (
    <footer className="bg-nsBlack text-nsWhite">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nsWhite p-1.5">
                <img src={SITE.logo} alt={SITE.name} className="h-full w-full object-contain" />
              </span>
              <span className="font-heading text-2xl font-extrabold">
                Nano Spark<span className="text-nsYellow">.</span>
              </span>
            </div>
            <p className="text-xs font-bold tracking-[0.22em] text-nsYellow">
              {SITE.tagline}
            </p>
            <p className="text-sm leading-relaxed text-nsWhite/70">
              Practical technology education for students, schools, and aspiring innovators —
              STEM, robotics, electronics, embedded systems, IoT and emerging tech.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                MSME Registered
              </span>
              <span className="rounded-full border border-nsYellow/40 bg-nsYellow/10 px-3 py-1 text-[11px] font-bold text-nsYellow">
                StartupTN Recognized
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-nsYellow">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-nsWhite/75 transition-colors hover:text-nsYellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-nsYellow">Our Programs</h3>
            <ul className="space-y-2.5">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-nsWhite/75 transition-colors hover:text-nsYellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-nsYellow">Get in Touch</h3>
            <ul className="space-y-2.5 text-sm text-nsWhite/75">
              <li className="flex items-center gap-2">
                <FiMail className="text-nsYellow" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-nsYellow">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-nsYellow" />
                <a href={SITE.socials[5].href} className="transition-colors hover:text-nsYellow">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="text-nsWhite/60">{SITE.founder.name}, {SITE.founder.role} — {SITE.founder.location}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SITE.socials.map((social) => {
                const Icon = ICONS[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-nsWhite/20 text-nsWhite/80 transition-all hover:border-nsYellow hover:bg-nsYellow hover:text-nsBlack"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-nsWhite/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs text-nsWhite/55 sm:flex-row sm:px-8 sm:text-left">
          <p>© 2026 Nano Spark. Building the future, one innovation at a time.</p>
          <p className="tracking-[0.2em] text-nsYellow/80 font-bold">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
