import React from 'react'

export default function BlueprintBuilding() {
  const floorCount = 8
  const bldW = 260
  const bldH = 380
  const floorH = 34
  const bldX = 60
  const bldY = 50
  const basementH = 70

  return (
    <svg
      viewBox="0 0 420 540"
      className="w-full h-full"
      style={{ fontFamily: 'Courier New, monospace' }}
    >
      {/* Blueprint grid background */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74,159,212,0.12)" strokeWidth="0.5" />
        </pattern>
        <pattern id="gridBig" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(74,159,212,0.18)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="420" height="540" fill="#0f2942" />
      <rect width="420" height="540" fill="url(#grid)" />
      <rect width="420" height="540" fill="url(#gridBig)" />

      {/* Title block */}
      <text x="14" y="18" className="bp-text" fill="#4a9fd4" fontSize="9" fontFamily="Courier New">GREENEYES NYC — SMART BUILDING</text>
      <text x="14" y="28" className="bp-text" fill="rgba(74,159,212,0.5)" fontSize="7" fontFamily="Courier New">ENERGY REDUCTION MONITOR · REV 2026-A</text>
      <line x1="10" y1="32" x2="410" y2="32" stroke="rgba(74,159,212,0.3)" strokeWidth="0.5" />

      {/* SOLAR PANEL — ROOF */}
      {/* Roof */}
      <rect x={bldX - 10} y={bldY - 38} width={bldW + 20} height={14} fill="none" stroke="#4a9fd4" strokeWidth="1.5" />
      {/* Solar panels grid */}
      {[0, 1, 2, 3].map(col =>
        [0, 1].map(row => (
          <rect
            key={`solar-${col}-${row}`}
            x={bldX + col * 62 + 4}
            y={bldY - 36 + row * 6}
            width={56}
            height={5}
            fill="rgba(34,197,94,0.2)"
            stroke="#22c55e"
            strokeWidth="0.75"
          />
        ))
      )}
      {/* Solar cell lines */}
      {[0,1,2,3].map(col =>
        [0,1].map(row => (
          <line
            key={`sl-${col}-${row}`}
            x1={bldX + col * 62 + 4 + 28}
            y1={bldY - 36 + row * 6}
            x2={bldX + col * 62 + 4 + 28}
            y2={bldY - 36 + row * 6 + 5}
            stroke="#22c55e"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))
      )}
      <text x={bldX + bldW / 2} y={bldY - 40} fill="#22c55e" fontSize="7" fontFamily="Courier New" textAnchor="middle">▲ SOLAR ARRAY — 320 kW CAPACITY</text>

      {/* BUILDING FLOORS */}
      {Array.from({ length: floorCount }).map((_, i) => {
        const fy = bldY + i * floorH
        const floorNum = floorCount - i
        return (
          <g key={i}>
            <rect
              x={bldX}
              y={fy}
              width={bldW}
              height={floorH - 2}
              fill={i === 2 ? 'rgba(239,68,68,0.06)' : 'rgba(74,159,212,0.04)'}
              stroke="#4a9fd4"
              strokeWidth="1"
            />
            {/* Window pairs */}
            {[0, 1, 2, 3].map(w => (
              <rect
                key={w}
                x={bldX + 14 + w * 56}
                y={fy + 8}
                width={30}
                height={floorH - 16}
                fill={i === 2 ? 'rgba(239,68,68,0.15)' : 'rgba(74,159,212,0.12)'}
                stroke="rgba(74,159,212,0.4)"
                strokeWidth="0.5"
              />
            ))}
            {/* Floor label */}
            <text x={bldX + bldW + 6} y={fy + floorH / 2 + 3} fill="rgba(74,159,212,0.7)" fontSize="7" fontFamily="Courier New">FL {floorNum < 10 ? '0' : ''}{floorNum}</text>
            {/* Dimension tick */}
            <line x1={bldX - 8} y1={fy} x2={bldX - 4} y2={fy} stroke="rgba(74,159,212,0.4)" strokeWidth="0.5" />
          </g>
        )
      })}

      {/* Building outline */}
      <rect x={bldX} y={bldY} width={bldW} height={floorH * floorCount} fill="none" stroke="#4a9fd4" strokeWidth="2" />

      {/* BASEMENT — EV PARKING */}
      <rect
        x={bldX - 20}
        y={bldY + floorH * floorCount}
        width={bldW + 40}
        height={basementH}
        fill="rgba(74,159,212,0.05)"
        stroke="#4a9fd4"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      {/* EV spots */}
      {[0, 1, 2, 3].map(s => (
        <g key={s}>
          <rect
            x={bldX - 10 + s * 72}
            y={bldY + floorH * floorCount + 10}
            width={60}
            height={45}
            fill="rgba(96,165,250,0.08)"
            stroke="rgba(96,165,250,0.5)"
            strokeWidth="1"
          />
          {/* EV bolt icon */}
          <text x={bldX - 10 + s * 72 + 30} y={bldY + floorH * floorCount + 38} fill="#60a5fa" fontSize="14" fontFamily="sans-serif" textAnchor="middle">⚡</text>
          <text x={bldX - 10 + s * 72 + 30} y={bldY + floorH * floorCount + 51} fill="rgba(96,165,250,0.7)" fontSize="6" fontFamily="Courier New" textAnchor="middle">EV-{s + 1}</text>
        </g>
      ))}
      <text x={bldX + bldW / 2} y={bldY + floorH * floorCount + basementH + 12} fill="#60a5fa" fontSize="7.5" fontFamily="Courier New" textAnchor="middle">▼ EV CHARGING — BASEMENT LEVEL</text>

      {/* Dimension arrows */}
      <line x1={bldX - 22} y1={bldY} x2={bldX - 22} y2={bldY + floorH * floorCount} stroke="rgba(74,159,212,0.35)" strokeWidth="0.75" />
      <text x={bldX - 30} y={bldY + (floorH * floorCount) / 2} fill="rgba(74,159,212,0.5)" fontSize="6.5" fontFamily="Courier New" textAnchor="middle" transform={`rotate(-90, ${bldX - 30}, ${bldY + (floorH * floorCount) / 2})`}>FLOORS 1–{floorCount}</text>

      {/* Alert annotation — floor 6 (i=2 from top) */}
      <line x1={bldX + bldW} y1={bldY + 2 * floorH + floorH / 2} x2={bldX + bldW + 30} y2={bldY + 2 * floorH + floorH / 2 - 20} stroke="#ef4444" strokeWidth="0.75" strokeDasharray="3 2" />
      <circle cx={bldX + bldW + 32} cy={bldY + 2 * floorH + floorH / 2 - 21} r="5" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1" />
      <text x={bldX + bldW + 38} y={bldY + 2 * floorH + floorH / 2 - 17} fill="#ef4444" fontSize="6.5" fontFamily="Courier New">HVAC ALERT</text>
    </svg>
  )
}
