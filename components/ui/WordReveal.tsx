'use client'

import { motion } from 'framer-motion'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const container = (delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: delay },
  },
})

const wordVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: WordRevealProps) {
  const words = text.split(' ')

  return (
    <motion.div
      variants={container(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-wrap gap-x-[0.3em] ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
            <Tag className="inline">{word}</Tag>
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
