'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import MagneticButton from '@/components/ui/MagneticButton'

const links = [
  { label: 'Services',     href: '#services',    num: '01' },
  { label: 'How it works', href: '#how-it-works', num: '02' },
  { label: 'About',        href: '#about',        num: '03' },
]

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Bookmax"
        width={0}
        height={0}
        sizes="280px"
        className="h-10 w-auto"
        priority
        style={inverted ? { filter: 'brightness(0) invert(1)', opacity: 0.9 } : undefined}
      />
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const headerBg   = menuOpen ? 'rgba(22,18,14,1)'    : scrolled ? 'rgba(248,244,238,0.94)' : 'rgba(253,250,246,0)'
  const borderCol  = menuOpen ? 'rgba(28,24,20,1)'    : scrolled ? 'rgba(227,217,204,1)'    : 'rgba(227,217,204,0)'
  const blur       = menuOpen ? 'blur(0px)'           : scrolled ? 'blur(20px)'             : 'blur(0px)'

  return (
    <>
      {/* ── Header bar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        animate={{ backgroundColor: headerBg, borderBottomColor: borderCol, backdropFilter: blur }}
        transition={{ duration: 0.35 }}
        style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

          <Logo inverted={menuOpen} />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-[12px] tracking-[0.08em] transition-colors duration-200 group"
                style={{
                  fontFamily: 'Satoshi, sans-serif', fontWeight: 400,
                  color: menuOpen ? '#6E675F' : '#6E675F',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#16120E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6E675F')}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B8956A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton variant="primary">Free listing check</MagneticButton>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-[7px]"
            style={{
              width: 44, height: 44,
              border: `1px solid ${menuOpen ? 'rgba(255,255,255,0.15)' : 'rgba(22,18,14,0.2)'}`,
              background: 'transparent',
              transition: 'border-color 0.3s',
              flexShrink: 0,
            }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              style={{ display: 'block', width: 18, height: 1, background: menuOpen ? '#F0EBE3' : '#16120E', transformOrigin: 'center' }}
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              style={{ display: 'block', width: 18, height: 1, background: menuOpen ? '#F0EBE3' : '#16120E', transformOrigin: 'center' }}
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>

        </div>
      </motion.header>

      {/* ── Full-screen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 100% 0 0)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-[#16120E] flex flex-col"
          >
            {/* Ambient glow */}
            <div className="absolute pointer-events-none" style={{
              top: '30%', left: '50%', transform: 'translateX(-50%)',
              width: 700, height: 500,
              background: 'radial-gradient(ellipse, rgba(184,149,106,0.07), transparent 70%)',
              filter: 'blur(60px)',
            }} />

            {/* Faint watermark logo */}
            <div className="absolute bottom-8 right-6 pointer-events-none select-none" style={{ opacity: 0.04 }}>
              <Image
                src="/logo.png" alt="" width={360} height={100}
                style={{ filter: 'brightness(0) invert(1)', width: 280, height: 'auto' }}
              />
            </div>

            {/* Gold horizontal accent line — animates in */}
            <motion.div
              className="absolute top-20 inset-x-0 h-px"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: 'linear-gradient(to right, transparent, rgba(184,149,106,0.3), transparent)' }}
            />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 pt-4 overflow-hidden">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 56 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b"
                  style={{ borderColor: '#1C1814' }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-end justify-between py-7"
                  >
                    <div className="flex items-end gap-5">
                      <span
                        className="mb-2 text-[10px] tracking-[0.22em] uppercase"
                        style={{ fontFamily: 'Satoshi, sans-serif', color: '#B8956A' }}
                      >
                        {l.num}
                      </span>
                      <span
                        className="leading-[0.9] transition-all duration-300 group-hover:translate-x-2"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontWeight: 300,
                          fontSize: 'clamp(3.2rem, 14vw, 5.5rem)',
                          color: '#F0EBE3',
                          display: 'inline-block',
                        }}
                      >
                        {l.label}
                      </span>
                    </div>
                    <motion.span
                      className="mb-3 text-[#B8956A] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      →
                    </motion.span>
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="px-8 pb-12 pt-8 flex-shrink-0 flex flex-col gap-4"
              style={{ borderTop: '1px solid #1C1814' }}
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 py-4 transition-colors duration-200 hover:bg-[#C9AB87]"
                style={{
                  background: '#B8956A', color: '#16120E',
                  fontFamily: 'Satoshi, sans-serif', fontWeight: 500,
                  fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                }}
              >
                Get your free listing check
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5h9M6 1l4 3.5L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <p className="text-center text-[10px] tracking-wide text-[#2A2520]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                © 2025 Bookmax · Booking Optimisation Agency
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
