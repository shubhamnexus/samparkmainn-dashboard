import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { getFilteredData, getBudgetData } from "@/services/dataService"
import { format } from "date-fns"

interface ProgramOverviewProps {
  period: string;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

interface MonitoringEvent {
  date: string;
  event: string;
  status: 'completed' | 'pending' | 'upcoming';
}

interface ProgramMonitoringData {
  schoolAudits: number;
  stateMeetings: number;
  monitoringEvents: MonitoringEvent[];
}

interface TeacherTrainingData {
  trained: number;
  target: number;
  feedback: {
    positive: number;
    neutral: number;
    negative: number;
  };
  acceptanceRate: number;
  trend: Array<{ month: string; rate: number }>;
}

export function ProgramOverview({ 
  period,
  dateRange,
}: ProgramOverviewProps) {

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#FFF6ED] to-[#FFF6ED] border border-[#FFE5C2] rounded-2xl p-6" style={{ boxShadow: '0 1px 4px 0 #FFE5C2' }}>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-[#D35400]">Program Overview</h1>
          <p className="text-lg text-[#E67E22]">
            Track and monitor program objectives and milestones
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white shadow-sm rounded-lg p-3 flex items-center gap-2 border border-[#FFE5C2] hover:border-[#E67E22] transition-all duration-300 hover:shadow-md">
            <div className="p-1.5 bg-[#FFE5C2] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#D35400]">1.24M Students</p>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-3 flex items-center gap-2 border border-[#FFE5C2] hover:border-[#E67E22] transition-all duration-300 hover:shadow-md">
            <div className="p-1.5 bg-[#FFE5C2] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#D35400]">4,850 Schools</p>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-3 flex items-center gap-2 border border-[#FFE5C2] hover:border-[#E67E22] transition-all duration-300 hover:shadow-md">
            <div className="p-1.5 bg-[#FFE5C2] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#D35400]">32 Districts</p>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-3 flex items-center gap-2 border border-[#FFE5C2] hover:border-[#E67E22] transition-all duration-300 hover:shadow-md">
            <div className="p-1.5 bg-[#FFE5C2] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#D35400]">₹33.4 Cr Investment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Districts Covered */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Districts Covered</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">84%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">32</span>
                <span className="text-sm text-gray-500 ml-1">/ 38</span>
              </div>
              <p className="text-xs text-green-600 font-medium">+3 from last year</p>
            </div>
          </CardContent>
        </Card>

        {/* Blocks */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Blocks</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">85%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">187</span>
                <span className="text-sm text-gray-500 ml-1">/ 220</span>
              </div>
              <p className="text-xs text-green-600 font-medium">+12 from last quarter</p>
            </div>
          </CardContent>
        </Card>

        {/* Students Enrolled */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Students Enrolled</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">83%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">1.2M</span>
                <span className="text-sm text-gray-500 ml-1">/ 1.5M</span>
              </div>
              <p className="text-xs text-green-600 font-medium">+5.2% growth</p>
            </div>
          </CardContent>
        </Card>

        {/* Schools */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Schools</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">93%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">4.8K</span>
                <span className="text-sm text-gray-500 ml-1">/ 5.2K</span>
              </div>
              <p className="text-xs text-green-600 font-medium">+120 this quarter</p>
            </div>
          </CardContent>
        </Card>

        {/* Trained Teachers */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Trained Teachers</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">83%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">42.5K</span>
                <span className="text-sm text-gray-500 ml-1">/ 51.0K</span>
              </div>
              <p className="text-xs text-green-600 font-medium">+1,500 this month</p>
            </div>
          </CardContent>
        </Card>

        {/* Program Investment */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Program Investment</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">74%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">₹33.4</span>
                <span className="text-3xl font-bold text-gray-800">Cr</span>
                <span className="text-sm text-gray-500 ml-1">/ 450.0M</span>
              </div>
              <p className="text-xs text-orange-600 font-medium">75% of budget utilized</p>
            </div>
          </CardContent>
        </Card>

        {/* Sampark TV Distributed */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Sampark TV Distributed</h3>
              </div>
              <div className="bg-[#FFE5C2] rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E67E22]">83%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">3.3K</span>
                <span className="text-sm text-gray-500 ml-1">/ 3.9K</span>
              </div>
              <p className="text-xs text-orange-600 font-medium">83% of plan completed</p>
            </div>
          </CardContent>
        </Card>

        {/* Program Active Since */}
        <Card className="border-l-4 border-l-[#FFE5C2] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="bg-white/20 p-2 rounded-lg inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E67E22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Program Active Since</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">2.5 years</span>
              </div>
              <p className="text-xs text-orange-600 font-medium">Started June 2021</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 