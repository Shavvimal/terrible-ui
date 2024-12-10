'use client'

import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 3000 }) => {
  useEffect(() => {
    const end = Date.now() + duration

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']

    ;(function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  }, [duration])

  return null
}

export default Confetti 