const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(__dirname, 'greeneyes.sqlite')

let db

function getDB() {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema()
  }
  return db
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS buildings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      borough TEXT,
      year_built INTEGER,
      floors INTEGER,
      gross_sq_ft INTEGER,
      owner TEXT
    );

    CREATE TABLE IF NOT EXISTS ll97_limits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      year INTEGER NOT NULL,
      carbon_limit REAL,
      energy_limit REAL,
      fine_per_ton REAL,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS compliance_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      snapshot_date TEXT,
      ll97_emissions_pct REAL,
      energy_intensity_pct REAL,
      carbon_offset_pct REAL,
      fine_risk_amount REAL,
      days_remaining INTEGER,
      deadline TEXT,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS energy_readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      reading_date TEXT NOT NULL,
      kwh_actual REAL,
      kwh_limit REAL,
      peak_demand_kw REAL,
      previous_week_kw REAL,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS solar_readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      reading_date TEXT NOT NULL,
      output_kw REAL,
      output_kwh_today REAL,
      co2_offset_tons REAL,
      money_saved REAL,
      capacity_pct REAL,
      ac_score REAL,
      e_score REAL,
      h_score REAL,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      alert_type TEXT,
      severity TEXT,
      title TEXT,
      description TEXT,
      created_at TEXT,
      resolved_at TEXT,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS sensors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      sensor_type TEXT,
      status TEXT DEFAULT 'ONLINE',
      last_heartbeat TEXT,
      location TEXT,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS floors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id INTEGER NOT NULL,
      floor_number INTEGER,
      energy_status TEXT DEFAULT 'normal',
      occupancy_pct REAL,
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      initials TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS user_buildings (
      user_id INTEGER NOT NULL,
      building_id INTEGER NOT NULL,
      PRIMARY KEY (user_id, building_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (building_id) REFERENCES buildings(id)
    );
  `)
}

module.exports = { getDB }
