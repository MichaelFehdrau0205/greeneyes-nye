import React, { useState, useEffect } from 'react'
import BuildingSelector from '../dashboard/BuildingSelector'
import FineRiskMeter from '../dashboard/FineRiskMeter'
import ComplianceProgress from '../dashboard/ComplianceProgress'
import CountdownTimer from '../dashboard/CountdownTimer'
import EnergyChart from '../dashboard/EnergyChart'
import FloorHeatmap from '../dashboard/FloorHeatmap'
import SolarWidget from '../dashboard/SolarWidget'
import AlertsPanel from '../dashboard/AlertsPanel'
import SystemsStatus from '../dashboard/SystemsStatus'
import KPICard from '../dashboard/KPICard'

import { getComplianceSnapshot } from '../../api/buildings'
import { getEnergyReadings, getCurrentUsage, getFloorHeatmap } from '../../api/energy'
import { getSolarReadings } from '../../api/solar'
import { getAlerts } from '../../api/alerts'
import { getSensors } from '../../api/sensors'

export default function Page3Dashboard() {
  const [buildingId, setBuildingId] = useState(1)
  const [compliance, setCompliance] = useState(null)
  const [energy, setEnergy] = useState([])
  const [currentUsage, setCurrentUsage] = useState(null)
  const [floors, setFloors] = useState([])
  const [solar, setSolar] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    getComplianceSnapshot(buildingId).then(setCompliance)
    getEnergyReadings(buildingId).then(setEnergy)
    getCurrentUsage(buildingId).then(setCurrentUsage)
    getFloorHeatmap(buildingId).then(setFloors)
    getSolarReadings(buildingId).then(setSolar)
    getAlerts(buildingId).then(setAlerts)
    getSensors(buildingId).then(setSensors)
  }, [buildingId])

  const user = { initials: 'MF', name: 'Michael Fehdrau' }

  return (
    <section
      id="page3"
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #020917 0%, #0a0f1e 50%, #050d1a 100%)' }}
    >
      {/* ─── Dashboard Header ─── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800/60 sticky top-0 z-20 backdrop-blur-md bg-gray-950/80">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs font-black">G</span>
            </div>
            <span className="text-white font-black text-base tracking-tight">GreenEyes <span className="text-green-400">NYC</span></span>
          </div>
          <div className="h-4 w-px bg-gray-700" />
          <BuildingSelector selectedId={buildingId} onChange={setBuildingId} />
        </div>

        <div className="flex items-center gap-4">
          {/* Status dot */}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">LIVE</span>
          </div>

          {/* Alert bell */}
          <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <span className="text-lg">🔔</span>
            {alerts.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {alerts.length}
              </span>
            )}
          </button>

          {/* User avatar */}
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors">
            <span className="text-white text-xs font-black">{user.initials}</span>
          </div>
        </div>
      </header>

      {/* ─── Dashboard Body ─── */}
      <div className="flex-1 p-5 grid gap-4" style={{ gridTemplateRows: 'auto auto auto auto', gridTemplateColumns: '1fr' }}>

        {/* ROW 1 — Compliance trio */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1.6fr 0.8fr' }}>
          <FineRiskMeter
            riskAmount={compliance?.fine_risk_amount ?? 42000}
            riskPct={compliance?.ll97_emissions_pct ?? 58}
          />
          <ComplianceProgress data={compliance} />
          <CountdownTimer
            days={compliance?.days_remaining ?? 60}
            deadline={compliance?.deadline ?? '2025-05-01'}
          />
        </div>

        {/* ROW 2 — Energy KPI + chart */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '0.6fr 2fr' }}>
          <KPICard
            title="Current Usage"
            value={currentUsage?.current_kw ?? 847}
            unit="kW"
            change={currentUsage?.change_pct ?? 12}
            direction={currentUsage?.direction ?? 'up'}
            icon="⚡"
            glowColor="green"
          />
          <EnergyChart data={energy} />
        </div>

        {/* ROW 3 — Solar KPI + Solar widget + Alerts + Systems */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '0.6fr 1.2fr 1.4fr 1fr' }}>
          <KPICard
            title="Solar Output"
            value={solar?.output_kw ?? 214}
            unit="kW"
            change={solar?.change_pct ?? 3}
            direction={solar?.direction ?? 'down'}
            icon="☀️"
            glowColor="yellow"
          />
          <SolarWidget data={solar} />
          <AlertsPanel alerts={alerts} />
          <SystemsStatus sensors={sensors} />
        </div>

        {/* ROW 4 — Alerts KPI card + Floor heatmap */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '0.6fr 2fr' }}>
          <KPICard
            title="Active Alerts"
            value={alerts.length || 3}
            icon="🚨"
            glowColor="red"
            subtitle="Requires attention"
          />
          <FloorHeatmap floors={floors} />
        </div>
      </div>
    </section>
  )
}
