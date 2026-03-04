const API_BASE = '/api'

const MOCK_SOLAR = {
  output_kw: 214,
  change_pct: -3,
  direction: 'down',
  output_kwh_today: 1240,
  co2_offset_tons: 0.82,
  money_saved: 186,
  capacity_pct: 68,
  ac_score: 82,
  e_score: 74,
  h_score: 61,
}

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return fallback
  }
}

export const getSolarReadings = (buildingId) =>
  safeFetch(`${API_BASE}/solar/${buildingId}`, MOCK_SOLAR)

export const getSolarPerformance = (buildingId) =>
  safeFetch(`${API_BASE}/solar/${buildingId}/performance`, MOCK_SOLAR)
