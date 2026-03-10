// "use client"

// import { useBloodInventory } from "@/hooks/admin.inventory"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts"
// import loadingAnimation from "@/services/json/loader/bloodsathi.json";
// import Lottie from "lottie-react";

// const Dashboard = () => {

//   const { data: inventory, isLoading } = useBloodInventory()

//   const chartData =
//     inventory?.map((item:any) => ({
//       blood: item.blood_group,
//       units: item.units_available
//     })) || []
// if (isLoading) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
//         <div className="flex flex-col items-center gap-2">
//           {/* Wrapper div to control the size of the animation */}
//           <div className="w-32 h-32">
//             <Lottie
//               animationData={loadingAnimation}
//               loop={true}
//             />
//           </div>
//           <p className="text-gray-600 font-medium tracking-wide">Loading requests...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="p-8 space-y-8">

//       <h1 className="text-3xl text-red-600 font-bold">Blood Bank Dashboard</h1>

//       <Card>

//         <CardHeader>
//           <CardTitle>Blood Group Analytics</CardTitle>
//         </CardHeader>

//         <CardContent className="h-[400px] w-[500px]">

//           <ResponsiveContainer width="100%" height="100%">

//             <BarChart data={chartData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="blood" />

//               <YAxis />

//               <Tooltip />

//               <Bar
//                 dataKey="units"
//                 fill="#dc2626"
//                 radius={[6,6,0,0]}
//               />

//             </BarChart>

//           </ResponsiveContainer>

//         </CardContent>

//       </Card>

//     </div>
//   )
// }

// export default Dashboard


"use client"

import { useBloodInventory } from "@/hooks/admin.inventory"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts"
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import Lottie from "lottie-react";
import { Droplet, Activity, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const { data: inventory, isLoading } = useBloodInventory()

  // Prepare chart data
  const chartData = inventory?.map((item: any) => ({
    blood: item.blood_group,
    units: item.units_available
  })) || []

  // Calculate Summary Statistics
  const totalUnits = chartData.reduce((acc, curr) => acc + curr.units, 0);
  const lowStockGroups = chartData.filter(item => item.units <= 2).length;
  const activeBloodTypes = chartData.filter(item => item.units > 0).length;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32"> 
            <Lottie
              animationData={loadingAnimation} 
              loop={true} 
            />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-red-600 flex items-center gap-3">
          <Activity className="text-red-600 w-8 h-8" />
          Blood Bank Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Overview of your current blood inventory and analytics.</p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-white border-l-4 border-l-red-600 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Blood Units</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalUnits}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Low Stock Warnings</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{lowStockGroups}</h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Blood Types</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {activeBloodTypes} <span className="text-lg text-gray-400 font-normal">/ 8</span>
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="border-b border-gray-100 pb-4 bg-gray-50/50">
          <CardTitle className="text-xl text-gray-800">Inventory Analytics</CardTitle>
          <CardDescription>Current available units across all registered blood groups.</CardDescription>
        </CardHeader>

        {/* Removed w-[500px] to make it fully responsive, set h-[350px] for mobile/desktop balance */}
        <CardContent className="pt-6 h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Tweaked margins for better mobile fit
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              
              <XAxis 
                dataKey="blood" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }}
                dy={10}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 13 }}
              />
              
              <Tooltip 
                cursor={{ fill: '#FEF2F2' }} // Soft red highlight on hover
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              
              <Bar
                dataKey="units"
                radius={[6, 6, 0, 0]}
                barSize={40} // Keeps bars from getting too fat on ultrawide screens
              >
                {/* Dynamically color bars based on stock levels */}
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.units <= 2 ? '#EF4444' : '#DC2626'} // Lighter red for warning, deep red for healthy
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard