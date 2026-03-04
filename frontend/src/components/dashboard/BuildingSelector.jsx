import React, { useState, useEffect } from 'react'
import { getBuildings } from '../../api/buildings'

export default function BuildingSelector({ selectedId, onChange }) {
  const [buildings, setBuildings] = useState([])

  useEffect(() => {
    getBuildings().then(setBuildings)
  }, [])

  return (
    <div className="relative">
      <select
        value={selectedId}
        onChange={e => onChange(Number(e.target.value))}
        className="appearance-none bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-green-500 cursor-pointer"
      >
        {buildings.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</div>
    </div>
  )
}
