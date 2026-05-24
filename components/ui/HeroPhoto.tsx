'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  before: string
  after: string
  beforeAlt?: string
  afterAlt?: string
}

export default function HeroPhoto({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: Props) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* After — full bleed hero image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <Image
          src={after}
          alt={afterAlt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(22,18,14,0.15) 0%, transparent 40%, rgba(22,18,14,0.35) 100%)',
          }}
        />
      </motion.div>

      {/* After label — top right */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
        className="absolute top-6 right-6 px-2.5 py-1.5 bg-[#16120E]/55 backdrop-blur-sm z-20 pointer-events-none"
      >
        <span
          className="text-[9px] tracking-[0.22em] uppercase text-[#C9AB87]"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}
        >
          After Bookmax
        </span>
      </motion.div>

      {/* Before — floating Polaroid card */}
      <motion.div
        initial={{ opacity: 0, y: 28, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2.5 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        whileHover={{ rotate: 0, scale: 1.05, y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        className="absolute bottom-6 right-6 lg:right-auto lg:left-7 z-20 cursor-default"
        style={{
          width: 'clamp(100px, 17%, 160px)',
          transformOrigin: 'bottom center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.25)',
        }}
      >
        {/* Polaroid frame */}
        <div className="bg-white p-1.5 pb-4" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}>
          <div className="relative overflow-hidden" style={{ paddingBottom: '70%' }}>
            <Image
              src={before}
              alt={beforeAlt}
              fill
              className="object-cover object-center"
              sizes="22vw"
              style={{ filter: 'saturate(0.45) brightness(0.82)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(22,18,14,0.12)' }}
            />
          </div>
          {/* Polaroid label */}
          <p
            className="text-center mt-1"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontWeight: 400,
              fontSize: '7px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9E9890',
            }}
          >
            Before
          </p>
        </div>
      </motion.div>
    </div>
  )
}
