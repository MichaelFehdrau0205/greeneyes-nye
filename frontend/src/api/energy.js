const API_BASE = '/api'

const MOCK_ENERGY_READINGS = [
  { day: 'Mon', kwh_actual: 820, kwh_limit: 900 },
  { day: 'Tue', kwh_actual: 910, kwh_limit: 900 },
  { day: 'Wed', kwh_actual: 875, kwh_limit: 900 },
  { day: 'Thu', kwh_actual: 760, kwh_limit: 900 },
  { day: 'Fri', kwh_actual: 930, kwh_limit: 900 },
  { day: 'Sat', kwh_actual: 680, kwh_limit: 900 },
  { day: 'Sun', kwh_actual: 847, kwh_limit: 900 },
]

const MOCK_CURRENT_USAGE = {
  current_kw: 847,
  change_pct: 12,
  direction: 'up',
  unit: 'kW',
}

const MOCK_FLOOR_HEATMAP = Array.from({ length: 30 }, (_, i) => ({
  floor: i + 1,
  energy_status: i % 7 === 3 ? 'critical' : i % 5 === 2 ? 'elevated' : 'normal',
  kwh: Math.round(28 + Math.random() * 20),
}))

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return fallback
  }
}

export const getEnergyReadings = (buildingId, days = 7) =>
  safeFetch(`${API_BASE}/energy/${buildingId}?days=${days}`, MOCK_ENERGY_READINGS)

export const getCurrentUsage = (buildingId) =>
  safeFetch(`${API_BASE}/energy/${buildingId}/current`, MOCK_CURRENT_USAGE)

export const getFloorHeatmap = (buildingId) =>
  safeFetch(`${API_BASE}/energy/${buildingId}/floors`, MOCK_FLOOR_HEATMAP)
