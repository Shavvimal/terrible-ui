// components/TerribleDatePicker.tsx
import React, { useState, useEffect, useRef } from 'react'

interface TerribleDatePickerProps {
  value?: Date;
  onChange: (value: Date) => void;
}

const TerribleDatePicker: React.FC<TerribleDatePickerProps> = ({ value = new Date(), onChange }) => {
  const [advanced, setAdvanced] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [speed, setSpeed] = useState(0)
  const [intervalTime, setIntervalTime] = useState(1000)
  const [konami, setKonami] = useState<string[]>([])
  const konamiCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Hidden feature: Clicking all arrow buttons in sequence unlocks normal date picker
  const [clickSequence, setClickSequence] = useState<string[]>([])
  const sequenceTimerRef = useRef<NodeJS.Timeout>()

  const handleArrowClick = (direction: string) => {
    setClickSequence(prev => {
      const newSequence = [...prev, direction].slice(-4)
      console.log(newSequence.join(''))
      
      // Reset sequence after 2 seconds of no clicks
      if (sequenceTimerRef.current) {
        clearTimeout(sequenceTimerRef.current)
      }
      
      sequenceTimerRef.current = setTimeout(() => {
        setClickSequence([])
      }, 2000)

      // If correct sequence (left, right, left, right), show date picker
      if (newSequence.join('') === 'leftrightleftright') {
        setShowDatePicker(true)
        return []
      }
      
      return newSequence
    })
  }

  useEffect(() => {
    let intervalID: NodeJS.Timeout
    if (advanced && autoMode && speed !== 0) {
      intervalID = setInterval(() => {
        const newDate = new Date(value)
        newDate.setDate(newDate.getDate() + speed)
        onChange(newDate)
      }, intervalTime)
    }
    return () => {
      if (intervalID) clearInterval(intervalID)
    }
  }, [value, advanced, autoMode, speed, intervalTime, onChange])

  // Hidden feature: Arrow key sequence reveals normal date input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newKonami = [...prev, e.key].slice(-4)
        
        // Check if last 4 keys match the code
        if (newKonami.join(',') === konamiCode.join(',')) {
          setShowDatePicker(true)
        }
        
        return newKonami
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const updateDateDisplay = () => {
    const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const wd = weekdayNames[value.getDay()]
    const pad = (num: number, size: number) => {
      const s = "0000" + num
      return s.substr(s.length-size)
    }
    return `${wd}, ${pad(value.getDate(),2)}/${pad(value.getMonth()+1,2)}/${value.getFullYear()}`
  }

  const setDateValue = (val: number) => {
    const d = new Date(value)
    if (val === 1) {
      d.setFullYear(1,0,1)
    } else if (val === -1) {
      d.setFullYear(9999,11,31)
    }
    onChange(d)
  }

  const addDate = (val: number) => {
    const d = new Date(value)
    d.setDate(d.getDate()+val)
    onChange(d)
  }

  const autoSpeed = (factor: number) => {
    if (intervalTime <= 1) {
      setSpeed(speed * factor)
    } else {
      setIntervalTime(intervalTime/factor)
    }
  }

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    onChange(date)
    setShowDatePicker(false)
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 my-2.5">
      <div className="text-lg mb-4">{updateDateDisplay()}</div>
      
      {showDatePicker && (
        <div className="flex items-center justify-center  z-50">
          <input
            type="date"
            className="p-2 rounded"
            onChange={handleDateInputChange}
            autoFocus
          />
        </div>
      )}

      <div className="flex justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => {
            handleArrowClick('left')
            setDateValue(1)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {"<<"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleArrowClick('left')
            addDate(-1)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {"<"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleArrowClick('right')
            addDate(1)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {">"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleArrowClick('right')
            setDateValue(-1)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {">>"}
        </button>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            id="advancedMode"
            type="checkbox"
            checked={advanced}
            onChange={() => setAdvanced(!advanced)}
            className="form-checkbox"
          />
          <label htmlFor="advancedMode">Advanced Mode</label>
        </div>

        {advanced && (
          <div className="border border-gray-300 rounded p-4 space-y-4">
            <div className="flex items-center gap-2">
              <input
                id="autoMode"
                type="checkbox"
                checked={autoMode}
                onChange={() => setAutoMode(!autoMode)}
                className="form-checkbox"
              />
              <label htmlFor="autoMode">Auto Mode</label>
              <button
                type="button"
                onClick={() => autoSpeed(10)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Faster!
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span>-5 Days</span>
              <input
                id="toggleSlider"
                type="range"
                min="-5"
                max="5"
                step="1"
                value={speed}
                onChange={(e) => {
                  setSpeed(Number(e.target.value))
                }}
                className="flex-grow"
              />
              <span>+5 Days</span>
            </div>
            <div className="text-center text-sm">
              Speed: {speed === 0 ? 'Stopped' : `${Math.abs(speed)} day${Math.abs(speed) > 1 ? 's' : ''} per second ${speed < 0 ? 'backwards' : 'forwards'}`}
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Hint: The arrows have a pattern...
      </div>
    </div>
  )
}

export default TerribleDatePicker