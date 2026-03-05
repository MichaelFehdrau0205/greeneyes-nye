import React from 'react'

const STATUS_STYLE = {
  ONLINE: { dot: 'bg-green-400/90', badge: 'text-green-300 bg-green-400/10 border-green-400/25' },
  WARN: { dot: 'bg-amber-400 animate-pulse', badge: 'text-amber-200 bg-amber-400/10 border-amber-400/25' },
  ALERT: { dot: 'bg-red-400 animate-pulse', badge: 'text-red-300 bg-red-400/10 border-red-400/25' },
}

const SENSOR_ICON = {
  HVAC: '🌀',
  Lighting: '💡',
  Solar: '☀️',
  Water: '💧',
  'Backup Power': '🔋',
}

export default function SystemsStatus({ sensors = [] }) {
  const defaultSensors = [
    { id: 1, sensor_type: 'HVAC', status: 'WARN', location: 'Roof & Mechanical' },
    { id: 2, sensor_type: 'Lighting', status: 'ONLINE', location: 'All Floors' },
    { id: 3, sensor_type: 'Solar', status: 'ONLINE', location: 'Roof Array' },
    { id: 4, sensor_type: 'Water', status: 'ONLINE', location: 'Risers & Basement' },
    { id: 5, sensor_type: 'Backup Power', status: 'ONLINE', location: 'Basement B2' },
  ]

  const data = sensors.length ? sensors : defaultSensors

  return (
    <div className="dashboard-panel rounded-xl p-4 border border-gray-700/50 h-full">
      <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-3">Systems Status</p>

      <div className="space-y-2">
        {data.map(sensor => {
          const s = STATUS_STYLE[sensor.status] || STATUS_STYLE.ONLINE
          const icon = SENSOR_ICON[sensor.sensor_type] || '⚙️'
          return (
            <div key={sensor.id} className="flex items-center justify-between py-1.5 border-b border-gray-800/60 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-sm w-5 text-center">{icon}</span>
                <div>
                  <p className="text-[11px] font-semibold text-white">{sensor.sensor_type}</p>
                  <p className="text-[9px] text-gray-600">{sensor.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${s.badge}`}>
                  {sensor.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
