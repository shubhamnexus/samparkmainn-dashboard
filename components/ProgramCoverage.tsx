import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { PARTNERS, PERIODS } from "@/data/constants"
import { 
  IndianRupee, 
  School, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Package, 
  BookOpen, 
  Tv 
} from "lucide-react"
import { useMemo } from "react"

interface ProgramCoverageProps {
  period: string;
}

interface Metrics {
  programAnnualBudget: number
  noOfSchoolsInState: number
  noOfSchoolsCoveredInPlan: number
  noOfStudentsInState: number
  noOfStudentsCoveredInPlan: number
  noOfSparks: number
  noOfKitsDistributed: number
  noOfTeachersToTrained: number
  samparkTvLedDistributed: number
}

// Simulated data for different states
const stateData: Record<string, Metrics> = {
  "karnataka": {
    programAnnualBudget: 450000000,
    noOfSchoolsInState: 28000,
    noOfSchoolsCoveredInPlan: 18000,
    noOfStudentsInState: 8400000,
    noOfStudentsCoveredInPlan: 5400000,
    noOfSparks: 16200000,
    noOfKitsDistributed: 54000,
    noOfTeachersToTrained: 90000,
    samparkTvLedDistributed: 18000
  },
  "maharashtra": {
    programAnnualBudget: 550000000,
    noOfSchoolsInState: 32000,
    noOfSchoolsCoveredInPlan: 22000,
    noOfStudentsInState: 9600000,
    noOfStudentsCoveredInPlan: 6600000,
    noOfSparks: 19800000,
    noOfKitsDistributed: 66000,
    noOfTeachersToTrained: 110000,
    samparkTvLedDistributed: 22000
  },
  "tamil-nadu": {
    programAnnualBudget: 400000000,
    noOfSchoolsInState: 25000,
    noOfSchoolsCoveredInPlan: 15000,
    noOfStudentsInState: 7500000,
    noOfStudentsCoveredInPlan: 4500000,
    noOfSparks: 13500000,
    noOfKitsDistributed: 45000,
    noOfTeachersToTrained: 75000,
    samparkTvLedDistributed: 15000
  },
  "telangana": {
    programAnnualBudget: 350000000,
    noOfSchoolsInState: 22000,
    noOfSchoolsCoveredInPlan: 12000,
    noOfStudentsInState: 6600000,
    noOfStudentsCoveredInPlan: 3600000,
    noOfSparks: 10800000,
    noOfKitsDistributed: 36000,
    noOfTeachersToTrained: 60000,
    samparkTvLedDistributed: 12000
  }
}

// Period multipliers to simulate different time periods
const periodMultipliers: Record<string, number> = {
  "q1": 0.25,  // Q1 only
  "q2": 0.5,   // Q1 + Q2
  "q3": 0.75,  // Q1 + Q2 + Q3
  "q4": 1,     // Q1 + Q2 + Q3 + Q4
  "fy": 1      // Full year (same as Q4)
}

export function ProgramCoverage({
  period,
}: ProgramCoverageProps) {
  const metrics = useMemo(() => {
    const baseMetrics = stateData["karnataka"]
    const multiplier = periodMultipliers[period.toLowerCase()] || 1

    return {
      programAnnualBudget: baseMetrics.programAnnualBudget,
      noOfSchoolsInState: baseMetrics.noOfSchoolsInState,
      noOfSchoolsCoveredInPlan: Math.round(baseMetrics.noOfSchoolsCoveredInPlan * multiplier),
      noOfStudentsInState: baseMetrics.noOfStudentsInState,
      noOfStudentsCoveredInPlan: Math.round(baseMetrics.noOfStudentsCoveredInPlan * multiplier),
      noOfSparks: Math.round(baseMetrics.noOfSparks * multiplier),
      noOfKitsDistributed: Math.round(baseMetrics.noOfKitsDistributed * multiplier),
      noOfTeachersToTrained: Math.round(baseMetrics.noOfTeachersToTrained * multiplier),
      samparkTvLedDistributed: Math.round(baseMetrics.samparkTvLedDistributed * multiplier)
    }
  }, [period])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border-2 border-orange-200/60 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Program Coverage
          </h1>
          <p className="text-orange-600/80 text-lg">
            Track and monitor program objectives and milestones
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Program Annual Budget Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">Program Annual Budget</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">₹{metrics.programAnnualBudget.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">Annual</p>
            </div>
          </CardContent>
        </Card>

        {/* No of Schools in State Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of Schools in State</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfSchoolsInState.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">Total</p>
            </div>
          </CardContent>
        </Card>

        {/* No of Schools covered in plan Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of Schools covered in plan</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfSchoolsCoveredInPlan.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>

        {/* No of Students in State Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of Students in State</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfStudentsInState.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">Total</p>
            </div>
          </CardContent>
        </Card>

        {/* No of Students covered in plan Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of Students covered in plan</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfStudentsCoveredInPlan.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>

        {/* No of Sparks Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of Sparks</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfSparks.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>

        {/* No of kits Distributed Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of kits Distributed</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfKitsDistributed.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>

        {/* No of teachers to be trained Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">No of teachers to be trained</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.noOfTeachersToTrained.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>

        {/* Sampark TV/LED Distributed Card */}
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-sm">Sampark TV/LED Distributed</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{metrics.samparkTvLedDistributed.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">FY</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 