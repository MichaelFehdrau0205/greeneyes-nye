import React from 'react'

const STATUS_COLOR = {
  normal: { bg: '#4ade80', opacity: 0.45, label: 'NORM' },
  elevated: { bg: '#fbbf24', opacity: 0.6, label: 'ELEV' },
  critical: { bg: '#f87171', opacity: 0.75, label: 'CRIT' },
}

export default function FloorHeatmap({ floors = [] }) {
  const defaultFloors = Array.from({ length: 30 }, (_, i) => ({
    floor: i + 1,
    energy_status: i === 5 || i === 17 ? 'critical' : i === 9 || i === 22 ? 'elevated' : 'normal',
  }))

  const data = floors.length ? floors : defaultFloors

  return (
    <div className="dashboard-panel rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Floor Energy Grid</p>
        <div className="flex gap-2">
          {Object.entries(STATUS_COLOR).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1 text-[9px] text-gray-500">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: v.bg, opacity: v.opacity }} />
              {v.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
        {data.slice(0, 30).map((f) => {
          const s = STATUS_COLOR[f.energy_status] || STATUS_COLOR.normal
          return (
            <div
              key={f.floor}
              className="relative rounded-sm flex items-center justify-center cursor-default transition-all hover:opacity-100 group"
              style={{
                height: '28px',
                background: s.bg,
                opacity: s.opacity,
              }}
              title={`Floor ${f.floor}: ${f.energy_status}`}
            >
              <span className="text-[8px] font-bold text-white/80">{f.floor}</span>
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                FL {f.floor} — {f.energy_status}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
