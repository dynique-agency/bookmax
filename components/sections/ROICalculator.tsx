'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

// Each package has its own realistic occupancy-uplift multiplier
interface PkgOption {
  key: string
  name: string
  price: number
  lift: number
  liftLabel: string
}

const pkgOptions: PkgOption[] = [
  { key: 'quick',    name: 'Quick Boost',     price: 297, lift: 0.20, liftLabel: '+20%' },
  { key: 'complete', name: 'Complete Refresh', price: 597, lift: 0.38, liftLabel: '+38%' },
  { key: 'launch',   name: 'Launch Package',  price: 797, lift: 0.55, liftLabel: '+55%' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (v: number) => `€ ${Math.max(0, Math.round(v)).toLocaleString('de-DE')}`

function LiveNumber({ mv }: { mv: MotionValue<string> }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => mv.on('change', (v: string) => { if (ref.current) ref.current.textContent = v }), [mv])
  return <span ref={ref}>{mv.get()}</span>
}

function useSpringDisplay(value: number) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 180, damping: 28 })
  const display = useTransform(spring, (v: number) => fmt(v))
  useEffect(() => { mv.set(value) }, [value, mv])
  return display
}

// ─── Drag input ───────────────────────────────────────────────────────────────

function DragInput({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number
  step: number; format: (v: number) => string; onChange: (v: number) => void
}) {
  const [active, setActive] = useState(false)
  const dragging = useRef(false)
  const startY = useRef(0)
  const startVal = useRef(value)
  const sensitivity = (max - min) / 180
  const pct = ((value - min) / (max - min)) * 100

  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step))

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    startY.current = e.clientY; startVal.current = value
    dragging.current = true; setActive(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    onChange(clamp(startVal.current + (startY.current - e.clientY) * sensitivity))
  }
  const onPointerUp = () => { dragging.current = false; setActive(false) }

  return (
    <div
      className="group relative py-8 select-none"
      style={{ cursor: 'ns-resize', touchAction: 'none' }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
    >
      {/* Active hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'radial-gradient(ellipse 120% 100% at 0% 50%, rgba(184,149,106,0.08), transparent)' }}
      />

      <div className="flex items-center justify-between gap-4">
        {/* Label + value */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-3 transition-colors duration-150"
            style={{ fontFamily: 'Satoshi, sans-serif', color: active ? '#9E9890' : '#3A3530' }}>
            {label}
          </p>
          <div style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 700,
            fontSize: 'clamp(2.8rem, 6vw, 3.6rem)', lineHeight: 1,
            color: active ? '#C9AB87' : '#F0EBE3', transition: 'color 0.15s',
          }}>
            {format(value)}
          </div>
        </div>

        {/* Progress bar + arrows */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex flex-col gap-1" style={{ opacity: active ? 0.7 : 0.25, transition: 'opacity 0.2s' }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 5l4-4 4 4" stroke="#C9AB87" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#C9AB87" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-20 h-px" style={{ background: '#1C1814' }}>
            <div className="h-full transition-all duration-75" style={{ width: `${pct}%`, background: '#B8956A' }} />
          </div>
          <p className="text-[9px] tracking-wide" style={{
            fontFamily: 'Satoshi, sans-serif',
            color: active ? '#6E675F' : '#2A2520',
            transition: 'color 0.2s',
          }}>drag</p>
        </div>
      </div>
    </div>
  )
}

// ─── Revenue phone ─────────────────────────────────────────────────────────────

