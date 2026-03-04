const API_BASE = '/api'

const MOCK_BUILDINGS = [
  { id: 1, name: '30 Hudson Yards', address: '30 Hudson Yards, New York, NY 10001', borough: 'Manhattan', floors: 73, gross_sq_ft: 2600000 },
  { id: 2, name: 'One World Trade Center', address: '285 Fulton St, New York, NY 10007', borough: 'Manhattan', floors: 104, gross_sq_ft: 3500000 },
  { id: 3, name: '432 Park Avenue', address: '432 Park Ave, New York, NY 10022', borough: 'Manhattan', floors: 96, gross_sq_ft: 396000 },
]

const MOCK_LL97 = {
  building_id: 1,
  year: 2025,
  carbon_limit: 4.2,
  energy_limit: 38.5,
  fine_per_ton: 268,
  fine_risk_amount: 42000,
  days_until_deadline: 60,
  deadline: '2025-05-01',
}

const MOCK_COMPLIANCE = {
  building_id: 1,
  ll97_emissions_pct: 73,
  energy_intensity_pct: 58,
  carbon_offset_pct: 41,
  fine_risk_amount: 42000,
  deadline: '2025-05-01',
  days_remaining: 60,
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

export const getBuildings = () => safeFetch(`${API_BASE}/buildings`, MOCK_BUILDINGS)

export const getBuildingById = (id) => safeFetch(`${API_BASE}/buildings/${id}`, MOCK_BUILDINGS.find(b => b.id === id) || MOCK_BUILDINGS[0])

export const getLL97Data = (buildingId) => safeFetch(`${API_BASE}/buildings/${buildingId}/ll97`, MOCK_LL97)

export const getComplianceSnapshot = (buildingId) => safeFetch(`${API_BASE}/buildings/${buildingId}/compliance`, MOCK_COMPLIANCE)
