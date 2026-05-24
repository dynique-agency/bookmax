'use client'

import { motion } from 'framer-motion'

export default function FixSection() {
  return (
    <section className="bg-[#FDFAF6] border-y border-[#E3D9CC] py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="mb-5 text-[10px] tracking-[0.28em] uppercase text-[#B8956A]"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            What Bookmax does
          </p>

          <h2 style={{ fontFamily: 'var(--font-cormorant)', lineHeight: 1.1 }}>
            <span
              className="block"
              style={{ fontWeight: 600, fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#16120E' }}
            >
              We fix your photos, your listing and
            </span>
            <span
              className="block"
              style={{ fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#B8956A' }}
            >
              your entire Booking.com profile —
            </span>
            <span
              className="block"
              style={{ fontWeight: 600, fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#16120E' }}
            >
              so bookings come in like never before.
            </span>
          </h2>
        </motion.div>

      </div>
    </section>
  )
}
