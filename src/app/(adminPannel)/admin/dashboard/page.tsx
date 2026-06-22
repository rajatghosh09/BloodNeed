"use client";

import { useBloodInventory } from "@/hooks/admin.inventory";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie, Legend } from "recharts";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import Lottie from "lottie-react";
import { Droplet, Activity, AlertTriangle, Users, Building2, UserCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Custom premium color palette
const PIE_COLORS = [
  "#E11D48", // Rose 600
  "#F97316", // Orange 500
  "#F59E0B", // Amber 500
  "#10B981", // Emerald 500
  "#06B6D4", // Cyan 500
  "#3B82F6", // Blue 500
  "#6366F1", // Indigo 500
  "#A855F7", // Purple 500
];

const Dashboard = () => {
  // 1. Fetch Inventory
  const { data: inventory, isLoading: isInventoryLoading } = useBloodInventory();

  // 2. Fetch Donors (Users)
  const { data: donors, isLoading: isDonorsLoading } = useQuery({
    queryKey: ["admin-donors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("register")
        .select("*")
        .eq("role", "user")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // 3. Fetch Hospitals
  const { data: hospitals, isLoading: isHospitalsLoading } = useQuery({
    queryKey: ["admin-hospitals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("register")
        .select("*")
        .eq("role", "hospital")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // --- DATA PROCESSING ---
  const inventoryChartData =
    inventory?.map((item: any) => ({
      blood: item.blood_group,
      units: item.units_available,
    })) || [];

  const totalUnits = inventoryChartData.reduce(
    (acc, curr) => acc + curr.units,
    0,
  );
  const lowStockGroups = inventoryChartData.filter(
    (item) => item.units <= 2,
  ).length;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const donorChartData = bloodGroups
    .map((bg) => ({
      name: bg,
      value: donors?.filter((d: any) => d.blood_group === bg).length || 0,
    }))
    .filter((d) => d.value > 0);

  const topDonors = donors?.slice(0, 5) || [];
  const topHospitals = hospitals?.slice(0, 5) || [];

  if (isInventoryLoading || isDonorsLoading || isHospitalsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
              <Activity className="w-7 h-7" />
            </span>
            Central Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base font-semibold">
            Overview of your inventory, donors, and hospital network.
          </p>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold text-xs px-3.5 py-2 rounded-full border border-emerald-100 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          System Live & Connected
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Blood Units */}
        <motion.div whileHover={{ y: -3 }} className="transition-all duration-300">
          <Card className="bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600"></div>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Blood Units
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1.5">
                  {totalUnits}
                </h3>
              </div>
              <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Droplet className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div whileHover={{ y: -3 }} className="transition-all duration-300">
          <Card className="bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500"></div>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Low Stock Alerts
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1.5">
                  {lowStockGroups}
                </h3>
              </div>
              <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Registered Donors */}
        <motion.div whileHover={{ y: -3 }} className="transition-all duration-300">
          <Card className="bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500"></div>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Registered Donors
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1.5">
                  {donors?.length || 0}
                </h3>
              </div>
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Partner Hospitals */}
        <motion.div whileHover={{ y: -3 }} className="transition-all duration-300">
          <Card className="bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500"></div>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Partner Hospitals
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1.5">
                  {hospitals?.length || 0}
                </h3>
              </div>
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inventory Bar Chart */}
        <Card className="shadow-sm border border-gray-100 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="border-b border-gray-100 pb-4 p-6">
            <CardTitle className="text-lg font-bold text-gray-800">
              Inventory Analytics
            </CardTitle>
            <CardDescription className="text-xs font-semibold text-gray-450">
              Available units across blood groups.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-6 h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryChartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="blood"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip
                  cursor={{ fill: "#FEF2F2" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Bar dataKey="units" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {inventoryChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.units <= 2 ? "#EF4444" : "#DC2626"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donor Distribution Pie Chart */}
        <Card className="shadow-sm border border-gray-100 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="border-b border-gray-100 pb-4 p-6">
            <CardTitle className="text-lg font-bold text-gray-800">
              Donor Demographics
            </CardTitle>
            <CardDescription className="text-xs font-semibold text-gray-450">
              Distribution of registered donors by blood type.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-6 h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donorChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donorChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px", fontWeight: "600" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Donors List */}
        <Card className="shadow-sm border border-gray-100 rounded-3xl bg-white">
          <CardHeader className="border-b border-gray-100 pb-4 p-6 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
              <Users className="w-5 h-5 text-blue-500" /> Newest Donors
            </CardTitle>
            <Link href="/admin/donors" className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topDonors.map((donor: any) => (
                <div
                  key={donor.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-extrabold border border-blue-100 shrink-0 shadow-sm">
                      {donor.full_name ? (
                        donor.full_name.charAt(0).toUpperCase()
                      ) : (
                        <UserCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {donor.full_name}
                      </p>
                      <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                        {donor.phone || donor.email}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-2 px-3 py-1 bg-red-50 text-red-600 text-xs font-extrabold rounded-full border border-red-100 shadow-sm">
                    {donor.blood_group || "N/A"}
                  </span>
                </div>
              ))}
              {topDonors.length === 0 && (
                <p className="p-6 text-center text-sm text-gray-550">
                  No donors found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Hospitals List */}
        <Card className="shadow-sm border border-gray-100 rounded-3xl bg-white">
          <CardHeader className="border-b border-gray-100 pb-4 p-6 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
              <Building2 className="w-5 h-5 text-emerald-500" /> Partner Hospitals
            </CardTitle>
            <div className="text-xs text-gray-400 font-semibold">Latest Partners</div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topHospitals.map((hospital: any) => (
                <div
                  key={hospital.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shrink-0 shadow-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {hospital.hospital_name || hospital.full_name}
                      </p>
                      <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                        {hospital.email}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full shadow-sm">
                    Verified
                  </span>
                </div>
              ))}
              {topHospitals.length === 0 && (
                <p className="p-6 text-center text-sm text-gray-550">
                  No hospitals found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
