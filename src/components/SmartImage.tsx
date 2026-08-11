import { useState, ReactNode } from 'react'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  fallback?: ReactNode
}

/**
 * Renders an image from the slot path. If the image file is not yet
 * available (still waiting for Nano Spark to drop it into public/images/),
 * a styled placeholder with the label is shown instead — so the layout
 * never breaks. Swap the real photo in and it appears automatically.
 */
export default function SmartImage({ src, alt, className = '', fallback }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    if (fallback) return <>{fallback}</>
    return (
      <div
        role="img"
        aria-label={alt}
        className={`circuit-bg-light flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-nsYellow/60 bg-nsGray-light p-6 ${className}`}
      >
        <div className="text-center">
          <span className="font-heading text-sm font-bold text-nsBlack/50">{alt}</span>
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-nsYellow/70" />
          <span className="mt-1 block text-[10px] font-semibold text-nsBlack/40">
            drop photo here
          </span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
