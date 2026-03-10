"use client";

import { useAuthStore } from "@/zustand/userAuth";
import { useHospitalRequests } from "@/hooks/hospitalRequest";
import BloodRequestForm from "@/components/hospital/BloodRequestForm";
import RequestList from "@/components/hospital/RequestList";
import StatsCards from "@/components/hospital/StatsCards";
import EmergencyAlert from "@/components/hospital/EmergencyAlert";
import { Building2 } from "lucide-react";



const HospitalDashboard = () => {
  const user = useAuthStore((state) => state.user);
  
  // Note: Assuming useHospitalRequests returns an isLoading boolean too. 
  // You can add your Lottie loader here if you want!
  const { data } = useHospitalRequests(user?.auth_id);

  const total = data?.length || 0;
  const pending = data?.filter((r: any) => r.status === "pending").length || 0;
  const approved = data?.filter((r: any) => r.status === "approved").length || 0;
  const emergency = data?.filter((r: any) => r.priority_level === "high").length || 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      {/* Container to restrict max width on ultra-wide monitors */}
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              Hospital Portal
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Manage your blood requirements, track emergencies, and monitor request history.
            </p>
          </div>
        </div>

        {/* ================= ALERTS & STATS ================= */}
        {/* Render EmergencyAlert ONLY if there is an emergency, and place it at the very top */}
        {emergency > 0 && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <EmergencyAlert count={emergency} />
          </div>
        )}

        <StatsCards
          total={total}
          pending={pending}
          approved={approved}
        />

        {/* ================= MAIN CONTENT GRID ================= */}
        {/* Uses a 12-column grid on XL screens for a perfect 40% / 60% split */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT SIDE: Request Form (Takes 5 out of 12 columns) */}
          <div className="xl:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1">
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800">Request Blood</h2>
                <p className="text-sm text-gray-500 mt-1">Submit a new requirement to the central inventory.</p>
              </div>
              
              <BloodRequestForm auth_id={user.auth_id} />
            </div>
          </div>

          {/* RIGHT SIDE: Request List (Takes 7 out of 12 columns) */}
          <div className="xl:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 overflow-hidden">
              <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Recent Requests</h2>
                  <p className="text-sm text-gray-500 mt-1">Track the live status of your submissions.</p>
                </div>
              </div>

              {/* Wrapped in an overflow-x-auto container so internal tables don't break the layout on mobile */}
              <div className="overflow-x-auto">
                <RequestList auth_id={user.auth_id} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;