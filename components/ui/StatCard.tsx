'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface StatCardProps {
  number: string
  label: string
  progress: number
  delay?: number
  dark?: boolean
}

export default function StatCard({ number, label, progress, delay = 0, dark = false }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setFilled(true), delay * 1000 + 300)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ x: 6 }}
      className={`p-6 border ${
        dark
          ? 'bg-[#211C17] border-[#2E2720] text-white'
          : 'bg-white border-[#E3D9CC] text-[#16120E]'
      } transition-all duration-300`}
    >
      <div
        className="font-cormorant font-bold leading-none mb-2"
        style={{ fontSize: '3rem', fontFamily: 'var(--font-cormorant)' }}
      >
        {number}
      </div>
      <p
        className={`text-sm mb-4 font-light leading-relaxed ${dark ? 'text-[#9E9890]' : 'text-[#6E675F]'}`}
        style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
      >
        {label}
      </p>
      <div className={`h-px w-full ${dark ? 'bg-[#2E2720]' : 'bg-[#E3D9CC]'} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#B8956A]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: filled ? progress / 100 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', height: '100%' }}
        />
      </div>
    </motion.div>
  )
}
