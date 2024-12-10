// components/Layout.tsx
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header className=" text-white text-center text-2xl">
        {/* @ts-ignore */}
        <marquee behavior="alternate" scrollamount={10}>
          <span className="text-fuchsia-500">Welcome to Bad UI</span>
        {/* @ts-ignore */}
        </marquee>
      </header>
      <main className="p-5">
        {children}
      </main>
    </div>
  )
}

export default Layout