'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const afterNotifs = [
  { time: 'just now',  name: 'Sophie M.',  detail: '2 nights · Jun 3–5',   amount: '+€ 180' },
  { time: '4m ago',   name: 'Marco R.',   detail: '4 nights · Jun 8–12',  amount: '+€ 420' },
  { time: '17m ago',  name: 'Anna K.',    detail: '3 nights · Jun 14–17', amount: '+€ 260' },
  { time: '1h ago',   name: 'James T.',   detail: '5 nights · Jun 20–25', amount: '+€ 550' },
  { time: '2h ago',   name: 'Claire B.',  detail: '2 nights · Jun 28–30', amount: '+€ 190' },
]

function DynamicIsland() {
  return (
    <div className="flex justify-center pt-3 pb-2">
      <div
        style={{
          width: 88,
          height: 24,
          background: '#000',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
    </div>
  )
}

function HomeBar() {
  return (
    <div className="flex justify-center pt-3 pb-2">
      <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.22)', borderRadius: 2 }} />
    </div>
  )
}

function LockTime({ label }: { label: string }) {
  return (
    <div className="text-center pt-4 pb-5 px-4">
      <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {label}
      </p>
      <p className="text-white font-light" style={{ fontSize: 42, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: 'Satoshi, sans-serif' }}>
        11:24
      </p>
      <p className="text-white/40 text-[11px] mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        Saturday, 24 May
      </p>
    </div>
  )
}

function Notif({
  name, detail, amount, time, delay, dim = false,
}: {
  name: string; detail: string; amount: string; time: string; delay: number; dim?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      whileInView={{ opacity: dim ? 0.35 : 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="mx-2.5 mb-2 rounded-2xl px-3 py-2.5"
      style={{
        background: dim ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.11)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon */}
        <div
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
          style={{
            background: dim ? '#333' : '#003B95',
            fontSize: '9px',
            fontWeight: 700,
            color: dim ? '#666' : '#fff',
            fontFamily: 'Satoshi, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          B.
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span
              className="text-[10px] font-medium truncate"
              style={{ fontFamily: 'Satoshi, sans-serif', color: dim ? 'rgba(255,255,255,0.3)' : '#fff' }}
            >
              New booking
            </span>
            <span
              className="text-[9px] shrink-0"
              style={{ fontFamily: 'Satoshi, sans-serif', color: dim ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)' }}
            >
              {time}
            </span>
          </div>
          <p
            className="text-[9px] leading-snug truncate"
            style={{ fontFamily: 'Satoshi, sans-serif', color: dim ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)' }}
          >
            {name} · {detail}
          </p>
          <p
            className="text-[9px] mt-0.5 font-medium"
            style={{ fontFamily: 'Satoshi, sans-serif', color: dim ? '#444' : '#4ADE80' }}
          >
            {amount}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Counter({ from, to, suffix = '' }: { from: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const ctrl = animate(from, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return ctrl.stop
  }, [inView, from, to, suffix])

  return <span ref={ref}>{from}{suffix}</span>
}

export default function BookingCounterSection() {
  return (
    <section className="bg-[#16120E] py-16 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#6E675F] mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            The result
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <span
              className="block font-cormorant leading-[1.05] text-[#F8F4EE]"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: 'clamp(2.4rem, 4.5vw, 4.8rem)' }}
            >
              What your calendar looks like
            </span>
            <span
              className="block font-cormorant leading-[1.05]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#B8956A',
                fontSize: 'clamp(2.4rem, 4.5vw, 4.8rem)',
              }}
            >
              72 hours later.
            </span>
          </motion.div>
        </div>

        {/* Phones */}
        <div className="overflow-hidden w-full flex justify-center">
        <div className="flex flex-row items-start justify-center gap-4 lg:gap-16 scale-[0.58] lg:scale-100 origin-top -mb-[260px] lg:mb-0">

          {/* ── BEFORE phone ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Label */}
            <div className="text-center mb-4">
              <span
                className="text-[9px] tracking-[0.22em] uppercase text-[#4A4540] px-3 py-1 border border-[#2A2520]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Before Bookmax
              </span>
            </div>

            {/* Phone */}
            <div
              style={{
                width: 224,
                background: '#111',
                borderRadius: 44,
                padding: '0 6px 6px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(0,0,0,0.8)',
              }}
            >
              <DynamicIsland />
              {/* Screen */}
              <div style={{ background: '#1C1C1E', borderRadius: 32, overflow: 'hidden', height: 440 }}>
                <LockTime label="Before Bookmax" />
                {/* Single sad notification */}
                <Notif
                  name="1 inquiry"
                  detail="unanswered · 3 days ago"
                  amount="No booking yet"
                  time="3d ago"
                  delay={0.3}
                  dim
                />
                {/* Empty state */}
                <div className="mx-2.5 mt-2 rounded-2xl px-3 py-8 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <p className="text-white/15 text-[10px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    No new bookings
                  </p>
                </div>
              </div>
              <HomeBar />
            </div>

            {/* Monthly stat */}
            <div className="text-center mt-5">
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  color: '#4A4540',
                  lineHeight: 1,
                }}
              >
                6
              </span>
              <p className="text-[10px] text-[#4A4540] mt-1" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                bookings / month
              </p>
            </div>
          </motion.div>

          {/* ── Arrow ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col items-center gap-3 lg:mb-24"
          >
            <div
              className="w-px bg-gradient-to-b from-transparent via-[#3A3028] to-transparent hidden lg:block"
              style={{ height: 60 }}
            />
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 52,
                height: 52,
                background: 'rgba(184,149,106,0.1)',
                border: '1px solid rgba(184,149,106,0.25)',
              }}
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 7h18M13 1l6 6-6 6" stroke="#B8956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-[#6E675F]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              72 hours
            </span>
            <div
              className="w-px bg-gradient-to-b from-transparent via-[#3A3028] to-transparent hidden lg:block"
              style={{ height: 60 }}
            />
          </motion.div>

          {/* ── AFTER phone ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Label */}
            <div className="text-center mb-4">
              <span
                className="text-[9px] tracking-[0.22em] uppercase text-[#B8956A] px-3 py-1 border border-[#3A2E20]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                After Bookmax
              </span>
            </div>

            {/* Glow */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,149,106,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Phone */}
            <div
              style={{
                width: 224,
                background: '#111',
                borderRadius: 44,
                padding: '0 6px 6px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,149,106,0.15), inset 0 0 0 1px rgba(0,0,0,0.8)',
              }}
            >
              <DynamicIsland />
              {/* Screen */}
              <div style={{ background: '#1C1C1E', borderRadius: 32, overflow: 'hidden', height: 440, position: 'relative' }}>
                <LockTime label="After Bookmax" />
                {afterNotifs.map((n, i) => (
                  <Notif key={i} {...n} delay={0.2 + i * 0.18} />
                ))}
                {/* Fade out bottom — suggests more notifications below */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: 80,
                    background: 'linear-gradient(to bottom, transparent, #1C1C1E)',
                  }}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute bottom-3 left-0 right-0 text-center text-[9px] text-[#4ADE80]/50"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  +12 more this month
                </motion.p>
              </div>
              <HomeBar />
            </div>

            {/* Monthly stat */}
            <div className="text-center mt-5">
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  color: '#B8956A',
                  lineHeight: 1,
                }}
              >
                <Counter from={6} to={23} />
              </span>
              <p className="text-[10px] text-[#6E675F] mt-1" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                bookings / month
              </p>
            </div>
          </motion.div>
        </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-center text-[11px] text-[#4A4540] mt-16"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
        >
          Based on average results across Bookmax clients in their first 90 days.
        </motion.p>

      </div>
    </section>
  )
}
