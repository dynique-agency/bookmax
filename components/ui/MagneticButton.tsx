'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'warm'
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    x.set(cx * 0.2)
    y.set(cy * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseStyles =
    'inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide transition-colors duration-200 select-none'

  const variants = {
    primary: 'bg-[#16120E] text-[#C9AB87] hover:bg-[#211C17]',
    ghost: 'border border-[#C9AB87]/40 text-[#16120E] hover:border-[#C9AB87] hover:bg-[#E3D9CC]/30',
    warm: 'bg-[#B8956A] text-[#16120E] hover:bg-[#C9AB87]',
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
