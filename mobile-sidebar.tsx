"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Circle } from "lucide-react"
import { useEffect, useState } from "react"

interface LogEntry {
  id: string
  time: string
  message: string
  type: "info" | "success" | "warning" | "system"
}

const initialLogs: LogEntry[] = [
  { id: "1", time: "10:45 AM", message: "Data synced to Cloud.", type: "success" },
  { id: "2", time: "10:40 AM", message: "CO₂ absorption rate stable at 3.2 kg/hr.", type: "info" },
  { id: "3", time: "10:35 AM", message: "Temperature adjustment completed.", type: "system" },
  { id: "4", time: "10:30 AM", message: "Solvent circulation pump running.", type: "info" },
  { id: "5", time: "10:25 AM", message: "Pressure sensor calibration done.", type: "success" },
  { id: "6", time: "10:20 AM", message: "Solvent pump activated.", type: "info" },
  { id: "7", time: "10:15 AM", message: "Flue gas inflow detected.", type: "warning" },
  { id: "8", time: "10:10 AM", message: "System boot sequence complete.", type: "system" },
  { id: "9", time: "10:05 AM", message: "All sensors initialized.", type: "success" },
  { id: "10", time: "10:00 AM", message: "MCCU System started.", type: "system" },
]

const newLogMessages = [
  { message: "Real-time monitoring active.", type: "info" as const },
  { message: "Cloud backup initiated.", type: "system" as const },
  { message: "CO₂ concentration reading: 412 ppm.", type: "info" as const },
  { message: "Efficiency check passed.", type: "success" as const },
  { message: "New flue gas batch detected.", type: "warning" as const },
]

export function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = newLogMessages[Math.floor(Math.random() * newLogMessages.length)]
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit",
        hour12: true 
      })
      
      const newEntry: LogEntry = {
        id: Date.now().toString(),
        time: timeStr,
        message: randomLog.message,
        type: randomLog.type,
      }

      setLogs((prev) => [newEntry, ...prev.slice(0, 14)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "text-primary"
      case "warning":
        return "text-warning"
      case "system":
        return "text-chart-3"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Terminal className="h-5 w-5 text-primary" />
              System Logs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Live monitoring feed
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1">
            <Circle className="h-2 w-2 animate-pulse fill-primary text-primary" />
            <span className="text-xs font-medium text-primary">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-b-lg bg-background/50">
          <ScrollArea className="h-[280px]">
            <div className="space-y-0 font-mono text-sm">
              {logs.map((log, index) => (
                <div 
                  key={log.id} 
                  className={`flex items-start gap-3 border-b border-border/50 px-4 py-2.5 transition-colors hover:bg-secondary/50 ${
                    index === 0 ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="shrink-0 text-xs text-muted-foreground">
                    [{log.time}]
                  </span>
                  <span className={`${getTypeColor(log.type)}`}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
