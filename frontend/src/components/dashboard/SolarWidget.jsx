import React from 'react'

function ScoreBar({ label, score, color }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-gray-400 font-bold tracking-widest">{label}</span>
        <span className="text-[10px] font-black" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${score}%`, background: color, boxShadow: `0 0 4px ${color}66`, transition: 'width 1s ease-out' }}
        />
      </div>
    </div>
  )
}

export default function SolarWidget({ data }) {
  const d = data || {
    output_kwh_today: 1240,
    co2_offset_tons: 0.82,
    money_saved: 186,
    capacity_pct: 68,
    ac_score: 82,
    e_score: 74,
    h_score: 61,
  }

  return (
    <div className="dashboard-panel rounded-xl p-4 border border-yellow-500/20 h-full">
      <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-3">Solar Performance</p>

      {/* Today stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <p className="text-[9px] text-gray-500 mb-0.5">Output</p>
          <p className="text-sm font-black text-yellow-300">{(d.output_kwh_today / 1000).toFixed(1)}<span className="text-[9px] font-normal"> MWh</span></p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <p className="text-[9px] text-gray-500 mb-0.5">CO₂ Saved</p>
          <p className="text-sm font-black text-green-400">{d.co2_offset_tons}<span className="text-[9px] font-normal"> t</span></p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <p className="text-[9px] text-gray-500 mb-0.5">$ Saved</p>
          <p className="text-sm font-black text-blue-300">${d.money_saved}</p>
        </div>
      </div>

      {/* Capacity bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-gray-400">Capacity Used</span>
          <span className="text-[10px] text-yellow-300 font-bold">{d.capacity_pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${d.capacity_pct}%`,
              background: 'linear-gradient(90deg, #22c55e, #f59e0b)',
              boxShadow: '0 0 6px rgba(245,158,11,0.4)',
              transition: 'width 1s ease-out',
            }}
          />
        </div>
      </div>

      {/* AC / E / H scores */}
      <div className="border-t border-gray-800 pt-3">
        <p className="text-[9px] text-gray-500 mb-2 uppercase tracking-wider">Score Index</p>
        <ScoreBar label="AC" score={d.ac_score} color="#60a5fa" />
        <ScoreBar label="E" score={d.e_score} color="#22c55e" />
        <ScoreBar label="H" score={d.h_score} color="#f59e0b" />
      </div>
    </div>
  )
}
