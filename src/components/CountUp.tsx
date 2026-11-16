import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  decimals?: number
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (reduce) {
      setDisplay(to)
      return
    }

    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(value),
    })

    return () => controls.stop()
  }, [inView, to, duration, reduce])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
