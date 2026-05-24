'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const propertyTypes = [
  { id: 'bb',          label: 'B&B',           sub: 'Small, personal stays' },
  { id: 'hotel',       label: 'Hotel',          sub: '10 or more rooms' },
  { id: 'agriturismo', label: 'Agriturismo',    sub: 'Rural retreat or farmstay' },
  { id: 'villa',       label: 'Holiday home',   sub: 'Villa, cottage or apartment' },
]

const challenges = [
  { id: 'photos',   label: 'My photos don\'t show the property well' },
  { id: 'bookings', label: 'Not enough bookings despite decent reviews' },
  { id: 'reviews',  label: 'Guests rarely leave reviews after their stay' },
  { id: 'launch',   label: 'I\'m starting a new listing from scratch' },
]

const packages = {
  quick: {
    name: 'Quick Boost',
    price: 297,
    tagline: 'The fastest fix for listings losing clicks on bad photos.',
    items: [
      { label: '8 AI-enhanced photos', why: 'Guests decide in 2 seconds. Better photos stop the scroll — even before they read a word.' },
      { label: 'SEO-optimised title', why: 'The right title helps you appear in more searches, even from guests who weren\'t specifically looking for you.' },
      { label: 'Delivered within 48h', why: null },
    ],
  },
  complete: {
    name: 'Complete Refresh',
    price: 597,
    badge: 'Most effective',
    tagline: 'For listings that need a full turnaround — photos, positioning and reviews.',
    items: [
      { label: 'Up to 20 AI-enhanced photos', why: 'Full coverage of every space. Guests want to see exactly what they\'re booking before they commit.' },
      { label: 'Facilities & USPs highlighted', why: 'Your pool, breakfast, view — made into actual selling points, not a buried bullet list.' },
      { label: '3 review response templates', why: 'A professional reply to a bad review converts sceptics. Most owners never respond — you will.' },
      { label: 'Delivered within 72h', why: null },
    ],
  },
  launch: {
    name: 'Launch Package',
    price: 797,
    tagline: 'Everything needed to start strong and avoid the slow first months.',
    items: [
      { label: 'Full listing built from zero', why: 'We handle photos, structure and positioning. You don\'t start with a blank page.' },
      { label: 'Pricing strategy advice', why: 'Setting the wrong rate on day one costs months of repositioning. We help you get it right first time.' },
      { label: 'First reviews approach', why: 'Getting your first 5 reviews is the hardest part. We give you a repeatable system.' },
      { label: 'Guest communication templates', why: 'Professional from the first message — sets expectations, reduces complaints, earns better reviews.' },
      { label: 'Delivered within 72h', why: null },
    ],
  },
} as const

type PkgKey = keyof typeof packages

const addons = [
  { id: 'messages', name: 'Guest Messages',  price: 97,  desc: '8 templates for every guest touchpoint — check-in to checkout.' },
  { id: 'reviews',  name: 'Review Strategy', price: 197, desc: 'A system to consistently earn more 5-star reviews over time.' },
  { id: 'seasonal', name: 'Seasonal Update', price: 147, desc: 'Keep your listing fresh and relevant every season.' },
]

function recommend(ids: string[]): PkgKey {
  if (ids.includes('launch')) return 'launch'
  if (ids.length >= 2 || ids.includes('bookings') || ids.includes('reviews')) return 'complete'
  return 'quick'
}

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <motion.div
            animate={{ background: step >= s ? '#B8956A' : 'rgba(255,255,255,0.12)', scale: step === s ? 1.2 : 1 }}
            transition={{ duration: 0.35 }}
            className="rounded-full"
            style={{ width: 8, height: 8 }}
          />
          {s < 3 && <div style={{ width: 24, height: 1, background: step > s ? '#B8956A' : 'rgba(255,255,255,0.1)' }} />}
        </div>
      ))}
      <span className="ml-2 text-[10px] tracking-[0.18em] uppercase text-[#6E675F]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {step === 1 ? 'Your property' : step === 2 ? 'Your situation' : 'Your recommendation'}
      </span>
    </div>
  )
}

function SelectCard({ label, sub, selected, onClick }: { label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="text-left p-5 border transition-all duration-200 relative"
      style={{
        background: selected ? 'rgba(184,149,106,0.08)' : 'rgba(255,255,255,0.03)',
        borderColor: selected ? '#B8956A' : 'rgba(255,255,255,0.08)',
      }}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: '#B8956A' }}
        >
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}
      <p className="text-[#F8F4EE] text-sm font-medium mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>{label}</p>
      <p className="text-[#6E675F] text-[11px]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>{sub}</p>
    </motion.button>
  )
}

