'use client'

import React, { useState, useEffect, useRef } from 'react'

interface TerribleSubmitButtonProps {
  isSubmitting: boolean;
}

const TerribleSubmitButton: React.FC<TerribleSubmitButtonProps> = ({ isSubmitting }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [isLocked, setIsLocked] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only run animations if not locked
    if (!isLocked) {
      const animationInterval = setInterval(() => {
        setRotation(Math.random() * 720 - 360)
        setScale(0.5 + Math.random() * 1.5)
        setIsVisible(Math.random() > 0.1)
      }, 1000)

      return () => clearInterval(animationInterval)
    }
  }, [isLocked])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt key (Option on Mac) or Windows key
      if (e.altKey || e.metaKey) {
        setIsLocked(true)
        setPosition({ x: 150, y: 20 }) // Center position
        setRotation(0)
        setScale(1)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey && !e.metaKey) {
        setIsLocked(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSubmitting || isLocked || !buttonRef.current || !containerRef.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    
    // Calculate mouse position relative to container
    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top
    
    // Calculate button center
    const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2
    
    // Calculate distance between mouse and button center
    const dx = mouseX - buttonCenterX
    const dy = mouseY - buttonCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // If mouse is close to button, move button away more aggressively
    if (distance < 200 && !isSubmitting) {
      // Calculate escape direction with some randomness
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5)
      const escapeDistance = (200 - distance) * 2 // More aggressive movement
      
      // Calculate new position with some random jitter
      let newX = buttonCenterX - Math.cos(angle) * escapeDistance + (Math.random() - 0.5) * 50
      let newY = buttonCenterY - Math.sin(angle) * escapeDistance + (Math.random() - 0.5) * 50
      
      // Keep button within container bounds
      const padding = 20
      newX = Math.max(padding, Math.min(containerRect.width - buttonRect.width - padding, newX))
      newY = Math.max(padding, Math.min(containerRect.height - buttonRect.height - padding, newY))
      
      setPosition({ x: newX - buttonRect.width / 2, y: newY - buttonRect.height / 2 })
      
      // Random rotation on movement
      setRotation(Math.random() * 720 - 360)
      setScale(0.5 + Math.random() * 1.5)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-40 w-full"
      onMouseMove={handleMouseMove}
    >
      <button
        ref={buttonRef}
        type="submit"
        disabled={isSubmitting}
        className={`absolute px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isLocked ? 'animate-pulse' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          cursor: isSubmitting ? 'wait' : 'pointer',
          transition: 'transform 0.3s ease-out, opacity 0.2s ease-in-out',
        }}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="animate-spin">🔄</span>
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="animate-bounce">🎯</span>
            Submit
          </div>
        )}
      </button>
    </div>
  )
}

export default TerribleSubmitButton 