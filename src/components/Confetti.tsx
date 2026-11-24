import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FFC107', '#F7B500', '#FFD54F', '#111111', '#22C55E', '#FFFFFF']

export default function Confetti({
  count = 80,
  duration = 3800,
  onDone,
}: {
  count?: number
  duration?: number
  onDone?: () => void
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        fall: 2.2 + Math.random() * 1.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 6 + Math.random() * 8,
        height: 10 + Math.random() * 10,
        rotate: Math.random() * 360,
        drift: -80 + Math.random() * 160,
        round: Math.random() > 0.7,
      })),
    [count],
  )

  useEffect(() => {
    if (!onDone) return
    const timer = window.setTimeout(onDone, duration)
    return () => window.clearTimeout(timer)
  }, [duration, onDone])

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-[-24px] block"
          style={{
            left: `${piece.x}%`,
            width: piece.width,
            height: piece.height,
            background: piece.color,
            borderRadius: piece.round ? '9999px' : '2px',
          }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: '112vh',
            x: piece.drift,
            rotate: piece.rotate + 540,
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: piece.fall, delay: piece.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
