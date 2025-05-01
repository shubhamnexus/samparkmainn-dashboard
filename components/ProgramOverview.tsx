import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { getFilteredData, getBudgetData, getPerformanceData } from "@/services/dataService"
import { PARTNERS, PERIODS } from "@/data/constants"
import { ArrowUp, ArrowDown, CheckCircle, AlertCircle, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface ProgramOverviewProps {
  dateRange: {
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
  dateRange,
}: ProgramOverviewProps) {
  const filteredData = getFilteredData(dateRange.from, dateRange.to);
  const budgetData = getBudgetData(dateRange.from, dateRange.to);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.from || !dateRange.to) return "All Time";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  // Calculate data for program monitoring
  const programMonitoringData: ProgramMonitoringData = {
    schoolAudits: 30000,
    stateMeetings: 375,
    monitoringEvents: [
      { date: '2023-01-15', event: 'Initial Assessment', status: 'completed' },
      { date: '2023-03-20', event: 'Mid-term Review', status: 'completed' },
      { date: '2023-06-10', event: 'Progress Evaluation', status: 'completed' },
      { date: '2023-09-05', event: 'Quality Check', status: 'pending' },
      { date: '2023-12-15', event: 'Final Review', status: 'upcoming' }
    ]
  };

  // Calculate data for teacher training
  const teacherTrainingData: TeacherTrainingData = {
    trained: 42500,
    target: 51000,
    feedback: {
      positive: 36125,
      neutral: 4250,
      negative: 2125
    },
    acceptanceRate: 92,
    trend: [
      { month: 'Jan', rate: 65 },
      { month: 'Feb', rate: 72 },
      { month: 'Mar', rate: 78 },
      { month: 'Apr', rate: 83 },
      { month: 'May', rate: 88 },
      { month: 'Jun', rate: 92 }
    ]
  };

  // Calculate data for classroom impact
  const classroomImpactData = {
    registeredUsers: 2080000,
    resourcesUsed: 1456000,
    subjectDistribution: [
      { name: 'English', value: 728000 },
      { name: 'Mathematics', value: 624000 },
      { name: 'Science', value: 520000 },
      { name: 'Other', value: 208000 }
    ],
    classDistribution: [
      { name: 'FLN', value: 832000 },
      { name: 'Class 6-8', value: 728000 },
      { name: 'Others', value: 520000 }
    ],
    trend: [
      { month: 'Jan', activeUsers: 1800000, resourceUsage: 1260000 },
      { month: 'Feb', activeUsers: 1850000, resourceUsage: 1295000 },
      { month: 'Mar', activeUsers: 1920000, resourceUsage: 1344000 },
      { month: 'Apr', activeUsers: 1980000, resourceUsage: 1386000 },
      { month: 'May', activeUsers: 2030000, resourceUsage: 1421000 },
      { month: 'Jun', activeUsers: 2080000, resourceUsage: 1456000 }
    ]
  };

  // Calculate data for asset info
  const assetInfoData = {
    kits: {
      distributed: 6500,
      target: 7800,
      progress: 83
    },
    samparkTV: {
      distributed: 3250,
      target: 3900,
      progress: 83
    },
    sparks: {
      distributed: 4160000,
      target: 4576000,
      progress: 91
    }
  };

  // Calculate asset distribution trend
  const assetDistributionTrend = [
    { month: 'Jan', kits: 5200, samparkTV: 2600, sparks: 3328000 },
    { month: 'Feb', kits: 5525, samparkTV: 2763, sparks: 3536000 },
    { month: 'Mar', kits: 5850, samparkTV: 2925, sparks: 3744000 },
    { month: 'Apr', kits: 6075, samparkTV: 3038, sparks: 3952000 },
    { month: 'May', kits: 6300, samparkTV: 3150, sparks: 4056000 },
    { month: 'Jun', kits: 6500, samparkTV: 3250, sparks: 4160000 }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border-2 border-orange-200/60 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Program Overview
          </h1>
          <p className="text-orange-600/80 text-lg">
            Comprehensive insights into program performance and metrics
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Program Investment Card */}
        <Dialog open={openDialog === 'investment'} onOpenChange={(open) => setOpenDialog(open ? 'investment' : null)}>
          <DialogTrigger asChild>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-800">Program Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      ${filteredData.budget.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">Total Budget</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-orange-100" />
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[{ value: budgetData }]}>
                        <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30 border-orange-500/30 shadow-xl backdrop-blur-sm">
            <DialogHeader className="border-b border-orange-500/20 pb-4">
              <DialogTitle className="text-xl font-bold text-orange-900">Program Investment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Total Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">${filteredData.budget.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Budget Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilized</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-orange-100 group-hover:bg-orange-200 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Budget Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[{ value: budgetData }]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Teacher Training Card */}
        <Dialog open={openDialog === 'training'} onOpenChange={(open) => setOpenDialog(open ? 'training' : null)}>
          <DialogTrigger asChild>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-800">Teacher Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      {teacherTrainingData.trained.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">Teachers Trained</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training Progress</span>
                      <span>{Math.floor((teacherTrainingData.trained / teacherTrainingData.target) * 100)}%</span>
                    </div>
                    <Progress value={(teacherTrainingData.trained / teacherTrainingData.target) * 100} className="h-2 bg-orange-100" />
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={teacherTrainingData.trend}>
                        <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30 border-orange-500/30 shadow-xl backdrop-blur-sm">
            <DialogHeader className="border-b border-orange-500/20 pb-4">
              <DialogTitle className="text-xl font-bold text-orange-900">Teacher Training Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Teachers Trained</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{teacherTrainingData.trained.toLocaleString()}</p>
                    <p className="text-sm text-orange-500">of {teacherTrainingData.target.toLocaleString()} target</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Acceptance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{teacherTrainingData.acceptanceRate}%</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Training Progress Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={teacherTrainingData.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(8px)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#f97316' }}
                          activeDot={{ r: 6, fill: '#f97316' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Feedback Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-green-50/50 border border-green-200 hover:bg-green-100/50 transition-colors duration-200">
                      <p className="text-2xl font-bold text-green-600">{teacherTrainingData.feedback.positive}%</p>
                      <p className="text-sm text-green-600">Positive</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-yellow-50/50 border border-yellow-200 hover:bg-yellow-100/50 transition-colors duration-200">
                      <p className="text-2xl font-bold text-yellow-600">{teacherTrainingData.feedback.neutral}%</p>
                      <p className="text-sm text-yellow-600">Neutral</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-red-50/50 border border-red-200 hover:bg-red-100/50 transition-colors duration-200">
                      <p className="text-2xl font-bold text-red-600">{teacherTrainingData.feedback.negative}%</p>
                      <p className="text-sm text-red-600">Negative</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Classroom Impact Card */}
        <Dialog open={openDialog === 'impact'} onOpenChange={(open) => setOpenDialog(open ? 'impact' : null)}>
          <DialogTrigger asChild>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-800">Classroom Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      {classroomImpactData.registeredUsers.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">Cumulative till date</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Resources Used</span>
                      <span>{classroomImpactData.resourcesUsed.toLocaleString()}</span>
                    </div>
                    <Progress value={(classroomImpactData.resourcesUsed / classroomImpactData.registeredUsers) * 100} className="h-2 bg-orange-100" />
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={classroomImpactData.trend}>
                        <Line type="monotone" dataKey="activeUsers" stroke="#f97316" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30 border-orange-500/30 shadow-xl backdrop-blur-sm">
            <DialogHeader className="border-b border-orange-500/20 pb-4">
              <DialogTitle className="text-xl font-bold text-orange-900">Classroom Impact Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Registered Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{classroomImpactData.registeredUsers.toLocaleString()}</p>
                    <p className="text-sm text-orange-500">Cumulative till date</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Total Resources Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{classroomImpactData.resourcesUsed.toLocaleString()}</p>
                    <p className="text-sm text-orange-500">Cumulative till date</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Usage Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={classroomImpactData.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(8px)'
                          }}
                          formatter={(value, name) => [
                            value.toLocaleString(),
                            name === 'activeUsers' ? 'Active Users' : 'Resource Usage'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="activeUsers" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#f97316' }}
                          activeDot={{ r: 6, fill: '#f97316' }}
                          name="Active Users"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="resourceUsage" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#3b82f6' }}
                          activeDot={{ r: 6, fill: '#3b82f6' }}
                          name="Resource Usage"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Subject Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] pie-chart-container relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={classroomImpactData.subjectDistribution}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            style={{ outline: 'none' }}
                            className="focus:outline-none"
                            animationBegin={0}
                            animationDuration={2000}
                            animationEasing="ease-in-out"
                          >
                            {classroomImpactData.subjectDistribution.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={[
                                  '#c2410c', // Orange 800
                                  '#ea580c', // Orange 600
                                  '#fb923c', // Orange 400
                                  '#fdba74'  // Orange 300
                                ][index % 4]} 
                                style={{ 
                                  outline: 'none',
                                  filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
                                }}
                                className="focus:outline-none hover:opacity-80 transition-opacity duration-200"
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid rgba(249, 115, 22, 0.2)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              padding: '12px',
                              backdropFilter: 'blur(8px)'
                            }}
                            formatter={(value) => [value.toLocaleString(), 'Users']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full bg-orange-50/50 border-2 border-orange-200 flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">Total</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Class Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] pie-chart-container relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={classroomImpactData.classDistribution}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            style={{ outline: 'none' }}
                            className="focus:outline-none"
                            animationBegin={0}
                            animationDuration={2000}
                            animationEasing="ease-in-out"
                          >
                            {classroomImpactData.classDistribution.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={[
                                  '#7c2d12', // Orange 900
                                  '#c2410c', // Orange 800
                                  '#ea580c'  // Orange 600
                                ][index % 3]} 
                                style={{ 
                                  outline: 'none',
                                  filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
                                }}
                                className="focus:outline-none hover:opacity-80 transition-opacity duration-200"
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid rgba(249, 115, 22, 0.2)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              padding: '12px',
                              backdropFilter: 'blur(8px)'
                            }}
                            formatter={(value) => [value.toLocaleString(), 'Users']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full bg-orange-50/50 border-2 border-orange-200 flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">Total</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Asset Info Card */}
        <Dialog open={openDialog === 'assets'} onOpenChange={(open) => setOpenDialog(open ? 'assets' : null)}>
          <DialogTrigger asChild>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-800">Asset Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kits Distributed</span>
                      <span className="text-sm font-medium">{assetInfoData.kits.distributed.toLocaleString()}/{assetInfoData.kits.target.toLocaleString()}</span>
                    </div>
                    <Progress value={assetInfoData.kits.progress} className="h-2 bg-orange-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sampark TV</span>
                      <span className="text-sm font-medium">{assetInfoData.samparkTV.distributed.toLocaleString()}/{assetInfoData.samparkTV.target.toLocaleString()}</span>
                    </div>
                    <Progress value={assetInfoData.samparkTV.progress} className="h-2 bg-orange-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sparks</span>
                      <span className="text-sm font-medium">{assetInfoData.sparks.distributed.toLocaleString()}/{assetInfoData.sparks.target.toLocaleString()}</span>
                    </div>
                    <Progress value={assetInfoData.sparks.progress} className="h-2 bg-orange-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30 border-orange-500/30 shadow-xl backdrop-blur-sm">
            <DialogHeader className="border-b border-orange-500/20 pb-4">
              <DialogTitle className="text-xl font-bold text-orange-900">Asset Distribution Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Kits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Distributed</span>
                        <span className="font-medium">{assetInfoData.kits.distributed.toLocaleString()}</span>
                      </div>
                      <Progress value={assetInfoData.kits.progress} className="h-2 bg-orange-100 group-hover:bg-orange-200 transition-colors" />
                      <p className="text-sm text-orange-500">Target: {assetInfoData.kits.target.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Sampark TV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Distributed</span>
                        <span className="font-medium">{assetInfoData.samparkTV.distributed.toLocaleString()}</span>
                      </div>
                      <Progress value={assetInfoData.samparkTV.progress} className="h-2 bg-orange-100 group-hover:bg-orange-200 transition-colors" />
                      <p className="text-sm text-orange-500">Target: {assetInfoData.samparkTV.target.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">Sparks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Distributed</span>
                        <span className="font-medium">{assetInfoData.sparks.distributed.toLocaleString()}</span>
                      </div>
                      <Progress value={assetInfoData.sparks.progress} className="h-2 bg-orange-100 group-hover:bg-orange-200 transition-colors" />
                      <p className="text-sm text-orange-500">Target: {assetInfoData.sparks.target.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Distribution Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={assetDistributionTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(8px)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="kits" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#f97316' }}
                          activeDot={{ r: 6, fill: '#f97316' }}
                          name="Kits"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="samparkTV" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#3b82f6' }}
                          activeDot={{ r: 6, fill: '#3b82f6' }}
                          name="Sampark TV"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sparks" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={{ r: 4, fill: '#10b981' }}
                          activeDot={{ r: 6, fill: '#10b981' }}
                          name="Sparks"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Distribution Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { 
                            name: 'Kits', 
                            distributed: assetInfoData.kits.distributed,
                            target: assetInfoData.kits.target,
                            progress: assetInfoData.kits.progress
                          },
                          { 
                            name: 'Sampark TV', 
                            distributed: assetInfoData.samparkTV.distributed,
                            target: assetInfoData.samparkTV.target,
                            progress: assetInfoData.samparkTV.progress
                          },
                          { 
                            name: 'Sparks', 
                            distributed: assetInfoData.sparks.distributed,
                            target: assetInfoData.sparks.target,
                            progress: assetInfoData.sparks.progress
                          }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(8px)'
                          }}
                          formatter={(value, name) => [
                            value.toLocaleString(),
                            name === 'distributed' ? 'Distributed' : 
                            name === 'target' ? 'Target' : 'Progress'
                          ]}
                        />
                        <Legend />
                        <Bar 
                          dataKey="distributed" 
                          fill="#f97316" 
                          name="Distributed"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar 
                          dataKey="target" 
                          fill="#3b82f6" 
                          name="Target"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[
                      { name: 'Kits', progress: assetInfoData.kits.progress },
                      { name: 'Sampark TV', progress: assetInfoData.samparkTV.progress },
                      { name: 'Sparks', progress: assetInfoData.sparks.progress }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2 group">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2 bg-orange-100 group-hover:bg-orange-200 transition-colors" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Program Monitoring Card */}
        <Dialog open={openDialog === 'monitoring'} onOpenChange={(open) => setOpenDialog(open ? 'monitoring' : null)}>
          <DialogTrigger asChild>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-800">Program Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">School Audits</p>
                      <p className="text-lg font-semibold">{programMonitoringData.schoolAudits.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">State Meetings</p>
                      <p className="text-lg font-semibold">{programMonitoringData.stateMeetings}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Events</p>
                    <div className="space-y-2">
                      {programMonitoringData.monitoringEvents.slice(0, 3).map((event, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {event.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : event.status === 'pending' ? (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm">{event.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30 border-orange-500/30 shadow-xl backdrop-blur-sm">
            <DialogHeader className="border-b border-orange-500/20 pb-4">
              <DialogTitle className="text-xl font-bold text-orange-900">Program Monitoring Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">School Audits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{programMonitoringData.schoolAudits.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md group">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-orange-800">State Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">{programMonitoringData.stateMeetings}</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white/90 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-orange-800">Monitoring Events Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {programMonitoringData.monitoringEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50/50 transition-colors duration-200 group">
                        <div className="flex-shrink-0">
                          {event.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors" />
                          ) : event.status === 'pending' ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-orange-800 group-hover:text-orange-900 transition-colors">{event.event}</p>
                            <span className="text-sm text-orange-500 group-hover:text-orange-600 transition-colors">{event.date}</span>
                          </div>
                          <p className="text-sm text-orange-500 mt-1 group-hover:text-orange-600 transition-colors">
                            {event.status === 'completed' ? 'Completed' : 
                             event.status === 'pending' ? 'In Progress' : 'Upcoming'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 