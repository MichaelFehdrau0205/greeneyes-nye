import React from 'react'

const CIRCLES = [
  { label: 'Saving', sublabel: 'Up to $180K/yr in avoided fines', icon: '💰', color: '#64b5f6' },
  { label: 'Reliable', sublabel: '99.9% uptime SLA', icon: '🛡️', color: '#81c784' },
  { label: 'Fast', sublabel: 'Sub-second live readings', icon: '⚡', color: '#90caf9' },
  { label: 'Free', sublabel: 'No hardware install costs', icon: '🎁', color: '#a5d6a7' },
]

export default function Page2NYC() {
  return (
    <section id="page2" className="relative min-h-screen overflow-hidden flex flex-col">

      {/* NYC Skyline illustration / placeholder */}
      <div className="relative flex-1 min-h-[55vh]" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 40%, #162d4e 100%)' }}>

        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}

        {/* SVG NYC Skyline */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax meet"
          aria-label="NYC skyline silhouette"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1628" stopOpacity="0" />
              <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background buildings (far) */}
          <g fill="#0d1f3c" stroke="#1a3a6e" strokeWidth="0.5">
            <rect x="0" y="200" width="120" height="120" />
            <rect x="110" y="170" width="60" height="150" />
            <rect x="160" y="210" width="80" height="110" />
            <rect x="230" y="150" width="40" height="170" />
            <rect x="260" y="185" width="90" height="135" />
            <rect x="340" y="130" width="30" height="190" />
            <rect x="360" y="160" width="100" height="160" />
            <rect x="450" y="100" width="50" height="220" />
            <rect x="490" y="180" width="80" height="140" />
            <rect x="560" y="155" width="45" height="165" />
            <rect x="595" y="195" width="110" height="125" />
            <rect x="690" y="120" width="55" height="200" />
            <rect x="735" y="170" width="85" height="150" />
            <rect x="810" y="135" width="40" height="185" />
            <rect x="840" y="160" width="100" height="160" />
            <rect x="930" y="90" width="60" height="230" />
            <rect x="980" y="180" width="90" height="140" />
            <rect x="1060" y="145" width="50" height="175" />
            <rect x="1100" y="190" width="80" height="130" />
            <rect x="1170" y="115" width="45" height="205" />
            <rect x="1205" y="170" width="100" height="150" />
            <rect x="1295" y="140" width="55" height="180" />
            <rect x="1340" y="185" width="100" height="135" />
          </g>

          {/* Foreground buildings (near) */}
          <g fill="#0a1628">
            <rect x="0" y="240" width="200" height="80" />
            <rect x="180" y="210" width="120" height="110" />
            {/* Empire State Building-like */}
            <rect x="280" y="120" width="80" height="200" />
            <rect x="300" y="80" width="40" height="50" />
            <rect x="314" y="60" width="12" height="30" />
            <rect x="318" y="40" width="4" height="22" />
            <rect x="350" y="200" width="140" height="120" />
            <rect x="480" y="175" width="90" height="145" />
            <rect x="560" y="195" width="110" height="125" />
            {/* One WTC-like */}
            <polygon points="650,320 680,100 710,320" fill="#0a1628" />
            <rect x="650" y="280" width="60" height="40" />
            <rect x="700" y="220" width="100" height="100" />
            <rect x="790" y="190" width="80" height="130" />
            <rect x="860" y="210" width="130" height="110" />
            {/* Hudson Yards-like */}
            <rect x="980" y="150" width="90" height="170" />
            <rect x="980" y="130" width="60" height="30" />
            <rect x="1060" y="180" width="80" height="140" />
            <rect x="1130" y="200" width="150" height="120" />
            <rect x="1270" y="210" width="80" height="110" />
            <rect x="1340" y="195" width="100" height="125" />
          </g>

          {/* Windows */}
          {[...Array(60)].map((_, i) => (
            <rect
              key={i}
              x={Math.random() * 1400 + 10}
              y={Math.random() * 200 + 100}
              width="4"
              height="5"
              fill="#f59e0b"
              opacity={Math.random() * 0.5 + 0.1}
            />
          ))}

          {/* Ground */}
          <rect x="0" y="315" width="1440" height="5" fill="#0d1f3c" />
        </svg>

        {/* Headline overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16 pb-8">
          <p className="text-green-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">Built for New York City</p>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center leading-tight max-w-3xl">
            Every Building in NYC<br />
            <span className="text-green-400">Deserves Smart Energy</span>
          </h2>
        </div>
      </div>

      {/* Circles row */}
      <div
        className="relative z-10 py-12 px-8"
        style={{ background: '#f0f6ff' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {CIRCLES.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-default"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${c.color}ee, ${c.color}99)`,
                    boxShadow: `0 8px 32px ${c.color}44`,
                    border: `2px solid ${c.color}cc`,
                  }}
                >
                  <span className="text-3xl mb-1">{c.icon}</span>
                  <span className="text-lg font-black text-white">{c.label}</span>
                </div>
                <p className="mt-3 text-xs text-gray-500 max-w-[120px] leading-relaxed">{c.sublabel}</p>

                {/* Connector line (except last) */}
                {i < CIRCLES.length - 1 && (
                  <div
                    className="hidden sm:block absolute w-px bg-gradient-to-b"
                    style={{ height: '2px', width: '48px' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Horizontal connector */}
          <div className="hidden sm:flex items-center justify-center mt-2">
            <div className="h-px bg-blue-200/60 flex-1 max-w-3xl mx-auto" style={{ marginTop: '-98px', zIndex: -1 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
