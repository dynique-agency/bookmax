'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import HeroPhoto from '@/components/ui/HeroPhoto'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

const stats = [
  { number: '+40%', label: 'More bookings',     sub: 'on average' },
  { number: '72h',  label: 'Photos to live',    sub: 'guaranteed' },
  { number: '5 ★',  label: 'Client rating',     sub: 'every time' },
]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#FDFAF6]"
      style={{ paddingTop: '4rem' }}
    >
      {/* Radial gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 55% 75% at 25% 55%, #EEE7DC 0%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* Ghost "max" — desktop only */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute bottom-0 left-6 pointer-events-none select-none hidden lg:block"
        aria-hidden
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 700,
            fontSize: 'clamp(160px, 18vw, 260px)',
            color: '#E3D9CC',
            opacity: 0.35,
            lineHeight: 0.85,
            display: 'block',
          }}
        >
          max
        </span>
      </motion.div>

      {/* ─────────── DESKTOP ─────────── */}
      <div className="relative z-10 hidden lg:block max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 items-stretch min-h-[calc(100vh-4rem)]">

          {/* Left — text */}
          <div className="lg:col-span-5 flex flex-col justify-center py-24 pr-14">

            <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 mb-8">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#B8956A] shrink-0"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-[10px] tracking-[0.22em] uppercase text-[#6E675F]"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
              >
                Booking Optimisation Agency
              </span>
            </motion.div>

            <div className="mb-6">
              <motion.span
                {...fadeUp(0.15)}
                className="block font-cormorant leading-[1.05]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#7C5C3A',
                  fontSize: 'clamp(3rem, 4.5vw, 5rem)',
                }}
              >
                Your listing,
              </motion.span>
              <motion.span
                {...fadeUp(0.25)}
                className="block font-cormorant leading-[1.05]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 700,
                  color: '#16120E',
                  fontSize: 'clamp(3rem, 4.5vw, 5rem)',
                }}
              >
                at its best.
              </motion.span>
            </div>

            <motion.p
              {...fadeUp(0.35)}
              className="text-[15px] leading-[1.8] text-[#6E675F] mb-8 max-w-sm"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
            >
              Your photos are blurry. And every day, guests are clicking on someone else.
              Bookmax fixes that — completely, in 72 hours. Send your photos. We handle the rest.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex items-center gap-3 mb-12">
              <MagneticButton variant="primary">Get your free check →</MagneticButton>
              <MagneticButton variant="ghost">See services →</MagneticButton>
            </motion.div>

            {/* Stat row — desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="grid grid-cols-3 overflow-hidden"
              style={{ background: '#16120E' }}
            >
              {/* Gold top line */}
              <div className="col-span-3 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,149,106,0.55), transparent)' }} />
              {stats.map((s, i) => (
                <div
                  key={s.number}
                  className="flex flex-col items-center justify-center py-5 px-3 text-center"
                  style={{ borderLeft: i > 0 ? '1px solid #1C1814' : 'none' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.9rem, 2.6vw, 2.8rem)',
                      color: '#C9AB87',
                      lineHeight: 1,
                      marginBottom: 5,
                    }}
                  >
                    {s.number}
                  </div>
                  <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#F0EBE3]"
                    style={{ fontFamily: 'Satoshi, sans-serif', marginBottom: 2 }}>
                    {s.label}
                  </p>
                  <p className="text-[9px] tracking-wide text-[#3A3530]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — before/after slider */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-7 relative"
          >
            {/* Left-edge fade to blend with page background */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #FDFAF6, transparent)',
              }}
            />
            <HeroPhoto
              before="/hero-before-new.jpg"
              after="/hero-after-new.jpg"
              beforeAlt="Listing before Bookmax — flat daytime photo"
              afterAlt="Listing after Bookmax — professional golden-hour shot"
            />
          </motion.div>
        </div>
      </div>

      {/* ─────────── MOBILE ─────────── */}
      <div className="relative z-10 lg:hidden">

        {/* Text */}
        <div className="px-6 pt-6 pb-7">
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 mb-6">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#B8956A] shrink-0"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-[9px] tracking-[0.22em] uppercase text-[#6E675F]"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
            >
              Booking Optimisation Agency
            </span>
          </motion.div>

          <div className="mb-5">
            <motion.span
              {...fadeUp(0.12)}
              className="block font-cormorant leading-[1.05]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#7C5C3A',
                fontSize: '3rem',
              }}
            >
              Your listing,
            </motion.span>
            <motion.span
              {...fadeUp(0.2)}
              className="block font-cormorant leading-[1.05]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 700,
                color: '#16120E',
                fontSize: '3rem',
              }}
            >
              at its best.
            </motion.span>
          </div>

          <motion.p
            {...fadeUp(0.28)}
            className="text-[14px] leading-[1.75] text-[#6E675F] mb-7"
            style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
          >
            Your photos are blurry. And every day, guests are clicking on someone else.
            Bookmax fixes that — in 72 hours. Send your photos. We handle the rest.
          </motion.p>

          <motion.div {...fadeUp(0.36)} className="flex flex-col gap-2.5">
            <MagneticButton variant="primary" className="w-full justify-center py-4">
              Get your free check →
            </MagneticButton>
            <a
              href="#services"
              className="text-center text-sm text-[#9E9890] py-2 hover:text-[#6E675F] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
            >
              See services →
            </a>
          </motion.div>
        </div>

        {/* Before/after slider — full bleed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="relative overflow-hidden"
          style={{ height: '62vw', minHeight: 220, maxHeight: 340 }}
        >
          <HeroPhoto
            before="/hero-before-new.jpg"
            after="/hero-after-new.jpg"
            beforeAlt="Before Bookmax"
            afterAlt="After Bookmax"
          />
        </motion.div>

        {/* Stat strip — mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="relative bg-[#16120E]"
        >
          <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,149,106,0.55), transparent)' }} />
          <div className="grid grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.number}
                className="flex flex-col items-center justify-center py-6 px-2 text-center"
                style={{ borderLeft: i > 0 ? '1px solid #1C1814' : 'none' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 700,
                    fontSize: '2rem',
                    color: '#C9AB87',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {s.number}
                </div>
                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-[#F0EBE3] leading-tight mb-0.5"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {s.label}
                </p>
                <p className="text-[8px] tracking-wide text-[#3A3530]"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,149,106,0.2), transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
