'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const problems = [
  {
    num: '01',
    title: 'Photos taken on an old phone',
    body: 'Dark, blurry, unflattering. Guests scroll past in under two seconds — even if your property is stunning. First impressions are formed before anyone reads a word.',
  },
  {
    num: '02',
    title: 'Reviews going unanswered',
    body: 'No reply signals neglect. A single thoughtful response to a bad review can convert a sceptic into a booking. Most owners never get around to it.',
  },
  {
    num: '03',
    title: 'No time to fix any of it',
    body: "You're running a property — checking guests in, cleaning rooms, managing breakfast. You don't have hours to master photo editing and SEO optimisation. That's exactly what Bookmax is for.",
  },
]

function EvidenceShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-0 overflow-hidden border border-[#E3D9CC]"
    >
      {/* Header bar */}
      <div className="bg-[#16120E] px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#B8956A] shrink-0"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <span
            className="text-[9px] tracking-[0.24em] uppercase text-[#9E9890]"
            style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
          >
            Verified photos from live Booking.com listings
          </span>
        </div>
        <span
          className="text-[8px] tracking-[0.18em] uppercase text-[#4A4540] shrink-0"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Actual main photos
        </span>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2">
        {/* Photo 1 */}
        <motion.div
          className="relative overflow-hidden"
          style={{ paddingBottom: '68%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <Image
            src="/slechtefoto1.jpg"
            alt="Verified bad listing photo from Booking.com"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 30vw, 50vw"
            style={{ filter: 'saturate(0.35) brightness(0.78)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(22,18,14,0.18)' }} />

          {/* Rating chip */}
          <div
            className="absolute top-3 right-3 px-2 py-1 backdrop-blur-sm"
            style={{ background: 'rgba(22,18,14,0.65)' }}
          >
            <span
              className="text-[8px] tracking-[0.14em] text-[#9E9890]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              ★ 8.6 · 37 reviews
            </span>
          </div>

          {/* Location */}
          <div
            className="absolute bottom-3 left-3 px-2 py-1 backdrop-blur-sm"
            style={{ background: 'rgba(22,18,14,0.65)' }}
          >
            <span
              className="text-[8px] tracking-[0.16em] uppercase text-[#6E675F]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              B&B · Tuscany, Italy
            </span>
          </div>
        </motion.div>

        {/* Photo 2 */}
        <motion.div
          className="relative overflow-hidden border-l border-[#16120E]"
          style={{ paddingBottom: '68%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        >
          <Image
            src="/slechtefoto2.jpg"
            alt="Verified bad listing photo from Booking.com"
            fill
            className="object-cover object-bottom"
            sizes="(min-width: 1024px) 30vw, 50vw"
            style={{ filter: 'saturate(0.35) brightness(0.78)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(22,18,14,0.18)' }} />

          {/* Rating chip */}
          <div
            className="absolute top-3 right-3 px-2 py-1 backdrop-blur-sm"
            style={{ background: 'rgba(22,18,14,0.65)' }}
          >
            <span
              className="text-[8px] tracking-[0.14em] text-[#9E9890]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              ★ 8.1 · 19 reviews
            </span>
          </div>

          {/* Location */}
          <div
            className="absolute bottom-3 left-3 px-2 py-1 backdrop-blur-sm"
            style={{ background: 'rgba(22,18,14,0.65)' }}
          >
            <span
              className="text-[8px] tracking-[0.16em] uppercase text-[#6E675F]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Agriturismo · Umbria, Italy
            </span>
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <div className="bg-[#F0EBE3] border-t border-[#E3D9CC] px-5 py-4">
        <p
          className="text-[11px] leading-[1.75] text-[#7C6F63]"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
        >
          These are the primary photos guests see first. Both properties rated above 8.0.{' '}
          <span className="text-[#16120E]" style={{ fontWeight: 500 }}>
            Both losing bookings to better-presented competitors.
          </span>
        </p>
      </div>
    </motion.div>
  )
}

function ProblemItem({
  num, title, body, index,
}: { num: string; title: string; body: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
    >
      <div className="grid grid-cols-[3rem_1fr] lg:grid-cols-[5rem_1fr] gap-6 lg:gap-10 py-6 lg:py-8 border-b border-[#E3D9CC] items-start">
        {/* Number */}
        <div className="pt-1">
          <motion.span
            initial={{ color: '#E3D9CC' }}
            whileInView={{ color: '#C9AB87' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.09 + 0.25 }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              lineHeight: 1,
            }}
          >
            {num}
          </motion.span>
        </div>

        {/* Content */}
        <div>
          <h3
            className="text-[#16120E] mb-3 leading-tight"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 600,
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
            }}
          >
            {title}
          </h3>
          <p
            className="text-[#6E675F] leading-relaxed max-w-lg"
            style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
          >
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section ref={sectionRef} id="problem" className="bg-[#F8F4EE] relative overflow-hidden">
      <div className="h-px w-full bg-[#E3D9CC]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── LEFT: sticky editorial ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] tracking-[0.25em] uppercase text-[#9E9890] mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              The problem
            </motion.p>

            <motion.div style={{ y: headlineY }}>
              <div className="mb-8">
                <motion.span
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="block font-cormorant leading-[1.05] text-[#16120E]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 600,
                    fontSize: 'clamp(2.8rem, 4vw, 4.2rem)',
                  }}
                >
                  Your property
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="block font-cormorant leading-[1.05]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#7C5C3A',
                    fontSize: 'clamp(2.8rem, 4vw, 4.2rem)',
                  }}
                >
                  is beautiful.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="block font-cormorant leading-[1.05] text-[#16120E]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 600,
                    fontSize: 'clamp(2.8rem, 4vw, 4.2rem)',
                  }}
                >
                  Your listing isn&apos;t.
                </motion.span>
              </div>

              {/* Stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="bg-white border border-[#E8E0D5] p-4"
              >
                {/* Source row */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F4F0EB]">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0"
                      style={{ background: '#003B95' }}
                    >
                      <span className="text-white text-[7px] font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>B.</span>
                    </div>
                    <span
                      className="text-[9px] tracking-[0.14em] uppercase text-[#9E9890]"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Booking.com Research
                    </span>
                  </div>
                  {/* Verified pill */}
                  <div
                    className="flex items-center gap-1 px-1.5 py-0.5"
                    style={{ background: 'rgba(0,59,149,0.05)', border: '1px solid rgba(0,59,149,0.14)' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#003B95"/>
                      <path d="M2 4l1.5 1.5L6 2.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      className="text-[7px] tracking-[0.1em] uppercase"
                      style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500, color: '#003B95' }}
                    >
                      Verified data
                    </span>
                  </div>
                </div>

                {/* Big stat */}
                <div className="flex items-end gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.6rem, 4vw, 3.4rem)',
                      color: '#16120E',
                      lineHeight: 1,
                    }}
                  >
                    93%
                  </span>
                  <div className="mb-0.5">
                    <p className="text-[12px] text-[#16120E] leading-snug" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                      of travellers say photos<br />are the #1 booking factor
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT: evidence + problem list ── */}
          <div className="lg:col-span-8">
            <EvidenceShowcase />

            <div className="border-t border-[#E3D9CC]">
              {problems.map((p, i) => (
                <ProblemItem key={p.num} {...p} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
