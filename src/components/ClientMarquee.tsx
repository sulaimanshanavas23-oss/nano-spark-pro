import { CLIENT_LOGO, CLIENT_NAMES } from '../lib/site'

/**
 * Auto-floating chips of client names + logos, in the same style as the
 * feedback marquee. Content is duplicated for a seamless infinite scroll.
 */
export default function ClientMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-nsWhite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-nsWhite to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-4 py-2">
        {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-nsBlack/10 bg-white px-5 py-3 shadow-soft"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-nsGray-light">
              <img
                src={CLIENT_LOGO}
                alt={`${name} logo`}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-lg font-extrabold leading-tight text-nsBlack">{name}</p>
              <p className="text-[10px] font-bold tracking-[0.14em] text-nsYellow">CLIENT</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}