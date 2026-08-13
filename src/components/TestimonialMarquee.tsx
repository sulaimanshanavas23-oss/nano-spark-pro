import { TESTIMONIALS } from '../lib/site'

/**
 * Auto-floating rows of student, teacher & parent feedback chips.
 * Content is duplicated for a seamless infinite marquee.
 */

const TAG_STYLES: Record<string, string> = {
  TEACHER: 'bg-nsYellow text-nsBlack',
  STUDENT: 'bg-nsBlack text-nsYellow',
  PARENT: 'bg-nsBlack/10 text-nsBlack',
}

function tagFor(role: string): { tag: string | null; rest: string } {
  const [first, ...restParts] = role.split(' · ')
  const upper = first.toUpperCase()
  if (upper === 'TEACHER' || upper === 'STUDENT' || upper === 'PARENT') {
    return { tag: upper, rest: restParts.join(' · ') }
  }
  return { tag: null, rest: role }
}

export default function TestimonialMarquee() {
  const row = TESTIMONIALS

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-nsWhite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-nsWhite to-transparent" />

      <div className="animate-marquee flex w-max gap-4 py-2">
        {[...row, ...row].map((t, i) => {
          const { tag, rest } = tagFor(t.role)
          return (
            <div
              key={`${t.who}-${t.role}-${i}`}
              className="flex min-w-[280px] max-w-[360px] flex-col gap-2 rounded-2xl border border-nsBlack/10 bg-white px-5 py-4 shadow-soft"
            >
              <p className="text-sm italic leading-snug text-nsBlack/80">"{t.text}"</p>
              <div className="flex flex-wrap items-center gap-2 border-t border-nsBlack/10 pt-3">
                <span className="font-heading text-[15px] font-extrabold text-nsBlack">
                  {t.who}
                </span>
                {tag && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-[0.12em] ${TAG_STYLES[tag]}`}
                  >
                    {tag}
                  </span>
                )}
              </div>
              {rest && (
                <p className="-mt-1 text-xs font-semibold text-nsBlack/55">{rest}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}