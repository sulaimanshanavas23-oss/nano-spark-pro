import { TESTIMONIALS } from '../lib/site'

/**
 * Auto-floating rows of student & parent feedback chips.
 * Content is duplicated for a seamless infinite marquee.
 */
export default function TestimonialMarquee() {
  const row = TESTIMONIALS

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-nsWhite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-nsWhite to-transparent" />

      <div className="animate-marquee flex w-max gap-4 py-2">
        {[...row, ...row].map((t, i) => (
          <div
            key={`${t.who}-${t.role}-${i}`}
            className="flex min-w-[280px] max-w-[360px] flex-col gap-1.5 rounded-2xl border border-nsBlack/10 bg-white px-5 py-4 shadow-soft"
          >
            <p className="text-sm italic leading-snug text-nsBlack/80">"{t.text}"</p>
            <p className="text-xs font-bold text-nsBlack/60">
              {t.who} <span className="text-nsYellow">•</span> {t.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
