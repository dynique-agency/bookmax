'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [label, setLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 }
  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)

  const ringSpring = { stiffness: 150, damping: 20, mass: 0.8 }
  const ringX = useSpring(mouseX, ringSpring)
  const ringY = useSpring(mouseY, ringSpring)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      setLabel(cursorLabel)
      setIsHovering(true)
    }

    const handleLeave = () => {
      setLabel('')
      setIsHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter as EventListener)
      el.addEventListener('mouseleave', handleLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter as EventListener)
        el.removeEventListener('mouseleave', handleLeave)
        el.addEventListener('mouseenter', handleEnter as EventListener)
        el.addEventListener('mouseleave', handleLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [mounted, mouseX, mouseY, isVisible])

  if (!mounted) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className="rounded-full bg-[#B8956A]"
          style={{
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s ease, height 0.2s ease',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 36,
            height: isHovering ? 48 : 36,
            borderColor: isHovering ? 'rgba(184,149,106,0.8)' : 'rgba(184,149,106,0.4)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            borderRadius: '50%',
            border: '1.5px solid rgba(184,149,106,0.4)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {label && (
            <span
              className="text-[9px] font-satoshi font-medium tracking-widest uppercase text-[#B8956A] whitespace-nowrap"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
