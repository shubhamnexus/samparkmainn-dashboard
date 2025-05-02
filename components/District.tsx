import { getFilteredData } from "@/services/dataService"
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DistrictProps {
  period: string;
}

// Generate school data for each block
const generateSchoolData = (blockCode: string, totalStudents: number, totalTeachers: number) => {
  const numberOfSchools = Math.floor(Math.random() * 5) + 5; // 5-10 schools per block
  const schools = [];

  for (let i = 1; i <= numberOfSchools; i++) {
    const students = 65; // Fixed 65 students as per image
    const teachers = Math.random() > 0.5 ? 2 : 1; // Either 1 or 2 teachers
    const hasSmartTV = Math.random() > 0.2; // 80% chance of having SmartTV
    const progress = hasSmartTV ? 100 : 50; // Progress based on SmartTV

    schools.push({
      rank: i,
      school: `School ${(i * 14) % 169 + 1}`, // Random school numbers but realistic
      code: `${blockCode}S${i.toString().padStart(3, '0')}`,
      students,
      teachers,
      smtv: hasSmartTV ? "✓" : "!",
      progress
    });
  }

  return schools;
};

// Block data for each district
const generateBlockData = (districtCode: string, totalSchools: number, totalStudents: number, totalTeachers: number) => {
  const blocks = [];
  let remainingSchools = totalSchools;
  let remainingStudents = totalStudents;
  let remainingTeachers = totalTeachers;
  
  // Pre-calculate distributions to ensure realistic numbers
  const schoolDistributions = Array(10).fill(0).map(() => Math.random());
  const totalDistribution = schoolDistributions.reduce((a, b) => a + b, 0);
  const normalizedDistributions = schoolDistributions.map(d => d / totalDistribution);
  
  for (let i = 1; i <= 10; i++) {
    const isLast = i === 10;
    const distribution = isLast ? 1 : normalizedDistributions[i - 1];
    
    const schools = isLast ? remainingSchools : Math.floor(totalSchools * distribution);
    const students = isLast ? remainingStudents : Math.floor(totalStudents * distribution);
    const teachers = isLast ? remainingTeachers : Math.floor(totalTeachers * distribution);
    const smtv = Math.floor(Math.random() * 50 + 100);
    const progress = Math.floor(Math.random() * 30 + 70);

    const blockCode = `${districtCode}B${i.toString().padStart(2, '0')}`;
    blocks.push({
      rank: i,
      block: `Block ${i}`,
      code: blockCode,
      schools,
      students,
      teachers,
      smtv,
      progress,
      schoolData: generateSchoolData(blockCode, students, teachers)
    });

    remainingSchools -= schools;
    remainingStudents -= students;
    remainingTeachers -= teachers;
  }

  return blocks;
};

// Sample district data with all districts from the image
const allDistrictData = [
  {
    rank: 1,
    district: "Anantapur",
    code: "AP01",
    blocks: 10,
    schools: 4500,
    students: 250000,
    teachers: 12500,
    progress: 100
  },
  {
    rank: 2,
    district: "Chittoor",
    code: "AP02",
    blocks: 10,
    schools: 4200,
    students: 235000,
    teachers: 11800,
    progress: 93
  },
  {
    rank: 3,
    district: "East Godavari",
    code: "AP03",
    blocks: 10,
    schools: 4800,
    students: 265000,
    teachers: 13200,
    progress: 100
  },
  {
    rank: 4,
    district: "Guntur",
    code: "AP04",
    blocks: 10,
    schools: 4100,
    students: 225000,
    teachers: 11200,
    progress: 91
  },
  {
    rank: 5,
    district: "Krishna",
    code: "AP05",
    blocks: 10,
    schools: 3800,
    students: 210000,
    teachers: 10500,
    progress: 84
  },
  {
    rank: 6,
    district: "Kurnool",
    code: "AP06",
    blocks: 10,
    schools: 3600,
    students: 195000,
    teachers: 9800,
    progress: 80
  },
  {
    rank: 7,
    district: "Nellore",
    code: "AP07",
    blocks: 10,
    schools: 3200,
    students: 180000,
    teachers: 9000,
    progress: 71
  },
  {
    rank: 8,
    district: "Prakasam",
    code: "AP08",
    blocks: 10,
    schools: 3500,
    students: 190000,
    teachers: 9500,
    progress: 77
  },
  {
    rank: 9,
    district: "Srikakulam",
    code: "AP09",
    blocks: 10,
    schools: 2800,
    students: 160000,
    teachers: 8000,
    progress: 62
  },
  {
    rank: 10,
    district: "Visakhapatnam",
    code: "AP10",
    blocks: 10,
    schools: 3000,
    students: 170000,
    teachers: 8500,
    progress: 66
  }
].map(district => ({
  ...district,
  blockData: generateBlockData(district.code, district.schools, district.students, district.teachers)
}));

// Show only top 5 districts in the main view
const districtData = allDistrictData.slice(0, 5);

