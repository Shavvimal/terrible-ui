'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SignUpForm from '@/components/terrible-ui/sign-up-form'

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
      <header className="bg-yellow-300 p-4 text-center relative">
        <h1 className="text-6xl font-bold text-blue-700 animate-pulse" style={{ fontFamily: 'Comic Sans MS, cursive' }} >
          The Worst Sign Up Form Ever!
        </h1>
        <div className="text-2xl text-red-600 mt-2 animate-bounce">
          🎉 Good luck completing this form! 🎉
        </div>
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none" 
          style={{
            backgroundImage: "url('/under-construction.gif')",
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />
      </header>

      <nav className="bg-green-400 p-4 flex justify-center space-x-4 overflow-x-auto whitespace-nowrap">
        {['Home', 'About', 'Contact', 'Gallery', 'Shop', 'Blog', 'FAQ', 'Terms', 'Privacy'].map((item, index) => (
          <Link 
            key={index} 
            href="#" 
            className="text-white font-bold py-2 px-4 rounded-full transform hover:scale-110 transition-transform"
            style={{ 
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            }}
          >
            {item}
          </Link>
        ))}
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <div className="max-w-4xl mx-auto text-black">
          <SignUpForm />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center mt-8">
        <p>© 2024 Bad UI. All wrongs reserved.</p>
        <small className="block mt-2 text-yellow-400 animate-bounce">
          Tired of this madness? Let our Automated Assistant do the clicking for you!
        </small>
      </footer>

      <div 
        className="fixed pointer-events-none" 
        style={{ 
          left: cursorPosition.x, 
          top: cursorPosition.y, 
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      >
        <img src="/cursor.gif" alt="Custom cursor" width="32" height="32" />
      </div>
    </div>
  )
}

