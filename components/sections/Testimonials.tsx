'use client'

import { motion } from 'framer-motion'

const conversations = [
  {
    name: 'Marco & Lucia',
    property: 'Agriturismo · Tuscany',
    messages: [
      { text: "March was terrible. 2 bookings the whole month 😔", delay: 0.1 },
      { text: "We tried Bookmax after seeing an ad. They redid all our photos.", delay: 0.25 },
      { text: "5 new bookings in the first week after going live 🔥", delay: 0.4, highlight: true },
    ],
  },
  {
    name: 'Els Pieters',
    property: 'B&B · Ardennes',
    messages: [
      { text: "I knew something was wrong but never had time to fix it", delay: 0.15 },
      { text: "They sent a photo guide, I shot on my iPhone. Three days later everything was ready.", delay: 0.3 },
      { text: "Just uploaded the files. Done. Best €297 I ever spent 🙌", delay: 0.45, highlight: true },
    ],
  },
  {
    name: 'Pieter Vermeulen',
    property: 'Holiday home · Zeeland',
    messages: [
      { text: "Didn't believe photos could make that much of a difference", delay: 0.2 },
      { text: "Went from 3 bookings/month to 11. In the first month.", delay: 0.35, highlight: true },
      { text: "Wish I had done this two years ago honestly", delay: 0.5 },
    ],
  },
]

function IMessageBubble({ text, delay, highlight = false }: { text: string; delay: number; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      className="flex justify-end mb-2"
    >
      <div
        className="max-w-[85%] px-3.5 py-2.5 rounded-[18px] rounded-br-[4px] text-white text-[13px] leading-[1.45]"
        style={{
          background: highlight ? '#0A84FF' : '#636366',
          fontFamily: 'Satoshi, sans-serif',
          fontWeight: 300,
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

function PhoneChat({ conv, index }: { conv: typeof conversations[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="flex flex-col"
      style={{ width: 'min(300px, 88vw)' }}
    >
      <div
        style={{
          background: '#111',
          borderRadius: 44,
          padding: '0 6px 6px',
          boxShadow: '0 32px 64px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* Dynamic island */}
        <div className="flex justify-center pt-3 pb-2">
          <div style={{ width: 88, height: 24, background: '#000', borderRadius: 12 }} />
        </div>

        {/* iMessage screen */}
        <div
          style={{
            background: '#fff',
            borderRadius: 32,
            overflow: 'hidden',
            height: 420,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center pt-4 pb-3 border-b" style={{ borderColor: '#F2F2F7' }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ background: 'linear-gradient(135deg, #B8956A, #7C5C3A)' }}
            >
              <span className="text-white text-[11px] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {conv.name.split(' ')[0][0]}{conv.name.split(' ').slice(-1)[0][0]}
              </span>
            </div>
            <p className="text-[12px] font-semibold text-[#16120E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {conv.name}
            </p>
            <p className="text-[10px] text-[#9E9890]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {conv.property}
            </p>
          </div>

          {/* Bubbles */}
          <div className="flex-1 px-3 pt-4 overflow-hidden">
            {conv.messages.map((m, i) => (
              <IMessageBubble key={i} {...m} />
            ))}
          </div>

          {/* Stars */}
          <div className="flex justify-center pb-3 pt-1">
            <span className="text-[#B8956A] text-[13px]">★★★★★</span>
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-[#F8F4EE] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#9E9890] mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            What owners say
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-cormorant text-[#16120E] block leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
          >
            Owners who said yes
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
            are fully booked.
          </motion.span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 justify-center items-center sm:items-start">
          {conversations.map((conv, i) => (
            <PhoneChat key={conv.name} conv={conv} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
