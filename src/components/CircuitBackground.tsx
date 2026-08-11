import { motion } from 'framer-motion'

interface CircuitBackgroundProps {
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Decorative animated circuit-board traces (thin lines with solder nodes).
 * Softly pulses/glows. Rendered absolutely behind content; pointer-events none.
 */
export default function CircuitBackground({
  variant = 'light',
  className = '',
}: CircuitBackgroundProps) {
  const strokes = variant === 'dark' ? 'rgba(255,193,7,0.35)' : 'rgba(17,17,17,0.12)'
  const nodes = variant === 'dark' ? 'rgba(255,193,7,0.5)' : 'rgba(17,17,17,0.22)'

  const traces = [
    'M -20 90 L 80 90 L 120 130 L 220 130',
    'M 320 30 L 320 110 L 260 170 L 260 260',
    'M 40 320 L 120 320 L 180 260 L 300 260',
    'M 360 360 L 360 260 L 300 200 L 340 150',
  ]

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {traces.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={strokes}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{ filter: `drop-shadow(0 0 3px ${strokes})` }}
          />
        ))}
        {/* solder nodes */}
        <circle cx="80" cy="90" r="3" fill={nodes} />
        <circle cx="120" cy="130" r="3" fill={nodes} />
        <circle cx="220" cy="130" r="3" fill={nodes} />
        <circle cx="320" cy="30" r="3" fill={nodes} />
        <circle cx="260" cy="170" r="3" fill={nodes} />
        <circle cx="260" cy="260" r="3" fill={nodes} />
        <circle cx="120" cy="320" r="3" fill={nodes} />
        <circle cx="180" cy="260" r="3" fill={nodes} />
        <circle cx="300" cy="260" r="3" fill={nodes} />
        <circle cx="360" cy="360" r="3" fill={nodes} />
        <circle cx="300" cy="200" r="3" fill={nodes} />
      </svg>
    </motion.div>
  )
}
