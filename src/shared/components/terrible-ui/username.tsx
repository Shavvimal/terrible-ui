import React, { useState, useEffect, useRef } from 'react'

interface UsernameLimiterProps {
  value: string;
  onChange: (value: string) => void;
}

interface FallingChar {
  id: number
  char: string
  top: number
  left: number
  rotation: number
}

const UsernameLimiter: React.FC<UsernameLimiterProps> = ({ value, onChange }) => {
  const [fallingChars, setFallingChars] = useState<FallingChar[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const charIdRef = useRef<number>(0)

  const isOverflown = (val: string) => val.length > 10

  useEffect(() => {
    const interval = setInterval(() => {
      setFallingChars(prev => prev.map(fc => ({
        ...fc,
        top: fc.top + 5,
        rotation: fc.rotation + 5
      })))
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (isOverflown(val)) {
      const fallingChar = val.slice(-1)
      onChange(val.slice(0, -1))

      if (containerRef.current) {
        const inputRect = containerRef.current.querySelector('input')?.getBoundingClientRect()
        if (inputRect) {
          const newChar: FallingChar = {
            id: charIdRef.current++,
            char: fallingChar,
            top: 0, // Start at the top of container
            left: inputRect.right + 5, // Position just to the right of input
            rotation: 0
          }
          setFallingChars(prev => [...prev, newChar])
        }
      }
    } else {
      onChange(val)
    }
  }

  // Hidden feature: Right-clicking the input 3 times reveals preset usernames
  const [rightClickCount, setRightClickCount] = useState(0)
  const rightClickTimerRef = useRef<NodeJS.Timeout>()

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setRightClickCount(prev => prev + 1)
    
    if (rightClickTimerRef.current) {
      clearTimeout(rightClickTimerRef.current)
    }
    
    rightClickTimerRef.current = setTimeout(() => {
      setRightClickCount(0)
    }, 1000)

    if (rightClickCount === 2) {
      const select = document.createElement('select')
      select.innerHTML = `
        <option value="">Choose a pre-approved username</option>
        <option value="SuperUser123">SuperUser123</option>
        <option value="HaxorPro">HaxorPro</option>
        <option value="L33tCoder">L33tCoder</option>
      `
      select.style.position = 'absolute'
      select.style.top = '0'
      select.style.left = '0'
      select.style.zIndex = '1000'
      
      select.onchange = (e) => {
        const value = (e.target as HTMLSelectElement).value
        if (value) {
          onChange(value)
          select.remove()
        }
      }
      
      containerRef.current?.appendChild(select)
      setRightClickCount(0)
    }
  }

  return (
    <div ref={containerRef} className="relative border border-red-500 h-[200px]">
      <div className="flex w-[150px] mt-2.5 justify-center">
        <input
          id="userNameInput"
          placeholder="Username"
          value={value}
          onChange={handleChange}
          onContextMenu={handleContextMenu}
          className="rounded-[15px] w-[150px] border border-gray-300 p-2 bg-green-500"
        />
      </div>

      {fallingChars.map(fc => (
        <div
          key={fc.id}
          className="absolute text-[40px] bg-white"
          style={{
            top: fc.top,
            left: fc.left,
            transform: `rotate(${fc.rotation}deg)`
          }}
        >
          {fc.char}
        </div>
      ))}
    </div>
  )
}

export default UsernameLimiter