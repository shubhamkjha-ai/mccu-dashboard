"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { Activity } from "lucide-react"

// Mock 24-hour data
const captureData = [
  { time: "00:00", rate: 1.8 },
  { time: "01:00", rate: 1.5 },
  { time: "02:00", rate: 1.2 },
  { time: "03:00", rate: 1.0 },
  { time: "04:00", rate: 0.8 },
  { time: "05:00", rate: 1.1 },
  { time: "06:00", rate: 1.5 },
  { time: "07:00", rate: 2.0 },
  { time: "08:00", rate: 2.4 },
  { time: "09:00", rate: 2.8 },
  { time: "10:00", rate: 3.2 },
  { time: "11:00", rate: 3.5 },
  { time: "12:00", rate: 3.3 },
  { time: "13:00", rate: 3.1 },
  { time: "14:00", rate: 3.4 },
  { time: "15:00", rate: 3.6 },
  { time: "16:00", rate: 3.2 },
  { time: "17:00", rate: 2.9 },
  { time: "18:00", rate: 2.5 },
  { time: "19:00", rate: 2.2 },
  { time: "20:00", rate: 2.0 },
  { time: "21:00", rate: 1.8 },
  { time: "22:00", rate: 1.6 },
  { time: "23:00", rate: 1.9 },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value.toFixed(2)} kg/hr
        </p>
      </div>
    )
  }
  return null
}

export function CaptureChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5 text-primary" />
            CO₂ Capture Rate
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time capture performance over 24 hours (kg/hr)
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-medium text-muted-foreground">Live</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={captureData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="captureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="oklch(0.28 0.01 260)"
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                stroke="oklch(0.60 0.01 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                tickMargin={8}
              />
              <YAxis 
                stroke="oklch(0.60 0.01 260)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, 4]}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="oklch(0.72 0.17 160)"
                strokeWidth={2}
                fill="url(#captureGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
