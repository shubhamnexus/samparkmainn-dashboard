import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, LineChart, BarChart, TrendingUp, Target, Clock } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ProgramPlan {
  attribute: string
  year1: number
  year2: number
  year3: number
  total: number
}

interface ProgramGoalsProps {
  period: string;
}

const inputStyles = `
  /* Remove arrows from number input */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`

export function ProgramGoals({ period }: ProgramGoalsProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedTerm, setSelectedTerm] = useState<string>("1")
  const [showChart, setShowChart] = useState(true)
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([
    "Investment",
    "No of Schools to be Covered",
    "No of Teachers to be Trained"
  ])
  const [programPlan, setProgramPlan] = useState<ProgramPlan[]>([
    { attribute: "Investment", year1: 1000000, year2: 800000, year3: 600000, total: 2400000 },
    { attribute: "No of District to be Covered", year1: 10, year2: 8, year3: 5, total: 23 },
    { attribute: "No of Blocks to be Covered", year1: 30, year2: 24, year3: 15, total: 69 },
    { attribute: "No of Schools to be Covered", year1: 100, year2: 80, year3: 50, total: 230 },
    { attribute: "No of Teachers to be Trained", year1: 100, year2: 80, year3: 60, total: 240 },
    { attribute: "No of Kits to be Distributed", year1: 1000, year2: 800, year3: 500, total: 2300 },
    { attribute: "No of Sampark TV to be Distributed", year1: 1500, year2: 900, year3: 600, total: 3000 },
    { attribute: "No of TV to be Distributed", year1: 500, year2: 400, year3: 300, total: 1200 },
  ])

  const calculateTerm = () => {
    return parseInt(selectedTerm)
  }

  const updatePlanValue = (index: number, year: 'year1' | 'year2' | 'year3', value: string) => {
    const newValue = parseFloat(value) || 0
    const updatedPlan = [...programPlan]
    updatedPlan[index] = {
      ...updatedPlan[index],
      [year]: newValue,
      total: updatedPlan[index].year1 + updatedPlan[index].year2 + updatedPlan[index].year3
    }
    setProgramPlan(updatedPlan)
  }

  const toggleAttributeSelection = (attribute: string) => {
    setSelectedAttributes(prev =>
      prev.includes(attribute)
        ? []
        : [attribute]
    )
  }

  const chartData = programPlan
    .filter(plan => selectedAttributes.includes(plan.attribute))
    .flatMap(plan => [
      { year: "Year 1", attribute: plan.attribute, value: plan.year1 },
      { year: "Year 2", attribute: plan.attribute, value: plan.year2 },
      { year: "Year 3", attribute: plan.attribute, value: plan.year3 }
    ])

  return (
    <div className="space-y-4 px-4 pb-4 pt-0 max-w-7xl mx-auto">
      <style>{inputStyles}</style>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 p-4 py-8 rounded-3xl border-2 border-orange-200/60 shadow-lg">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold leading-[1.3] py-1 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
            Program Planning
          </h1>
          <p className="text-orange-600/90 text-xl font-medium">
            Define program objectives and track progress across years
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-medium">Strategic Goals</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-medium">Progress Tracking</span>
          </div>
        </div>
      </div>

      {/* Program Duration Section */}
      <Card className="p-4 shadow-lg border-orange-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-700">Program Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-12 hover:bg-orange-50 border-orange-200">
                  <CalendarIcon className="mr-2 h-5 w-5 text-orange-600" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-700">Program End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-12 hover:bg-orange-50 border-orange-200">
                  <CalendarIcon className="mr-2 h-5 w-5 text-orange-600" />
                  {endDate ? format(endDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-700">Term (years)</Label>
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="h-12 bg-orange-50/50 border-orange-200">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="2">2 Years</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Program Plan Table */}
      <Card className="p-4 shadow-lg border-orange-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Program Plan
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-orange-50/50 p-2 rounded-lg">
              <Switch
                checked={showChart}
                onCheckedChange={setShowChart}
                className="data-[state=checked]:bg-orange-600"
              />
              <Label className="text-gray-700 font-medium">Show Chart</Label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-orange-100">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50/50 hover:bg-orange-50/50">
                <TableHead className="w-[300px] text-gray-700 font-semibold">Attribute</TableHead>
                <TableHead className="text-gray-700 font-semibold">Year 1</TableHead>
                <TableHead className="text-gray-700 font-semibold">Year 2</TableHead>
                <TableHead className="text-gray-700 font-semibold">Year 3</TableHead>
                <TableHead className="text-gray-700 font-semibold">Total</TableHead>
                {showChart && <TableHead className="text-gray-700 font-semibold">Chart</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {programPlan.map((plan, index) => (
                <TableRow key={plan.attribute} className="hover:bg-orange-50/30">
                  <TableCell className="font-medium text-gray-800">{plan.attribute}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={plan.year1}
                      readOnly
                      className="w-28 bg-orange-50/50 border-orange-200"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={plan.year2}
                      readOnly
                      className="w-28 bg-orange-50/50 border-orange-200"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={plan.year3}
                      readOnly
                      className="w-28 bg-orange-50/50 border-orange-200"
                    />
                  </TableCell>
                  <TableCell className="font-semibold text-orange-700">{plan.total}</TableCell>
                  {showChart && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAttributeSelection(plan.attribute)}
                        className={`hover:bg-orange-100 ${
                          selectedAttributes.includes(plan.attribute) 
                            ? "text-orange-600 bg-orange-50" 
                            : "text-gray-500"
                        }`}
                      >
                        <LineChart className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Trend Chart */}
        {showChart && selectedAttributes.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-orange-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Trends</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #f3f4f6',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  {selectedAttributes.map((attribute, index) => (
                    <Line 
                      key={attribute}
                      type="monotone" 
                      dataKey="value" 
                      name={attribute}
                      stroke={index === 0 ? "#f97316" : index === 1 ? "#ea580c" : "#c2410c"}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
} 