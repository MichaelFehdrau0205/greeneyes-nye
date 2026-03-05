const { initDb, getDB, saveDb } = require('./database')

;(async () => {
  await initDb()
  const db = getDB()

  console.log('🌱 Seeding GreenEyes NYC database...')

  // Clear existing data
  db.exec(`
  DELETE FROM user_buildings;
  DELETE FROM users;
  DELETE FROM floors;
  DELETE FROM sensors;
  DELETE FROM alerts;
  DELETE FROM solar_readings;
  DELETE FROM energy_readings;
  DELETE FROM compliance_snapshots;
  DELETE FROM ll97_limits;
  DELETE FROM buildings;
`)

// ── Buildings ──
const insertBuilding = db.prepare(`
  INSERT INTO buildings (name, address, borough, year_built, floors, gross_sq_ft, owner)
  VALUES (@name, @address, @borough, @year_built, @floors, @gross_sq_ft, @owner)
`)

const b1 = insertBuilding.run({ name: '30 Hudson Yards', address: '30 Hudson Yards, New York, NY 10001', borough: 'Manhattan', year_built: 2019, floors: 73, gross_sq_ft: 2600000, owner: 'Related Companies' })
const b2 = insertBuilding.run({ name: 'One World Trade Center', address: '285 Fulton St, New York, NY 10007', borough: 'Manhattan', year_built: 2014, floors: 104, gross_sq_ft: 3500000, owner: 'Port Authority' })
const b3 = insertBuilding.run({ name: '432 Park Avenue', address: '432 Park Ave, New York, NY 10022', borough: 'Manhattan', year_built: 2015, floors: 96, gross_sq_ft: 396000, owner: 'CIM Group' })

const buildingIds = [b1.lastInsertRowid, b2.lastInsertRowid, b3.lastInsertRowid]

// ── LL97 Limits ──
const insertLL97 = db.prepare(`
  INSERT INTO ll97_limits (building_id, year, carbon_limit, energy_limit, fine_per_ton)
  VALUES (@building_id, @year, @carbon_limit, @energy_limit, @fine_per_ton)
`)
buildingIds.forEach(id => {
  insertLL97.run({ building_id: id, year: 2025, carbon_limit: 4.2, energy_limit: 38.5, fine_per_ton: 268 })
})

// ── Compliance Snapshots ──
const insertCompliance = db.prepare(`
  INSERT INTO compliance_snapshots (building_id, snapshot_date, ll97_emissions_pct, energy_intensity_pct, carbon_offset_pct, fine_risk_amount, days_remaining, deadline)
  VALUES (@building_id, @snapshot_date, @ll97_emissions_pct, @energy_intensity_pct, @carbon_offset_pct, @fine_risk_amount, @days_remaining, @deadline)
`)
const today = new Date().toISOString().split('T')[0]
insertCompliance.run({ building_id: buildingIds[0], snapshot_date: today, ll97_emissions_pct: 73, energy_intensity_pct: 58, carbon_offset_pct: 41, fine_risk_amount: 42000, days_remaining: 60, deadline: '2025-05-01' })
insertCompliance.run({ building_id: buildingIds[1], snapshot_date: today, ll97_emissions_pct: 61, energy_intensity_pct: 49, carbon_offset_pct: 55, fine_risk_amount: 18500, days_remaining: 60, deadline: '2025-05-01' })
insertCompliance.run({ building_id: buildingIds[2], snapshot_date: today, ll97_emissions_pct: 88, energy_intensity_pct: 71, carbon_offset_pct: 29, fine_risk_amount: 74000, days_remaining: 60, deadline: '2025-05-01' })

// ── Energy Readings (7 days per building) ──
const insertEnergy = db.prepare(`
  INSERT INTO energy_readings (building_id, reading_date, kwh_actual, kwh_limit, peak_demand_kw, previous_week_kw)
  VALUES (@building_id, @reading_date, @kwh_actual, @kwh_limit, @peak_demand_kw, @previous_week_kw)
`)
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const energySamples = [820, 910, 875, 760, 930, 680, 847]

buildingIds.forEach((id) => {
  dayNames.forEach((day, i) => {
    const variance = Math.round((Math.random() - 0.5) * 80)
    const kwh_actual = energySamples[i] + variance
    insertEnergy.run({
      building_id: id,
      reading_date: day,
      kwh_actual,
      kwh_limit: 900,
      peak_demand_kw: kwh_actual,
      previous_week_kw: energySamples[i] - 30,
    })
  })
})

// ── Solar Readings ──
const insertSolar = db.prepare(`
  INSERT INTO solar_readings (building_id, reading_date, output_kw, output_kwh_today, co2_offset_tons, money_saved, capacity_pct, ac_score, e_score, h_score)
  VALUES (@building_id, @reading_date, @output_kw, @output_kwh_today, @co2_offset_tons, @money_saved, @capacity_pct, @ac_score, @e_score, @h_score)
`)
insertSolar.run({ building_id: buildingIds[0], reading_date: today, output_kw: 214, output_kwh_today: 1240, co2_offset_tons: 0.82, money_saved: 186, capacity_pct: 68, ac_score: 82, e_score: 74, h_score: 61 })
insertSolar.run({ building_id: buildingIds[1], reading_date: today, output_kw: 310, output_kwh_today: 1800, co2_offset_tons: 1.1, money_saved: 245, capacity_pct: 77, ac_score: 88, e_score: 80, h_score: 72 })
insertSolar.run({ building_id: buildingIds[2], reading_date: today, output_kw: 95, output_kwh_today: 560, co2_offset_tons: 0.38, money_saved: 72, capacity_pct: 45, ac_score: 64, e_score: 58, h_score: 49 })

// ── Alerts ──
const insertAlert = db.prepare(`
  INSERT INTO alerts (building_id, alert_type, severity, title, description, created_at)
  VALUES (@building_id, @alert_type, @severity, @title, @description, @created_at)
`)
buildingIds.forEach(id => {
  insertAlert.run({ building_id: id, alert_type: 'HVAC', severity: 'critical', title: 'HVAC Overload – Floor 42', description: 'Unit 42-A drawing 340% above baseline. Immediate inspection required.', created_at: new Date().toISOString() })
  insertAlert.run({ building_id: id, alert_type: 'WATER', severity: 'warning', title: 'Water Pressure Anomaly – Floor 18', description: 'Pressure reading 18% below normal. Possible leak detected in riser.', created_at: new Date().toISOString() })
  insertAlert.run({ building_id: id, alert_type: 'LIGHTING', severity: 'info', title: 'Lights On After Hours – Floor 7', description: 'Occupancy sensors show no motion but lighting remains active since 11 PM.', created_at: new Date().toISOString() })
})

// ── Sensors ──
const insertSensor = db.prepare(`
  INSERT INTO sensors (building_id, sensor_type, status, last_heartbeat, location)
  VALUES (@building_id, @sensor_type, @status, @last_heartbeat, @location)
`)
const sensorTypes = [
  { sensor_type: 'HVAC', status: 'WARN', location: 'Roof & Mechanical' },
  { sensor_type: 'Lighting', status: 'ONLINE', location: 'All Floors' },
  { sensor_type: 'Solar', status: 'ONLINE', location: 'Roof Array' },
  { sensor_type: 'Water', status: 'ONLINE', location: 'Risers & Basement' },
  { sensor_type: 'Backup Power', status: 'ONLINE', location: 'Basement Level B2' },
]
buildingIds.forEach(id => {
  sensorTypes.forEach(s => {
    insertSensor.run({ building_id: id, ...s, last_heartbeat: new Date().toISOString() })
  })
})

// ── Floors ──
const insertFloor = db.prepare(`
  INSERT INTO floors (building_id, floor_number, energy_status, occupancy_pct)
  VALUES (@building_id, @floor_number, @energy_status, @occupancy_pct)
`)
buildingIds.forEach(id => {
  for (let f = 1; f <= 30; f++) {
    const status = f === 6 || f === 18 ? 'critical' : f === 10 || f === 23 ? 'elevated' : 'normal'
    insertFloor.run({ building_id: id, floor_number: f, energy_status: status, occupancy_pct: Math.round(40 + Math.random() * 55) })
  }
})

// ── Users ──
const insertUser = db.prepare(`INSERT INTO users (name, email, initials, role) VALUES (@name, @email, @initials, @role)`)
const u1 = insertUser.run({ name: 'Michael Fehdrau', email: 'michael@greeneyesnyc.com', initials: 'MF', role: 'admin' })
const u2 = insertUser.run({ name: 'Sam Rivera', email: 'sam@greeneyesnyc.com', initials: 'SR', role: 'manager' })

const insertUB = db.prepare(`INSERT INTO user_buildings (user_id, building_id) VALUES (?, ?)`)
buildingIds.forEach(id => {
  insertUB.run(u1.lastInsertRowid, id)
  insertUB.run(u2.lastInsertRowid, id)
})

  console.log('✅ Seed complete — 3 buildings, readings, alerts, sensors, users loaded.')
  saveDb()
})()
