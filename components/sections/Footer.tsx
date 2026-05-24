'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const links = ['Services', 'How it works', 'About', 'Contact']

function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Bookmax"
        width={0}
        height={0}
        sizes="200px"
        className="h-6 w-auto"
        style={{ filter: 'brightness(0) invert(1)', opacity: 0.75 }}
      />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#211C17] py-8 border-t border-[#2E2720]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />

          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(' ', '-')}`}
                className="text-xs text-[#6E675F] hover:text-[#9E9890] transition-colors duration-200 tracking-wide"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
              >
                {l}
              </a>
            ))}
          </nav>

          <p
            className="text-xs text-[#6E675F]"
            style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
          >
            © 2025 Bookmax · Booking Optimisation Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
