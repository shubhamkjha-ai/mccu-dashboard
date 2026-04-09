"use client"

import { Bell, GraduationCap, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground md:text-xl">
            MCCU - Smart Monitoring Portal
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* System Status */}
        <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:flex">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-primary">System Status: Active</span>
        </div>

        {/* Mobile Status */}
        <Badge variant="outline" className="flex items-center gap-1.5 border-primary/30 bg-primary/10 text-primary sm:hidden">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Active
        </Badge>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* BIT Sindri Logo Placeholder */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary">
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}
