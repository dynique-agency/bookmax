'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CTASection() {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-[#16120E] py-36 relative overflow-hidden">
      {/* Concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        {[600, 400, 250].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-[#211C17]"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.25em] uppercase text-[#9E9890] mb-8"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          — Free listing check —
        </motion.p>

        {/* Headline */}
        <div className="mb-6">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-cormorant text-[#F8F4EE] block leading-tight"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
            }}
          >
            Ready to max out
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-cormorant block leading-tight"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#B8956A',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
            }}
          >
            your listing?
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-[#6E675F] text-sm leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
        >
          Leave your Booking.com link below. Within 24 hours you receive an honest, concrete
          overview of what&apos;s holding your property back — free, no strings attached.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 mb-5"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com or Booking.com link"
            className="flex-1 px-5 py-3 bg-[#211C17] border border-[#2E2720] text-[#F8F4EE] text-sm placeholder-[#6E675F] outline-none focus:border-[#B8956A] transition-colors duration-200"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontWeight: 300,
              boxShadow: 'none',
            }}
          />
          <MagneticButton variant="warm" type="submit">
            Get free check →
          </MagneticButton>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-[#6E675F] text-xs"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
        >
          No spam. No commitment. Just honest advice.
        </motion.p>
      </div>
    </section>
  )
}