export function District({ period }: DistrictProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<typeof allDistrictData[0] | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<typeof allDistrictData[0]['blockData'][0] | null>(null);
  const filteredData = getFilteredData(period);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border-2 border-orange-200/60 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            District Statistics
          </h1>
          <p className="text-orange-600/80 text-lg">
            Detailed insights into district-level performance and metrics
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-2xl border border-orange-100/50 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-orange-100">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-orange-100/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">SI No</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">District</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Blocks</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Schools</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Students</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Teachers</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {districtData.map((district) => (
              <tr 
                key={district.code}
                className="transition-all duration-200 hover:bg-orange-50/50 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                      <span className="text-sm font-semibold text-orange-700">{district.rank}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-orange-700 transition-colors duration-200">{district.district}</div>
                  <div className="text-sm text-orange-600/80">{district.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 group-hover:text-orange-700 transition-colors duration-200">{district.blocks}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 group-hover:text-orange-700 transition-colors duration-200">{district.schools.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 group-hover:text-orange-700 transition-colors duration-200">{district.students.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 group-hover:text-orange-700 transition-colors duration-200">{district.teachers.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-48 bg-orange-100 rounded-full h-2.5 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500 group-hover:from-orange-600 group-hover:to-orange-700" 
                        style={{ width: `${district.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-orange-700 group-hover:text-orange-800 transition-colors duration-200">{district.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Know More Button Section */}
      <div className="flex justify-center mt-8">
        <button 
          className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 ease-in-out rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="relative">
            Know More
            <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-2">
              →
            </span>
          </span>
        </button>
      </div>

      {/* Districts Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity duration-300 ease-in-out" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300 ease-in-out" 
                onClick={() => {
                  setSelectedBlock(null);
                  setSelectedDistrict(null);
                  setIsModalOpen(false);
                }}
              ></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full border border-orange-100/50 relative">
              {/* Modal Content */}
              <div className="relative">
                {selectedBlock ? (
                  <>
                    {/* School Statistics Header */}
                    <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 px-8 py-6 border-b border-orange-200/60">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => setSelectedBlock(null)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {selectedBlock.block} School Statistics
                          </h3>
                          <p className="mt-2 text-base text-orange-600/80">
                            School-wise performance metrics for {selectedBlock.block}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* School Statistics Table */}
                    <div className="bg-white px-8 py-8">
                      <div className="overflow-x-auto rounded-2xl border border-orange-100/50 shadow-sm">
                        <table className="min-w-full bg-white divide-y divide-orange-100">
                          <thead className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Rank</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">School</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Students</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Teachers</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">SMTV</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Progress</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-orange-100">
                            {selectedBlock.schoolData.map((school) => (
                              <tr 
                                key={school.code}
                                className="transition-all duration-200 hover:bg-orange-50/50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                                      <span className="text-sm font-semibold text-orange-700">{school.rank}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{school.school}</div>
                                  <div className="text-sm text-orange-600">{school.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{school.students}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{school.teachers}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                    school.smtv === "✓" 
                                      ? "bg-green-100 text-green-600"
                                      : "bg-red-100 text-red-600"
                                  } shadow-sm`}>
                                    {school.smtv}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-48 bg-orange-100 rounded-full h-2.5 shadow-inner">
                                      <div 
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${school.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-orange-700">{school.progress}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : selectedDistrict ? (
                  <>
                    {/* Block Statistics Header */}
                    <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 px-8 py-6 border-b border-orange-200/60">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => setSelectedDistrict(null)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {selectedDistrict.district} Block Statistics
                          </h3>
                          <p className="mt-2 text-base text-orange-600/80">
                            Click on a block to view school-wise statistics
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Block Statistics Table */}
                    <div className="bg-white px-8 py-8">
                      <div className="overflow-x-auto rounded-2xl border border-orange-100/50 shadow-sm">
                        <table className="min-w-full bg-white divide-y divide-orange-100">
                          <thead className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">SI No</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Block</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Schools</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Students</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Teachers</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">SMTV</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Progress</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-orange-100">
                            {selectedDistrict.blockData.map((block) => (
                              <tr 
                                key={block.code}
                                className="transition-all duration-200 hover:bg-orange-50/50 cursor-pointer"
                                onClick={() => setSelectedBlock(block)}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                                      <span className="text-sm font-semibold text-orange-700">{block.rank}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{block.block}</div>
                                  <div className="text-sm text-orange-600">{block.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{block.schools.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{block.students.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{block.teachers.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{block.smtv}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-48 bg-orange-100 rounded-full h-2.5 shadow-inner">
                                      <div 
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${block.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-orange-700">{block.progress}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Districts Header */}
                    <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 px-8 py-6 border-b border-orange-200/60">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                            All District Statistics
                          </h3>
                          <p className="mt-2 text-base text-orange-600/80">
                            Click on a district to view block-wise statistics
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Districts Table */}
                    <div className="bg-white px-8 py-8">
                      <div className="overflow-x-auto rounded-2xl border border-orange-100/50 shadow-sm">
                        <table className="min-w-full bg-white divide-y divide-orange-100">
                          <thead className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">SI No</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">District</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Blocks</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Schools</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Students</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Teachers</th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-orange-800 uppercase tracking-wider">Progress</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-orange-100">
                            {allDistrictData.map((district) => (
                              <tr 
                                key={district.code}
                                className="transition-all duration-200 hover:bg-orange-50/50 cursor-pointer"
                                onClick={() => setSelectedDistrict(district)}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                                      <span className="text-sm font-semibold text-orange-700">{district.rank}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{district.district}</div>
                                  <div className="text-sm text-orange-600">{district.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{district.blocks}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{district.schools.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{district.students.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{district.teachers.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-48 bg-orange-100 rounded-full h-2.5 shadow-inner">
                                      <div 
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${district.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-orange-700">{district.progress}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 