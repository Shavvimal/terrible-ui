// components/TerribleNameSelector.tsx
import React, { useState } from 'react'

interface TerribleNameSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TerribleNameSelector: React.FC<TerribleNameSelectorProps> = ({ value, onChange }) => {
  const [currentLetter, setCurrentLetter] = useState('a')

  const nextChar = (c: string) => String.fromCharCode(c.charCodeAt(0) + 1)
  const prevChar = (c: string) => String.fromCharCode(c.charCodeAt(0) - 1)

  const handleAddLetter = () => {
    const newValue = value + currentLetter
    onChange(newValue)
  }

  // Hidden feature: Double-clicking the clear button opens a normal input
  const handleClearDoubleClick = () => {
    const name = prompt('🤫 You found the secret name input! Enter your name:')
    if (name) {
      onChange(name)
    }
  }

  return (
    <div className="bg-white p-4 text-center border border-black relative">
      <p className="text-6xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{currentLetter}</p>
      <div className="flex justify-center gap-4">
        <button 
          type="button" 
          onClick={() => setCurrentLetter(prevChar(currentLetter))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          &lt;
        </button>
        <button 
          type="button" 
          onClick={handleAddLetter}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Add Letter
        </button>
        <button 
          type="button" 
          onClick={() => setCurrentLetter(nextChar(currentLetter))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          &gt;
        </button>
      </div>
      <div className="mt-5 bg-red-900 rounded p-4 text-white w-1/2 mx-auto">
        <p id="full-name" className="overflow-hidden text-xl text-right">{value}</p>
        <button 
          type="button" 
          onClick={() => onChange('')}
          onDoubleClick={handleClearDoubleClick}
          className="mt-2 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default TerribleNameSelector