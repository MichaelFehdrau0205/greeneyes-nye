const API_BASE = '/api'

const MOCK_SENSORS = [
  { id: 1, sensor_type: 'HVAC', status: 'WARN', last_heartbeat: new Date().toISOString(), location: 'Roof & Mechanical' },
  { id: 2, sensor_type: 'Lighting', status: 'ONLINE', last_heartbeat: new Date().toISOString(), location: 'All Floors' },
  { id: 3, sensor_type: 'Solar', status: 'ONLINE', last_heartbeat: new Date().toISOString(), location: 'Roof Array' },
  { id: 4, sensor_type: 'Water', status: 'ONLINE', last_heartbeat: new Date().toISOString(), location: 'Risers & Basement' },
  { id: 5, sensor_type: 'Backup Power', status: 'ONLINE', last_heartbeat: new Date().toISOString(), location: 'Basement Level B2' },
]

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return fallback
  }
}

export const getSensors = (buildingId) =>
  safeFetch(`${API_BASE}/sensors/${buildingId}`, MOCK_SENSORS)

export const getSensorStatus = (buildingId) =>
  safeFetch(`${API_BASE}/sensors/${buildingId}/status`, { online: true, last_heartbeat: new Date().toISOString() })
