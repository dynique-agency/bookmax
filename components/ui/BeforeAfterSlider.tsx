'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface Props {
  before: string
  after: string
  beforeAlt?: string
  afterAlt?: string
  defaultPosition?: number
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
  defaultPosition = 38,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [interacted, setInteracted] = useState(false)

  // Use motion value + spring for smooth divider movement
  const rawPos = useMotionValue(defaultPosition)
  const pos = useSpring(rawPos, { stiffness: 300, damping: 38, mass: 0.6 })

  // Derive CSS clip-path from spring value (Framer will interpolate)
  // We read the latest value to update the before panel directly
  const [displayPos, setDisplayPos] = useState(defaultPosition)

  useEffect(() => {
    return pos.on('change', (v) => setDisplayPos(v))
  }, [pos])

  const setPosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2))
    rawPos.set((x / rect.width) * 100)
  }, [rawPos])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setDragging(true)
    setInteracted(true)
    setPosition(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) setPosition(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  // Entrance hint — nudges the divider once so users understand it's draggable
  useEffect(() => {
    const t1 = setTimeout(() => {
      if (!interacted) {
        rawPos.set(58)
        const t2 = setTimeout(() => rawPos.set(defaultPosition), 700)
        return () => clearTimeout(t2)
      }
    }, 1200)
    return () => clearTimeout(t1)
  }, [interacted, defaultPosition, rawPos])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none touch-none"
      style={{ cursor: dragging ? 'ew-resize' : 'col-resize' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER — full base */}
      <div className="absolute inset-0">
        <Image src={after} alt={afterAlt} fill className="object-cover object-center" sizes="(min-width:1024px) 55vw, 100vw" priority />
      </div>

      {/* BEFORE — clips from the right using clip-path */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - displayPos}% 0 0)` }}
      >
        <Image src={before} alt={beforeAlt} fill className="object-cover object-center" sizes="(min-width:1024px) 55vw, 100vw" priority />
        {/* Intentional muting overlay — makes before look worse, after look better */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(22,18,14,0.22)', filter: 'saturate(0.45) brightness(0.85)' }}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
        style={{ left: `${displayPos}%`, background: 'rgba(255,255,255,0.75)', boxShadow: '0 0 16px rgba(0,0,0,0.3)' }}
      />

      {/* Handle — centered on divider */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ left: `${displayPos}%` }}
      >
        <motion.div
          animate={{ scale: dragging ? 1.12 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E3D9CC]"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.22)' }}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M1 5h16M5 1L1 5l4 4M13 1l4 4-4 4" stroke="#7C5C3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* BEFORE label */}
      <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#16120E]/70 backdrop-blur-sm pointer-events-none"
        style={{ opacity: displayPos > 10 ? 1 : 0, transition: 'opacity 0.2s' }}>
        <span className="text-[9px] tracking-[0.18em] uppercase text-[#9E9890]"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
          Before
        </span>
      </div>

      {/* AFTER label */}
      <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-[#16120E]/70 backdrop-blur-sm pointer-events-none"
        style={{ opacity: displayPos < 90 ? 1 : 0, transition: 'opacity 0.2s' }}>
        <span className="text-[9px] tracking-[0.18em] uppercase text-[#C9AB87]"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
          After Bookmax
        </span>
      </div>

      {/* Drag hint — disappears after first interaction */}
      <motion.div
        className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none"
        animate={{ opacity: interacted ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <span
          className="text-[10px] tracking-widest uppercase text-white/55 bg-[#16120E]/35 backdrop-blur-sm px-3 py-1.5"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          ← drag →
        </span>
      </motion.div>
    </div>
  )
}
