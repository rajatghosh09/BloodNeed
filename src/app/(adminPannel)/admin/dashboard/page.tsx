"use client";

import { useBloodInventory } from "@/hooks/admin.inventory";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclient";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie, Legend, } from "recharts";

import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import Lottie from "lottie-react";
import { Droplet, Activity, AlertTriangle, Users, Building2, UserCircle, } from "lucide-react";

// Colors for the Pie Chart
const PIE_COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

const Dashboard = () => {
  // 1. Fetch Inventory
  const { data: inventory, isLoading: isInventoryLoading } =
    useBloodInventory();

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
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto bg-gray-50/30 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Activity className="text-red-600 w-7 h-7 md:w-8 md:h-8" />
          Central Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Overview of your inventory, donors, and hospital network.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Total Blood Units
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {totalUnits}
              </h3>
            </div>
            <div className="p-2 md:p-3 bg-red-50 rounded-xl">
              <Droplet className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Low Stock Alerts
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {lowStockGroups}
              </h3>
            </div>
            <div className="p-2 md:p-3 bg-amber-50 rounded-xl">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Registered Donors
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {donors?.length || 0}
              </h3>
            </div>
            <div className="p-2 md:p-3 bg-blue-50 rounded-xl">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Partner Hospitals
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {hospitals?.length || 0}
              </h3>
            </div>
            <div className="p-2 md:p-3 bg-emerald-50 rounded-xl">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Inventory Bar Chart */}
        <Card className="shadow-sm border-none overflow-hidden">
          <CardHeader className="border-b border-gray-50 pb-4 p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-gray-800">
              Inventory Analytics
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Available units across blood groups.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-6 h-[300px] md:h-[350px] w-full">
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
                  tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#FEF2F2" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="units" radius={[6, 6, 0, 0]} maxBarSize={40}>
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
        <Card className="shadow-sm border-none overflow-hidden">
          <CardHeader className="border-b border-gray-50 pb-4 p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-gray-800">
              Donor Demographics
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Distribution of registered donors by blood type.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-6 h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donorChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
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
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Donors List */}
        <Card className="shadow-sm border-none">
          <CardHeader className="border-b border-gray-50 pb-4 p-4 md:p-6">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-gray-800">
              <Users className="w-5 h-5 text-blue-500" /> Newest Donors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {topDonors.map((donor: any) => (
                <div
                  key={donor.id}
                  className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 shrink-0">
                      {donor.full_name ? (
                        donor.full_name.charAt(0).toUpperCase()
                      ) : (
                        <UserCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      {" "}
                      {/* min-w-0 enables truncation */}
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {donor.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {donor.phone || donor.email}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-2 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                    {donor.blood_group || "N/A"}
                  </span>
                </div>
              ))}
              {topDonors.length === 0 && (
                <p className="p-6 text-center text-sm text-gray-500">
                  No donors found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Hospitals List */}
        <Card className="shadow-sm border-none">
          <CardHeader className="border-b border-gray-50 pb-4 p-4 md:p-6">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-gray-800">
              <Building2 className="w-5 h-5 text-emerald-500" /> Partner
              Hospitals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {topHospitals.map((hospital: any) => (
                <div
                  key={hospital.id}
                  className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shrink-0">
                      <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {hospital.hospital_name || hospital.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {hospital.email}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                    Verified
                  </span>
                </div>
              ))}
              {topHospitals.length === 0 && (
                <p className="p-6 text-center text-sm text-gray-500">
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
