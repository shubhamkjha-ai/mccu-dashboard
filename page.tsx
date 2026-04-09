"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CaptureChart } from "@/components/dashboard/capture-chart"
import { LiveLogs } from "@/components/dashboard/live-logs"
import { SystemMetrics } from "@/components/dashboard/system-metrics"

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        open={mobileMenuOpen} 
        onOpenChange={setMobileMenuOpen} 
      />

      {/* Main Content */}
      <div className="md:pl-64 transition-all duration-300">
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="p-4 md:p-6 lg:p-8">
          {/* Stats Grid */}
          <StatsCards />

          {/* Charts and Logs Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Main Chart - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <CaptureChart />
              <SystemMetrics />
            </div>

            {/* Live Logs - Takes 1 column */}
            <div className="lg:col-span-1">
              <LiveLogs />
            </div>
          </div>

          {/* Footer Info */}
          <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <div>
              <p>MCCU Smart Monitoring Portal</p>
              <p className="text-xs">Developed at BIT Sindri - Department of Chemical Engineering</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {lastUpdated && <span>Last Updated: {lastUpdated}</span>}
              <span className="hidden sm:inline">|</span>
              <span>v1.0.0</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
