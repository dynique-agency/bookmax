'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Share your listing',
    body: 'Paste your Booking.com link. Takes 2 minutes. We handle the rest.',
    pill: 'Free · No commitment',
    visual: <StepShareLink />,
  },
  {
    num: '02',
    title: 'We fix everything',
    body: 'We send a simple photo guide. You shoot on your iPhone. We handle all enhancement, optimisation and delivery.',
    pill: '48–72 hours',
    visual: <StepWorking />,
  },
  {
    num: '03',
    title: 'Go live in minutes',
    body: 'Receive a ready-to-upload folder. Copy, paste, done.',
    pill: '5 min to upload',
    visual: <StepDelivered />,
  },
  {
    num: '04',
    title: 'Watch bookings arrive',
    body: 'More clicks, more bookings. The calendar fills itself.',
    pill: '+40% avg. increase',
    visual: <StepBookings />,
  },
]

function MiniPhone({ children, glow = false }: { children: React.ReactNode; glow?: boolean }) {
  return (
    <div className="relative mx-auto" style={{ width: 160 }}>
      {glow && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(184,149,106,0.18) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />
      )}
      <div
        style={{
          background: '#111',
          borderRadius: 24,
          padding: '0 4px 4px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex justify-center pt-2 pb-1.5">
          <div style={{ width: 64, height: 18, background: '#000', borderRadius: 9 }} />
        </div>
        <div style={{ background: '#1C1C1E', borderRadius: 22, overflow: 'hidden', minHeight: 200 }}>
          {children}
        </div>
        <div className="flex justify-center pt-2 pb-1.5">
          <div style={{ width: 58, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

function StepShareLink() {
  return (
    <MiniPhone>
      <div className="p-3">
        {/* Browser bar mockup */}
        <div
          className="rounded-lg px-2 py-1.5 mb-3 flex items-center gap-1.5"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
          <span className="text-[7px] text-white/40 truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            booking.com/hotel/your-listing
          </span>
        </div>
        {/* Fake listing thumbnail */}
        <div className="rounded-lg overflow-hidden mb-2" style={{ height: 56, background: '#2A2520' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/15 text-[9px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>listing photo</span>
          </div>
        </div>
        {/* Send arrow */}
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-end"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: '#0A84FF' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </MiniPhone>
  )
}

function StepWorking() {
  return (
    <MiniPhone>
      <div className="p-3 flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
        {/* Animated progress ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mb-3"
          style={{ width: 36, height: 36 }}
        >
          <svg viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15"
              stroke="#B8956A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="60 36"
            />
          </svg>
        </motion.div>
        <p className="text-white/40 text-[8px] text-center" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Enhancing photos...
        </p>
        {/* Progress bars */}
        <div className="w-full mt-3 space-y-1.5">
          {[100, 72, 45].map((w, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: i === 0 ? '#B8956A' : 'rgba(184,149,106,0.4)', width: `${w}%` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </MiniPhone>
  )
}

function StepDelivered() {
  return (
    <MiniPhone>
      <div className="p-3 flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
        {/* Check circle */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
          style={{ background: 'rgba(74,222,128,0.15)', border: '1.5px solid rgba(74,222,128,0.4)' }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1.5 6L6 10.5L14.5 1.5" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <p className="text-white/60 text-[8px] text-center mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Your files are ready
        </p>
        {/* File items */}
        {['photos_enhanced/', 'review_templates/'].map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            className="flex items-center gap-1.5 mb-1"
          >
            <div style={{ width: 14, height: 14, background: '#B8956A', borderRadius: 3, opacity: 0.7 }} />
            <span className="text-white/40 text-[7px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{f}</span>
          </motion.div>
        ))}
      </div>
    </MiniPhone>
  )
}

function StepBookings() {
  const notifs = [
    { name: 'Sophie M.', amount: '+€ 180' },
    { name: 'Marco R.', amount: '+€ 420' },
    { name: 'Anna K.', amount: '+€ 260' },
  ]
  return (
    <MiniPhone glow>
      <div className="p-2 pt-3">
        {notifs.map((n, i) => (
          <motion.div
            key={n.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.18 }}
            className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
              style={{ background: '#003B95', fontSize: '6px', color: '#fff', fontFamily: 'Satoshi, sans-serif', fontWeight: 700 }}
            >
              B.
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[7px] font-medium truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>New booking · {n.name}</p>
              <p className="text-[#4ADE80] text-[7px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{n.amount}</p>
            </div>
          </motion.div>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="text-center text-[#4ADE80]/50 text-[7px] mt-1"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          +12 more this month
        </motion.p>
      </div>
    </MiniPhone>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F8F4EE] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#9E9890] mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            How it works
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-cormorant text-[#16120E] block leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
          >
            Simple. Fast.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="font-cormorant block leading-[1.05]"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#7C5C3A',
              fontSize: 'clamp(2.4rem, 4vw, 4rem)',
            }}
          >
            More bookings.
          </motion.span>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#E3D9CC]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className="pt-8 pr-6 pb-8 border-r border-[#E3D9CC] last:border-r-0 md:even:border-r-0 lg:even:border-r lg:last:border-r-0"
            >
              {/* Visual mockup */}
              <div className="mb-8">
                {step.visual}
              </div>

              {/* Number */}
              <div
                className="font-cormorant text-[#E3D9CC] mb-3 leading-none"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '2.8rem' }}
              >
                {step.num}
              </div>

              <h3
                className="font-cormorant text-[#16120E] mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: '1.15rem' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[#6E675F] text-[13px] leading-relaxed mb-5"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
              >
                {step.body}
              </p>
              <span
                className="inline-block px-3 py-1 text-[10px] tracking-wide border border-[#C9AB87] text-[#7C5C3A] rounded-full"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
              >
                {step.pill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