function RevenuePhone({ currentMonthly, newMonthly, annDisplay, pkg, breakEvenBookings }: {
  currentMonthly: number; newMonthly: number
  annDisplay: MotionValue<string>; pkg: PkgOption; breakEvenBookings: number
}) {
  const curDisplay = useSpringDisplay(currentMonthly)
  const newDisplay = useSpringDisplay(newMonthly)

  const barMax = Math.max(newMonthly, 1)
  const beforePct = Math.round((currentMonthly / barMax) * 100)

  return (
    <div className="relative mx-auto" style={{ width: 'min(360px, 96vw)' }}>

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        inset: '-60px', zIndex: -1,
        background: 'radial-gradient(ellipse 65% 50% at 50% 60%, rgba(184,149,106,0.18), transparent)',
        filter: 'blur(24px)',
      }} />

      {/* Phone shell */}
      <div style={{
        background: '#0D0A08', borderRadius: 54,
        padding: '0 8px 8px',
        boxShadow: '0 64px 96px rgba(0,0,0,0.6), 0 20px 36px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Dynamic island */}
        <div className="flex justify-center pt-3.5 pb-3">
          <div style={{ width: 110, height: 30, background: '#000', borderRadius: 15 }} />
        </div>

        {/* Screen */}
        <div style={{ background: '#16120E', borderRadius: 44, overflow: 'hidden' }}>

          {/* App header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: '#B8956A' }}>
                <span className="text-[11px] font-bold text-[#16120E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>B</span>
              </div>
              <span className="text-[12px] tracking-[0.12em] uppercase text-[#6E675F]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}>Revenue</span>
            </div>
            <span className="text-[11px] text-[#3A3530]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Projection
            </span>
          </div>

          {/* Revenue comparison */}
          <div className="px-6 pt-6">

            {/* Now */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#3A3530]"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}>Now</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: '1.15rem', color: '#3A3530' }}>
                  <LiveNumber mv={curDisplay} />
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#1C1814' }}>
                <motion.div className="h-full rounded-full" style={{ background: '#2A2118' }}
                  animate={{ width: `${beforePct}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>

            {/* After Bookmax */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: '#B8956A' }}
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  />
                  <span className="text-[10px] tracking-[0.14em] uppercase text-[#B8956A]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}>After Bookmax</span>
                  {/* Lift badge — changes with package */}
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                    style={{ background: 'rgba(184,149,106,0.15)', color: '#C9AB87', fontFamily: 'Satoshi, sans-serif' }}>
                    {pkg.liftLabel}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '1.25rem', color: '#C9AB87' }}>
                  <LiveNumber mv={newDisplay} />
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#1C1814' }}>
                <motion.div className="h-full rounded-full" style={{ background: '#B8956A' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px" style={{ background: '#1C1814' }} />

          {/* Annual hero */}
          <div className="px-6 pt-5 pb-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A4540] mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}>Extra per year</p>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '2.6rem', color: '#C9AB87', lineHeight: 1 }}>
              +<LiveNumber mv={annDisplay} />
            </div>
          </div>

          {/* Package recovery card */}
          <div className="mx-5 mb-6 mt-3 px-4 py-3.5 rounded-2xl flex items-center justify-between gap-3"
            style={{ background: '#1C1814' }}>
            <div>
              <p className="text-[10px] tracking-[0.12em] uppercase text-[#4A4540] mb-1"
                style={{ fontFamily: 'Satoshi, sans-serif' }}>{pkg.name}</p>
              <p className="text-[12px] text-[#9E9890]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                Covered in {breakEvenBookings} booking{breakEvenBookings !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)' }}>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                <path d="M1.5 4.5L4 7L8.5 1.5" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div style={{ width: 96, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function ROICalculator() {
  const [rate, setRate]           = useState(120)
  const [rooms, setRooms]         = useState(4)
  const [occupancy, setOccupancy] = useState(52)
  const [pkgKey, setPkgKey]       = useState('quick')

  // Always resolve from the source array — immune to stale state
  const pkg              = pkgOptions.find(o => o.key === pkgKey) ?? pkgOptions[0]
  const currentMonthly   = Math.round(rooms * rate * (occupancy / 100) * 30)
  const newOcc           = Math.min(occupancy * (1 + pkg.lift), 92)
  const newMonthly       = Math.round(rooms * rate * (newOcc / 100) * 30)
  const monthlyIncrease  = Math.max(0, newMonthly - currentMonthly)
  const annualIncrease   = monthlyIncrease * 12
  const breakEvenBookings = rate > 0 ? Math.ceil(pkg.price / (rate * 0.85)) : 1

  const annMV      = useMotionValue(annualIncrease)
  const annSpring  = useSpring(annMV, { stiffness: 160, damping: 26 })
  const annDisplay = useTransform(annSpring, (v: number) => fmt(v))
  useEffect(() => { annMV.set(annualIncrease) }, [annualIncrease, annMV])

  return (
    <section id="roi" className="bg-[#16120E] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.26em] uppercase text-[#4A4540] mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Return on investment
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                className="block leading-[1.05]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', color: '#F0EBE3' }}>
                What does it actually
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="block leading-[1.05]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic', color: '#B8956A', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
                earn you?
              </motion.span>
            </div>

            {/* Package selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              className="flex flex-wrap gap-2">
              {pkgOptions.map(opt => {
                const active = pkgKey === opt.key
                return (
                  <button key={opt.key} onClick={() => setPkgKey(opt.key)}
                    className="px-5 py-3 text-[11px] tracking-wide transition-all duration-200"
                    style={{
                      fontFamily: 'Satoshi, sans-serif', fontWeight: active ? 500 : 300,
                      background: active ? '#B8956A' : 'transparent',
                      color: active ? '#16120E' : '#6E675F',
                      border: active ? '1px solid transparent' : '1px solid #2C2520',
                    }}>
                    {opt.name} · €{opt.price}
                  </button>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Inputs — desktop-left / mobile-bottom */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-2 lg:order-1">

            <p className="text-[13px] leading-[1.9] text-[#4A4540] mb-10 max-w-sm"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
              Based on our average results. Drag any number up or down to match your property — the phone updates live.
            </p>

            <div className="divide-y divide-[#2A2118]">
              <DragInput label="Nightly rate" value={rate} min={30} max={600} step={5}
                format={v => `€ ${v}`} onChange={setRate} />
              <DragInput label="Rooms / units" value={rooms} min={1} max={20} step={1}
                format={v => `${v}`} onChange={setRooms} />
              <DragInput label="Occupancy rate" value={occupancy} min={10} max={85} step={1}
                format={v => `${v}%`} onChange={setOccupancy} />
            </div>

            <div className="mt-10 pt-8 border-t border-[#2A2118]">
              <a href="#services"
                className="inline-flex items-center gap-3 px-8 py-4 transition-colors duration-200 hover:bg-[#C9AB87] w-full sm:w-auto justify-center sm:justify-start"
                style={{
                  background: '#B8956A', color: '#16120E',
                  fontFamily: 'Satoshi, sans-serif', fontWeight: 500,
                  fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
                }}>
                Get started with {pkg.name}
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5h9M6 1l4 3.5L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Phone — desktop-right / mobile-top */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <RevenuePhone
              currentMonthly={currentMonthly}
              newMonthly={newMonthly}
              annDisplay={annDisplay}
              pkg={pkg}
              breakEvenBookings={breakEvenBookings}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
