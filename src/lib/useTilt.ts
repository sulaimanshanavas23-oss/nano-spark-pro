import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useCallback } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

/**
 * Shared, performance-friendly 3D tilt for cards and image showcases.
 * Touch pointers are ignored so mobile stays free of expensive/awkward motion.
 */
export function useTilt(max = 8) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  })

  const glareX = useTransform(x, [0, 1], ['0%', '100%'])
  const glareY = useTransform(y, [0, 1], ['0%', '100%'])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)))
      y.set(Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)))
    },
    [reduce, x, y],
  )

  const onPointerLeave = useCallback(() => {
    x.set(0.5)
    y.set(0.5)
  }, [x, y])

  return { reduce, rotateX, rotateY, glareX, glareY, onPointerMove, onPointerLeave }
}
