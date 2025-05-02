"use client"

import { useState } from "react"
import { LayoutDashboard, BarChart2, PieChart, FileText, Settings, ChevronLeft, Activity, Target } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { ProgramCoverage } from "./ProgramCoverage"
import { LiveUpdates } from "./LiveUpdates"
import { ProgramOverview } from "./ProgramOverview"
import { District } from "@/components/District"
import { ReportGenerator } from "./ReportGenerator"
import { ProgramGoals } from "./ProgramGoals"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { PERIODS } from "@/data/constants"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("YTD")
  const [currentView, setCurrentView] = useState("goals")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-6 shadow-sm backdrop-blur-sm bg-white/80">
        <div className="flex items-center gap-2">
          <div className="text-orange-500 text-xl bg-orange-50 p-1 rounded-lg">🎓</div>
          <div className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Sampark Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px] border-orange-200 bg-white/80 backdrop-blur-sm text-gray-700 hover:border-orange-300 hover:bg-orange-50/50 transition-colors">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                {PERIODS.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://dmdashboard.samparksmartshala.org/static/media/logo-black.03df822f383fee06ef8e6e4fb67324de.svg" alt="Logo" className="h-48 w-48" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={cn(
          "relative transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-0" : "w-64"
        )}>
          <div className={cn(
            "absolute inset-y-0 left-0 flex-shrink-0 border-r bg-white/80 backdrop-blur-sm",
            isSidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
          )}>
            <nav className="flex flex-col p-4 h-full">
              <div className="space-y-2">
                <a
                  href="#"
                  onClick={() => setCurrentView("coverage")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "coverage" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Program Coverage</span>
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("goals")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "goals" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <Target className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Program Goals</span>
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("overview")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "overview" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <PieChart className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Program Overview</span>
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("district")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "district" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>District</span>
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("report")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "report" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Generate Report</span>
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("live-updates")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 ${
                    currentView === "live-updates" ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 font-medium shadow-sm" : ""
                  }`}
                >
                  <Activity className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Live Updates</span>
                </a>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 hover:text-orange-600 transition-all">
                  <Settings className="h-5 w-5" />
                  <span className={cn("transition-opacity duration-300",
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  )}>Settings</span>
                </div>
              </div>
            </nav>
          </div>
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute -right-3 top-6 z-10 h-7 w-7 rounded-full border bg-white p-0 shadow-lg hover:bg-orange-50 hover:text-orange-600 text-gray-600 transition-colors",
              isSidebarCollapsed ? "-right-3" : "-right-3"
            )}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-300",
              isSidebarCollapsed ? "rotate-180" : ""
            )} />
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          {currentView === "goals" && (
            <ProgramGoals
              period={selectedPeriod}
            />
          )}
          {currentView === "coverage" && (
            <ProgramCoverage
              period={selectedPeriod}
            />
          )}
          {currentView === "overview" && (
            <ProgramOverview
              period={selectedPeriod}
            />
          )}
          {currentView === "district" && (
            <District
              period={selectedPeriod}
            />
          )}
          {currentView === "report" && (
            <ReportGenerator />
          )}
          {currentView === "live-updates" && <LiveUpdates />}
        </main>
      </div>
    </div>
  )
}
