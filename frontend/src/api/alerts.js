const API_BASE = '/api'

const MOCK_ALERTS = [
  { id: 1, alert_type: 'HVAC', severity: 'critical', title: 'HVAC Overload – Floor 42', description: 'Unit 42-A drawing 340% above baseline. Immediate inspection required.', created_at: '2025-04-01T14:22:00Z' },
  { id: 2, alert_type: 'WATER', severity: 'warning', title: 'Water Pressure Anomaly – Floor 18', description: 'Pressure reading 18% below normal. Possible leak detected in riser.', created_at: '2025-04-01T11:05:00Z' },
  { id: 3, alert_type: 'LIGHTING', severity: 'info', title: 'Lights On After Hours – Floor 7', description: 'Occupancy sensors show no motion but lighting remains active since 11 PM.', created_at: '2025-04-01T23:10:00Z' },
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

export const getAlerts = (buildingId) =>
  safeFetch(`${API_BASE}/alerts/${buildingId}`, MOCK_ALERTS)

export const getAlertCount = (buildingId) =>
  safeFetch(`${API_BASE}/alerts/${buildingId}/count`, { count: MOCK_ALERTS.length })
