'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const credentials = [
  'Hospitality background',
  'Travelled all of Europe',
  'ICT & AI specialist',
  'Marketing background',
]

const stats = [
  { number: '500+', label: 'listings analysed' },
  { number: '+40%', label: 'avg. booking increase' },
  { number: '72h',  label: 'avg. delivery time' },
  { number: '5 ★',  label: 'average client rating' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#F8F4EE] py-24 lg:py-32 border-t border-[#E3D9CC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT — portrait card ── */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="relative mx-auto lg:mx-0"
              style={{
                maxWidth: 420,
                background: '#16120E',
                boxShadow:
                  '0 48px 96px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              {/* Thin mat border */}
              <div className="p-1.5 pb-0">
                <div className="relative overflow-hidden" style={{ paddingBottom: '115%' }}>
                  <Image
                    src="/owner.jpeg"
                    alt="Founder of Bookmax"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 42vw, 92vw"
                    priority
                  />
                  {/* Bottom fade into dark strip */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(22,18,14,0.45))' }}
                  />
                </div>
              </div>

              {/* Info strip */}
              <div className="px-5 pt-4 pb-5">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 600,
                        fontSize: '1.35rem',
                        color: '#F0EBE3',
                        lineHeight: 1,
                      }}
                    >
                      Founder, Bookmax
                    </p>
                    <p
                      className="mt-1 text-[9px] tracking-[0.2em] uppercase text-[#6E675F]"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Listing Optimisation Specialist
                    </p>
                  </div>
                  {/* Gold dot accent */}
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mb-1"
                    style={{ background: '#B8956A' }}
                  />
                </div>

                {/* Divider */}
                <div className="h-px mb-3" style={{ background: '#2A2118' }} />

                {/* Credential tags */}
                <div className="flex flex-wrap gap-1.5">
                  {credentials.map(c => (
                    <span
                      key={c}
                      className="px-2 py-0.5 text-[8px] tracking-[0.12em] uppercase border border-[#2A2118] text-[#4A4540]"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner gold gradient */}
              <div
                className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  background: 'linear-gradient(225deg, rgba(184,149,106,0.5) 0%, transparent 55%)',
                }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT — editorial content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <p
              className="text-[10px] tracking-[0.25em] uppercase text-[#9E9890] mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Who&apos;s behind Bookmax
            </p>

            <div className="mb-8">
              <span
                className="block leading-[1.05] text-[#16120E]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 600,
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                }}
              >
                I know hotels
              </span>
              <span
                className="block leading-[1.05]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#7C5C3A',
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                }}
              >
                from the inside.
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <p
                className="text-[13px] leading-[1.85] text-[#6E675F]"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
              >
                I&apos;ve worked in hospitality my entire life — and I&apos;ve stayed in hundreds of
                properties across Europe, from five-star resorts to family-run agriturismi.
                I know exactly what makes a guest click.
              </p>
              <p
                className="text-[13px] leading-[1.85] text-[#6E675F]"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
              >
                Combined with a background in ICT, AI and marketing, Bookmax is the result —
                not a generic agency, but someone who understands your world and uses modern
                tools to make the difference you don&apos;t have time for.
              </p>
            </div>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 border border-[#E3D9CC] mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.08 }}
                  className={[
                    'p-5',
                    i % 2 === 0 ? 'border-r border-[#E3D9CC]' : '',
                    i < 2     ? 'border-b border-[#E3D9CC]' : '',
                  ].join(' ')}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
                      color: '#7C5C3A',
                      lineHeight: 1,
                    }}
                  >
                    {s.number}
                  </div>
                  <p
                    className="text-[11px] text-[#9E9890] mt-1.5 leading-snug"
                    style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-[#B8956A] pl-5">
              <p
                className="text-[#16120E] leading-snug"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                }}
              >
                &ldquo;Your property deserves a page that looks as good as it feels to stay
                there.&rdquo;
              </p>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
