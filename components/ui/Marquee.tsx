'use client'

export default function Marquee() {
  const items = [
    'Better photos',
    'More bookings',
    'Review strategy',
    'Guest communication',
    'Seasonal content',
    'Fully remote',
    '72h delivery',
  ]

  const track = [...items, ...items]

  return (
    <div className="bg-[#16120E] py-5 overflow-hidden border-y border-[#211C17]">
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center"
            style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
          >
            <span className="text-[#F8F4EE] text-sm tracking-widest uppercase px-6">{item}</span>
            <span className="text-[#B8956A] text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