function CheckRow({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 2 }}
      className="flex items-start gap-3 py-4 border-b text-left w-full group"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div
        className="w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center border transition-all duration-200"
        style={{
          background: selected ? '#B8956A' : 'transparent',
          borderColor: selected ? '#B8956A' : 'rgba(255,255,255,0.18)',
        }}
      >
        {selected && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-[#C9C0B4] text-sm leading-snug" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
        {label}
      </span>
    </motion.button>
  )
}

function PackageItem({ label, why, open, onToggle }: { label: string; why: string | null; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <button
        onClick={why ? onToggle : undefined}
        className="flex items-start gap-3 py-3.5 w-full text-left"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8956A] mt-2 shrink-0" />
        <span className="flex-1 text-[#C9C0B4] text-[13px] leading-snug" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
          {label}
        </span>
        {why && (
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="shrink-0 mt-1 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.4 }}
          >
            <path d="M2 4l4 4 4-4" stroke="#F8F4EE" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <AnimatePresence>
        {open && why && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-3 pl-4 text-[11px] leading-relaxed text-[#6E675F]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
              {why}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AddonRow({ addon, selected, onToggle }: { addon: typeof addons[0]; selected: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="flex items-start gap-4 py-4 border-b"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <button
        onClick={onToggle}
        className="w-9 h-5 rounded-full shrink-0 mt-0.5 relative transition-all duration-300"
        style={{ background: selected ? '#B8956A' : 'rgba(255,255,255,0.12)' }}
      >
        <motion.div
          animate={{ x: selected ? 16 : 2 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
        />
      </button>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <span className="text-[#F8F4EE] text-[13px]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>{addon.name}</span>
          <span className="text-[#B8956A] text-[13px] shrink-0" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700 }}>+€ {addon.price}</span>
        </div>
        <p className="text-[11px] text-[#6E675F]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>{addon.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const pkgKey = selectedChallenges.length > 0 ? recommend(selectedChallenges) : 'complete'
  const pkg = packages[pkgKey]
  const addonTotal = addons.filter(a => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0)
  const total = pkg.price + addonTotal

  const toggleChallenge = (id: string) => {
    setSelectedChallenges(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <section id="services" className="bg-[#16120E] py-24 lg:py-32 relative overflow-hidden">
      {/* Ghost max */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none" aria-hidden>
        <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: 'clamp(200px, 28vw, 400px)', color: '#1A1510', lineHeight: 0.8 }}>
          max
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#6E675F] mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Find your package
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="block font-cormorant text-[#F8F4EE] leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
          >
            Tell us about your listing.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="block font-cormorant leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic', color: '#7C5C3A', fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
          >
            We'll tell you what to fix.
          </motion.span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* ── LEFT: steps ── */}
          <div className="lg:col-span-7">
            <StepDots step={step} />

            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                  <p className="text-[#9E9890] text-sm mb-6" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                    What type of property do you have?
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {propertyTypes.map(pt => (
                      <SelectCard key={pt.id} label={pt.label} sub={pt.sub} selected={propertyType === pt.id} onClick={() => setPropertyType(pt.id)} />
                    ))}
                  </div>
                  <button
                    onClick={() => { if (propertyType) setStep(2) }}
                    className="flex items-center gap-2 text-sm transition-all duration-200"
                    style={{
                      fontFamily: 'Satoshi, sans-serif', fontWeight: 400,
                      color: propertyType ? '#B8956A' : '#4A4540',
                      cursor: propertyType ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Continue
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                  <p className="text-[#9E9890] text-sm mb-2" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                    What's holding your listing back? <span className="text-[#4A4540]">(select all that apply)</span>
                  </p>
                  <p className="text-[#4A4540] text-[11px] mb-6" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Be honest — the more accurately you describe your situation, the better we can help.
                  </p>
                  <div className="mb-8">
                    {challenges.map(c => (
                      <CheckRow key={c.id} label={c.label} selected={selectedChallenges.includes(c.id)} onClick={() => toggleChallenge(c.id)} />
                    ))}
                  </div>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setStep(1)} className="text-[#4A4540] text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>← Back</button>
                    <button
                      onClick={() => { if (selectedChallenges.length > 0) setStep(3) }}
                      className="flex items-center gap-2 text-sm transition-all duration-200"
                      style={{
                        fontFamily: 'Satoshi, sans-serif', fontWeight: 400,
                        color: selectedChallenges.length > 0 ? '#B8956A' : '#4A4540',
                        cursor: selectedChallenges.length > 0 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      See my recommendation
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                  <div className="mb-2 flex items-center gap-3">
                    {'badge' in pkg && pkg.badge && (
                      <span className="text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 text-[#C9AB87] border border-[#C9AB87]/30" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-[#9E9890] text-sm mb-1" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                    Based on your situation, we recommend:
                  </p>
                  <h3 className="font-cormorant text-[#F8F4EE] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600, fontSize: '1.8rem' }}>
                    {pkg.name}
                  </h3>
                  <p className="text-[#6E675F] text-[12px] mb-6" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                    {pkg.tagline}
                  </p>

                  {/* Package items with why-explanations */}
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#4A4540] mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      What's included — tap any item to learn why it matters
                    </p>
                    {pkg.items.map((item, i) => (
                      <PackageItem
                        key={i}
                        label={item.label}
                        why={item.why}
                        open={openItem === i}
                        onToggle={() => setOpenItem(openItem === i ? null : i)}
                      />
                    ))}
                  </div>

                  {/* Add-ons */}
                  <div className="mb-6">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#4A4540] mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Optional add-ons
                    </p>
                    {addons.map(a => (
                      <AddonRow key={a.id} addon={a} selected={selectedAddons.includes(a.id)} onToggle={() => toggleAddon(a.id)} />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-2 border-t" style={{ borderColor: '#2A2520' }}>
                    <button onClick={() => setStep(2)} className="text-[#4A4540] text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>← Adjust answers</button>
                    <a
                      href="#roi"
                      className="flex items-center gap-1.5 text-[11px] transition-opacity hover:opacity-70"
                      style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400, color: '#B8956A' }}
                    >
                      Calculate your ROI
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4.5h9M6 1l4 3.5L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: summary ── */}
          <div className="lg:col-span-5">
            <div className="border border-[#2A2520] p-6 sticky top-28">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A4540] mb-5" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {step < 3 ? 'Your summary' : 'Your package'}
              </p>

              {step < 3 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: propertyType ? '#B8956A' : '#2A2520' }} />
                    <span className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300, color: propertyType ? '#C9C0B4' : '#4A4540' }}>
                      {propertyType ? propertyTypes.find(p => p.id === propertyType)?.label : 'Property type not yet selected'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: selectedChallenges.length > 0 ? '#B8956A' : '#2A2520' }} />
                    <span className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300, color: selectedChallenges.length > 0 ? '#C9C0B4' : '#4A4540' }}>
                      {selectedChallenges.length > 0 ? `${selectedChallenges.length} challenge${selectedChallenges.length > 1 ? 's' : ''} identified` : 'Challenges not yet selected'}
                    </span>
                  </div>
                  <div className="pt-6 border-t" style={{ borderColor: '#1E1A16' }}>
                    <p className="text-[11px] text-[#4A4540] leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                      Answer the questions on the left and we'll show you exactly what your listing needs — and why.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Package name + base price */}
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[#F8F4EE] text-sm" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>{pkg.name}</span>
                    <span className="font-cormorant text-[#B8956A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '1.4rem' }}>€ {pkg.price}</span>
                  </div>

                  {/* Selected add-ons */}
                  {selectedAddons.length > 0 && (
                    <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: '#1E1A16' }}>
                      {addons.filter(a => selectedAddons.includes(a.id)).map(a => (
                        <div key={a.id} className="flex items-center justify-between">
                          <span className="text-[#6E675F] text-[12px]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>+ {a.name}</span>
                          <span className="text-[#6E675F] text-[12px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>€ {a.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex items-baseline justify-between pt-2 mb-6 border-t" style={{ borderColor: '#2A2520' }}>
                    <span className="text-[#9E9890] text-[11px] tracking-wide" style={{ fontFamily: 'Satoshi, sans-serif' }}>Total · one-time</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-cormorant text-[#F8F4EE]"
                      style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '2rem' }}
                    >
                      € {total}
                    </motion.span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 text-sm text-[#16120E] font-medium mb-3 transition-colors duration-200"
                    style={{ background: '#B8956A', fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Get started with {pkg.name} →
                  </motion.button>

                  <button
                    className="w-full py-2.5 text-[12px] text-[#6E675F] border transition-colors duration-200 hover:border-[#4A4540] hover:text-[#9E9890]"
                    style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300, borderColor: '#2A2520' }}
                  >
                    Not sure yet? Start with a free check →
                  </button>

                  <p className="text-center text-[10px] text-[#4A4540] mt-4" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
                    No obligation. We'll confirm this recommendation after your free check.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
