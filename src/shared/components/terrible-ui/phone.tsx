// components/TerriblePhone.tsx
import React, { useEffect, useRef, useState } from 'react'

interface TerriblePhoneProps {
  value: string;
  onChange: (value: string) => void;
}

const TerriblePhone: React.FC<TerriblePhoneProps> = ({ value, onChange }) => {
  const [angle, setAngle] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(0)
  const [advanced, setAdvanced] = useState<boolean>(false)
  const [isFaster, setIsFaster] = useState<boolean>(true)
  const friction = 0.99
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Hidden feature: Clicking the "Advanced Mode" label 5 times quickly reveals a normal input
  const [clickCount, setClickCount] = useState(0)
  const clickTimerRef = useRef<NodeJS.Timeout>()

  const phoneNumberToDisplay = (val: string) => {
    const s = val.padStart(10, '0')
    return `07${s.substring(0,3)} ${s.substring(3,6)} ${s.substring(6,10)}`
  }

  useEffect(() => {
    if (advanced) {
      intervalRef.current = setInterval(() => {
        const rad = (angle * Math.PI) / 180
        let newSpeed = speed
        if (isFaster) {
          newSpeed += Math.sin(rad) * 1000
          newSpeed *= friction
        }
        let newVal = parseInt(value || '7555555555') + Math.round(newSpeed)

        if (newVal > 9999999999) {
          newVal = 9999999999
          newSpeed *= -1
        } else if (newVal < 1000000000) {
          newVal = 1000000000
          newSpeed *= -1
        }

        onChange(newVal.toString())
        setSpeed(newSpeed)
      }, 10)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [advanced, angle, speed, value, friction, onChange, isFaster])

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1)
    
    // Reset click count after 1 second of no clicks
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
    }
    
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0)
    }, 1000)

    // After 5 quick clicks, show normal input
    if (clickCount === 4) {
      const phone = prompt('🎯 You found the secret phone input!')
      if (phone) {
        onChange(phone)
      }
      setClickCount(0)
    }
  }

  return (
    <div className="bg-gray-100 rounded p-4 my-2.5 transform" style={{ transform: `rotate(${angle}deg)` }}>
      <h3 className="text-lg font-medium mb-2">Dodgy Phone Selector</h3>
      <div className="mb-4">Mobile: <span className="font-mono">{phoneNumberToDisplay(value || '7555555555')}</span></div>
      <input
        type="range"
        min={1000000000}
        max={9999999999}
        value={value || '7555555555'}
        onChange={(e) => { 
          onChange(e.target.value)
          setSpeed(0)
        }}
        className="w-full mb-4"
      />
      <hr className="my-4" />
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            id="advancedMode"
            type="checkbox"
            checked={advanced}
            onChange={() => {
              setAdvanced(!advanced);
              setIsFaster(true);
            }}
            className="mr-2"
            />
          <label 
            htmlFor="advancedMode" 
            onClick={handleSecretClick}
            className="cursor-pointer select-none"
          >
            Advanced Mode
          </label>
        </div>
        {advanced && (
          <>
            <input
              type="range"
              min={-10}
              max={10}
              step={0.02}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-32"
            />
            <button
              type="button"
              onClick={() => setIsFaster(!isFaster)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              {isFaster ? 'Slower!' : 'Faster!'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TerriblePhone
