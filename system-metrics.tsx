"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudCog, Gauge, Droplets, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react"

interface RadialProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

function RadialProgress({ value, size = 80, strokeWidth = 8, className }: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500"
        />
      </svg>
      <span className="absolute text-lg font-bold text-foreground">{value}%</span>
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total CO2 Captured */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total CO₂ Captured
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <CloudCog className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">48.5</span>
            <span className="text-lg text-muted-foreground">kg</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Badge 
              variant="outline" 
              className="border-primary/30 bg-primary/10 text-primary"
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              +5% from yesterday
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Capture Efficiency */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Capture Efficiency
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <Gauge className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Current Rate</span>
              <p className="text-xs text-primary">Optimal Performance</p>
            </div>
            <RadialProgress value={92} />
          </div>
        </CardContent>
      </Card>

      {/* Solvent Saturation */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Solvent Saturation
          </CardTitle>
          <div className="rounded-lg bg-warning/10 p-2">
            <Droplets className="h-4 w-4 text-warning" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">34</span>
            <span className="text-lg text-muted-foreground">%</span>
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Capacity</span>
              <span className="text-foreground">34/100%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-warning transition-all duration-500"
                style={{ width: '34%' }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-warning" />
              Replace at 80% saturation
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Revenue */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Estimated Revenue
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <IndianRupee className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <span className="text-lg text-muted-foreground">₹</span>
            <span className="text-3xl font-bold text-foreground">582.00</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Based on ₹12/kg carbon credit rate
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Badge variant="outline" className="border-border text-muted-foreground">
              48.5 kg × ₹12 = ₹582
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
